import chalk from 'chalk';

// ── Rimuru Baileys Banner ─────────────────────────────────────────────────────
const _rimuru = {
    line : chalk.hex('#00BFFF')('━'.repeat(60)),
    title: chalk.bold.hex('#00BFFF')('💧  Rimuru Baileys  ') + chalk.hex('#0080FF')('| Modified Edition'),
    pair : chalk.hex('#0080FF')('⌘  Pairing Code : ') + chalk.bold.white('MURUSAMA'),
    repo : chalk.hex('#0080FF')('❖  GitHub : ') + chalk.bold.cyan('@ryuhandev'),
    note : chalk.dim.hex('#00BFFF')('   WhatsApp Multi-Device Library'),
};
console.log(_rimuru.line);
console.log(_rimuru.title);
console.log(_rimuru.pair);
console.log(_rimuru.repo);
console.log(_rimuru.note);
console.log(_rimuru.line);
// ─────────────────────────────────────────────────────────────────────────────

import makeWASocket from './Socket/index.js';
export * from '../WAProto/index.js';
export { proto } from '../WAProto/index.js';
export * from './Utils/index.js';
export * from './Types/index.js';
export * from './Defaults/index.js';
export * from './WABinary/index.js';
export * from './WAM/index.js';
export * from './WAUSync/index.js';
export * from './Store/index.js';
export { makeWASocket };
export default makeWASocket;
//# sourceMappingURL=index.js.map