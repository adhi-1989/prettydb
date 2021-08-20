export function NumberMap<V>(entries: Array<[number, V]>): Record<number, V> {
  const map: Record<number, V> = Object.create(null);
  for (const [index, value] of entries) {
    map[index] = value;
  }
  return map;
}

export const maps = Object.freeze({
  NumberMap,
});
