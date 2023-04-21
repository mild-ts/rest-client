import axios, { AxiosRequestConfig } from 'axios';
import { ExtractParamsFromRestURL, ExtractParamsFromURL } from './types';

type GetParams<WithMethod, T> = WithMethod extends true ? ExtractParamsFromRestURL<T> : ExtractParamsFromURL<T>;

export type RestClientRequestConfig<WithMethod = false, T = any> = {
  params: GetParams<WithMethod, T>;
};

export interface RestClientaxiosConfigs {
  /**
   * Axios Request Config
   */
  axiosConfig?: AxiosRequestConfig;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * REST API client
 * @ref Inspired API design by GitHub REST API client
 *
 * Inspire https://github.com/microsoft/typed-rest-client
 */

export class RestClient {
  private _rootAxiosConfig: AxiosRequestConfig;

  constructor(config?: RestClientaxiosConfigs) {
    this._rootAxiosConfig = config?.axiosConfig ?? {};
  }

  public async get<T extends string>(
    url: T,
    requestConfig: RestClientRequestConfig<false, T>,
    axiosConfig?: AxiosRequestConfig
  ) {
    return await this._parseRequest('GET', url, requestConfig, axiosConfig);
  }

  public async post<T extends string>(
    url: T,
    requestConfig: RestClientRequestConfig<false, T>,
    axiosConfig?: AxiosRequestConfig
  ) {
    return await this._parseRequest('POST', url, requestConfig, axiosConfig);
  }

  public async put<T extends string>(
    url: T,
    requestConfig: RestClientRequestConfig<false, T>,
    axiosConfig?: AxiosRequestConfig
  ) {
    return await this._parseRequest('PUT', url, requestConfig, axiosConfig);
  }

  public async delete<T extends string>(
    url: T,
    requestConfig: RestClientRequestConfig<false, T>,
    axiosConfig?: AxiosRequestConfig
  ) {
    return await this._parseRequest('DELETE', url, requestConfig, axiosConfig);
  }

  public async request<T extends string>(
    methodWithURL: T,
    requestConfig: RestClientRequestConfig<true, T>,
    axiosConfig?: AxiosRequestConfig
  ) {
    const { method, url } = this._parseRequestURL(methodWithURL);
    return this._parseRequest(method as HttpMethod, url, requestConfig, axiosConfig);
  }

  private async _parseRequest(
    method: HttpMethod,
    url: string,
    requestConfig: RestClientRequestConfig,
    axiosConfig?: AxiosRequestConfig
  ) {
    const urlWithParams = this._replaceParams(url, requestConfig.params);
    return await this._send(urlWithParams, method, axiosConfig);
  }

  private _parseRequestURL(methodWithURL: string) {
    const split = methodWithURL.split(' ');
    if (split.length !== 2) throw new Error(`Invalid methodWithURL: ${methodWithURL}`);
    const [method, url] = split;
    if (!['GET', 'POST', 'PUT', 'DELETE'].includes(method.toUpperCase())) throw new Error(`Invalid method: ${method}`);
    return { method, url };
  }

  private _replaceParams(url: string, params: RestClientRequestConfig['params']): string {
    for (const [key, value] of Object.entries(params)) {
      url = url.replace(`{${key}}`, value as string);
    }
    return url;
  }

  private async _send(url: string, method: string = 'get', axiosConfig?: AxiosRequestConfig) {
    return await axios.create().request({
      // Override with root axiosConfig
      ...this._rootAxiosConfig,
      // Override with custom axiosConfig
      ...axiosConfig,
      url,
      method,
    });
  }
}
