import { toRaw } from "vue";
import {
  AbilityGrade,
  Ability as AbilityName,
  FactorLevel,
  TalentLevel,
} from "@/data";
import Dexie from "dexie";

type ID = {
  id?: number;
};

type Character = Required<ID> & {
  characterID: number;
  monikerID: number;
  talentLevel: TalentLevel;
  awakeLevel: number;
  uniqueSkillLevel: number;
};

type Status = Required<ID> & {
  speed: number;
  stamina: number;
  power: number;
  tenacity: number;
  intelligence: number;
};

type Ability = Required<ID> & Record<AbilityName, AbilityGrade>;

type Skill = Required<ID> & {
  skillID: number;
};

type Factor = Required<ID> & {
  factorID: number;
  factorLevel: FactorLevel;
};

type History = Required<ID> & {
  fansNumber: number;
  score: number;
  registerDate: Date;
};

export type CharacterDto = Omit<Character, "id">;

export function CharacterDto(
  arg: Character | CharacterDto | undefined = undefined
): CharacterDto {
  return {
    characterID: arg?.characterID || 0,
    monikerID: arg?.monikerID || 0,
    talentLevel: arg?.talentLevel || 3,
    awakeLevel: arg?.awakeLevel || 1,
    uniqueSkillLevel: arg?.uniqueSkillLevel || 1,
  };
}

export type StatusDto = Omit<Status, "id">;

export function StatusDto(
  arg: Status | StatusDto | undefined = undefined
): StatusDto {
  return {
    speed: arg?.speed || 0,
    stamina: arg?.stamina || 0,
    power: arg?.power || 0,
    tenacity: arg?.tenacity || 0,
    intelligence: arg?.intelligence || 0,
  };
}

export type AbilityDto = Omit<Ability, "id">;

export function AbilityDto(
  arg: Ability | AbilityDto | undefined = undefined
): AbilityDto {
  return {
    turf: arg?.turf || "g",
    dirt: arg?.dirt || "g",
    short: arg?.short || "g",
    mile: arg?.mile || "g",
    middle: arg?.middle || "g",
    long: arg?.long || "g",
    nige: arg?.nige || "g",
    senko: arg?.senko || "g",
    sashi: arg?.sashi || "g",
    oikomi: arg?.oikomi || "g",
  };
}

export type SkillDto = Omit<Skill, "id">;

export function SkillDto(
  arg: Skill | SkillDto | undefined = undefined
): SkillDto {
  return {
    skillID: arg?.skillID || 0,
  };
}

export type FactorDto = Omit<Factor, "id">;

export function FactorDto(
  arg: Factor | FactorDto | undefined = undefined
): FactorDto {
  return {
    factorID: arg?.factorID || 0,
    factorLevel: arg?.factorLevel || 1,
  };
}

export type HistoryDto = Omit<History, "id">;

export function HistoryDto(
  arg: History | HistoryDto | undefined = undefined
): HistoryDto {
  return {
    fansNumber: arg?.fansNumber || 0,
    score: arg?.score || 0,
    registerDate: arg?.registerDate || new Date(),
  };
}

export type Dto = {
  id?: number;
  character: CharacterDto;
  status: StatusDto;
  ability: AbilityDto;
  skills: Array<SkillDto>;
  factors: Array<FactorDto>;
  history: HistoryDto;
};

export function Dto(arg: Dto | undefined = undefined): Dto {
  return {
    id: arg?.id,
    character: CharacterDto(arg?.character),
    status: StatusDto(arg?.status),
    ability: AbilityDto(arg?.ability),
    skills: [...(arg?.skills || [])],
    factors: [...(arg?.factors || [])],
    history: HistoryDto(arg?.history),
  };
}

class Database extends Dexie {
  public readonly IDs: Dexie.Table<ID, number>;
  public readonly characters: Dexie.Table<Character, number>;
  public readonly status: Dexie.Table<Status, number>;
  public readonly ability: Dexie.Table<Ability, number>;
  public readonly skills: Dexie.Table<Skill, number>;
  public readonly factors: Dexie.Table<Factor, number>;
  public readonly histories: Dexie.Table<History, number>;

  public constructor() {
    super("prettydb-hall-of-fame");

    this.version(3).stores({
      IDs: "++id",
      characters:
        "&id,characterID,monikerID,talentLevel,awakeLevel,uniqueSkillLevel",
      status: "&id,speed,stamina,power,tenacity,intelligence",
      ability: "&id,turf,dirt,short,mile,middle,long,nige,senko,sashi,oikomi",
      skills: "++,id,skillID",
      factors: "++,id,factorID,factorLevel",
      histories: "&id,fansNumber,score,registerDate",
    });

    this.IDs = this.table("IDs");
    this.characters = this.table("characters");
    this.status = this.table("status");
    this.ability = this.table("ability");
    this.skills = this.table("skills");
    this.factors = this.table("factors");
    this.histories = this.table("histories");
  }
}

export const db = new Database();

export async function fetch(id: number): Promise<Dto> {
  return db.transaction(
    "r",
    [
      db.IDs,
      db.characters,
      db.status,
      db.ability,
      db.skills,
      db.factors,
      db.histories,
    ],
    () => {
      return db.IDs.where("id")
        .equals(id)
        .first()
        .then(() => {
          return Promise.all([
            db.characters.where("id").equals(id).first(),
            db.status.where("id").equals(id).first(),
            db.ability.where("id").equals(id).first(),
            db.skills.where("id").equals(id).toArray(),
            db.factors.where("id").equals(id).toArray(),
            db.histories.where("id").equals(id).first(),
          ]).then(([character, status, ability, skills, factors, history]) => {
            return Promise.resolve(
              Dto({
                id,
                character: CharacterDto(character),
                status: StatusDto(status),
                ability: AbilityDto(ability),
                skills: skills.map(SkillDto),
                factors: factors.map(FactorDto),
                history: HistoryDto(history),
              })
            );
          });
        });
    }
  );
}

export async function upsert(dto: Dto): Promise<void> {
  return db.transaction(
    "rw",
    [
      db.IDs,
      db.characters,
      db.status,
      db.ability,
      db.skills,
      db.factors,
      db.histories,
    ],
    () => {
      return db.IDs.put({ id: dto.id }).then((id) => {
        const _dto = toRaw(dto);
        return Promise.all([
          db.characters.put({ id, ..._dto.character }),
          db.status.put({ id, ..._dto.status }),
          db.ability.put({ id, ..._dto.ability }),
          db.skills
            .where("id")
            .equals(id)
            .delete()
            .then(() =>
              db.skills.bulkPut(_dto.skills.map((x) => ({ id, ...x })))
            ),
          db.factors
            .where("id")
            .equals(id)
            .delete()
            .then(() =>
              db.factors.bulkPut(_dto.factors.map((x) => ({ id, ...x })))
            ),
          db.histories.put({ id, ..._dto.history }),
        ])
          .then(() => {
            return Promise.resolve();
          })
          .catch(() => {
            console.error("failed to upsert...\n" + JSON.stringify(dto));
            return Promise.reject();
          });
      });
    }
  );
}
