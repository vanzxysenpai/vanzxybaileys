// Banner: runs on `npm start` (prestart) and is also exported as printBanner() so lib/index.js
// can show it once per process start. Opt out at runtime with VANZXY_BANNER=0.
import { readFileSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';

const pkg = (() => {
    try {
        const pkgPath = fileURLToPath(new URL('./package.json', import.meta.url));
        return JSON.parse(readFileSync(pkgPath, 'utf8'));
    } catch {
        return {};
    }
})();

export function printBanner() {
    if (process.env.VANZXY_BANNER === '0') return;
    if (globalThis.__VanzxyBannerShown) return; // once per process, even with auto-reconnect / re-imports
    globalThis.__VanzxyBannerShown = true;

    const version = pkg.version || '';
    const nodeVersion = process.versions.node;
    const DOCS = 'github.com/vanzxysenpai/vanzxybaileys';

    // Fancy box only on a real TTY (CI logs / piped output get clean plain text instead).
    const fancy = (Boolean(process.stdout.isTTY) || process.env.FORCE_COLOR !== undefined) && process.env.NO_COLOR === undefined;

    if (!fancy) {
        console.log(`\n🍃 @vanzxy/baileys${version ? ` v${version}` : ''} — 桜 ようこそ (welcome)`);
        console.log(`   Node ${nodeVersion} · Docs ${DOCS}`);
        console.log('   Made with 🍃 by Vanzxy — thanks for using!\n');
        return;
    }

    const fg = (n) => `\x1b[38;5;${n}m`;
    const c = {
        reset: '\x1b[0m',
        bold: '\x1b[1m',
        dim: '\x1b[2m',
        italic: '\x1b[3m',
        petal: fg(218), // light sakura
        pink: fg(211),
        deep: fg(205),
        red: fg(197), // hinomaru accent
        mint: fg(121),
        gray: fg(240),
        white: '\x1b[97m',
        cyan: fg(117),
    };

    const WIDTH = 62;
    const strip = (s) => s.replace(/\x1b\[[0-9;]*m/g, '');

    // Terminal display width: CJK, kana and emoji take 2 columns.
    const cw = (cp) =>
        (cp >= 0x1100 && cp <= 0x115f) ||
        (cp >= 0x2e80 && cp <= 0xa4cf) ||
        (cp >= 0xac00 && cp <= 0xd7a3) ||
        (cp >= 0xf900 && cp <= 0xfaff) ||
        (cp >= 0xfe30 && cp <= 0xfe6f) ||
        (cp >= 0xff00 && cp <= 0xff60) ||
        (cp >= 0xffe0 && cp <= 0xffe6) ||
        (cp >= 0x1f300 && cp <= 0x1faff)
            ? 2
            : 1;
    const vw = (s) => {
        let w = 0;
        for (const ch of strip(s)) w += ch === '\u200d' || ch === '\ufe0f' ? 0 : cw(ch.codePointAt(0));
        return w;
    };

    const center = (s) => {
        const v = vw(s);
        const left = Math.max(Math.floor((WIDTH - v) / 2), 0);
        return ' '.repeat(left) + s + ' '.repeat(Math.max(WIDTH - v - left, 0));
    };
    const left = (s, pad = 6) => ' '.repeat(pad) + s + ' '.repeat(Math.max(WIDTH - vw(s) - pad, 0));

    // Per-character pink gradient for the title.
    const gradient = (text, from = 219, to = 205) => {
        const chars = [...text];
        return (
            chars
                .map((ch, i) => `${fg(Math.round(from + ((to - from) * i) / Math.max(chars.length - 1, 1)))}${ch}`)
                .join('') + c.reset
        );
    };

    const b = c.pink;
    const top = `${b}╭${'─'.repeat(WIDTH)}╮${c.reset}`;
    const bottom = `${b}╰${'─'.repeat(WIDTH)}╯${c.reset}`;
    const row = (s = '') => `${b}│${c.reset}${s}${b}│${c.reset}`;
    const blank = row(' '.repeat(WIDTH));
    const ornament = `${c.petal}✿${c.reset} ${c.pink}˖${c.reset} ${c.deep}❀${c.reset} ${c.pink}˖${c.reset} ${c.petal}✿${c.reset}`;
    const divider = row(center(`${c.gray}${'╌'.repeat(10)}${c.reset} ${c.deep}❀${c.reset} ${c.gray}${'╌'.repeat(10)}${c.reset}`));

    const kanji = `${c.red}●${c.reset}  ${c.bold}${c.petal}桜${c.reset}  ${c.dim}·${c.reset}  ${c.bold}${c.petal}ようこそ${c.reset}  ${c.red}●${c.reset}`;
    const title = `${c.bold}${gradient('🍃 @vanzxy/baileys')}${version ? `  ${c.dim}${c.pink}v${version}${c.reset}` : ''}`;
    const tagline = `${c.mint}Next-gen Baileys fork by Vanzxy${c.reset}`;
    const sub = `${c.dim}Interactive messages ${c.pink}·${c.reset}${c.dim} native flow ${c.pink}·${c.reset}${c.dim} status tools${c.reset}`;
    const quote = `${c.italic}${c.dim}「 小さな桜、大きな夢 」${c.reset}`;

    const info = [
        ['Node', `${c.dim}${nodeVersion}${c.reset}`],
        ['Docs', `${c.cyan}${DOCS}${c.reset}`],
    ];

    const lines = [
        '',
        top,
        blank,
        row(center(ornament)),
        row(center(kanji)),
        blank,
        row(center(title)),
        row(center(tagline)),
        row(center(sub)),
        blank,
        divider,
        blank,
        ...info.map(([k, v]) => row(left(`${c.deep}▸${c.reset} ${c.white}${k.padEnd(5)}${c.reset}${v}`))),
        blank,
        row(center(quote)),
        row(center(`${c.italic}${c.dim}Made with 🍃 by Vanzxy — ありがとう!${c.reset}`)),
        blank,
        row(center(ornament)),
        bottom,
        '',
    ];

    console.log(lines.join('\n'));
}

// Run directly (`node banner.js`, i.e. the npm postinstall hook).
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) printBanner();
