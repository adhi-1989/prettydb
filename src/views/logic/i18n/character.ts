import _ from "@/util/lodash";

export function getCharacterNameKey(characterID: number): string;
export function getCharacterNameKey(obj: { characterID: number }): string;
export function getCharacterNameKey(
  arg: number | { characterID: number }
): string {
  if (_.isNumber(arg)) {
    return `character.${arg}.name`;
  } else {
    return `character.${arg.characterID}.name`;
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
    return `character.${arg1}.moniker.${arg2}.name`;
  } else {
    return `character.${arg1.characterID}.moniker.${arg1.monikerID}.name`;
  }
}
