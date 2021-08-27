import MISSING from "#/images/portrait/missing.png";
import { MonikerIdentify } from "@/data";

export function getPortrait(characterID: number, monikerID: number): string;
export function getPortrait(identify: MonikerIdentify): string;
export function getPortrait(
  arg1: number | MonikerIdentify,
  arg2?: number
): string {
  return MISSING;
}
