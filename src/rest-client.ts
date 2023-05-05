import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';
import { RestClientAxiosConfigs, RestClientRequestConfig, AcceptedParser } from './types';
import { parseRequestURL, replaceParams } from './utils';

interface CreateOption<T> {
  url: T;
  method: Method;
  axiosConfig?: AxiosRequestConfig;
}

/**
 * REST API client
 * @ref Inspired API design by GitHub REST API client
 *
 * Inspire https://github.com/microsoft/typed-rest-client
 */

export class RestClient {
  protected axiosInstance: AxiosInstance;
  protected rootAxiosConfig: AxiosRequestConfig;

  constructor(config?: RestClientAxiosConfigs) {
    this.rootAxiosConfig = config?.axiosConfig ?? {};
    this.axiosInstance = config?.axiosInstance ?? axios.create();
  }

  /**
   * Make a request with GET method
   *
   * @example
   *
   * const res = await client.get('https://domain.com/posts/{postId}', {
      params: {
        postId: 1,
      },
    });
    console.log(res.data);
   *
   * @param url url
   * @param requestConfig Request config
   * @param axiosConfig Axios Request config
   * @returns AxiosResponse
   */

  public async get<T extends string>(url: T, requestConfig?: RestClientRequestConfig<false, T>) {
    return await this.parseRequest('GET', url, requestConfig, requestConfig?.axiosConfig);
  }

  /**
   * Make a request with POST method
   * @param url url
   * @param requestConfig Request config
   * @param axiosConfig Axios Request config
   * @returns AxiosResponse
   */
  public async post<T extends string>(url: T, requestConfig?: RestClientRequestConfig<false, T>) {
    return await this.parseRequest('POST', url, requestConfig, requestConfig?.axiosConfig);
  }

  /**
   * Make a request with PUT method
   * @param url url
   * @param requestConfig Request config
   * @param axiosConfig Axios Request config
   * @returns AxiosResponse
   */
  public async put<T extends string>(url: T, requestConfig?: RestClientRequestConfig<false, T>) {
    return await this.parseRequest('PUT', url, requestConfig, requestConfig?.axiosConfig);
  }

  /**
   * Make a request with PUT method
   * @param url url
   * @param requestConfig Request config
   * @param axiosConfig Axios Request config
   * @returns AxiosResponse
   */
  public async delete<T extends string>(url: T, requestConfig?: RestClientRequestConfig<false, T>) {
    return await this.parseRequest('DELETE', url, requestConfig, requestConfig?.axiosConfig);
  }

  /**
   * Make a request with method and url
   * @example
   *
   * const res = await client.request('GET https://domain.com/posts/{postId}', {
      params: {
        postId: 1
      },
    });
    console.log(res.data);

   * @param methodWithURL Method and URL
   * @param requestConfig Request config
   * @param axiosConfig Axios Request config
   * @returns AxiosResponse
   */

  public async request<T extends `${Method} ${string}`>(
    methodWithURL: T,
    requestConfig?: RestClientRequestConfig<true, T>
  ) {
    const { method, url } = parseRequestURL(methodWithURL);
    return this.parseRequest(method, url, requestConfig, requestConfig?.axiosConfig);
  }

  protected async parseRequest(
    method: Method,
    url: string,
    requestConfig?: RestClientRequestConfig,
    axiosConfig?: AxiosRequestConfig
  ) {
    const urlWithParams = replaceParams(url, requestConfig?.params);
    return await this.send(urlWithParams, method, axiosConfig);
  }

  protected async send(url: string, method: Method = 'get', axiosConfig?: AxiosRequestConfig) {
    return await this.axiosInstance.request<unknown>({
      // Override with root axiosConfig
      ...this.rootAxiosConfig,
      // Override with custom axiosConfig
      ...axiosConfig,
      url,
      method,
    });
  }

  public create<T extends string>(option: CreateOption<T>) {
    return this.setupRequest<T>(option.url, option.method);
  }

  public createRequest<T extends `${Method} ${string}`>(
    methodWithURL: T,
    axiosConfig?: AxiosRequestConfig
  ) {
    const { method, url } = parseRequestURL(methodWithURL);
    return this.setupRequest<T>(url, method);
  }

  protected setupRequest<T>(url: string, method: Method) {
    return {
      input: (parser?: AcceptedParser<any>) => {
        return this.setupRequest<T>(url, method);
      },
      output: (parser?: AcceptedParser<any>) => {
        return this.setupRequest<T>(url, method);
      },
      send: (requestConfig?: RestClientRequestConfig<false, T>) => {
        return this.parseRequest(method, url, requestConfig, {});
      },
    };
  }

  public createGet(...data: any[]) {}
}


