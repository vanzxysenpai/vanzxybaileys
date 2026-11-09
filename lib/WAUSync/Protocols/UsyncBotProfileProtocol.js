import { getBinaryNodeChild, getBinaryNodeChildren, getBinaryNodeChildString } from '../../WABinary/index.js';
import { USyncUser } from '../USyncUser.js';
export class USyncBotProfileProtocol {
    constructor() {
        this.name = 'bot';
    }
    getQueryElement() {
        return {
            tag: 'bot',
            attrs: {},
            content: [{ tag: 'profile', attrs: { v: '1' } }]
        };
    }
    getUserElement(user) {
        return {
            tag: 'bot',
            attrs: {},
            content: [{ tag: 'profile', attrs: { persona_id: user.personaId } }]
        };
    }
    parser(node) {
        // Vanz@Fix (bug 78): every other protocol in this fork (contact, status,
        // disappearing_mode, lid, username) receives `node` as the tag-matching
        // element itself (USyncQuery.js calls `parser(content)` where
        // `content.tag === protocol.name`) and checks `node.tag === '<name>'`
        // directly. This parser instead did `getBinaryNodeChild(node, 'bot')`,
        // searching for a *child* named 'bot' inside a node that already *is*
        // the <bot> element -- there's no nested <bot> child, so that always
        // returned undefined, and every field below it (profile, commands,
        // prompts, name, description...) silently came back empty/undefined on
        // every bot-profile USync response. getBinaryNodeChild() is null-safe
        // (returns [] internally), which is exactly why this never threw and
        // went unnoticed. Read `profile` straight off `node`, matching the
        // sibling protocols' convention.
        const profile = getBinaryNodeChild(node, 'profile');
        const commandsNode = getBinaryNodeChild(profile, 'commands');
        const promptsNode = getBinaryNodeChild(profile, 'prompts');
        const commands = [];
        const prompts = [];
        for (const command of getBinaryNodeChildren(commandsNode, 'command')) {
            commands.push({
                name: getBinaryNodeChildString(command, 'name'),
                description: getBinaryNodeChildString(command, 'description')
            });
        }
        for (const prompt of getBinaryNodeChildren(promptsNode, 'prompt')) {
            prompts.push(`${getBinaryNodeChildString(prompt, 'emoji')} ${getBinaryNodeChildString(prompt, 'text')}`);
        }
        return {
            isDefault: !!getBinaryNodeChild(profile, 'default'),
            jid: node.attrs.jid,
            name: getBinaryNodeChildString(profile, 'name'),
            attributes: getBinaryNodeChildString(profile, 'attributes'),
            description: getBinaryNodeChildString(profile, 'description'),
            category: getBinaryNodeChildString(profile, 'category'),
            personaId: profile.attrs['persona_id'],
            commandsDescription: getBinaryNodeChildString(commandsNode, 'description'),
            commands,
            prompts
        };
    }
}
