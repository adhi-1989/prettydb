export const AbilityGrades = {
  G: "g",
  F: "f",
  E: "e",
  D: "d",
  C: "c",
  B: "b",
  A: "a",
  S: "s",
} as const;

export type AbilityGrade = typeof AbilityGrades[keyof typeof AbilityGrades];

export const AbilityTypes = {
  RACETRACK: "racetrack",
  DISTANCE: "distance",
  RUNNING_STYLE: "running-style",
} as const;

export type AbilityType = typeof AbilityTypes[keyof typeof AbilityTypes];

export const AbilityKeys = {
  TURF: "turf",
  DIRT: "dirt",
  SHORT: "short",
  MILE: "mile",
  MIDDLE: "middle",
  LONG: "long",
  NIGE: "nige",
  SENKO: "senko",
  SASHI: "sashi",
  OIKOMI: "oikomi",
} as const;

export type AbilityKey = typeof AbilityKeys[keyof typeof AbilityKeys];

export const AbilityStructure = [
  {
    type: AbilityTypes.RACETRACK,
    values: [AbilityKeys.TURF, AbilityKeys.DIRT],
  },
  {
    type: AbilityTypes.DISTANCE,
    values: [
      AbilityKeys.SHORT,
      AbilityKeys.MILE,
      AbilityKeys.MIDDLE,
      AbilityKeys.LONG,
    ],
  },
  {
    type: AbilityTypes.RUNNING_STYLE,
    values: [
      AbilityKeys.NIGE,
      AbilityKeys.SENKO,
      AbilityKeys.SASHI,
      AbilityKeys.OIKOMI,
    ],
  },
] as const;
