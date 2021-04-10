import { assertEquals } from "https://deno.land/std@0.68.0/testing/asserts.ts";

import { decodeStream, encode } from "../mod.ts";

Deno.test("Test whether decodeStream properly handles complete data", async () => {
  const reader = new Deno.Buffer(encode("0123456789"));
  const stream = Deno.iter(reader, { bufSize: 10 });
  const result = await consumeAll(decodeStream(stream));
  assertEquals(result, ["0123456789"]);
});

Deno.test("Test whether decodeStream properly handles incomplete data", async () => {
  const reader = new Deno.Buffer(encode("0123456789"));
  const stream = Deno.iter(reader, { bufSize: 8 });
  const result = await consumeAll(decodeStream(stream));
  assertEquals(result, ["0123456789"]);
});

async function consumeAll<T>(it: AsyncIterable<T>): Promise<T[]> {
  const result = [];
  for await (const item of it) {
    result.push(item);
  }
  return result;
}
