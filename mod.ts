// Main Functions:

export { encode, EncodeOptions } from "./encode.ts";
export { decode, DecodeOptions } from "./decode.ts";
export { decodeAsync, decodeArrayStream, decodeStream } from "./decodeAsync.ts";

/**
 * @experimental `Decoder` is exported for experimental use.
 */
export { Decoder } from "./Decoder.ts";

/**
 * @experimental `Encoder` is exported for experimental use.
 */
export { Encoder } from "./Encoder.ts";

// Utilitiies for Extension Types:

export type {
  ExtensionCodec,
  ExtensionCodecType,
  ExtensionDecoderType,
  ExtensionEncoderType,
} from "./ExtensionCodec.ts";
export type { ExtData } from "./ExtData.ts";
export type {
  EXT_TIMESTAMP,
  encodeDateToTimeSpec,
  encodeTimeSpecToTimestamp,
  decodeTimestampToTimeSpec,
  encodeTimestampExtension,
  decodeTimestampExtension,
} from "./timestamp.ts";
