// Vanz@Fix: hand-written shim, not tsc-generated.
// WAProto/index.js is auto-generated protobufjs codegen from the WhatsApp .proto
// schema (115k+ lines, dynamic prototype-based message classes). Without the
// original .proto source we can't regenerate faithful per-field types, so `proto`
// is typed loosely as `any` here. This still lets `tsc` emit real .d.ts for the
// rest of lib/ (which re-exports `proto` via `export * from '../WAProto/index.js'`)
// instead of failing declaration emit for the whole package.
export declare const proto: any;
export default proto;
