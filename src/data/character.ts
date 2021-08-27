import axios from "axios";
import { CharacterList, MonikerList } from "@/data/_protobuf";
import { maps, numbers, objects } from "@/util";
import _ from "@/util/lodash";
import characterDataUrl from "#/assets/data/character.dat?url";
import monikerDataUrl from "#/assets/data/moniker.dat?url";

export type CharacterIdentify = {
  characterID: number;
};

export type Character = Readonly<CharacterIdentify> & {
  readonly sortID: number;
};

export type MonikerIdentify = {
  characterID: number;
  monikerID: number;
};

export type Moniker = Readonly<MonikerIdentify> & {
  readonly initialTalentLevel: TalentLevel;
};

export type TalentLevel = 1 | 2 | 3 | 4 | 5;

export type AwakeningLevel = 1 | 2 | 3 | 4 | 5;

export interface CharacterStatic {
  get all(): ReadonlyArray<Character>;

  get allMoniker(): ReadonlyArray<Moniker>;

  get allTalentLevel(): ReadonlyArray<TalentLevel>;

  get allAwakeningLevel(): ReadonlyArray<AwakeningLevel>;

  get(characterID: number): Character;

  get(identify: CharacterIdentify): Character;

  getMoniker(characterID: number, monikerID: number): Moniker;

  getMoniker(identify: MonikerIdentify): Moniker;

  getAvailableMoniker(characterID: number): ReadonlyArray<Moniker>;

  getAvailableMoniker(identify: CharacterIdentify): ReadonlyArray<Moniker>;

  getNameKey(characterID: number): string;

  getNameKey(identify: CharacterIdentify): string;

  getMonikerNameKey(characterID: number, monikerID: number): string;

  getMonikerNameKey(identify: MonikerIdentify): string;
}

export const NULL_CHARACTER = Object.freeze<Character>({
  characterID: -1,
  sortID: -1,
});

export const NULL_MONIKER = Object.freeze<Moniker>({
  characterID: -1,
  monikerID: -1,
  initialTalentLevel: 1,
});

const _allTalentLevel = Object.freeze<TalentLevel>([1, 2, 3, 4, 5]);

const _allAwakeningLevel = Object.freeze<AwakeningLevel>([1, 2, 3, 4, 5]);

let _allCharacter: ReadonlyArray<Character>;
let _characterByIdMap: Record<number, Character>;
let _allMoniker: ReadonlyArray<Moniker>;
let _monikerByIdMap: Record<number, Moniker>;
let _monikersByCharacterMap: Record<number, ReadonlyArray<Moniker>>;
(async () => {
  const _talentLevel = (value: number | null | undefined): TalentLevel => {
    const n = objects.orDefault(value, 1);
    return (n >= 1 && n <= 5 ? n : 1) as TalentLevel;
  };

  const characterData = await axios
    .get<ArrayBuffer>(characterDataUrl, { responseType: "arraybuffer" })
    .then((x) => new Uint8Array(x.data))
    .catch(() => Promise.resolve(new Uint8Array()));
  const monikerData = await axios
    .get<ArrayBuffer>(monikerDataUrl, { responseType: "arraybuffer" })
    .then((x) => new Uint8Array(x.data))
    .catch(() => Promise.resolve(new Uint8Array()));

  _allCharacter = Object.freeze(
    _.sortBy(
      CharacterList.decode(characterData).data.map((x) => {
        return objects.immutable<Character>({
          characterID: objects.orDefault(x.characterID, -1),
          sortID: objects.orDefault(x.sortID, -1),
        });
      }),
      ["sortID"]
    )
  );
  _characterByIdMap = maps.NumberMap(
    _allCharacter.map((x) => [x.characterID, x])
  );
  _allMoniker = Object.freeze<Array<Moniker>>(
    MonikerList.decode(monikerData)
      .data.map((x) => {
        return objects.immutable<Moniker>({
          characterID: objects.orDefault(x.characterID, -1),
          monikerID: objects.orDefault(x.monikerID, -1),
          initialTalentLevel: _talentLevel(x.initialTalentLevel),
        });
      })
      .sort((x, y) => {
        if (x.characterID !== y.characterID) {
          const xCharacter = _characterByIdMap[x.characterID];
          const yCharacter = _characterByIdMap[y.characterID];
          return xCharacter.sortID - yCharacter.sortID;
        }
        return x.monikerID - y.monikerID;
      })
  );
  _monikerByIdMap = maps.NumberMap(
    _allMoniker.map((x) => [numbers.hashCode(x.characterID, x.monikerID), x])
  );
  _monikersByCharacterMap = Object.freeze(
    _.groupBy(_allMoniker, (x) => x.characterID)
  );
})();

export const Character: CharacterStatic = {
  get all(): ReadonlyArray<Character> {
    return objects.orDefault(_allCharacter, () => Object.freeze([]));
  },
  get allMoniker(): ReadonlyArray<Moniker> {
    return objects.orDefault(_allMoniker, () => Object.freeze([]));
  },
  get allTalentLevel(): ReadonlyArray<TalentLevel> {
    return _allTalentLevel;
  },
  get allAwakeningLevel(): ReadonlyArray<AwakeningLevel> {
    return _allAwakeningLevel;
  },
  get(arg: number | CharacterIdentify): Character {
    const map = objects.orDefault(_characterByIdMap, []);
    return objects.orDefault(
      map[_.isNumber(arg) ? arg : arg.characterID],
      NULL_CHARACTER
    );
  },
  getMoniker(arg1: number | MonikerIdentify, arg2?: number): Moniker {
    const map = objects.orDefault(_monikerByIdMap, []);
    if (_.isNumber(arg1)) {
      if (!_.isNumber(arg2)) throw Error(`arg2 must be number: ${arg2}`);
      return objects.orDefault(map[numbers.hashCode(arg1, arg2)], NULL_MONIKER);
    } else {
      return objects.orDefault(
        map[numbers.hashCode(arg1.characterID, arg1.monikerID)],
        NULL_MONIKER
      );
    }
  },
  getAvailableMoniker(arg: number | CharacterIdentify): ReadonlyArray<Moniker> {
    const map = objects.orDefault(_monikersByCharacterMap, []);
    return objects.orDefault(map[_.isNumber(arg) ? arg : arg.characterID], []);
  },
  getNameKey(arg: number | CharacterIdentify): string {
    const characterID = _.isNumber(arg) ? arg : arg.characterID;
    return `character.${characterID}.name`;
  },
  getMonikerNameKey(arg1: number | MonikerIdentify, arg2?: number): string {
    if (_.isNumber(arg1)) {
      if (!_.isNumber(arg2)) throw Error(`arg2 must be number: ${arg2}`);
      return `character.${arg1}.moniker.${arg2}.name`;
    } else {
      return `character.${arg1.characterID}.moniker.${arg1.monikerID}.name`;
    }
  },
};
