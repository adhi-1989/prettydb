import S_PLUS from "/assets/image/rank/s-plus.svg?url";
import S from "/assets/image/rank/s.svg?url";
import A_PLUS from "/assets/image/rank/a-plus.svg?url";
import A from "/assets/image/rank/a.svg?url";
import B_PLUS from "/assets/image/rank/b-plus.svg?url";
import B from "/assets/image/rank/b.svg?url";
import C_PLUS from "/assets/image/rank/c-plus.svg?url";
import C from "/assets/image/rank/c.svg?url";
import D_PLUS from "/assets/image/rank/d-plus.svg?url";
import D from "/assets/image/rank/d.svg?url";
import E_PLUS from "/assets/image/rank/e-plus.svg?url";
import E from "/assets/image/rank/e.svg?url";
import F_PLUS from "/assets/image/rank/f-plus.svg?url";
import F from "/assets/image/rank/f.svg?url";
import G_PLUS from "/assets/image/rank/g-plus.svg?url";

//TODO: スコアのグレードが決まる閾値が適当なのでちゃんとデータ集める
export function getRankGradeIcon(score: number): string {
  if (score >= 20000) {
    return S_PLUS;
  } else if (score >= 15000) {
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
