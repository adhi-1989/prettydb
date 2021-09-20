import { CharacterList } from "@/data/_protobuf";
import axios from "axios";
import _ from "@/util/lodash";
import { maps, objects } from "@/util";
import characterDataUrl from "#/assets/data/character.dat?url";

const { orDefault, immutable } = objects;

export type CharacterIdentify = {
  characterID: number;
};

export type Character = Readonly<CharacterIdentify> & {
  readonly sortID: number;
};

export interface CharacterStatic {
  get all(): ReadonlyArray<Character>;

  get(characterID: number): Character;

  get(identify: CharacterIdentify): Character;

  getNameKey(characterID: number): string;

  getNameKey(identify: CharacterIdentify): string;
}

export const NULL_CHARACTER = Object.freeze<Character>({
  characterID: -1,
  sortID: -1,
});

let _allCharacter: ReadonlyArray<Character>;
let _characterByIdMap: Record<number, Character>;
(async () => {
  const characterData = await axios
    .get<ArrayBuffer>(characterDataUrl, { responseType: "arraybuffer" })
    .then((x) => new Uint8Array(x.data))
    .catch(() => Promise.resolve(new Uint8Array()));

  _allCharacter = Object.freeze(
    _.sortBy(
      CharacterList.decode(characterData).data.map((x) => {
        return immutable<Character>({
          characterID: orDefault(x.characterID, -1),
          sortID: orDefault(x.sortID, -1),
        });
      }),
      ["sortID"]
    )
  );
  _characterByIdMap = maps.NumberMap(
    _allCharacter.map((x) => [x.characterID, x])
  );
})();

export const Character: CharacterStatic = {
  get all(): ReadonlyArray<Character> {
    return orDefault(_allCharacter, () => Object.freeze([]));
  },
  get(arg: number | CharacterIdentify): Character {
    const map = orDefault(_characterByIdMap, []);
    return orDefault(
      map[_.isNumber(arg) ? arg : arg.characterID],
      NULL_CHARACTER
    );
  },
  getNameKey(arg: number | CharacterIdentify): string {
    const characterID = _.isNumber(arg) ? arg : arg.characterID;
    return `character.${characterID}.name`;
  },
};
