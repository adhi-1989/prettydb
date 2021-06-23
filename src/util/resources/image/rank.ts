// import from  require("/assets/image/rank/ss.png";

import G_PLUS from "/assets/image/rank/g_plus.png";
import F from "/assets/image/rank/f.png";
import F_PLUS from "/assets/image/rank/f_plus.png";
import E from "/assets/image/rank/e.png";
import E_PLUS from "/assets/image/rank/e_plus.png";
import D from "/assets/image/rank/d.png";
import D_PLUS from "/assets/image/rank/d_plus.png";
import C from "/assets/image/rank/c.png";
import C_PLUS from "/assets/image/rank/c_plus.png";
import B from "/assets/image/rank/b.png";
import B_PLUS from "/assets/image/rank/b_plus.png";
import A from "/assets/image/rank/a.png";
import A_PLUS from "/assets/image/rank/a_plus.png";
import S from "/assets/image/rank/s.png";

export function getRankGradeIcon(score: number): string {
  if (score >= 15000) {
    return S;
  } else if (score >= 12000) {
    return A_PLUS;
  } else if (score >= 10000) {
    return A;
  } else if (score >= 8200) {
    return B_PLUS;
  } else if (score >= 6500) {
    return B;
  } else if (score >= 5000) {
    return C_PLUS;
  } else if (score >= 4000) {
    return C;
  } else if (score >= 3000) {
    return D_PLUS;
  } else if (score >= 2500) {
    return D;
  } else if (score >= 2000) {
    return E_PLUS;
  } else if (score >= 1300) {
    return E;
  } else if (score >= 1000) {
    return F_PLUS;
  } else if (score >= 500) {
    return F;
  } else {
    return G_PLUS;
  }
}
