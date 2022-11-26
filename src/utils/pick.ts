export function pick<T extends Record<string, unknown>, K extends string>(
  object: T,
  ...keysToPick: readonly (K | keyof T)[]
): Pick<T, K> {
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => keysToPick.includes(key))
  ) as Pick<T, K>;
}
