import { RestClient } from '../src/main';

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
    }
  });
  console.log(res2.data);

  const res3 = await client.get('https://jsonplaceholder.typicode.com/posts/{postId}/comments', {
    params: {
      postId: 1,
    }
  });
  console.log(res3.data);
}

main();
