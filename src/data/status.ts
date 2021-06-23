export const StatusGrades = {
  G_PLUS: "g+",
  F: "f",
  F_PLUS: "f+",
  E: "e",
  E_PLUS: "e+",
  D: "d",
  D_PLUS: "d+",
  C: "c",
  C_PLUS: "c+",
  B: "b",
  B_PLUS: "b+",
  A: "a",
  A_PLUS: "a+",
  S: "s",
  S_PLUS: "s+",
  SS: "ss",
  SS_PLUS: "ss+",
} as const;

export type StatusGrade = typeof StatusGrades[keyof typeof StatusGrades];

export const StatusKeys = {
  SPEED: "speed",
  STAMINA: "stamina",
  POWER: "power",
  TENACITY: "tenacity",
  INTELLIGENCE: "intelligence",
} as const;

export type StatusKey = typeof StatusKeys[keyof typeof StatusKeys];

export function getStatusGrade(value: number): StatusGrade {
  if (value >= 1150) {
    return StatusGrades.SS_PLUS;
  } else if (value >= 1100) {
    return StatusGrades.SS;
  } else if (value >= 1050) {
    return StatusGrades.S_PLUS;
  } else if (value >= 1000) {
    return StatusGrades.S;
  } else if (value >= 900) {
    return StatusGrades.A_PLUS;
  } else if (value >= 800) {
    return StatusGrades.A;
  } else if (value >= 700) {
    return StatusGrades.B_PLUS;
  } else if (value >= 600) {
    return StatusGrades.B;
  } else if (value >= 500) {
    return StatusGrades.C_PLUS;
  } else if (value >= 400) {
    return StatusGrades.C;
  } else if (value >= 350) {
    return StatusGrades.D_PLUS;
  } else if (value >= 300) {
    return StatusGrades.D;
  } else if (value >= 250) {
    return StatusGrades.E_PLUS;
  } else if (value >= 200) {
    return StatusGrades.E;
  } else if (value >= 150) {
    return StatusGrades.F_PLUS;
  } else if (value >= 100) {
    return StatusGrades.F;
  } else {
    return StatusGrades.G_PLUS;
  }
}
