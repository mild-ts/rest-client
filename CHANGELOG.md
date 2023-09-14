# @mild-ts/rest-client

## 0.5.0

### Minor Changes

- fe40d47: Support Params with Query String

## 0.4.1

### Patch Changes

- a19c578: Migrate to new npm org `thaitype`

## 0.4.0

### Minor Changes

- 0fe184c: - Move `axiosConfig` to inside `requestConfig`.

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

## 0.3.0

### Minor Changes

- 1fb5ee0: change naming convetion for private prop to without underscore

## 0.2.1

### Patch Changes

- 5f4540f: fix: correct package.json repo

## 0.2.0

### Minor Changes

- 4f69b47: config RestClientRequestConfig can be undefined

## 0.1.8

### Patch Changes

- 652fd06: Export util functions

## 0.1.7

### Patch Changes

- ab74d5d: export type

## 0.1.6

### Patch Changes

- e53e14b: Fix: publish dist

## 0.1.2

### Patch Changes

- 9e833a2: Fix type params in URI (RestClient.request)

## 0.1.1

### Patch Changes

- a717ea3: Fix Example in Readme

## 0.1.0

### Minor Changes

- edc0fbc: First Release
