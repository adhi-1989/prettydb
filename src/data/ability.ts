export type AbilityGrade = "g" | "f" | "e" | "d" | "c" | "b" | "a" | "s";

export type AbilityType =
  // バ場適正
  | "racetrack"
  // 距離適性
  | "distance"
  // 脚質適正
  | "running-style";

export type Ability =
  // バ場適正
  | "turf" // 芝
  | "dirt" // ダート
  // 距離適性
  | "short" // 短距離
  | "mile" // マイル
  | "middle" // 中距離
  | "long" // 長距離
  // 脚質適正
  // ググっても適切な単語が見つからなかったのでローマ字表記
  | "nige" // 逃げ
  | "senko" // 先行
  | "sashi" // 差し
  | "oikomi"; // 追込

export type AbilityContainer = {
  type: AbilityType;
  abilities: Array<Ability>;
};

export const AllAbilityType: Readonly<Array<AbilityType>> = Object.freeze([
  "racetrack",
  "distance",
  "running-style",
]);

export const AllAbility: Readonly<Array<Ability>> = Object.freeze([
  "turf",
  "dirt",
  "short",
  "mile",
  "middle",
  "long",
  "nige",
  "senko",
  "sashi",
  "oikomi",
]);

export const AllAbilityContainer: Readonly<Array<AbilityContainer>> =
  Object.freeze([
    {
      type: "racetrack",
      abilities: ["turf", "dirt"],
    },
    {
      type: "distance",
      abilities: ["short", "mile", "middle", "long"],
    },
    {
      type: "running-style",
      abilities: ["nige", "senko", "sashi", "oikomi"],
    },
  ]);
