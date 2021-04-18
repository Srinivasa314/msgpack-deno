// Main Functions:

export { encode } from "./encode.ts";
export type { EncodeOptions } from "./encode.ts";
export { decode } from "./decode.ts";
export type { DecodeOptions } from "./decode.ts";
export { decodeArrayStream, decodeAsync, decodeStream } from "./decodeAsync.ts";

/**
 * @experimental `Decoder` is exported for experimental use.
 */
export { Decoder } from "./Decoder.ts";

/**
 * @experimental `Encoder` is exported for experimental use.
 */
export { Encoder } from "./Encoder.ts";

// Utilitiies for Extension Types:

export { ExtensionCodec } from "./ExtensionCodec.ts";
export type {
  ExtensionCodecType,
  ExtensionDecoderType,
  ExtensionEncoderType,
} from "./ExtensionCodec.ts";
export type { ExtData } from "./ExtData.ts";
export type {
  decodeTimestampExtension,
  decodeTimestampToTimeSpec,
  encodeDateToTimeSpec,
  encodeTimeSpecToTimestamp,
  encodeTimestampExtension,
  EXT_TIMESTAMP,
} from "./timestamp.ts";
