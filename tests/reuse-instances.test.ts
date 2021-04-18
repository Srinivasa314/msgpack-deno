import { assert, context, describe, it } from "./deps.ts";
import { Decoder, Encoder } from "../mod.ts";

// deno-lint-ignore no-explicit-any
const createStream = async function* (...args: any) {
  for (const item of args) {
    yield item;
  }
};

describe("shared instances", () => {
  context("encode() and decodeSync()", () => {
    const encoder = new Encoder();
    const decoder = new Decoder();

    it("runs #1", () => {
      const object = {
        nil: null,
        integer: 1,
        float: Math.PI,
        string: "Hello, world!",
        binary: Uint8Array.from([1, 2, 3]),
        array: [10, 20, 30],
        map: { foo: "bar" },
        timestampExt: new Date(),
      };

      const encoded: Uint8Array = encoder.encode(object);
      assert.deepStrictEqual(decoder.decode(encoded), object);
    });

    it("runs #2", () => {
      const object = {
        nil: null,
        integer: 1,
        float: Math.PI,
        string: "Hello, world!",
        binary: Uint8Array.from([1, 2, 3]),
        array: [10, 20, 30],
        map: { foo: "bar" },
        timestampExt: new Date(),
      };

      const encoded: Uint8Array = encoder.encode(object);
      assert.deepStrictEqual(decoder.decode(encoded), object);
    });
  });

  context("encode() and decodeAsync()", () => {
    const encoder = new Encoder();
    const decoder = new Decoder();

    it("runs #1", async () => {
      const object = {
        nil: null,
        integer: 1,
        float: Math.PI,
        string: "Hello, world!",
        binary: Uint8Array.from([1, 2, 3]),
        array: [10, 20, 30],
        map: { foo: "bar" },
        timestampExt: new Date(),
      };

      const encoded: Uint8Array = encoder.encode(object);
      assert.deepStrictEqual(
        await decoder.decodeAsync(createStream(encoded)),
        object,
      );
    });

    it("runs #2", async () => {
      const object = {
        nil: null,
        integer: 1,
        float: Math.PI,
        string: "Hello, world!",
        binary: Uint8Array.from([1, 2, 3]),
        array: [10, 20, 30],
        map: { foo: "bar" },
        timestampExt: new Date(),
      };

      const encoded: Uint8Array = encoder.encode(object);
      assert.deepStrictEqual(
        await decoder.decodeAsync(createStream(encoded)),
        object,
      );
    });
  });

  context("encode() and decodeStream()", () => {
    const encoder = new Encoder();
    const decoder = new Decoder();

    it("runs #1", async () => {
      const object = {
        nil: null,
        integer: 1,
        float: Math.PI,
        string: "Hello, world!",
        binary: Uint8Array.from([1, 2, 3]),
        array: [10, 20, 30],
        map: { foo: "bar" },
        timestampExt: new Date(),
      };

      const encoded: Uint8Array = encoder.encode(object);
      // deno-lint-ignore no-explicit-any
      const a: Array<any> = [];
      for await (const item of decoder.decodeStream(createStream(encoded))) {
        a.push(item);
      }
      assert.deepStrictEqual(a, [object]);
    });

    it("runs #2", async () => {
      const object = {
        nil: null,
        integer: 1,
        float: Math.PI,
        string: "Hello, world!",
        binary: Uint8Array.from([1, 2, 3]),
        array: [10, 20, 30],
        map: { foo: "bar" },
        timestampExt: new Date(),
      };

      const encoded: Uint8Array = encoder.encode(object);
      // deno-lint-ignore no-explicit-any
      const a: Array<any> = [];
      for await (const item of decoder.decodeStream(createStream(encoded))) {
        a.push(item);
      }
      assert.deepStrictEqual(a, [object]);
    });
  });

  context("encode() and decodeArrayStream()", () => {
    const encoder = new Encoder();
    const decoder = new Decoder();

    it("runs #1", async () => {
      const object = {
        nil: null,
        integer: 1,
        float: Math.PI,
        string: "Hello, world!",
        binary: Uint8Array.from([1, 2, 3]),
        array: [10, 20, 30],
        map: { foo: "bar" },
        timestampExt: new Date(),
      };

      const encoded: Uint8Array = encoder.encode([object]);
      // deno-lint-ignore no-explicit-any
      const a: Array<any> = [];
      for await (const item of decoder.decodeStream(createStream(encoded))) {
        a.push(item);
      }
      assert.deepStrictEqual(a, [[object]]);
    });

    it("runs #2", async () => {
      const object = {
        nil: null,
        integer: 1,
        float: Math.PI,
        string: "Hello, world!",
        binary: Uint8Array.from([1, 2, 3]),
        array: [10, 20, 30],
        map: { foo: "bar" },
        timestampExt: new Date(),
      };

      const encoded: Uint8Array = encoder.encode([object]);
      // deno-lint-ignore no-explicit-any
      const a: Array<any> = [];
      for await (const item of decoder.decodeStream(createStream(encoded))) {
        a.push(item);
      }
      assert.deepStrictEqual(a, [[object]]);
    });
  });
});
