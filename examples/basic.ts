import client, { RestClient } from '../src/main';

async function main() {
  const client = new RestClient();
  const res = await client.request('GET https://jsonplaceholder.typicode.com/posts/{postId}/comments', {
    params: {
      postId: 1,
    },
  });
  console.log(res.data);

  const res2 = await client.get('https://jsonplaceholder.typicode.com/posts/{postId}/comments', {
    params: {
      postId: 1,
    },
  });
  console.log(res2.data);

  const res3 = await client.get('https://jsonplaceholder.typicode.com/posts/1/comments');

  const tmp = client
    .createRequest('GET https://jsonplaceholder.typicode.com/posts/{postId}/comments', {
      params: {
        postId: 1,
      }
    })
    .input(z.string())
    .output(z.string())
    .send();

        // .params({
    //   postId: '1',
    //   // subscriptionId: '29523625-6fa5-4d9a-86bc-da000544be7d',
    //   // resourceGroupName: 'rg-thadaw-demo-multi-app',
    //   // name: 'thadaw-demo-multi-app-ant',
    // })
    //query string or post body

  client.createGet('https://jsonplaceholder.typicode.com/posts/{postId}/comments');

  console.log(res3.data);
}

main();
