import { assert, context, describe, it } from "./deps.ts";
import { decode, encode } from "../mod.ts";

describe("README", () => {
  context("## Synopsis", () => {
    it("runs", () => {
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

      const encoded = encode(object);
      // encoded is an Uint8Array instance

      assert.deepStrictEqual(decode(encoded), object);
    });
  });
});
