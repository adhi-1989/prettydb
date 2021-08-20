export function equalsIgnoreCase(arg1: string, arg2: string): boolean {
  return arg1 === arg2
    ? true
    : arg1.localeCompare(arg2, undefined, { sensitivity: "accent" }) === 0;
}

export const strings = Object.freeze({
  equalsIgnoreCase,
});
