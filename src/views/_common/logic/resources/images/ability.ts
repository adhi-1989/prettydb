import { GradeIcon } from "./grade";
import { AbilityGrade } from "@/data";

export function getAbilityGradeIcon(grade: AbilityGrade): string {
  switch (grade) {
    case "s":
      return GradeIcon.S;
    case "a":
      return GradeIcon.A;
    case "b":
      return GradeIcon.B;
    case "c":
      return GradeIcon.C;
    case "d":
      return GradeIcon.D;
    case "e":
      return GradeIcon.E;
    case "f":
      return GradeIcon.F;
    case "g":
      return GradeIcon.G;
    default:
      console.warn("Illegal ability grade: " + grade);
      return GradeIcon.G;
  }
}
