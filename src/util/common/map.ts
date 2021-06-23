export type NumMap<V> = {
  [key: number]: V;
};

export function createNumMap<V>(entries: Array<[number, V]>): NumMap<V> {
  const map: NumMap<V> = {};
  for (const [index, value] of entries) {
    map[index] = value;
  }
  return map;
}
