// Vanz@Add 2.0.5: single source of truth for the AI bot JID used in forwardedAiBotMessageInfo.
// Override with the VANZXY_AI_BOT_JID environment variable (AIRich also has setForwardBotJid()).
export const DEFAULT_AI_BOT_JID = process.env.VANZXY_AI_BOT_JID || '867051314767696@bot';
