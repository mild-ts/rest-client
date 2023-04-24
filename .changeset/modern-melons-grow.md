---
'@mild-ts/rest-client': minor
---

- Move `axiosConfig` to inside `requestConfig`.

    ```ts
    const res = await client.request('GET https://jsonplaceholder.typicode.com/posts/{postId}/comments', {
        params: {
            postId: 1,
        },
        axiosConfig: {
            headers: {
                'X-Custom-Header': 'foobar'
            }
        }
    });
    ```

- Support Express-like path params (#11) 

    ```ts
    const res = await client.request('GET https://jsonplaceholder.typicode.com/posts/:postId/comments', {
        params: {
            postId: 1,
        },
    );
    ```

