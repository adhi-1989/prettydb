export function hashCode(...numbers: Array<number>): number {
  let result = 1;
  for (const i of numbers) {
    result = 31 * result + i;
  }
  return result;
}

export const numbers = Object.freeze({
  hashCode,
});
