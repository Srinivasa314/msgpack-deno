import { ExtensionCodecType } from "./ExtensionCodec.ts";
import { Encoder } from "./Encoder.ts";
import { ContextOf, SplitUndefined } from "./context.ts";

export type EncodeOptions<ContextType = undefined> =
  & Partial<
    Readonly<{
      extensionCodec: ExtensionCodecType<ContextType>;
      maxDepth: number;
      initialBufferSize: number;
      sortKeys: boolean;

      /**
     * If `true`, non-integer numbers are encoded in float32, not in float64 (the default).
     *
     * Only use it if precisions don't matter.
     */
      forceFloat32: boolean;

      /**
     * If `true`, an object property with `undefined` value are ignored.
     * e.g. `{ foo: undefined }` will be encoded as `{}`, as `JSON.stringify()` does.
     *
     * The default is `false`. Note that it needs more time to encode.
     */
      ignoreUndefined: boolean;
    }>
  >
  & ContextOf<ContextType>;

const defaultEncodeOptions: EncodeOptions = {};

/**
 * It encodes `value` in the MessagePack format and
 * returns a byte buffer.
 *
 * The returned buffer is a slice of a larger `ArrayBuffer`, so you have to use its `#byteOffset` and `#byteLength` in order to convert it to another typed arrays including NodeJS `Buffer`.
 */
export function encode<ContextType>(
  value: unknown,
  options: EncodeOptions<SplitUndefined<ContextType>> =
    // deno-lint-ignore no-explicit-any
    defaultEncodeOptions as any,
): Uint8Array {
  const encoder = new Encoder<ContextType>(
    options.extensionCodec,
    // deno-lint-ignore no-explicit-any
    (options as typeof options & { context: any }).context,
    options.maxDepth,
    options.initialBufferSize,
    options.sortKeys,
    options.forceFloat32,
    options.ignoreUndefined,
  );
  return encoder.encode(value);
}
