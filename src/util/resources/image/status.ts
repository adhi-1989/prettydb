import { getStatusGrade } from "/@/data/status";

import SS_PLUS from "/assets/image/status/ss_plus.png";
import SS from "/assets/image/status/ss.png";
import S_PLUS from "/assets/image/status/s_plus.png";
import S from "/assets/image/status/s.png";
import A_PLUS from "/assets/image/status/a_plus.png";
import A from "/assets/image/status/a.png";
import B_PLUS from "/assets/image/status/b_plus.png";
import B from "/assets/image/status/b.png";
import C_PLUS from "/assets/image/status/c_plus.png";
import C from "/assets/image/status/c.png";
import D_PLUS from "/assets/image/status/d_plus.png";
import D from "/assets/image/status/d.png";
import E_PLUS from "/assets/image/status/e_plus.png";
import E from "/assets/image/status/e.png";
import F_PLUS from "/assets/image/status/f_plus.png";
import F from "/assets/image/status/f.png";
import G_PLUS from "/assets/image/status/g_plus.png";

export function getStatusGradeIcon(value: number): string {
  const grade = getStatusGrade(value);
  switch (grade) {
    case "ss+":
      return SS_PLUS;
    case "ss":
      return SS;
    case "s+":
      return S_PLUS;
    case "s":
      return S;
    case "a+":
      return A_PLUS;
    case "a":
      return A;
    case "b+":
      return B_PLUS;
    case "b":
      return B;
    case "c+":
      return C_PLUS;
    case "c":
      return C;
    case "d+":
      return D_PLUS;
    case "d":
      return D;
    case "e+":
      return E_PLUS;
    case "e":
      return E;
    case "f+":
      return F_PLUS;
    case "f":
      return F;
    case "g+":
      return G_PLUS;
  }
}
