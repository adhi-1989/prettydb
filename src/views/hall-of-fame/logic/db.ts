import Dexie from "dexie";
import { objects } from "@/util";
import {
  AbilityGrade,
  AbilityIdentify,
  AwakeningLevel,
  FactorLevel,
  TalentLevel,
  UniqueSkillLevel,
} from "@/data";

type ID = {
  id?: number;
};

type Character = Required<ID> & {
  characterID: number;
  monikerID: number;
  talentLevel: TalentLevel;
  awakeningLevel: AwakeningLevel;
};

type Status = Required<ID> & {
  speed: number;
  stamina: number;
  power: number;
  tenacity: number;
  intelligence: number;
};

type Ability = Required<ID> & Record<AbilityIdentify, AbilityGrade>;

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

type Metadata = Required<ID> & {
  uniqueSkillLevel: UniqueSkillLevel;
  transferred: boolean;
  rental: boolean;
};

export type CharacterDto = Omit<Character, "id">;
export type StatusDto = Omit<Status, "id">;
export type AbilityDto = Omit<Ability, "id">;
export type SkillDto = Omit<Skill, "id">;
export type FactorDto = Omit<Factor, "id">;
export type HistoryDto = Omit<History, "id">;
export type MetadataDto = Omit<Metadata, "id">;
export type Dto = ID & {
  character: CharacterDto;
  status: StatusDto;
  ability: AbilityDto;
  skills: Array<SkillDto>;
  factors: Array<FactorDto>;
  history: HistoryDto;
  metadata: MetadataDto;
};

export function CharacterDto(
  {
    characterID,
    monikerID,
    talentLevel,
    awakeningLevel,
  }: Character | CharacterDto = {
    characterID: 0,
    monikerID: 0,
    talentLevel: 3,
    awakeningLevel: 1,
  }
): CharacterDto {
  return {
    characterID,
    monikerID,
    talentLevel,
    awakeningLevel,
  };
}

export function StatusDto(
  { speed, stamina, power, tenacity, intelligence }: Status | StatusDto = {
    speed: 0,
    stamina: 0,
    power: 0,
    tenacity: 0,
    intelligence: 0,
  }
): StatusDto {
  return { speed, stamina, power, tenacity, intelligence };
}

export function AbilityDto(
  {
    turf,
    dirt,
    short,
    mile,
    middle,
    long,
    nige,
    senko,
    sashi,
    oikomi,
  }: Ability | AbilityDto = {
    turf: "g",
    dirt: "g",
    short: "g",
    mile: "g",
    middle: "g",
    long: "g",
    nige: "g",
    senko: "g",
    sashi: "g",
    oikomi: "g",
  }
): AbilityDto {
  return { turf, dirt, short, mile, middle, long, nige, senko, sashi, oikomi };
}

export function SkillDto(
  { skillID }: Skill | SkillDto = { skillID: 0 }
): SkillDto {
  return { skillID };
}

export function FactorDto(
  { factorID, factorLevel }: Factor | FactorDto = {
    factorID: 0,
    factorLevel: 1,
  }
): FactorDto {
  return { factorID, factorLevel };
}

export function HistoryDto(
  { fansNumber, score, registerDate }: History | HistoryDto = {
    fansNumber: 0,
    score: 0,
    registerDate: new Date(),
  }
): HistoryDto {
  return { fansNumber, score, registerDate };
}

export function MetadataDto(
  { uniqueSkillLevel, transferred, rental }: Metadata | MetadataDto = {
    uniqueSkillLevel: 1,
    transferred: false,
    rental: false,
  }
): MetadataDto {
  return { uniqueSkillLevel, transferred, rental };
}

export function Dto(arg?: Dto): Dto {
  return {
    id: arg?.id,
    character: CharacterDto(arg?.character),
    status: StatusDto(arg?.status),
    ability: AbilityDto(arg?.ability),
    skills: [...objects.orDefault(arg?.skills, [])],
    factors: [...objects.orDefault(arg?.factors, [])],
    history: HistoryDto(arg?.history),
    metadata: MetadataDto(arg?.metadata),
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
  public readonly metadata: Dexie.Table<Metadata, number>;

  public constructor() {
    super("prettydb-hall-of-fame");

    this.version(4).stores({
      IDs: "++id",
      characters: "&id,characterID,monikerID,talentLevel,awakeningLevel",
      status: "&id,speed,stamina,power,tenacity,intelligence",
      ability: "&id,turf,dirt,short,mile,middle,long,nige,senko,sashi,oikomi",
      skills: "++,id,skillID",
      factors: "++,id,factorID,factorLevel",
      histories: "&id,fansNumber,score,registerDate",
      metadata: "&id,uniqueSkillLevel,transferred,rental",
    });

    this.IDs = this.table("IDs");
    this.characters = this.table("characters");
    this.status = this.table("status");
    this.ability = this.table("ability");
    this.skills = this.table("skills");
    this.factors = this.table("factors");
    this.histories = this.table("histories");
    this.metadata = this.table("metadata");
  }

  public async fetch(id: number): Promise<Dto> {
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
        db.metadata,
      ],
      () => {
        return db.IDs.where("id")
          .equals(id)
          .first()
          .then((x) => {
            if (x !== undefined && x.id === id) {
              return Promise.all([
                db.characters.where("id").equals(id).first(),
                db.status.where("id").equals(id).first(),
                db.ability.where("id").equals(id).first(),
                db.skills.where("id").equals(id).toArray(),
                db.factors.where("id").equals(id).toArray(),
                db.histories.where("id").equals(id).first(),
                db.metadata.where("id").equals(id).first(),
              ]);
            }
            return Promise.reject(`id is not stored: ${id}`);
          })
          .then(
            ([
              character,
              status,
              ability,
              skills,
              factors,
              history,
              metadata,
            ]) => {
              return Promise.resolve(
                Dto({
                  id,
                  character: CharacterDto(character),
                  status: StatusDto(status),
                  ability: AbilityDto(ability),
                  skills: skills.map(SkillDto),
                  factors: factors.map(FactorDto),
                  history: HistoryDto(history),
                  metadata: MetadataDto(metadata),
                })
              );
            }
          )
          .catch((x) => {
            console.error(x);
            return Promise.reject();
          });
      }
    );
  }

  public async upsert(dto: Dto): Promise<void> {
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
        db.metadata,
      ],
      () => {
        const { id } = dto;
        return db.IDs.put({ id }).then((id) => {
          const {
            character,
            status,
            ability,
            skills,
            factors,
            history,
            metadata,
          } = dto;
          return Promise.all([
            db.characters.put({ id, ...character }),
            db.status.put({ id, ...status }),
            db.ability.put({ id, ...ability }),
            db.skills
              .where("id")
              .equals(id)
              .delete()
              .then(() => db.skills.bulkPut(skills.map((x) => ({ id, ...x })))),
            db.factors
              .where("id")
              .equals(id)
              .delete()
              .then(() =>
                db.factors.bulkPut(factors.map((x) => ({ id, ...x })))
              ),
            db.histories.put({ id, ...history }),
            db.metadata.put({ id, ...metadata }),
          ])
            .then(() => {
              return Promise.resolve();
            })
            .catch((x) => {
              console.error(`failed to upsert: ${x}\n${JSON.stringify(dto)}`);
              return Promise.reject();
            });
        });
      }
    );
  }
}

export const db = new Database();
