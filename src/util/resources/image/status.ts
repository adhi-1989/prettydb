import { GradeIcons } from "./grade";
import { getStatusGrade } from "/@/data/status";

export function getStatusGradeIcon(value: number): string {
  const grade = getStatusGrade(value);
  switch (grade) {
    case "ss+":
      return GradeIcons.SS_PLUS;
    case "ss":
      return GradeIcons.SS;
    case "s+":
      return GradeIcons.S_PLUS;
    case "s":
      return GradeIcons.S;
    case "a+":
      return GradeIcons.A_PLUS;
    case "a":
      return GradeIcons.A;
    case "b+":
      return GradeIcons.B_PLUS;
    case "b":
      return GradeIcons.B;
    case "c+":
      return GradeIcons.C_PLUS;
    case "c":
      return GradeIcons.C;
    case "d+":
      return GradeIcons.D_PLUS;
    case "d":
      return GradeIcons.D;
    case "e+":
      return GradeIcons.E_PLUS;
    case "e":
      return GradeIcons.E;
    case "f+":
      return GradeIcons.F_PLUS;
    case "f":
      return GradeIcons.F;
    case "g+":
      return GradeIcons.G_PLUS;
  }
}
