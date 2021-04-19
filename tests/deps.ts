import * as assert from "https://deno.land/std@0.93.0/node/assert.ts";

export { assertEquals } from "https://deno.land/std@0.93.0/testing/asserts.ts";
export * as assert from "https://deno.land/std@0.93.0/node/assert.ts";
export * as util from "https://deno.land/std@0.93.0/node/util.ts";
export * as buffer from "https://deno.land/std@0.93.0/node/buffer.ts";
export * as io from "https://deno.land/std@0.93.0/io/mod.ts";
export * as ieee754 from "https://deno.land/x/ieee754@v1.0.0/mod.ts";

export { expect } from "https://deno.land/x/expect@v0.2.6/mod.ts";

const currentScopes: string[] = [];

export function describe(name: string, fn: () => void): void {
  currentScopes.push(name);
  fn();
  currentScopes.pop();
}

export function it(name: string, fn: () => void): void {
  const fullName = [...currentScopes, name].join(" > ");
  Deno.test(fullName, fn);
}

export const context = it;

type ThrowsError = Parameters<typeof assert.throws>[1];
type ThrowsMessage = Parameters<typeof assert.throws>[2];
export async function assertRejects(
  asyncFn: () => Promise<void>,
  error?: ThrowsError,
  message?: ThrowsMessage,
): Promise<void> {
  try {
    await asyncFn();
  } catch (e) {
    assert.throws(
      () => {
        throw e;
      },
      error,
      message,
    );
  }
}
