# @mild-ts/rest-client

Opinionated TypeScript Utility Libraries [@mild-ts](https://github.com/mildronize/mild-ts)

## Installation
```
npm i @mild-ts/rest-client
```

### Examples
```ts
import { RestClient } from '@mild-ts/rest-client';

async function main() {
  const client = new RestClient();
  const res = await client.request('GET https://jsonplaceholder.typicode.com/posts/{postId}/comments', {
    params: {
      postId: 1,
    },
  });
  console.log(res.data);
}

main();
```