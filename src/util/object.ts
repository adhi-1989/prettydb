export function immutable<T extends Record<string, unknown>>(
  obj: T
): Readonly<T> {
  return Object.freeze<T>(Object.assign(Object.create(null), obj) as T);
}

export function orDefault<T>(
  obj: T | undefined | null,
  defaultValue: T | (() => T)
): T {
  if (obj !== undefined && obj !== null) {
    return obj;
  }
  if (typeof defaultValue === "function") {
    return (defaultValue as () => T)();
  }
  return defaultValue;
}

export const objects = Object.freeze({
  immutable,
  orDefault,
});
