export function omit<T extends Record<string, unknown>, K extends string>(
  object: T,
  ...keysToOmit: readonly (K | keyof T)[]
): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => !keysToOmit.includes(key))
  ) as Omit<T, K>;
}
