// function setupRequest<T>(url: string, metho) {
//     return {
//       params: (params: RestClientRequestConfig<false, T>['params']) => {
//         return this.setupRequest<T>(url, method);
//       },
//       input: (...data: any[]) => {
//         return this.setupRequest<T>(url, method);
//       },
//       output: (...data: any[]) => {
//         return this.setupRequest<T>(url, method);
//       },
//       send: (axiosConfig?: AxiosRequestConfig) => {
//         return this.parseRequest(method, url, {}, axiosConfig);
//       },
//     };
//   }

const t = {
    createRequest: (url: string, ...data: any[]) => {
        return 
    },
};

function createClient(router: any) {
  return {
    get: (url: string) => {
      router.get(url);
    },
  };
}

async function main() {
  const client = t.createRequest('GET https://jsonplaceholder.typicode.com/posts/1/comments')
    .input()
    .output();
  //   createClient(router).;
}
