import axios, { AxiosRequestConfig } from 'axios';

interface RestClientOptions {
  /**
   * Axios Request time out, default: 60 minutes
   */
  requestTimeout?: number;
}

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

  public async request(methodWithURL: string, pathParamsOption: Record<string, string>, option?: AxiosRequestConfig) {
    const { method, url } = this._parseRequestURL(methodWithURL);
    const urlWithParams = this._replaceParams(url, pathParamsOption);
    return await this._send(urlWithParams, method, option);
  }

  private _parseRequestURL(methodWithURL: string) {
    const split = methodWithURL.split(' ');
    if (split.length !== 2) throw new Error(`Invalid methodWithURL: ${methodWithURL}`);
    const [method, url] = split;
    if (!['get', 'post', 'put', 'delete'].includes(method.toLowerCase())) throw new Error(`Invalid method: ${method}`);
    return { method, url };
  }

  private _replaceParams(url: string, pathParamsOptions: Record<string, string>): string {
    for (const [key, value] of Object.entries(pathParamsOptions)) {
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
