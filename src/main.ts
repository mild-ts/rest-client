import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';
import { ExtractParamsFromRestURL, ExtractParamsFromURL } from './types';

type GetParams<WithMethod, T> = WithMethod extends true ? ExtractParamsFromRestURL<T> : ExtractParamsFromURL<T>;

export type RestClientRequestConfig<WithMethod = false, T = any> = {
  params: GetParams<WithMethod, T>;
};

export interface RestClientAxiosConfigs {
  /**
   * Add your own axios instance
   *
   * @default axios.create()
   */
  axiosInstance?: AxiosInstance;
  /**
   * Add your own default axios config
   *
   * @default {}
   */
  axiosConfig?: AxiosRequestConfig;
}

/**
 * REST API client
 * @ref Inspired API design by GitHub REST API client
 *
 * Inspire https://github.com/microsoft/typed-rest-client
 */

export class RestClient {
  private _axiosInstance: AxiosInstance;
  private _rootAxiosConfig: AxiosRequestConfig;

  constructor(config?: RestClientAxiosConfigs) {
    this._rootAxiosConfig = config?.axiosConfig ?? {};
    this._axiosInstance = config?.axiosInstance ?? axios.create();
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
    methodWithURL: `${Method} ${string}`,
    requestConfig: RestClientRequestConfig<true, T>,
    axiosConfig?: AxiosRequestConfig
  ) {
    const { method, url } = this._parseRequestURL(methodWithURL);
    return this._parseRequest(method, url, requestConfig, axiosConfig);
  }

  private async _parseRequest(
    method: Method,
    url: string,
    requestConfig: RestClientRequestConfig,
    axiosConfig?: AxiosRequestConfig
  ) {
    const urlWithParams = this._replaceParams(url, requestConfig.params);
    return await this._send(urlWithParams, method, axiosConfig);
  }

  private _isMethod(method: string): method is Method {
    return ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH', 'PURGE', 'LINK', 'UNLINK'].includes(
      method.toUpperCase()
    );
  }

  private _parseRequestURL(methodWithURL: string) {
    const split = methodWithURL.split(' ');
    if (split.length !== 2) throw new Error(`Invalid methodWithURL: ${methodWithURL}`);
    const [method, url] = split;
    if (!this._isMethod(method)) throw new Error(`Invalid method: ${method}`);
    return { method, url };
  }

  private _replaceParams(url: string, params: RestClientRequestConfig['params']): string {
    for (const [key, value] of Object.entries(params)) {
      url = url.replace(`{${key}}`, value as string);
    }
    return url;
  }

  private async _send(url: string, method: Method = 'get', axiosConfig?: AxiosRequestConfig) {
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
