import _ from "lodash";

export function getCharacterNameKey(characterID: number): string;
export function getCharacterNameKey(obj: { characterID: number }): string;
export function getCharacterNameKey(
  arg: number | { characterID: number }
): string {
  if (_.isNumber(arg)) {
    return `character.name.${arg}`;
  } else {
    return `character.name.${arg.characterID}`;
  }
}

export function getMonikerKey(characterID: number, monikerID: number): string;
export function getMonikerKey(obj: {
  characterID: number;
  monikerID: number;
}): string;
export function getMonikerKey(
  arg1: number | { characterID: number; monikerID: number },
  arg2?: number
): string {
  if (_.isNumber(arg1)) {
    return `character.moniker.${arg1}_${arg2}`;
  } else {
    return `character.moniker.${arg1.characterID}_${arg1.monikerID}`;
  }
}
