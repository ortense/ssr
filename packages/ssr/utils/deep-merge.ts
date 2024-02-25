import type { DeepPartial } from "../types/utility";

export function deepMerge<T extends Object>(current: T, modifier: DeepPartial<T>): T {
  return Object
    .keys(modifier)
    .reduce<T>((actual, key) => {
      const property = actual[key as keyof T];
      const modifierProperty = modifier[key as keyof T];

      if(!modifierProperty) return actual

      const isNested = property !== null
        && typeof property === 'object'
        && typeof modifierProperty === 'object'
        && !Array.isArray(property);

      return Object.assign(
        actual, {
          [key]: isNested
            ? deepMerge(property, modifierProperty as DeepPartial<typeof property>)
            : modifierProperty as T[keyof T]
        });
    }, structuredClone(current));
}
