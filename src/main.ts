import axios, { AxiosRequestConfig } from 'axios';

export interface RestClientOptions {
  /**
   * Axios Request time out, default: 60 minutes
   */
  requestTimeout?: number;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * REST API client
 * @ref Inspired API design by GitHub REST API client
 *
 * Inspire https://github.com/microsoft/typed-rest-client
 */

export class RestClient {
  private _timeout: number;

  constructor(private _option?: RestClientOptions) {
    this._timeout = _option?.requestTimeout ?? 60 * 60 * 1000;
  }

  public async get(url: string, uriParams: Record<string, string>, option?: AxiosRequestConfig) {
    return await this._parseRequest('GET', url, uriParams, option);
  }

  public async post(url: string, uriParams: Record<string, string>, option?: AxiosRequestConfig) {
    return await this._parseRequest('POST', url, uriParams, option);
  }

  public async put(url: string, uriParams: Record<string, string>, option?: AxiosRequestConfig) {
    return await this._parseRequest('PUT', url, uriParams, option);
  }

  public async delete(url: string, uriParams: Record<string, string>, option?: AxiosRequestConfig) {
    return await this._parseRequest('DELETE', url, uriParams, option);
  }

  public async request(methodWithURL: string, uriParams: Record<string, string>, option?: AxiosRequestConfig) {
    const { method, url } = this._parseRequestURL(methodWithURL);
    return this._parseRequest(method as HttpMethod, url, uriParams, option);
  }

  private async _parseRequest(
    method: HttpMethod,
    url: string,
    uriParams: Record<string, string>,
    option?: AxiosRequestConfig
  ) {
    const urlWithParams = this._replaceParams(url, uriParams);
    return await this._send(urlWithParams, method, option);
  }

  private _parseRequestURL(methodWithURL: string) {
    const split = methodWithURL.split(' ');
    if (split.length !== 2) throw new Error(`Invalid methodWithURL: ${methodWithURL}`);
    const [method, url] = split;
    if (!['GET', 'POST', 'PUT', 'DELETE'].includes(method.toUpperCase())) throw new Error(`Invalid method: ${method}`);
    return { method, url };
  }

  private _replaceParams(url: string, uriParams: Record<string, string>): string {
    for (const [key, value] of Object.entries(uriParams)) {
      url = url.replace(`{${key}}`, value);
    }
    return url;
  }

  private async _send(url: string, method: string = 'get', option?: AxiosRequestConfig) {
    return await axios({
      timeout: this._timeout,
      // Override with custom option
      ...option,
      url,
      method,
    });
  }
}
