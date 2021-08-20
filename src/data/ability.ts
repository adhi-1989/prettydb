import _ from "@/util/lodash";

export type AbilityGrade = "g" | "f" | "e" | "d" | "c" | "b" | "a" | "s";

export type AbilityType =
  // バ場適正
  | "racetrack"
  // 距離適性
  | "distance"
  // 脚質適正
  | "running-style";

export type AbilityIdentify =
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
  abilities: Array<AbilityIdentify>;
};

export interface AbilityStatic {
  get all(): ReadonlyArray<AbilityIdentify>;

  get allType(): ReadonlyArray<AbilityType>;

  get allContainer(): ReadonlyArray<AbilityContainer>;

  getType(identify: AbilityIdentify): AbilityType;

  check(arg: string): arg is AbilityIdentify;

  checkType(arg: string): arg is AbilityType;

  getNameKey(identify: AbilityIdentify): string;

  getTypeNameKey(type: AbilityType): string;
}

const _allAbilityType = Object.freeze<Array<AbilityType>>([
  "racetrack",
  "distance",
  "running-style",
]);

const _allAbility = Object.freeze<Array<AbilityIdentify>>([
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

const _allAbilityContainer = Object.freeze<Array<AbilityContainer>>([
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

const _getType = _.memoize((identify: AbilityIdentify): AbilityType => {
  const container = _allAbilityContainer.find((x) =>
    x.abilities.includes(identify)
  );
  if (container === undefined) {
    throw Error(`Illegal ability: ${identify}`);
  }
  return container.type;
});

export const Ability: AbilityStatic = {
  get all(): ReadonlyArray<AbilityIdentify> {
    return _allAbility;
  },
  get allType(): ReadonlyArray<AbilityType> {
    return _allAbilityType;
  },
  get allContainer(): ReadonlyArray<AbilityContainer> {
    return _allAbilityContainer;
  },
  getType: _getType,
  check(arg: string): arg is AbilityIdentify {
    return _.some(_allAbility, (x) => x === arg);
  },
  checkType(arg: string): arg is AbilityType {
    return _.some(_allAbilityType, (x) => x === arg);
  },
  getNameKey(identify: AbilityIdentify): string {
    const type = _getType(identify);
    return `game-system.ability.${type}.${identify}`;
  },
  getTypeNameKey(type: AbilityType): string {
    return `game-system.ability.${type}.generic-term`;
  },
};
