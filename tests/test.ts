import { assertEquals } from "./deps.ts";
import { decode, encode } from "../mod.ts";

// deno-lint-ignore no-explicit-any
function test(obj: any) {
  assertEquals(obj, decode(encode(obj)));
}

Deno.test("Test encode/decode", () => {
  test(5);
  test("hello");
  test({ foo: "hello" });
  test(8.9);
  test([1, 2, [3]]);
});
