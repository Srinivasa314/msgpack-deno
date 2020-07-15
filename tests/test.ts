import {
	assertEquals
} from "https://deno.land/std/testing/asserts.ts";

import { encode, decode } from "../mod.ts"

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
