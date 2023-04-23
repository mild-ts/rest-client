import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';
import { RestClientAxiosConfigs, RestClientRequestConfig } from './types';
import { parseRequestURL, replaceParams } from './utils';

/**
 * REST API client
 * @ref Inspired API design by GitHub REST API client
 *
 * Inspire https://github.com/microsoft/typed-rest-client
 */

export class RestClient {
  protected _axiosInstance: AxiosInstance;
  protected _rootAxiosConfig: AxiosRequestConfig;

  constructor(config?: RestClientAxiosConfigs) {
    this._rootAxiosConfig = config?.axiosConfig ?? {};
    this._axiosInstance = config?.axiosInstance ?? axios.create();
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

  public async get<T extends string>(
    url: T,
    requestConfig?: RestClientRequestConfig<false, T>,
    axiosConfig?: AxiosRequestConfig
  ) {
    return await this._parseRequest('GET', url, requestConfig, axiosConfig);
  }

  /**
   * Make a request with POST method
   * @param url url
   * @param requestConfig Request config
   * @param axiosConfig Axios Request config
   * @returns AxiosResponse
   */
  public async post<T extends string>(
    url: T,
    requestConfig?: RestClientRequestConfig<false, T>,
    axiosConfig?: AxiosRequestConfig
  ) {
    return await this._parseRequest('POST', url, requestConfig, axiosConfig);
  }

  /**
   * Make a request with PUT method
   * @param url url
   * @param requestConfig Request config
   * @param axiosConfig Axios Request config
   * @returns AxiosResponse
   */
  public async put<T extends string>(
    url: T,
    requestConfig?: RestClientRequestConfig<false, T>,
    axiosConfig?: AxiosRequestConfig
  ) {
    return await this._parseRequest('PUT', url, requestConfig, axiosConfig);
  }

  /**
   * Make a request with PUT method
   * @param url url
   * @param requestConfig Request config
   * @param axiosConfig Axios Request config
   * @returns AxiosResponse
   */
  public async delete<T extends string>(
    url: T,
    requestConfig?: RestClientRequestConfig<false, T>,
    axiosConfig?: AxiosRequestConfig
  ) {
    return await this._parseRequest('DELETE', url, requestConfig, axiosConfig);
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
    requestConfig?: RestClientRequestConfig<true, T>,
    axiosConfig?: AxiosRequestConfig
  ) {
    const { method, url } = parseRequestURL(methodWithURL);
    return this._parseRequest(method, url, requestConfig, axiosConfig);
  }

  protected async _parseRequest(
    method: Method,
    url: string,
    requestConfig?: RestClientRequestConfig,
    axiosConfig?: AxiosRequestConfig
  ) {
    const urlWithParams = replaceParams(url, requestConfig?.params);
    return await this._send(urlWithParams, method, axiosConfig);
  }

  protected async _send(url: string, method: Method = 'get', axiosConfig?: AxiosRequestConfig) {
    return await this._axiosInstance.request<unknown>({
      // Override with root axiosConfig
      ...this._rootAxiosConfig,
      // Override with custom axiosConfig
      ...axiosConfig,
      url,
      method,
    });
  }
}
