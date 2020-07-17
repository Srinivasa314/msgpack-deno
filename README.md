# msgpack-deno
[msgpack-javascript](https://github.com/msgpack/msgpack-javascript) ported to Deno.

## Example

```typescript
import { encode, decode } from 'https://deno.land/x/msgpack@1.0/mod.ts';

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

const encoded: Uint8Array = encode(object);
console.log(decode(encoded))

```
