import { AbilityGrade } from "/@/data";
import S from "/assets/image/ability/s.png";
import A from "/assets/image/ability/a.png";
import B from "/assets/image/ability/b.png";
import C from "/assets/image/ability/c.png";
import D from "/assets/image/ability/d.png";
import E from "/assets/image/ability/e.png";
import F from "/assets/image/ability/f.png";
import G from "/assets/image/ability/g.png";

export function getAbilityGradeIcon(grade: AbilityGrade): string {
  switch (grade) {
    case "s":
      return S;
    case "a":
      return A;
    case "b":
      return B;
    case "c":
      return C;
    case "d":
      return D;
    case "e":
      return E;
    case "f":
      return F;
    case "g":
      return G;
    default:
      console.warn("Illegal ability grade: " + grade);
      return G;
  }
}
