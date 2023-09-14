import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Pipe, Objects, Strings, ComposeLeft, Tuples, Match } from 'hotscript';

type PrimitiveType = string | number | boolean;

type ProcessParams = [
  Tuples.Map<ComposeLeft<[Strings.Trim<'{' | '}' | ':'>, Strings.Append<':DEFAULT_TYPE'>, Strings.Split<':'>]>>,
  Tuples.ToUnion,
  Objects.FromEntries,
  Objects.MapValues<Match<[Match.With<'DEFAULT_TYPE', PrimitiveType>]>>
];

export type ExtractParamsFromURLWithoutQueryString<T> = Pipe<
  T,
  [
    Strings.Trim<'https://' | 'http://'>,
    // Ignore query string
    Strings.Split<'?'>,
    Tuples.At<0>,
    Strings.Split<'/'>,
    // Support Express-like path params (#11), e.g. /posts/:postId/comments/:commentId
    Tuples.Filter<Strings.StartsWith<'{' | ':'>>,
    ...ProcessParams
  ]
>;

export type ExtractParamsFromURLQueryString<T> = Pipe<
  T,
  [
    Strings.Trim<'https://' | 'http://'>,
    // Using only query string
    Strings.Split<'?'>,
    Tuples.At<1>,
    Strings.Split<'&'>,
    Tuples.Map<
      ComposeLeft<[
        Strings.Split<'='>,
        Tuples.Filter<Strings.StartsWith<'{' | ':'>>,
        Tuples.ToUnion
      ]>
    >,
    ...ProcessParams
  ]
>;

export type ExtractParamsFromURL<T> = ExtractParamsFromURLQueryString<T> & ExtractParamsFromURLWithoutQueryString<T>;

export type ExtractParamsFromRestURL<T> = ExtractParamsFromURL<Pipe<T, [Strings.Split<' '>]>[1]>;


type GetParams<WithMethod, T> = WithMethod extends true
  ? ExtractParamsFromRestURL<T>
  : ExtractParamsFromURL<T>;

export type RestClientRequestConfig<WithMethod = false, T = any> = {
  params?: GetParams<WithMethod, T>;
  axiosConfig?: AxiosRequestConfig;
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
