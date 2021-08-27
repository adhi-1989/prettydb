import { SkillType } from "@/data";
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
import WEAK_FATIGUE from "#/images/skill/weak_fatigue.svg";
import WEAK_STARTING from "#/images/skill/weak_starting.svg";
import WEAK_MENTAL from "#/images/skill/weak_mental.svg";
import WEAK_WILL from "#/images/skill/weak_will.svg";
import WEAK_RACE from "#/images/skill/weak_race.svg";

export const SkillTypeIcon = {
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
  WEAK_FATIGUE,
  WEAK_STARTING,
  WEAK_MENTAL,
  WEAK_WILL,
  WEAK_RACE,
};

export function getSkillTypeIcon(type: SkillType): string {
  switch (type) {
    case "buff-speed":
      return SkillTypeIcon.BUFF_SPEED;
    case "buff-acceleration":
      return SkillTypeIcon.BUFF_ACCELERATION;
    case "buff-positioning":
      return SkillTypeIcon.BUFF_POSITIONING;
    case "buff-vision":
      return SkillTypeIcon.BUFF_VISION;
    case "buff-starting":
      return SkillTypeIcon.BUFF_STARTING;
    case "debuff-speed":
      return SkillTypeIcon.DEBUFF_SPEED;
    case "debuff-stamina":
      return SkillTypeIcon.DEBUFF_STAMINA;
    case "debuff-agitation":
      return SkillTypeIcon.DEBUFF_AGITATION;
    case "debuff-calm":
      return SkillTypeIcon.DEBUFF_CALM;
    case "debuff-vision":
      return SkillTypeIcon.DEBUFF_VISION;
    case "recovery-stamina":
      return SkillTypeIcon.RECOVERY_STAMINA;
    case "support-speed":
      return SkillTypeIcon.SUPPORT_SPEED;
    case "support-stamina":
      return SkillTypeIcon.SUPPORT_STAMINA;
    case "support-power":
      return SkillTypeIcon.SUPPORT_POWER;
    case "support-tenacity":
      return SkillTypeIcon.SUPPORT_TENACITY;
    case "support-general":
      return SkillTypeIcon.SUPPORT_GENERAL;
    case "support-strategy":
      return SkillTypeIcon.SUPPORT_STRATEGY;
    case "weak-fatigue":
      return SkillTypeIcon.WEAK_FATIGUE;
    case "weak-starting":
      return SkillTypeIcon.WEAK_STARTING;
    case "weak-mental":
      return SkillTypeIcon.WEAK_MENTAL;
    case "weak-will":
      return SkillTypeIcon.WEAK_WILL;
    case "weak-race":
      return SkillTypeIcon.WEAK_RACE;
    default:
      console.warn("Illegal skill type: " + type);
      return SkillTypeIcon.BUFF_SPEED;
  }
}
