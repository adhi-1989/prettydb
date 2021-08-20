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

export const RankIcon = {
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
    return RankIcon.S_PLUS;
  } else if (score >= 14500) {
    return RankIcon.S;
  } else if (score >= 12000) {
    return RankIcon.A_PLUS;
  } else if (score >= 10000) {
    return RankIcon.A;
  } else if (score >= 8200) {
    return RankIcon.B_PLUS;
  } else if (score >= 6500) {
    return RankIcon.B;
  } else if (score >= 5000) {
    return RankIcon.C_PLUS;
  } else if (score >= 4000) {
    return RankIcon.C;
  } else if (score >= 3000) {
    return RankIcon.D_PLUS;
  } else if (score >= 2500) {
    return RankIcon.D;
  } else if (score >= 2000) {
    return RankIcon.E_PLUS;
  } else if (score >= 1300) {
    return RankIcon.E;
  } else if (score >= 1000) {
    return RankIcon.F_PLUS;
  } else if (score >= 500) {
    return RankIcon.F;
  } else {
    return RankIcon.G_PLUS;
  }
}
