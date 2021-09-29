import { Skill as _Skill, SkillList } from "@/data/_protobuf";
import type { MonikerIdentify, TalentLevel } from "@/data";
import axios from "axios";
import { maps, objects } from "@/util";
import _ from "@/util/lodash";
import skillDataUrl from "#/assets/data/skill.dat?url";

const { orDefault, immutable } = objects;

//TODO: スキルタイプ リファクタリングする

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
  | "weak-race"
  | "buff-speed-team"
  | "buff-acceleration-team"
  | "buff-positioning-team"
  | "recovery-stamina-team"
  | "weak-demonstrate";

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

export type UniqueSkill = Skill & {
  readonly unique: true;
  readonly characterID: number;
  readonly monikerID: number;
  readonly matchingTalentLevels: ReadonlyArray<TalentLevel>;
  readonly inheritable: boolean;
};

export type UniqueSkillLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type UniqueSkillOwner = MonikerIdentify & {
  talentLevel: TalentLevel;
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

export const NULL_SKILL = immutable<UniqueSkill>({
  skillID: -1,
  sortID: -1,
  point: 0,
  type: "buff-speed",
  advanced: false,
  unique: true,
  characterID: -1,
  monikerID: -1,
  matchingTalentLevels: [1, 2, 3, 4, 5],
  inheritable: false,
});

const _checkUnique = _.memoize(
  (skill: Skill): skill is UniqueSkill =>
    skill.unique &&
    _.has(skill, "characterID") &&
    _.has(skill, "monikerID") &&
    _.has(skill, "matchingTalentLevels") &&
    _.has(skill, "inheritable")
);

let _allSkill: ReadonlyArray<Skill>;
let _allUniqueSkill: ReadonlyArray<UniqueSkill>;
let _skillByIdMap: Record<number, Skill>;
(async () => {
  const data = await axios
    .get<ArrayBuffer>(skillDataUrl, { responseType: "arraybuffer" })
    .then((x) => new Uint8Array(x.data))
    .catch(() => Promise.resolve(new Uint8Array()));

  _allSkill = Object.freeze(
    _.sortBy(
      SkillList.decode(data).data.map((x) => {
        const type = ((): SkillType => {
          switch (orDefault(x.type, _Skill.Type.BUFF_SPEED)) {
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
            case _Skill.Type.BUFF_SPEED_TEAM:
              return "buff-speed-team";
            case _Skill.Type.BUFF_ACCELERATION_TEAM:
              return "buff-acceleration-team";
            case _Skill.Type.BUFF_POSITIONING_TEAM:
              return "buff-positioning-team";
            case _Skill.Type.RECOVERY_STAMINA_TEAM:
              return "recovery-stamina-team";
            case _Skill.Type.WEAK_DEMONSTRATE:
              return "weak-demonstrate";
          }
        })();

        let skill: Skill = {
          skillID: orDefault(x.skillID, -1),
          sortID: orDefault(x.sortID, -1),
          point: orDefault(x.point, 0),
          type,
          advanced: orDefault(x.advanced, false),
          unique: orDefault(x.unique, false),
        };

        if (_.has(x, "conflictID") && _.isNumber(x.conflictID)) {
          skill = {
            ...skill,
            conflictID: x.conflictID,
          };
        }

        if (skill.unique) {
          const matchingTalentLevels = ((): Array<TalentLevel> => {
            switch (
              orDefault(x.matchingTalentLevels, _Skill.Levels.FROM_1_TO_2)
            ) {
              case _Skill.Levels.FROM_1_TO_2:
                return [1, 2];
              case _Skill.Levels.FROM_3_TO_5:
                return [3, 4, 5];
            }
          })();

          return immutable<UniqueSkill>({
            ...skill,
            unique: true,
            characterID: orDefault(x.characterID, -1),
            monikerID: orDefault(x.monikerID, -1),
            matchingTalentLevels,
            inheritable: orDefault(x.inheritable, false),
          });
        } else {
          return immutable<Skill>(skill);
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
  "weak-demonstrate",
  "buff-speed-team",
  "buff-acceleration-team",
  "buff-positioning-team",
  "recovery-stamina-team",
]);

export const Skill: SkillStatic = {
  get all(): ReadonlyArray<Skill> {
    return orDefault(_allSkill, () => Object.freeze([]));
  },
  get allType(): ReadonlyArray<SkillType> {
    return _allSkillType;
  },
  get(arg: number | SkillIdentify): Skill {
    const map = orDefault(_skillByIdMap, []);
    return orDefault(map[_.isNumber(arg) ? arg : arg.skillID], NULL_SKILL);
  },
  checkUnique: _checkUnique,
  isMatchedOwner(skill: UniqueSkill, owner: UniqueSkillOwner): boolean {
    return (
      skill.characterID === owner.characterID &&
      skill.monikerID === owner.monikerID &&
      skill.matchingTalentLevels.includes(owner.talentLevel)
    );
  },
  getUnique(owner: UniqueSkillOwner): UniqueSkill {
    const map = orDefault(_allUniqueSkill, []);
    return orDefault(
      map.find((x) => this.isMatchedOwner(x, owner)),
      NULL_SKILL
    );
  },
  getNameKey(arg: number | SkillIdentify): string {
    const skillID = _.isNumber(arg) ? arg : arg.skillID;
    return `skill.${skillID}.name`;
  },
};
