import { SkillList, Skill as _Skill } from "@/data/_protobuf";
import { MonikerIdentify } from "@/data";
import { maps, objects } from "@/util";
import _ from "@/util/lodash";
import skillDataUrl from "#/assets/data/skill.dat?url";
import axios from "axios";

export type SkillType =
  | "buff-speed"
  | "buff-acceleration"
  | "buff-positioning"
  | "buff-vision"
  | "buff-starting"
  | "debuff-speed"
  | "debuff-stamina"
  | "debuff-agitation"
  | "debuff-calm"
  | "debuff-vision"
  | "recovery-stamina"
  | "support-speed"
  | "support-stamina"
  | "support-power"
  | "support-tenacity"
  | "support-general"
  | "support-strategy"
  | "weak-fatigue"
  | "weak-starting"
  | "weak-mental"
  | "weak-will"
  | "weak-race";

export type SkillIdentify = {
  skillID: number;
};

export type Skill = Readonly<SkillIdentify> & {
  readonly sortID: number;
  readonly point: number;
  readonly type: SkillType;
  readonly conflictID?: number;
  readonly advanced: boolean;
  readonly unique: boolean;
};

type TalentLevelMatcher = (id: number) => boolean;

export type UniqueSkill = Skill & {
  readonly unique: true;
  readonly characterID: number;
  readonly monikerID: number;
  readonly isMatchedTalentLevel: TalentLevelMatcher;
  readonly inheritable: boolean;
};

const _from_1_to_5: TalentLevelMatcher = (id) => id >= 1 && id <= 5;
const _from_1_to_2: TalentLevelMatcher = (id) => id >= 1 && id <= 2;
const _from_3_to_5: TalentLevelMatcher = (id) => id >= 3 && id <= 5;

export type UniqueSkillLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type UniqueSkillOwner = MonikerIdentify & {
  talentLevel: number;
};

export interface SkillStatic {
  get all(): ReadonlyArray<Skill>;

  get allType(): ReadonlyArray<SkillType>;

  get(skillID: number): Skill;

  get(identify: SkillIdentify): Skill;

  checkUnique(skill: Skill): skill is UniqueSkill;

  isMatchedOwner(skill: UniqueSkill, owner: UniqueSkillOwner): boolean;

  getUnique(owner: UniqueSkillOwner): UniqueSkill;

  getNameKey(skillID: number): string;

  getNameKey(identify: SkillIdentify): string;
}

export const NULL_SKILL = Object.freeze<UniqueSkill>({
  skillID: -1,
  sortID: -1,
  point: 0,
  type: "buff-speed",
  advanced: false,
  unique: true,
  characterID: -1,
  monikerID: -1,
  isMatchedTalentLevel: _from_1_to_5,
  inheritable: false,
});

const _checkUnique = _.memoize(
  (skill: Skill): skill is UniqueSkill =>
    skill.unique &&
    _.has(skill, "characterID") &&
    _.has(skill, "monikerID") &&
    _.has(skill, "isMatchedTalentLevel") &&
    _.has(skill, "inheritable")
);

let _allSkill: ReadonlyArray<Skill>;
let _allUniqueSkill: ReadonlyArray<UniqueSkill>;
let _skillByIdMap: Record<number, Skill>;
(async () => {
  const skillType = (value: _Skill.Type | null | undefined): SkillType => {
    switch (objects.orDefault(value, _Skill.Type.BUFF_SPEED)) {
      case _Skill.Type.BUFF_SPEED:
        return "buff-speed";
      case _Skill.Type.BUFF_ACCELERATION:
        return "buff-acceleration";
      case _Skill.Type.BUFF_POSITIONING:
        return "buff-positioning";
      case _Skill.Type.BUFF_VISION:
        return "buff-vision";
      case _Skill.Type.BUFF_STARTING:
        return "buff-starting";
      case _Skill.Type.DEBUFF_SPEED:
        return "debuff-speed";
      case _Skill.Type.DEBUFF_STAMINA:
        return "debuff-stamina";
      case _Skill.Type.DEBUFF_AGITATION:
        return "debuff-agitation";
      case _Skill.Type.DEBUFF_CALM:
        return "debuff-calm";
      case _Skill.Type.DEBUFF_VISION:
        return "debuff-vision";
      case _Skill.Type.RECOVERY_STAMINA:
        return "recovery-stamina";
      case _Skill.Type.SUPPORT_SPEED:
        return "support-speed";
      case _Skill.Type.SUPPORT_STAMINA:
        return "support-stamina";
      case _Skill.Type.SUPPORT_POWER:
        return "support-power";
      case _Skill.Type.SUPPORT_TENACITY:
        return "support-tenacity";
      case _Skill.Type.SUPPORT_GENERAL:
        return "support-general";
      case _Skill.Type.SUPPORT_STRATEGY:
        return "support-strategy";
      case _Skill.Type.WEAK_FATIGUE:
        return "weak-fatigue";
      case _Skill.Type.WEAK_STARTING:
        return "weak-starting";
      case _Skill.Type.WEAK_MENTAL:
        return "weak-mental";
      case _Skill.Type.WEAK_WILL:
        return "weak-will";
      case _Skill.Type.WEAK_RACE:
        return "weak-race";
      default:
        return "buff-speed";
    }
  };
  const talentLevelMatcher = (
    value: _Skill.TalentLevelMatcher | null | undefined
  ): TalentLevelMatcher => {
    switch (objects.orDefault(value, _Skill.TalentLevelMatcher.FROM_1_TO_5)) {
      case _Skill.TalentLevelMatcher.FROM_1_TO_5:
        return _from_1_to_5;
      case _Skill.TalentLevelMatcher.FROM_1_TO_2:
        return _from_1_to_2;
      case _Skill.TalentLevelMatcher.FROM_3_TO_5:
        return _from_3_to_5;
    }
  };

  const data = await axios
    .get<ArrayBuffer>(skillDataUrl, { responseType: "arraybuffer" })
    .then((x) => new Uint8Array(x.data));

  _allSkill = Object.freeze(
    _.sortBy(
      SkillList.decode(data).data.map((x) => {
        let skill = Object.freeze<Skill>({
          skillID: objects.orDefault(x.skillID, -1),
          sortID: objects.orDefault(x.sortID, -1),
          point: objects.orDefault(x.point, 0),
          type: skillType(x.type),
          advanced: objects.orDefault(x.advanced, false),
          unique: objects.orDefault(x.unique, false),
        });

        if (_.has(x, "conflictID") && _.isNumber(x.conflictID)) {
          skill = Object.freeze<Skill>({
            ...skill,
            conflictID: x.conflictID,
          });
        }

        if (skill.unique) {
          return objects.immutable<UniqueSkill>({
            ...skill,
            unique: true,
            characterID: objects.orDefault(x.characterID, -1),
            monikerID: objects.orDefault(x.monikerID, -1),
            isMatchedTalentLevel: talentLevelMatcher(x.talentLevelMatcher),
            inheritable: objects.orDefault(x.inheritable, false),
          });
        } else {
          return objects.immutable<Skill>(skill);
        }
      }),
      ["sortID"]
    )
  );
  _allUniqueSkill = Object.freeze(_allSkill.filter(_checkUnique));
  _skillByIdMap = Object.freeze(
    maps.NumberMap(_allSkill.map((x) => [x.skillID, x]))
  );
})();

const _allSkillType = Object.freeze<Array<SkillType>>([
  "buff-speed",
  "buff-acceleration",
  "buff-positioning",
  "buff-vision",
  "buff-starting",
  "debuff-speed",
  "debuff-stamina",
  "debuff-agitation",
  "debuff-calm",
  "debuff-vision",
  "recovery-stamina",
  "support-speed",
  "support-stamina",
  "support-power",
  "support-tenacity",
  "support-general",
  "support-strategy",
  "weak-fatigue",
  "weak-starting",
  "weak-mental",
  "weak-will",
  "weak-race",
]);

export const Skill: SkillStatic = {
  get all(): ReadonlyArray<Skill> {
    return objects.orDefault(_allSkill, () => Object.freeze([]));
  },
  get allType(): ReadonlyArray<SkillType> {
    return _allSkillType;
  },
  get(arg: number | SkillIdentify): Skill {
    const map = objects.orDefault(_skillByIdMap, []);
    return objects.orDefault(
      map[_.isNumber(arg) ? arg : arg.skillID],
      NULL_SKILL
    );
  },
  checkUnique: _checkUnique,
  isMatchedOwner(skill: UniqueSkill, owner: UniqueSkillOwner): boolean {
    return (
      skill.characterID === owner.characterID &&
      skill.monikerID === owner.monikerID &&
      skill.isMatchedTalentLevel(owner.talentLevel)
    );
  },
  getUnique(owner: UniqueSkillOwner): UniqueSkill {
    const map = objects.orDefault(_allUniqueSkill, []);
    return objects.orDefault(
      map.find((x) => this.isMatchedOwner(x, owner)),
      NULL_SKILL
    );
  },
  getNameKey(arg: number | SkillIdentify): string {
    const skillID = _.isNumber(arg) ? arg : arg.skillID;
    return `skill.${skillID}.name`;
  },
};
