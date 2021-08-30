import { FactorList, Factor as _Factor } from "@/data/_protobuf";
import axios from "axios";
import _ from "@/util/lodash";
import { maps, objects } from "@/util";
import factorDataUrl from "#/assets/data/factor.dat?url";

const { orDefault, immutable } = objects;

export type FactorType =
  | "status"
  | "ability"
  | "unique-skill"
  | "race"
  | "skill"
  | "scenario";

export type FactorLevel = 1 | 2 | 3;

export type FactorIdentify = {
  factorID: number;
};

export type Factor = Readonly<FactorIdentify> & {
  readonly sortID: number;
  readonly type: FactorType;
};

export type UniqueSkillFactor = Factor & {
  readonly type: "unique-skill";
  readonly skillID: number;
};

export interface FactorStatic {
  get all(): ReadonlyArray<Factor>;

  get allType(): ReadonlyArray<FactorType>;

  get allLevel(): ReadonlyArray<FactorLevel>;

  get(factorID: number): Factor;

  get(identify: FactorIdentify): Factor;

  checkUniqueSkill(factor: Factor): factor is UniqueSkillFactor;

  getNameKey(factorID: number): string;

  getNameKey(identify: FactorIdentify): string;
}

export const NULL_FACTOR = Object.freeze<Factor>({
  factorID: -1,
  sortID: -1,
  type: "status",
});

const _allFactorType = Object.freeze<Array<FactorType>>([
  "status",
  "ability",
  "unique-skill",
  "race",
  "skill",
  "scenario",
]);

const _allFactorLevel = Object.freeze<Array<FactorLevel>>([1, 2, 3]);

let _allFactor: ReadonlyArray<Factor>;
let _factorByIdMap: Record<number, Factor>;
(async () => {
  const factorType = (value: _Factor.Type | null | undefined): FactorType => {
    switch (orDefault(value, _Factor.Type.STATUS)) {
      case _Factor.Type.STATUS:
        return "status";
      case _Factor.Type.ABILITY:
        return "ability";
      case _Factor.Type.UNIQUE_SKILL:
        return "unique-skill";
      case _Factor.Type.RACE:
        return "race";
      case _Factor.Type.SKILL:
        return "skill";
      case _Factor.Type.SCENARIO:
        return "scenario";
      default:
        return "status";
    }
  };

  const data = await axios
    .get<ArrayBuffer>(factorDataUrl, { responseType: "arraybuffer" })
    .then((x) => new Uint8Array(x.data))
    .catch(() => Promise.resolve(new Uint8Array()));

  _allFactor = Object.freeze<Array<Factor>>(
    _.sortBy(
      FactorList.decode(data).data.map((x) => {
        const type = factorType(x.type);
        if (type === "unique-skill") {
          return immutable<UniqueSkillFactor>({
            factorID: orDefault(x.factorID, -1),
            sortID: orDefault(x.sortID, -1),
            type: type,
            skillID: orDefault(x.skillID, -1),
          });
        } else {
          return immutable<Factor>({
            factorID: orDefault(x.factorID, -1),
            sortID: orDefault(x.sortID, -1),
            type: type,
          });
        }
      }),
      ["sortID"]
    )
  );
  _factorByIdMap = Object.freeze(
    maps.NumberMap(_allFactor.map((x) => [x.factorID, x]))
  );
})();

const _checkUniqueSkill = _.memoize(
  (factor: Factor): factor is UniqueSkillFactor => {
    return factor.type === "unique-skill" && _.has(factor, "skillID");
  }
);

export const Factor: FactorStatic = {
  get all(): ReadonlyArray<Factor> {
    return orDefault(_allFactor, () => Object.freeze([]));
  },
  get allType(): ReadonlyArray<FactorType> {
    return _allFactorType;
  },
  get allLevel(): ReadonlyArray<FactorLevel> {
    return _allFactorLevel;
  },
  get(arg: number | FactorIdentify): Factor {
    const map = orDefault(_factorByIdMap, []);
    return orDefault(map[_.isNumber(arg) ? arg : arg.factorID], NULL_FACTOR);
  },
  checkUniqueSkill: _checkUniqueSkill,
  getNameKey(arg: number | FactorIdentify): string {
    const factorID = _.isNumber(arg) ? arg : arg.factorID;
    return `factor.${factorID}.name`;
  },
};
