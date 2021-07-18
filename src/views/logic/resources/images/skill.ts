import { SkillType, SkillTypes } from "@/data";
import SKILL_TYPE_BUFF_SPEED from "#/images/skill/buff_speed.svg";
import SKILL_TYPE_BUFF_ACCELERATION from "#/images/skill/buff_acceleration.svg";
import SKILL_TYPE_BUFF_POSITIONING from "#/images/skill/buff_positioning.svg";
import SKILL_TYPE_BUFF_VISION from "#/images/skill/buff_vision.svg";
import SKILL_TYPE_BUFF_STARTING from "#/images/skill/buff_starting.svg";
import SKILL_TYPE_DEBUFF_SPEED from "#/images/skill/debuff_speed.svg";
import SKILL_TYPE_DEBUFF_STAMINA from "#/images/skill/debuff_stamina.svg";
import SKILL_TYPE_DEBUFF_AGITATION from "#/images/skill/debuff_agitation.svg";
import SKILL_TYPE_DEBUFF_CALM from "#/images/skill/debuff_calm.svg";
import SKILL_TYPE_DEBUFF_VISION from "#/images/skill/debuff_vision.svg";
import SKILL_TYPE_RECOVERY_STAMINA from "#/images/skill/recovery_stamina.svg";
import SKILL_TYPE_SUPPORT_SPEED from "#/images/skill/support_speed.svg";
import SKILL_TYPE_SUPPORT_STAMINA from "#/images/skill/support_stamina.svg";
import SKILL_TYPE_SUPPORT_POWER from "#/images/skill/support_power.svg";
import SKILL_TYPE_SUPPORT_TENACITY from "#/images/skill/support_tenacity.svg";
import SKILL_TYPE_SUPPORT_GENERAL from "#/images/skill/support_general.svg";
import SKILL_TYPE_SUPPORT_STRATEGY from "#/images/skill/support_strategy.svg";
import SKILL_TYPE_WEAK_STAMINA from "#/images/skill/weak_stamina.svg";
import SKILL_TYPE_WEAK_STARTING from "#/images/skill/weak_starting.svg";

export function getSkillTypeIcon(type: SkillType): string {
  switch (type) {
    case SkillTypes.BUFF_SPEED:
      return SKILL_TYPE_BUFF_SPEED;
    case SkillTypes.BUFF_ACCELERATION:
      return SKILL_TYPE_BUFF_ACCELERATION;
    case SkillTypes.BUFF_POSITIONING:
      return SKILL_TYPE_BUFF_POSITIONING;
    case SkillTypes.BUFF_VISION:
      return SKILL_TYPE_BUFF_VISION;
    case SkillTypes.BUFF_STARTING:
      return SKILL_TYPE_BUFF_STARTING;
    case SkillTypes.DEBUFF_SPEED:
      return SKILL_TYPE_DEBUFF_SPEED;
    case SkillTypes.DEBUFF_STAMINA:
      return SKILL_TYPE_DEBUFF_STAMINA;
    case SkillTypes.DEBUFF_AGITATION:
      return SKILL_TYPE_DEBUFF_AGITATION;
    case SkillTypes.DEBUFF_CALM:
      return SKILL_TYPE_DEBUFF_CALM;
    case SkillTypes.DEBUFF_VISION:
      return SKILL_TYPE_DEBUFF_VISION;
    case SkillTypes.RECOVERY_STAMINA:
      return SKILL_TYPE_RECOVERY_STAMINA;
    case SkillTypes.SUPPORT_SPEED:
      return SKILL_TYPE_SUPPORT_SPEED;
    case SkillTypes.SUPPORT_STAMINA:
      return SKILL_TYPE_SUPPORT_STAMINA;
    case SkillTypes.SUPPORT_POWER:
      return SKILL_TYPE_SUPPORT_POWER;
    case SkillTypes.SUPPORT_TENACITY:
      return SKILL_TYPE_SUPPORT_TENACITY;
    case SkillTypes.SUPPORT_GENERAL:
      return SKILL_TYPE_SUPPORT_GENERAL;
    case SkillTypes.SUPPORT_STRATEGY:
      return SKILL_TYPE_SUPPORT_STRATEGY;
    case SkillTypes.WEAK_STAMINA:
      return SKILL_TYPE_WEAK_STAMINA;
    case SkillTypes.WEAK_STARTING:
      return SKILL_TYPE_WEAK_STARTING;
    default:
      console.warn("Illegal skill type: " + type);
      return SKILL_TYPE_BUFF_SPEED;
  }
}
