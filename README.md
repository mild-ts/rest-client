# @mild-ts/rest-client

Lightweight REST client helper function wrapping with type and [Axios](https://github.com/axios/axios)

[![CI](https://github.com/mild-ts/rest-client/actions/workflows/main.yml/badge.svg)](https://github.com/mild-ts/rest-client/actions/workflows/main.yml) [![](https://img.shields.io/npm/v/@mild-ts/rest-client)](https://www.npmjs.com/package/@mild-ts/rest-client) [![](https://img.shields.io/npm/dt/@mild-ts/rest-client)](https://www.npmjs.com/package/@mild-ts/rest-client) 

## Introduction

Lightweight REST client helper function with basic type support and [Axios](https://github.com/axios/axios) wrapper. However, if you need more type-safety, we recommend considering [untypeable](https://github.com/total-typescript/untypeable). 

Alternatively, if you have control over both the server and client types, options like [tRPC](https://trpc.io/) or [GraphQL](https://graphql.org/) are great choices. So go ahead and choose the option that works best for your needs!

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

## Use with Axios Retry

```ts
import { RestClient } from '@mild-ts/rest-client';
import axios from 'axios';
import axiosRetry from 'axios-retry';

// Create an an axios instance and apply axiosRetry
const axiosInstance = axios.create();
axiosRetry(axiosInstance, { retries: 3 });

// Using axiosInstance in RestClient
const client = new RestClient({
  axiosInstance,
});
// This will retry 3 times
await client.request('GET http://domain.com');
```

# API

to be add later