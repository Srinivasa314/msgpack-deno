import { assert, describe, it } from "./deps.ts";
import { decode, decodeAsync, encode } from "../mod.ts";

describe("Blob", () => {
  it("decodes it with `decode()`", async function () {
    const blob = new Blob([encode("Hello!")]);
    assert.deepStrictEqual(decode(await blob.arrayBuffer()), "Hello!");
  });

  it("decodes it with `decodeAsync()`", async function () {
    const blob = new Blob([encode("Hello!")]);
    assert.deepStrictEqual(await decodeAsync(blob.stream()), "Hello!");
  });
});
