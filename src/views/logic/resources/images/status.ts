import { GradeIcon } from "./grade";
import { Status } from "@/data";

export function getStatusGradeIcon(value: number): string {
  const grade = Status.getGrade(value);
  switch (grade) {
    case "ss+":
      return GradeIcon.SS_PLUS;
    case "ss":
      return GradeIcon.SS;
    case "s+":
      return GradeIcon.S_PLUS;
    case "s":
      return GradeIcon.S;
    case "a+":
      return GradeIcon.A_PLUS;
    case "a":
      return GradeIcon.A;
    case "b+":
      return GradeIcon.B_PLUS;
    case "b":
      return GradeIcon.B;
    case "c+":
      return GradeIcon.C_PLUS;
    case "c":
      return GradeIcon.C;
    case "d+":
      return GradeIcon.D_PLUS;
    case "d":
      return GradeIcon.D;
    case "e+":
      return GradeIcon.E_PLUS;
    case "e":
      return GradeIcon.E;
    case "f+":
      return GradeIcon.F_PLUS;
    case "f":
      return GradeIcon.F;
    case "g+":
      return GradeIcon.G_PLUS;
  }
}
