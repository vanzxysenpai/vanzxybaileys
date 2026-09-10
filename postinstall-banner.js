// Shown once after `npm install` — not on every connect, so it doesn't spam bot logs.
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const pkg = (() => {
    try {
        const pkgPath = fileURLToPath(new URL('./package.json', import.meta.url));
        return JSON.parse(readFileSync(pkgPath, 'utf8'));
    } catch {
        return {};
    }
})();

const version = pkg.version || '';
const nodeVersion = process.versions.node;

// Skip the fancy box in non-TTY environments (CI logs, piped output) — plain text is
// more useful there than a box that may render with broken/misaligned borders.
const supportsColor = Boolean(process.stdout.isTTY) && process.env.NO_COLOR === undefined;

const c = supportsColor
    ? {
          reset: '\x1b[0m',
          bold: '\x1b[1m',
          dim: '\x1b[2m',
          italic: '\x1b[3m',
          green: '\x1b[38;5;42m',
          mint: '\x1b[38;5;121m',
          cyan: '\x1b[38;5;51m',
          gray: '\x1b[38;5;240m',
          white: '\x1b[97m',
      }
    : { reset: '', bold: '', dim: '', italic: '', green: '', mint: '', cyan: '', gray: '', white: '' };

const WIDTH = 60;
const strip = (s) => s.replace(/\x1b\[[0-9;]*m/g, '');
const center = (s) => {
    const visible = strip(s).length;
    const left = Math.floor((WIDTH - visible) / 2);
    const right = WIDTH - visible - left;
    return ' '.repeat(Math.max(left, 0)) + s + ' '.repeat(Math.max(right, 0));
};
const leftPad = (s, padStart = 3) => {
    const visible = strip(s).length;
    return ' '.repeat(padStart) + s + ' '.repeat(Math.max(WIDTH - visible - padStart, 0));
};

const border = c.gray;
const top = `${border}╭${'─'.repeat(WIDTH)}╮${c.reset}`;
const divider = `${border}├${'─'.repeat(WIDTH)}┤${c.reset}`;
const bottom = `${border}╰${'─'.repeat(WIDTH)}╯${c.reset}`;
const row = (content = '') => `${border}│${c.reset}${content}${border}│${c.reset}`;
const blank = row(' '.repeat(WIDTH));

const title = `${c.bold}${c.green}🍃  @vanzxy/baileys${c.reset}${version ? `  ${c.dim}v${version}${c.reset}` : ''}`;
const tagline = `${c.mint}Next-gen Baileys fork by Vanzxy${c.reset}`;
const sub = `${c.dim}Interactive messages · native flow · status tools${c.reset}`;

const infoLines = [
    [`${c.white}Node${c.reset}`, `${c.dim}${nodeVersion}${c.reset}`],
    [`${c.white}Docs${c.reset}`, `${c.cyan}github.com/vanzxysenpai/vanzxybaileys${c.reset}`],
];

const lines = [
    '',
    top,
    blank,
    row(center(title)),
    row(center(tagline)),
    row(center(sub)),
    blank,
    divider,
    blank,
    ...infoLines.map(([label, value]) => row(leftPad(`${label}  ${value}`))),
    blank,
    row(center(`${c.italic}${c.dim}Made with 🍃 by Vanzxy — thanks for installing!${c.reset}`)),
    blank,
    bottom,
    '',
];

console.log(lines.join('\n'));
