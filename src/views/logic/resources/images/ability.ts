import { GradeIcons } from "./grade";
import { AbilityGrade } from "@/data";

export function getAbilityGradeIcon(grade: AbilityGrade): string {
  switch (grade) {
    case "s":
      return GradeIcons.S;
    case "a":
      return GradeIcons.A;
    case "b":
      return GradeIcons.B;
    case "c":
      return GradeIcons.C;
    case "d":
      return GradeIcons.D;
    case "e":
      return GradeIcons.E;
    case "f":
      return GradeIcons.F;
    case "g":
      return GradeIcons.G;
    default:
      console.warn("Illegal ability grade: " + grade);
      return GradeIcons.G;
  }
}
