import { assert, assertRejects, describe, it } from "./deps.ts";
import { decodeArrayStream, encode } from "../mod.ts";

describe("decodeArrayStream", () => {
  const generateSampleObject = () => {
    return {
      id: Math.random(),
      name: "test",
    };
  };

  // deno-lint-ignore no-explicit-any
  const createStream = async function* (object: any) {
    for (const byte of encode(object)) {
      yield [byte];
    }
  };

  it("decodes numbers array (array8)", async () => {
    const object = [1, 2, 3, 4, 5];

    const result: Array<unknown> = [];

    for await (const item of decodeArrayStream(createStream(object))) {
      result.push(item);
    }

    assert.deepStrictEqual(object, result);
  });

  it("decodes numbers of array (array16)", async () => {
    const createStream = async function* () {
      yield [0xdc, 0, 3];
      yield encode(1);
      yield encode(2);
      yield encode(3);
    };

    const result: Array<unknown> = [];

    for await (const item of decodeArrayStream(createStream())) {
      result.push(item);
    }

    assert.deepStrictEqual(result, [1, 2, 3]);
  });

  it("decodes numbers of array (array32)", async () => {
    const createStream = async function* () {
      yield [0xdd, 0, 0, 0, 3];
      yield encode(1);
      yield encode(2);
      yield encode(3);
    };

    const result: Array<unknown> = [];

    for await (const item of decodeArrayStream(createStream())) {
      result.push(item);
    }

    assert.deepStrictEqual(result, [1, 2, 3]);
  });

  it("decodes objects array", async () => {
    // deno-lint-ignore no-explicit-any
    const objectsArrays: Array<any> = [];

    for (let i = 0; i < 10; i++) {
      objectsArrays.push(generateSampleObject());
    }

    const result: Array<unknown> = [];

    for await (const item of decodeArrayStream(createStream(objectsArrays))) {
      result.push(item);
    }

    assert.deepStrictEqual(objectsArrays, result);
  });

  it("fails for non array input", async () => {
    const object = "demo";

    await assertRejects(async () => {
      const result: Array<unknown> = [];

      for await (const item of decodeArrayStream(createStream(object))) {
        result.push(item);
      }
    }, /.*Unrecognized array type byte:.*/i);
  });
});
