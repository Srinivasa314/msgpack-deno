import { assert, context, describe, ieee754, it } from "./deps.ts";
import { decode } from "../mod.ts";

const FLOAT32_TYPE = 0xca;
const FLOAT64_TYPE = 0xcb;

const SPECS = {
  POSITIVE_ZERO: +0.0,
  NEGATIVE_ZERO: -0.0,
  POSITIVE_INFINITY: Number.POSITIVE_INFINITY,
  NEGATIVE_INFINITY: Number.NEGATIVE_INFINITY,

  POSITIVE_VALUE_1: +0.1,
  POSITIVE_VALUE_2: +42,
  POSITIVE_VALUE_3: +Math.PI,
  POSITIVE_VALUE_4: +Math.E,
  NEGATIVE_VALUE_1: -0.1,
  NEGATIVE_VALUE_2: -42,
  NEGATIVE_VALUE_3: -Math.PI,
  NEGATIVE_VALUE_4: -Math.E,

  MAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER,
  MIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER,

  MAX_VALUE: Number.MAX_VALUE,
  MIN_VALUE: Number.MIN_VALUE,
} as Record<string, number>;

describe("codec: float 32/64", () => {
  context("float 32", () => {
    for (const name of Object.keys(SPECS)) {
      const value = SPECS[name];

      it(`decodes ${name} (${value})`, () => {
        const buf: Array<number> = [];
        // deno-lint-ignore no-explicit-any
        ieee754.write(buf as any, value, 0, false, 23, 4);
        // deno-lint-ignore no-explicit-any
        const expected = ieee754.read(buf as any, 0, false, 23, 4);

        assert.deepStrictEqual(
          decode([FLOAT32_TYPE, ...buf]),
          expected,
          "matched sign",
        );
        assert.notDeepStrictEqual(
          decode([FLOAT32_TYPE, ...buf]),
          -expected,
          "unmatched sign",
        );
      });
    }

    it(`decodes NaN`, () => {
      const buf: Array<number> = [];
      // deno-lint-ignore no-explicit-any
      ieee754.write(buf as any, NaN, 0, false, 23, 4);
      // deno-lint-ignore no-explicit-any
      const expected = ieee754.read(buf as any, 0, false, 23, 4);

      assert.deepStrictEqual(
        decode([FLOAT32_TYPE, ...buf]),
        expected,
        "matched sign",
      );
    });
  });

  context("float 64", () => {
    for (const name of Object.keys(SPECS)) {
      const value = SPECS[name];

      it(`decodes ${name} (${value})`, () => {
        const buf: Array<number> = [];
        // deno-lint-ignore no-explicit-any
        ieee754.write(buf as any, value, 0, false, 52, 8);
        // deno-lint-ignore no-explicit-any
        const expected = ieee754.read(buf as any, 0, false, 52, 8);

        assert.deepStrictEqual(
          decode([FLOAT64_TYPE, ...buf]),
          expected,
          "matched sign",
        );
        assert.notDeepStrictEqual(
          decode([FLOAT64_TYPE, ...buf]),
          -expected,
          "unmatched sign",
        );
      });
    }

    it(`decodes NaN`, () => {
      const buf: Array<number> = [];
      // deno-lint-ignore no-explicit-any
      ieee754.write(buf as any, NaN, 0, false, 52, 8);
      // deno-lint-ignore no-explicit-any
      const expected = ieee754.read(buf as any, 0, false, 52, 8);

      assert.deepStrictEqual(
        decode([FLOAT64_TYPE, ...buf]),
        expected,
        "matched sign",
      );
    });
  });
});
