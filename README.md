# @mild-ts/rest-client

Opinionated TypeScript Utility Libraries [@mild-ts](https://github.com/mildronize/mild-ts)

[![CI](https://github.com/mild-ts/rest-client/actions/workflows/main.yml/badge.svg)](https://github.com/mild-ts/rest-client/actions/workflows/main.yml) [![](https://img.shields.io/npm/v/@mild-ts/rest-client)](https://www.npmjs.com/package/@mild-ts/rest-client)

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
