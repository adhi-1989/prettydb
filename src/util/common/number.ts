export function hashCode(...numbers: number[]): number {
  let result = 1;
  for (const i of numbers) {
    result = 31 * result + i;
  }
  return result;
}
