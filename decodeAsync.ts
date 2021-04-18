import { Decoder } from "./Decoder.ts";
import { DecodeOptions, defaultDecodeOptions } from "./decode.ts";
import { ensureAsyncIterabe, ReadableStreamLike } from "./utils/stream.ts";
import { SplitUndefined } from "./context.ts";

export function decodeAsync<ContextType>(
  streamLike:
    | ReadableStreamLike<ArrayLike<number>>
    | AsyncGenerator<ArrayLike<number> | BufferSource, void, unknown>,
  options: DecodeOptions<SplitUndefined<ContextType>> =
    // deno-lint-ignore no-explicit-any
    defaultDecodeOptions as any,
): Promise<unknown> {
  const stream = ensureAsyncIterabe(streamLike);

  const decoder = new Decoder<ContextType>(
    options.extensionCodec,
    // deno-lint-ignore no-explicit-any
    (options as typeof options & { context: any }).context,
    options.maxStrLength,
    options.maxBinLength,
    options.maxArrayLength,
    options.maxMapLength,
    options.maxExtLength,
  );
  return decoder.decodeAsync(stream);
}

export function decodeArrayStream<ContextType>(
  streamLike: ReadableStreamLike<ArrayLike<number>>,
  options: DecodeOptions<SplitUndefined<ContextType>> =
    // deno-lint-ignore no-explicit-any
    defaultDecodeOptions as any,
) {
  const stream = ensureAsyncIterabe(streamLike);

  const decoder = new Decoder<ContextType>(
    options.extensionCodec,
    // deno-lint-ignore no-explicit-any
    (options as typeof options & { context: any }).context,
    options.maxStrLength,
    options.maxBinLength,
    options.maxArrayLength,
    options.maxMapLength,
    options.maxExtLength,
  );

  return decoder.decodeArrayStream(stream);
}

export function decodeStream<ContextType>(
  streamLike: ReadableStreamLike<ArrayLike<number>>,
  options: DecodeOptions<SplitUndefined<ContextType>> =
    // deno-lint-ignore no-explicit-any
    defaultDecodeOptions as any,
) {
  const stream = ensureAsyncIterabe(streamLike);

  const decoder = new Decoder<ContextType>(
    options.extensionCodec,
    // deno-lint-ignore no-explicit-any
    (options as typeof options & { context: any }).context,
    options.maxStrLength,
    options.maxBinLength,
    options.maxArrayLength,
    options.maxMapLength,
    options.maxExtLength,
  );

  return decoder.decodeStream(stream);
}
