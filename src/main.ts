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
    const { method, url } = parseRequestURL(methodWithURL);
    return this._parseRequest(method, url, requestConfig, axiosConfig);
  }

  protected async _parseRequest(
    method: Method,
    url: string,
    requestConfig: RestClientRequestConfig,
    axiosConfig?: AxiosRequestConfig
  ) {
    const urlWithParams = replaceParams(url, requestConfig.params);
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
