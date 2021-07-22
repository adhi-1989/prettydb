import _ from "@/util/lodash";
import { CharacterIdentify, MonikerIdentify } from "@/data";

export function getCharacterNameKey(characterID: number): string;
export function getCharacterNameKey(identify: CharacterIdentify): string;
export function getCharacterNameKey(arg: number | CharacterIdentify): string {
  if (_.isNumber(arg)) {
    return `character.${arg}.name`;
  } else {
    return `character.${arg.characterID}.name`;
  }
}

export function getMonikerKey(characterID: number, monikerID: number): string;
export function getMonikerKey(identify: MonikerIdentify): string;
export function getMonikerKey(
  arg1: number | MonikerIdentify,
  arg2?: number
): string {
  if (_.isNumber(arg1)) {
    if (!_.isNumber(arg2)) throw Error(`arg2 must be number: ${arg2}`);
    return `character.${arg1}.moniker.${arg2}.name`;
  } else {
    return `character.${arg1.characterID}.moniker.${arg1.monikerID}.name`;
  }
}
