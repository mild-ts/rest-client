import client, { RestClient } from '../src/main';
import { z } from 'zod';

async function main() {
  const client = new RestClient();
  const res = await client.request('GET https://jsonplaceholder.typicode.com/posts/{postId}/comments', {
    params: {
      postId: 1,
    },
  });
  console.log(res.data);

  const res2 = await client.request('GET https://jsonplaceholder.typicode.com/posts/:postId/comments', {
    params: {
      postId: 1,
    },
  });
  console.log(res2.data);

  const res3 = await client.get('https://jsonplaceholder.typicode.com/posts/1/comments');

  const tmp = await client
    .createRequest('GET https://jsonplaceholder.typicode.com/posts/{postId}/comments', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .input(z.string())
    .output(
      z.object({
        id: z.number(),
        title: z.string(),
      })
    )
    .send({
      params: {
        postId: 1,
      },
      // AxiosRequestConfig.data
      input: 'hello',
      // queries
      queries: {
        id: '1',
      },
    });

  console.log(res3.data);
}

main();
