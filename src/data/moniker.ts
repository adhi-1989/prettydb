import type { AbilityGrade, AbilityIdentify } from "@/data/ability";
import type { CharacterIdentify } from "@/data/character";
import type { StatusIdentify } from "@/data/status";
import { MonikerList, Moniker as _Moniker } from "@/data/_protobuf";
import axios from "axios";
import _ from "@/util/lodash";
import { maps, numbers, objects } from "@/util";
import monikerDataUrl from "#/assets/data/moniker.dat?url";

const { orDefault, immutable } = objects;

export type MonikerIdentify = {
  characterID: number;
  monikerID: number;
};

export type TalentLevel = 1 | 2 | 3 | 4 | 5;

export type AwakeningLevel = 1 | 2 | 3 | 4 | 5;

export type InitialStatus = {
  readonly talentLevel1?: Readonly<Record<StatusIdentify, number>>;
  readonly talentLevel2?: Readonly<Record<StatusIdentify, number>>;
  readonly talentLevel3?: Readonly<Record<StatusIdentify, number>>;
  readonly talentLevel4?: Readonly<Record<StatusIdentify, number>>;
  readonly talentLevel5?: Readonly<Record<StatusIdentify, number>>;
};

export type OwnedSkill = {
  readonly defaults: ReadonlyArray<number>;
  readonly unlockedAt: {
    readonly awakeningLevel2: number;
    readonly awakeningLevel3: number;
    readonly awakeningLevel4: number;
    readonly awakeningLevel5: number;
  };
};

export type Moniker = Readonly<MonikerIdentify> & {
  readonly initialTalentLevel: TalentLevel;
  readonly initialStatus: InitialStatus;
  readonly initialAbility: Record<AbilityIdentify, AbilityGrade>;
  readonly growthRate: Record<StatusIdentify, number>;
  readonly ownedSkill: OwnedSkill;
  readonly events: ReadonlyArray<number>;
};

export interface MonikerStatic {
  get all(): ReadonlyArray<Moniker>;

  get allTalentLevel(): ReadonlyArray<TalentLevel>;

  get allAwakeningLevel(): ReadonlyArray<AwakeningLevel>;

  get(characterID: number, monikerID: number): Moniker;

  get(identify: MonikerIdentify): Moniker;

  getAvailableMonikers(characterID: number): ReadonlyArray<Moniker>;

  getAvailableMonikers(identify: CharacterIdentify): ReadonlyArray<Moniker>;

  getNameKey(characterID: number, monikerID: number): string;

  getNameKey(identify: MonikerIdentify): string;
}

export const NULL_MONIKER = immutable<Moniker>({
  characterID: -1,
  monikerID: -1,
  initialTalentLevel: 1,
  initialStatus: {
    talentLevel1: {
      speed: 0,
      stamina: 0,
      power: 0,
      tenacity: 0,
      intelligence: 0,
    },
  },
  initialAbility: {
    turf: "g",
    dirt: "g",
    short: "g",
    mile: "g",
    middle: "g",
    long: "g",
    nige: "g",
    senko: "g",
    sashi: "g",
    oikomi: "g",
  },
  growthRate: {
    speed: 0,
    stamina: 0,
    power: 0,
    tenacity: 0,
    intelligence: 0,
  },
  ownedSkill: {
    defaults: [],
    unlockedAt: {
      awakeningLevel2: -1,
      awakeningLevel3: -1,
      awakeningLevel4: -1,
      awakeningLevel5: -1,
    },
  },
  events: [],
});

const _allTalentLevel = Object.freeze<TalentLevel>([1, 2, 3, 4, 5]);
const _allAwakeningLevel = Object.freeze<AwakeningLevel>([1, 2, 3, 4, 5]);

let _allMoniker: ReadonlyArray<Moniker>;
let _monikerByIdMap: Record<number, Moniker>;
let _monikersByCharacterMap: Record<number, ReadonlyArray<Moniker>>;
(async () => {
  const monikerData = await axios
    .get<ArrayBuffer>(monikerDataUrl, { responseType: "arraybuffer" })
    .then((x) => new Uint8Array(x.data))
    .catch(() => Promise.resolve(new Uint8Array()));

  _allMoniker = Object.freeze<Array<Moniker>>(
    MonikerList.decode(monikerData).data.map((x) => {
      const initialTalentLevel = ((): TalentLevel => {
        const value = orDefault(x.initialTalentLevel, 1);
        return _.clamp(value, 1, 5) as TalentLevel;
      })();
      const initialStatus = ((): InitialStatus => {
        type Key = keyof InitialStatus;
        const map = orDefault(x.initialStatus, {});
        const status = (lv: TalentLevel): Record<StatusIdentify, number> => {
          const _status = map[lv];
          return {
            speed: orDefault(_status.speed, 0),
            stamina: orDefault(_status.stamina, 0),
            power: orDefault(_status.power, 0),
            tenacity: orDefault(_status.tenacity, 0),
            intelligence: orDefault(_status.intelligence, 0),
          };
        };
        const obj: Partial<Record<Key, Record<StatusIdentify, number>>> = {};
        const keyLevelPairs: Array<[Key, TalentLevel]> = [
          ["talentLevel1", 1],
          ["talentLevel2", 2],
          ["talentLevel3", 3],
          ["talentLevel4", 4],
          ["talentLevel5", 5],
        ];
        keyLevelPairs.forEach(([key, lv]) => {
          if (initialTalentLevel <= lv) {
            obj[key] = status(lv);
          }
        });
        return immutable<InitialStatus>({ ...obj });
      })();
      const initialAbility = ((): Record<AbilityIdentify, AbilityGrade> => {
        const ability = (
          v: _Moniker.Ability | null | undefined
        ): AbilityGrade => {
          switch (orDefault(v, _Moniker.Ability.G)) {
            case _Moniker.Ability.G:
              return "g";
            case _Moniker.Ability.F:
              return "f";
            case _Moniker.Ability.E:
              return "e";
            case _Moniker.Ability.D:
              return "d";
            case _Moniker.Ability.C:
              return "c";
            case _Moniker.Ability.B:
              return "b";
            case _Moniker.Ability.A:
              return "a";
            case _Moniker.Ability.S:
              return "s";
          }
        };
        const map = orDefault(x.initialAbility, {});
        return {
          turf: ability(map.turf),
          dirt: ability(map.dirt),
          short: ability(map.short),
          mile: ability(map.mile),
          middle: ability(map.middle),
          long: ability(map.long),
          nige: ability(map.nige),
          senko: ability(map.senko),
          sashi: ability(map.sashi),
          oikomi: ability(map.oikomi),
        };
      })();
      const growthRate = ((): Record<StatusIdentify, number> => {
        const map = orDefault(x.growthRate, {});
        return {
          speed: orDefault(map.speed, 0),
          stamina: orDefault(map.stamina, 0),
          power: orDefault(map.power, 0),
          tenacity: orDefault(map.tenacity, 0),
          intelligence: orDefault(map.intelligence, 0),
        };
      })();
      const ownedSkill = ((): OwnedSkill => {
        const map = orDefault(x.skills, {});
        return {
          defaults: orDefault(map.defaults, []),
          unlockedAt: {
            awakeningLevel2: orDefault(map.awakeningLevel2, -1),
            awakeningLevel3: orDefault(map.awakeningLevel3, -1),
            awakeningLevel4: orDefault(map.awakeningLevel4, -1),
            awakeningLevel5: orDefault(map.awakeningLevel5, -1),
          },
        };
      })();

      return immutable<Moniker>({
        characterID: orDefault(x.characterID, -1),
        monikerID: orDefault(x.monikerID, -1),
        initialTalentLevel,
        initialStatus,
        initialAbility,
        growthRate,
        ownedSkill,
        events: orDefault(x.events, []),
      });
    })
  );
  _monikerByIdMap = maps.NumberMap(
    _allMoniker.map((x) => [numbers.hashCode(x.characterID, x.monikerID), x])
  );
  _monikersByCharacterMap = Object.freeze(
    _.groupBy(_allMoniker, (x) => x.characterID)
  );
})();

export const Moniker: MonikerStatic = {
  get all(): ReadonlyArray<Moniker> {
    return orDefault(_allMoniker, () => Object.freeze([]));
  },
  get allTalentLevel(): ReadonlyArray<TalentLevel> {
    return _allTalentLevel;
  },
  get allAwakeningLevel(): ReadonlyArray<AwakeningLevel> {
    return _allAwakeningLevel;
  },
  get(arg1: number | MonikerIdentify, arg2?: number): Moniker {
    const map = orDefault(_monikerByIdMap, []);
    if (_.isNumber(arg1)) {
      if (!_.isNumber(arg2)) throw Error(`arg2 must be number: ${arg2}`);
      return orDefault(map[numbers.hashCode(arg1, arg2)], NULL_MONIKER);
    } else {
      return orDefault(
        map[numbers.hashCode(arg1.characterID, arg1.monikerID)],
        NULL_MONIKER
      );
    }
  },
  getAvailableMonikers(
    arg: number | CharacterIdentify
  ): ReadonlyArray<Moniker> {
    const map = orDefault(_monikersByCharacterMap, []);
    return orDefault(map[_.isNumber(arg) ? arg : arg.characterID], []);
  },
  getNameKey(arg1: number | MonikerIdentify, arg2?: number): string {
    if (_.isNumber(arg1)) {
      if (!_.isNumber(arg2)) throw Error(`arg2 must be number: ${arg2}`);
      return `character.${arg1}.moniker.${arg2}.name`;
    } else {
      return `character.${arg1.characterID}.moniker.${arg1.monikerID}.name`;
    }
  },
};
