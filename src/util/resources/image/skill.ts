import { SkillType, SkillTypes } from "/@/data";
import SKILL_TYPE_BUFF_SPEED from "/assets/image/skill/buff/speed.svg?url";
import SKILL_TYPE_BUFF_ACCELERATION from "/assets/image/skill/buff/acceleration.svg?url";
import SKILL_TYPE_BUFF_POSITIONING from "/assets/image/skill/buff/positioning.svg?url";
import SKILL_TYPE_BUFF_VISION from "/assets/image/skill/buff/vision.svg?url";
import SKILL_TYPE_BUFF_STARTING from "/assets/image/skill/buff/starting.svg?url";
import SKILL_TYPE_DEBUFF_SPEED from "/assets/image/skill/debuff/speed.svg?url";
import SKILL_TYPE_DEBUFF_STAMINA from "/assets/image/skill/debuff/stamina.svg?url";
import SKILL_TYPE_DEBUFF_AGITATION from "/assets/image/skill/debuff/agitation.svg?url";
import SKILL_TYPE_DEBUFF_CALM from "/assets/image/skill/debuff/calm.svg?url";
import SKILL_TYPE_DEBUFF_VISION from "/assets/image/skill/debuff/vision.svg?url";
import SKILL_TYPE_RECOVERY_STAMINA from "/assets/image/skill/recovery/stamina.svg?url";
import SKILL_TYPE_SUPPORT_SPEED from "/assets/image/skill/support/speed.svg?url";
import SKILL_TYPE_SUPPORT_STAMINA from "/assets/image/skill/support/stamina.svg?url";
import SKILL_TYPE_SUPPORT_POWER from "/assets/image/skill/support/power.svg?url";
import SKILL_TYPE_SUPPORT_TENACITY from "/assets/image/skill/support/tenacity.svg?url";
import SKILL_TYPE_SUPPORT_GENERAL from "/assets/image/skill/support/general.svg?url";
import SKILL_TYPE_SUPPORT_STRATEGY from "/assets/image/skill/support/strategy.svg?url";
import SKILL_TYPE_WEAK_STAMINA from "/assets/image/skill/weak/stamina.svg?url";
import SKILL_TYPE_WEAK_STARTING from "/assets/image/skill/weak/starting.svg?url";

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
