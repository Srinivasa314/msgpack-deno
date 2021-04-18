import { assert, describe, it } from "./deps.ts";
import { decode, encode, ExtensionCodec } from "../mod.ts";

const extensionCodec = new ExtensionCodec();
extensionCodec.register({
  type: 0,
  encode: (input: unknown) => {
    if (typeof input === "bigint") {
      if (
        input <= Number.MAX_SAFE_INTEGER && input >= Number.MIN_SAFE_INTEGER
      ) {
        return encode(parseInt(input.toString(), 10));
      } else {
        return encode(input.toString());
      }
    } else {
      return null;
    }
  },
  decode: (data: Uint8Array) => {
    return BigInt(decode(data));
  },
});

describe("codec BigInt", () => {
  it("encodes and decodes 0n", () => {
    const value = BigInt(0);
    const encoded = encode(value, { extensionCodec });
    assert.deepStrictEqual(decode(encoded, { extensionCodec }), value);
  });

  it("encodes and decodes MAX_SAFE_INTEGER+1", () => {
    const value = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1);
    const encoded = encode(value, { extensionCodec });
    assert.deepStrictEqual(decode(encoded, { extensionCodec }), value);
  });

  it("encodes and decodes MIN_SAFE_INTEGER-1", () => {
    const value = BigInt(Number.MIN_SAFE_INTEGER) - BigInt(1);
    const encoded = encode(value, { extensionCodec });
    assert.deepStrictEqual(decode(encoded, { extensionCodec }), value);
  });
});
