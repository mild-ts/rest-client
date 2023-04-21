
export type TupleToObjectSymbol<T extends readonly string[]> = {
  [K in T[number]]: ReturnType<typeof Symbol.for>;
}

/**
 * Create Record of string and Symbol of the key
 *
 * @example
 * ```ts
  import { createSymbolRecord } from '@mild-ts/utils';

  export const Tokens = createSymbolRecord('HealthAlertOption', 'SlackOption');

  // Equivalent to
  export const Tokens = {
    HealthAlertOption: Symbol.for('HealthAlertOption'),
    SlackOption: Symbol.for('SlackOption'),
  }
  ```
 * @param keys array of strings
 * @returns the record
 */

export function createSymbolRecord<const T extends readonly string[]>(...keys: T): TupleToObjectSymbol<T>{
  return keys.reduce((result: any, v: string) => {
    result[v] = Symbol.for(v);
    return result;
  }, {});
}
