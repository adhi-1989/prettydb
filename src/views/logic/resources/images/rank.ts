import S_PLUS from "#/images/rank/s-plus.svg";
import S from "#/images/rank/s.svg";
import A_PLUS from "#/images/rank/a-plus.svg";
import A from "#/images/rank/a.svg";
import B_PLUS from "#/images/rank/b-plus.svg";
import B from "#/images/rank/b.svg";
import C_PLUS from "#/images/rank/c-plus.svg";
import C from "#/images/rank/c.svg";
import D_PLUS from "#/images/rank/d-plus.svg";
import D from "#/images/rank/d.svg";
import E_PLUS from "#/images/rank/e-plus.svg";
import E from "#/images/rank/e.svg";
import F_PLUS from "#/images/rank/f-plus.svg";
import F from "#/images/rank/f.svg";
import G_PLUS from "#/images/rank/g-plus.svg";

export const RankIcons = {
  S_PLUS,
  S,
  A_PLUS,
  A,
  B_PLUS,
  B,
  C_PLUS,
  C,
  D_PLUS,
  D,
  E_PLUS,
  E,
  F_PLUS,
  F,
  G_PLUS,
};

//TODO: スコアのグレードが決まる閾値が適当なのでちゃんとデータ集める
export function getRankGradeIcon(score: number): string {
  if (score >= 16000) {
    return S_PLUS;
  } else if (score >= 14500) {
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
