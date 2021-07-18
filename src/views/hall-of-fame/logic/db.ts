import { toRaw } from "vue";
import { AbilityGrade, AbilityGrades, FactorLevel, TalentLevel } from "@/data";
import Dexie from "dexie";

interface ID {
  id?: number;
}

interface Character {
  id: number;
  characterID: number;
  monikerID: number;
  talentLevel: TalentLevel;
  awakeLevel: number;
  uniqueSkillLevel: number;
}

interface Status {
  id: number;
  speed: number;
  stamina: number;
  power: number;
  tenacity: number;
  intelligence: number;
}

interface Ability {
  id: number;
  // バ場適正
  turf: AbilityGrade;
  dirt: AbilityGrade;
  // 距離適性
  short: AbilityGrade;
  mile: AbilityGrade;
  middle: AbilityGrade;
  long: AbilityGrade;
  // 脚質適正
  // ググっても適切な単語が見つからなかったのでローマ字表記
  nige: AbilityGrade;
  senko: AbilityGrade;
  sashi: AbilityGrade;
  oikomi: AbilityGrade;
}

interface Skill {
  id: number;
  skillID: number;
}

interface Factor {
  id: number;
  factorID: number;
  factorLevel: FactorLevel;
}

interface History {
  id: number;
  fansNumber: number;
  score: number;
  registerDate: Date;
}

export type CharacterDTO = Omit<Character, "id">;

export function CharacterDTO(
  arg: Character | CharacterDTO | undefined = undefined
): CharacterDTO {
  return {
    characterID: arg?.characterID || 0,
    monikerID: arg?.monikerID || 0,
    talentLevel: arg?.talentLevel || 3,
    awakeLevel: arg?.awakeLevel || 1,
    uniqueSkillLevel: arg?.uniqueSkillLevel || 1,
  };
}

export type StatusDTO = Omit<Status, "id">;

export function StatusDTO(
  arg: Status | StatusDTO | undefined = undefined
): StatusDTO {
  return {
    speed: arg?.speed || 0,
    stamina: arg?.stamina || 0,
    power: arg?.power || 0,
    tenacity: arg?.tenacity || 0,
    intelligence: arg?.intelligence || 0,
  };
}

export type AbilityDTO = Omit<Ability, "id">;

export function AbilityDTO(
  arg: Ability | AbilityDTO | undefined = undefined
): AbilityDTO {
  return {
    turf: arg?.turf || AbilityGrades.G,
    dirt: arg?.dirt || AbilityGrades.G,
    short: arg?.short || AbilityGrades.G,
    mile: arg?.mile || AbilityGrades.G,
    middle: arg?.middle || AbilityGrades.G,
    long: arg?.long || AbilityGrades.G,
    nige: arg?.nige || AbilityGrades.G,
    senko: arg?.senko || AbilityGrades.G,
    sashi: arg?.sashi || AbilityGrades.G,
    oikomi: arg?.oikomi || AbilityGrades.G,
  };
}

export type SkillDTO = Omit<Skill, "id">;

export function SkillDTO(
  arg: Skill | SkillDTO | undefined = undefined
): SkillDTO {
  return {
    skillID: arg?.skillID || 0,
  };
}

export type FactorDTO = Omit<Factor, "id">;

export function FactorDTO(
  arg: Factor | FactorDTO | undefined = undefined
): FactorDTO {
  return {
    factorID: arg?.factorID || 0,
    factorLevel: arg?.factorLevel || 1,
  };
}

export type HistoryDTO = Omit<History, "id">;

export function HistoryDTO(
  arg: History | HistoryDTO | undefined = undefined
): HistoryDTO {
  return {
    fansNumber: arg?.fansNumber || 0,
    score: arg?.score || 0,
    registerDate: arg?.registerDate || new Date(),
  };
}

export type HallOfFameDTO = {
  id?: number;
  character: CharacterDTO;
  status: StatusDTO;
  ability: AbilityDTO;
  skills: Array<SkillDTO>;
  factors: Array<FactorDTO>;
  history: HistoryDTO;
};

export function HallOfFameDTO(
  arg: HallOfFameDTO | undefined = undefined
): HallOfFameDTO {
  return {
    id: arg?.id,
    character: CharacterDTO(arg?.character),
    status: StatusDTO(arg?.status),
    ability: AbilityDTO(arg?.ability),
    skills: [...(arg?.skills || [])],
    factors: [...(arg?.factors || [])],
    history: HistoryDTO(arg?.history),
  };
}

class HallOfFameDB extends Dexie {
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

export const db = new HallOfFameDB();

export async function fetch(id: number): Promise<HallOfFameDTO> {
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
              HallOfFameDTO({
                id,
                character: CharacterDTO(character),
                status: StatusDTO(status),
                ability: AbilityDTO(ability),
                skills: skills.map(SkillDTO),
                factors: factors.map(FactorDTO),
                history: HistoryDTO(history),
              })
            );
          });
        });
    }
  );
}

export async function upsert(dto: HallOfFameDTO): Promise<void> {
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

export const hallOfFameDB = {
  db,
  fetch,
  upsert,
};
