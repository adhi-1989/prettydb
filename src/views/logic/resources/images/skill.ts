import { SkillType, SkillTypes } from "@/data";
import BUFF_SPEED from "#/images/skill/buff_speed.svg";
import BUFF_ACCELERATION from "#/images/skill/buff_acceleration.svg";
import BUFF_POSITIONING from "#/images/skill/buff_positioning.svg";
import BUFF_VISION from "#/images/skill/buff_vision.svg";
import BUFF_STARTING from "#/images/skill/buff_starting.svg";
import DEBUFF_SPEED from "#/images/skill/debuff_speed.svg";
import DEBUFF_STAMINA from "#/images/skill/debuff_stamina.svg";
import DEBUFF_AGITATION from "#/images/skill/debuff_agitation.svg";
import DEBUFF_CALM from "#/images/skill/debuff_calm.svg";
import DEBUFF_VISION from "#/images/skill/debuff_vision.svg";
import RECOVERY_STAMINA from "#/images/skill/recovery_stamina.svg";
import SUPPORT_SPEED from "#/images/skill/support_speed.svg";
import SUPPORT_STAMINA from "#/images/skill/support_stamina.svg";
import SUPPORT_POWER from "#/images/skill/support_power.svg";
import SUPPORT_TENACITY from "#/images/skill/support_tenacity.svg";
import SUPPORT_GENERAL from "#/images/skill/support_general.svg";
import SUPPORT_STRATEGY from "#/images/skill/support_strategy.svg";
import WEAK_STAMINA from "#/images/skill/weak_stamina.svg";
import WEAK_STARTING from "#/images/skill/weak_starting.svg";

export const SkillTypeIcons = {
  BUFF_SPEED,
  BUFF_ACCELERATION,
  BUFF_POSITIONING,
  BUFF_VISION,
  BUFF_STARTING,
  DEBUFF_SPEED,
  DEBUFF_STAMINA,
  DEBUFF_AGITATION,
  DEBUFF_CALM,
  DEBUFF_VISION,
  RECOVERY_STAMINA,
  SUPPORT_SPEED,
  SUPPORT_STAMINA,
  SUPPORT_POWER,
  SUPPORT_TENACITY,
  SUPPORT_GENERAL,
  SUPPORT_STRATEGY,
  WEAK_STAMINA,
  WEAK_STARTING,
};

export function getSkillTypeIcon(type: SkillType): string {
  switch (type) {
    case SkillTypes.BUFF_SPEED:
      return BUFF_SPEED;
    case SkillTypes.BUFF_ACCELERATION:
      return BUFF_ACCELERATION;
    case SkillTypes.BUFF_POSITIONING:
      return BUFF_POSITIONING;
    case SkillTypes.BUFF_VISION:
      return BUFF_VISION;
    case SkillTypes.BUFF_STARTING:
      return BUFF_STARTING;
    case SkillTypes.DEBUFF_SPEED:
      return DEBUFF_SPEED;
    case SkillTypes.DEBUFF_STAMINA:
      return DEBUFF_STAMINA;
    case SkillTypes.DEBUFF_AGITATION:
      return DEBUFF_AGITATION;
    case SkillTypes.DEBUFF_CALM:
      return DEBUFF_CALM;
    case SkillTypes.DEBUFF_VISION:
      return DEBUFF_VISION;
    case SkillTypes.RECOVERY_STAMINA:
      return RECOVERY_STAMINA;
    case SkillTypes.SUPPORT_SPEED:
      return SUPPORT_SPEED;
    case SkillTypes.SUPPORT_STAMINA:
      return SUPPORT_STAMINA;
    case SkillTypes.SUPPORT_POWER:
      return SUPPORT_POWER;
    case SkillTypes.SUPPORT_TENACITY:
      return SUPPORT_TENACITY;
    case SkillTypes.SUPPORT_GENERAL:
      return SUPPORT_GENERAL;
    case SkillTypes.SUPPORT_STRATEGY:
      return SUPPORT_STRATEGY;
    case SkillTypes.WEAK_STAMINA:
      return WEAK_STAMINA;
    case SkillTypes.WEAK_STARTING:
      return WEAK_STARTING;
    default:
      console.warn("Illegal skill type: " + type);
      return BUFF_SPEED;
  }
}
