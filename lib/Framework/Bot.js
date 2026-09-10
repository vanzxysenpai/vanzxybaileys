import { Boom } from '@hapi/boom';
import makeWASocket from '../Socket/index.js';
import { DisconnectReason } from '../Types/index.js';
import { isJidGroup } from '../WABinary/index.js';
import defaultLogger from '../Utils/logger.js';
import { SQLiteStore } from './Store/SQLiteStore.js';
import { Context } from './Context.js';
import { SessionManager } from './SessionManager.js';
import { StatsManager } from './StatsManager.js';

// Vanz@Port (from @queenanya/baileys Framework, originally Baileys PR #2710
// by LuferOS) --- high-level Bot class: middleware routing (Express/Koa-style
// `use()`/`next()`), a `!command` dispatcher, an outgoing message queue that
// survives disconnects, and exponential-backoff auto-reconnect.
//
// Kept from upstream's fix pass:
//  - command boundary check: `!sticker` no longer matches `!stickerSpam`
//  - queue is rejected (not left hanging) on DisconnectReason.loggedOut
//  - stats.observeMessage runs inside the per-message try block, so a
//    SQLite error can't silently skip middleware for that message
//  - reconnect timer handle is stored so stop()/restart() can cancel it
//
// Vanz@Fix vs upstream: SQLiteStore/StatsManager are now created through an
// async factory (see Store/SQLiteStore.js) instead of a synchronous
// constructor, since better-sqlite3 is lazy-loaded as an optional peer dep
// in this fork. That means store/session/stats setup moved out of the Bot
// constructor and into start() — the socket is only created *after* the
// store is ready, so no message can arrive before sessions/stats exist.
export class Bot {
    constructor(config) {
        this.middlewares = [];
        this.messageQueue = [];
        this.isConnected = false;
        this.reconnectAttempts = 0;
        this.reconnectTimer = null;
        this.BASE_RECONNECT_DELAY = 1000;
        this.MAX_RECONNECT_DELAY = 30000;
        this.socket = null;
        this.sessions = null;
        this.stats = null;
        this.store = null;
        this.config = config;
        this.logger = config.logger ?? defaultLogger.child({ module: 'Framework.Bot' });
    }

    /** Register a middleware function */
    use(middleware) {
        this.middlewares.push(middleware);
        return this;
    }

    /**
     * Register a command handler.
     * Uses exact match OR prefix + whitespace so '!sticker' does NOT
     * match '!stickerSpam' or '!stickerset'.
     */
    command(cmd, handler) {
        this.use(async (ctx, next) => {
            const text = ctx.text;
            if (text === cmd || text?.startsWith(cmd + ' ')) {
                await handler(ctx);
            }
            await next();
        });
        return this;
    }

    /** Register a handler that fires on any non-empty text */
    onText(handler) {
        this.use(async (ctx, next) => {
            if (ctx.text) {
                await handler(ctx);
            }
            await next();
        });
        return this;
    }

    /** Send a message — queues automatically when socket is disconnected */
    async sendMessage(jid, content, options = {}) {
        if (this.isConnected && this.socket) {
            return this.socket.sendMessage(jid, content, options);
        }
        return new Promise((resolve, reject) => {
            this.messageQueue.push({ jid, content, options, resolve, reject });
            this.logger.info({ queueLength: this.messageQueue.length }, 'socket not connected — message queued');
        });
    }

    /** Drain queued messages after reconnect. */
    drainQueue() {
        if (!this.isConnected || !this.socket || this.messageQueue.length === 0)
            return;
        this.logger.info({ pending: this.messageQueue.length }, 'draining message queue');
        const queue = [...this.messageQueue];
        this.messageQueue = [];
        for (const msg of queue) {
            this.socket.sendMessage(msg.jid, msg.content, msg.options).then(msg.resolve).catch(msg.reject);
        }
    }

    /** Reject and clear the message queue. Called on loggedOut so callers don't hang forever. */
    rejectQueue(reason) {
        const queue = [...this.messageQueue];
        this.messageQueue = [];
        for (const msg of queue) {
            msg.reject(new Boom(reason, { statusCode: 401 }));
        }
        if (queue.length > 0) {
            this.logger.warn({ rejected: queue.length }, 'message queue rejected — session terminated');
        }
    }

    /** Start the socket and wire all event handlers */
    async start() {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
        // Vanz@Fix: store/sessions must exist before the socket can receive
        // any message, so this now awaits creation instead of doing it
        // synchronously in the constructor.
        if (!this.store) {
            const dbPath = this.config.dbPath ?? 'baileys_store.db';
            this.store = await SQLiteStore.create(dbPath);
            this.sessions = new SessionManager(this.store);
        }
        this.socket = makeWASocket(this.config.socketConfig);
        if (this.config.enableStats && !this.stats) {
            this.stats = await StatsManager.create(this.config.dbPath ?? 'baileys_store.db', jid => this.socket.groupMetadata(jid));
        }
        this.socket.ev.on('messages.upsert', async ({ messages, type }) => {
            if (type !== 'notify')
                return;
            for (const msg of messages) {
                const ctx = new Context(this, msg);
                try {
                    if (this.stats && ctx.remoteJid && isJidGroup(ctx.remoteJid)) {
                        const participant = msg.key.participant || msg.participant;
                        if (participant) {
                            const isSticker = !!msg.message?.stickerMessage;
                            this.stats.observeMessage(ctx.remoteJid, participant, isSticker);
                        }
                    }
                    await this.executeMiddlewares(ctx);
                }
                catch (err) {
                    this.logger.error({ err }, 'error executing middleware');
                }
            }
        });
        this.socket.ev.on('connection.update', update => {
            const { connection, lastDisconnect } = update;
            if (connection === 'open') {
                this.logger.info('bot connected');
                this.isConnected = true;
                this.reconnectAttempts = 0;
                this.drainQueue();
            }
            if (connection === 'close') {
                this.isConnected = false;
                const error = lastDisconnect?.error;
                const statusCode = error?.output?.statusCode;
                const isLoggedOut = statusCode === DisconnectReason.loggedOut;
                this.logger.warn({ statusCode }, 'connection closed');
                if (isLoggedOut) {
                    this.rejectQueue('session terminated (logged out)');
                    this.logger.info('session logged out — not reconnecting');
                }
                else {
                    this.reconnectAttempts++;
                    const delay = Math.min(this.MAX_RECONNECT_DELAY, this.BASE_RECONNECT_DELAY * Math.pow(2, this.reconnectAttempts - 1));
                    this.logger.info({ delay, attempt: this.reconnectAttempts }, 'scheduling reconnect');
                    this.reconnectTimer = setTimeout(() => {
                        this.reconnectTimer = null;
                        this.start().catch(err => {
                            this.logger.error({ err }, 'reconnect failed');
                        });
                    }, delay);
                }
            }
        });
    }

    async executeMiddlewares(ctx) {
        let index = -1;
        const dispatch = async (i) => {
            if (i <= index)
                throw new Error('next() called multiple times');
            index = i;
            const middleware = this.middlewares[i];
            if (middleware) {
                await middleware(ctx, () => dispatch(i + 1));
            }
        };
        await dispatch(0);
    }

    /** Gracefully stop the bot */
    stop() {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
        this.rejectQueue('bot stopped');
        this.store?.close();
        this.stats?.close();
    }
}
