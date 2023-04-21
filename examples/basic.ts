import { RestClient } from '../src/main';

async function main() {
  const client = new RestClient();
  const res = await client.request('GET https://jsonplaceholder.typicode.com/posts/{postId}/comments', {
    postId: '1',
  });
  console.log(res.data);
}

main();
