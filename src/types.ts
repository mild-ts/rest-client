import { AxiosInstance, AxiosRequestConfig } from "axios";
import { Pipe, Objects, Strings, ComposeLeft, Tuples, Match } from "hotscript";

export type ExtractParamsFromURL<T> = Pipe<
  T,
  [
    Strings.Trim<"https://" | "http://">,
    Strings.Split<"/">,
    Tuples.Filter<Strings.StartsWith<"{">>,
    Tuples.Map<
      ComposeLeft<[
        Strings.Trim<"{" | "}">,
        Strings.Append<":DEFAULT_TYPE">,
        Strings.Split<":">,
      ]>
    >,
    Tuples.ToUnion,
    Objects.FromEntries,
    Objects.MapValues<
      Match<[
        Match.With<"DEFAULT_TYPE", string | number | null>,
      ]>
    >
  ]
>;

type Params = ExtractParamsFromURL<'https://jsonplaceholder.typicode.com/posts/{postId}/comments/{commentId}'>;
      // ^?


export type ExtractParamsFromRestURL<T> = ExtractParamsFromURL<Pipe<
  T,
  [
    Strings.Split<' '>
  ]
  >[1]>;

type T = ExtractParamsFromRestURL<'GET https://jsonplaceholder.typicode.com/posts/{postId}/comments/{commentId}'>;
  // ^?

type GetParams<WithMethod, T> = WithMethod extends true ? ExtractParamsFromRestURL<T> : ExtractParamsFromURL<T>;

export type RestClientRequestConfig<WithMethod = false, T = any> = {
  params?: GetParams<WithMethod, T>;
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
