import { Method } from "axios";
import { RestClientRequestConfig } from "./types";

export function isMethod(method: string): method is Method {
  return ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH', 'PURGE', 'LINK', 'UNLINK'].includes(
    method.toUpperCase()
  );
}

export function parseRequestURL(methodWithURL: string) {
  const split = methodWithURL.split(' ');
  if (split.length !== 2) throw new Error(`Invalid methodWithURL: ${methodWithURL}`);
  const [method, url] = split;
  if (!isMethod(method)) throw new Error(`Invalid method: ${method}`);
  return { method, url };
}

export function replaceParams(url: string, params: RestClientRequestConfig['params']): string {
  if(params === undefined) return url;
  for (const [key, value] of Object.entries(params)) {
    url = url.replace(`{${key}}`, value as string);
  }
  const pathWithParams = url.replace(
    /:([a-zA-Z0-9_]+)/g,
    (_, key) => params[key as keyof typeof params],
  );
  return pathWithParams;
}
