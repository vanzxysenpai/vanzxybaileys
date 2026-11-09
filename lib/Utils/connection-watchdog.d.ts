/**
 * @param {import('../Types/index.js').WASocket} sock
 * @param {{ idleThresholdMs?: number, checkIntervalMs?: number, probe?: 'ping' | 'presence' }} [opts]
 * @returns {() => void} stop function
 */
export function setupConnectionWatchdog(sock: any, opts1?: { [key: string]: any; 
    idleThresholdMs?: number;
    checkIntervalMs?: number;
    probe?: "ping" | "presence";
}): () => void;
