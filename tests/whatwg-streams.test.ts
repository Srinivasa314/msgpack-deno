import { assert, describe, it } from "./deps.ts";
import { decodeArrayStream, decodeAsync, encode } from "../mod.ts";

// Downgrade stream not to implement AsycIterable<T>
function downgradeReadableStream(stream: ReadableStream) {
  // deno-lint-ignore no-explicit-any
  (stream as any)[Symbol.asyncIterator] = undefined;
}

describe("whatwg streams", () => {
  it("decodeArrayStream", async () => {
    const data = [1, 2, 3];
    const encoded = encode(data);
    const stream = new ReadableStream({
      // deno-lint-ignore no-explicit-any
      start(controller: any) {
        for (const byte of encoded) {
          controller.enqueue([byte]);
        }
        controller.close();
      },
    });
    downgradeReadableStream(stream);

    const items: Array<unknown> = [];
    for await (const item of decodeArrayStream(stream)) {
      items.push(item);
    }
    assert.deepStrictEqual(items, data);
  });

  it("decodeAsync", async () => {
    const data = [1, 2, 3];
    const encoded = encode(data);
    const stream = new ReadableStream({
      // deno-lint-ignore no-explicit-any
      start(controller: any) {
        for (const byte of encoded) {
          controller.enqueue([byte]);
        }
        controller.close();
      },
    });
    downgradeReadableStream(stream);

    assert.deepStrictEqual(await decodeAsync(stream), data);
  });
});
