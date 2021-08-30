import * as $protobuf from "protobufjs";
/** Properties of a Character. */
export interface ICharacter {
  /** Character characterID */
  characterID?: number | null;

  /** Character sortID */
  sortID?: number | null;
}

/** Represents a Character. */
export class Character implements ICharacter {
  /**
   * Constructs a new Character.
   * @param [properties] Properties to set
   */
  constructor(properties?: ICharacter);

  /** Character characterID. */
  public characterID: number;

  /** Character sortID. */
  public sortID: number;

  /**
   * Decodes a Character message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns Character
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number
  ): Character;
}

/** Properties of a CharacterList. */
export interface ICharacterList {
  /** CharacterList data */
  data?: ICharacter[] | null;
}

/** Represents a CharacterList. */
export class CharacterList implements ICharacterList {
  /**
   * Constructs a new CharacterList.
   * @param [properties] Properties to set
   */
  constructor(properties?: ICharacterList);

  /** CharacterList data. */
  public data: ICharacter[];

  /**
   * Decodes a CharacterList message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns CharacterList
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number
  ): CharacterList;
}

/** Properties of an Event. */
export interface IEvent {
  /** Event eventID */
  eventID?: number | null;

  /** Event skills */
  skills?: number[] | null;
}

/** Represents an Event. */
export class Event implements IEvent {
  /**
   * Constructs a new Event.
   * @param [properties] Properties to set
   */
  constructor(properties?: IEvent);

  /** Event eventID. */
  public eventID: number;

  /** Event skills. */
  public skills: number[];

  /**
   * Decodes an Event message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns Event
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number
  ): Event;
}

/** Properties of an EventList. */
export interface IEventList {
  /** EventList data */
  data?: IEvent[] | null;
}

/** Represents an EventList. */
export class EventList implements IEventList {
  /**
   * Constructs a new EventList.
   * @param [properties] Properties to set
   */
  constructor(properties?: IEventList);

  /** EventList data. */
  public data: IEvent[];

  /**
   * Decodes an EventList message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns EventList
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number
  ): EventList;
}

/** Properties of a Factor. */
export interface IFactor {
  /** Factor factorID */
  factorID?: number | null;

  /** Factor sortID */
  sortID?: number | null;

  /** Factor type */
  type?: Factor.Type | null;

  /** Factor skillID */
  skillID?: number | null;
}

/** Represents a Factor. */
export class Factor implements IFactor {
  /**
   * Constructs a new Factor.
   * @param [properties] Properties to set
   */
  constructor(properties?: IFactor);

  /** Factor factorID. */
  public factorID: number;

  /** Factor sortID. */
  public sortID: number;

  /** Factor type. */
  public type: Factor.Type;

  /** Factor skillID. */
  public skillID: number;

  /**
   * Decodes a Factor message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns Factor
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number
  ): Factor;
}

export namespace Factor {
  /** Type enum. */
  enum Type {
    STATUS = 0,
    ABILITY = 1,
    UNIQUE_SKILL = 2,
    RACE = 3,
    SKILL = 4,
    SCENARIO = 5,
  }
}

/** Properties of a FactorList. */
export interface IFactorList {
  /** FactorList data */
  data?: IFactor[] | null;
}

/** Represents a FactorList. */
export class FactorList implements IFactorList {
  /**
   * Constructs a new FactorList.
   * @param [properties] Properties to set
   */
  constructor(properties?: IFactorList);

  /** FactorList data. */
  public data: IFactor[];

  /**
   * Decodes a FactorList message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns FactorList
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number
  ): FactorList;
}

/** Properties of a Moniker. */
export interface IMoniker {
  /** Moniker characterID */
  characterID?: number | null;

  /** Moniker monikerID */
  monikerID?: number | null;

  /** Moniker initialTalentLevel */
  initialTalentLevel?: number | null;

  /** Moniker initialStatus */
  initialStatus?: { [k: string]: Moniker.IStatus } | null;

  /** Moniker initialAbility */
  initialAbility?: Moniker.IAbilities | null;

  /** Moniker growthRate */
  growthRate?: Moniker.IStatus | null;

  /** Moniker skills */
  skills?: Moniker.ISkills | null;

  /** Moniker events */
  events?: number[] | null;
}

/** Represents a Moniker. */
export class Moniker implements IMoniker {
  /**
   * Constructs a new Moniker.
   * @param [properties] Properties to set
   */
  constructor(properties?: IMoniker);

  /** Moniker characterID. */
  public characterID: number;

  /** Moniker monikerID. */
  public monikerID: number;

  /** Moniker initialTalentLevel. */
  public initialTalentLevel: number;

  /** Moniker initialStatus. */
  public initialStatus: { [k: string]: Moniker.IStatus };

  /** Moniker initialAbility. */
  public initialAbility?: Moniker.IAbilities | null;

  /** Moniker growthRate. */
  public growthRate?: Moniker.IStatus | null;

  /** Moniker skills. */
  public skills?: Moniker.ISkills | null;

  /** Moniker events. */
  public events: number[];

  /**
   * Decodes a Moniker message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns Moniker
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number
  ): Moniker;
}

export namespace Moniker {
  /** Properties of a Status. */
  interface IStatus {
    /** Status speed */
    speed?: number | null;

    /** Status stamina */
    stamina?: number | null;

    /** Status power */
    power?: number | null;

    /** Status tenacity */
    tenacity?: number | null;

    /** Status intelligence */
    intelligence?: number | null;
  }

  /** Represents a Status. */
  class Status implements IStatus {
    /**
     * Constructs a new Status.
     * @param [properties] Properties to set
     */
    constructor(properties?: Moniker.IStatus);

    /** Status speed. */
    public speed: number;

    /** Status stamina. */
    public stamina: number;

    /** Status power. */
    public power: number;

    /** Status tenacity. */
    public tenacity: number;

    /** Status intelligence. */
    public intelligence: number;

    /**
     * Decodes a Status message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Status
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): Moniker.Status;
  }

  /** Ability enum. */
  enum Ability {
    G = 0,
    F = 1,
    E = 2,
    D = 3,
    C = 4,
    B = 5,
    A = 6,
    S = 7,
  }

  /** Properties of an Abilities. */
  interface IAbilities {
    /** Abilities turf */
    turf?: Moniker.Ability | null;

    /** Abilities dirt */
    dirt?: Moniker.Ability | null;

    /** Abilities short */
    short?: Moniker.Ability | null;

    /** Abilities mile */
    mile?: Moniker.Ability | null;

    /** Abilities middle */
    middle?: Moniker.Ability | null;

    /** Abilities long */
    long?: Moniker.Ability | null;

    /** Abilities nige */
    nige?: Moniker.Ability | null;

    /** Abilities senko */
    senko?: Moniker.Ability | null;

    /** Abilities sashi */
    sashi?: Moniker.Ability | null;

    /** Abilities oikomi */
    oikomi?: Moniker.Ability | null;
  }

  /** Represents an Abilities. */
  class Abilities implements IAbilities {
    /**
     * Constructs a new Abilities.
     * @param [properties] Properties to set
     */
    constructor(properties?: Moniker.IAbilities);

    /** Abilities turf. */
    public turf: Moniker.Ability;

    /** Abilities dirt. */
    public dirt: Moniker.Ability;

    /** Abilities short. */
    public short: Moniker.Ability;

    /** Abilities mile. */
    public mile: Moniker.Ability;

    /** Abilities middle. */
    public middle: Moniker.Ability;

    /** Abilities long. */
    public long: Moniker.Ability;

    /** Abilities nige. */
    public nige: Moniker.Ability;

    /** Abilities senko. */
    public senko: Moniker.Ability;

    /** Abilities sashi. */
    public sashi: Moniker.Ability;

    /** Abilities oikomi. */
    public oikomi: Moniker.Ability;

    /**
     * Decodes an Abilities message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Abilities
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): Moniker.Abilities;
  }

  /** Properties of a Skills. */
  interface ISkills {
    /** Skills awakeningLevel2 */
    awakeningLevel2?: number | null;

    /** Skills awakeningLevel3 */
    awakeningLevel3?: number | null;

    /** Skills awakeningLevel4 */
    awakeningLevel4?: number | null;

    /** Skills awakeningLevel5 */
    awakeningLevel5?: number | null;

    /** Skills defaults */
    defaults?: number[] | null;
  }

  /** Represents a Skills. */
  class Skills implements ISkills {
    /**
     * Constructs a new Skills.
     * @param [properties] Properties to set
     */
    constructor(properties?: Moniker.ISkills);

    /** Skills awakeningLevel2. */
    public awakeningLevel2: number;

    /** Skills awakeningLevel3. */
    public awakeningLevel3: number;

    /** Skills awakeningLevel4. */
    public awakeningLevel4: number;

    /** Skills awakeningLevel5. */
    public awakeningLevel5: number;

    /** Skills defaults. */
    public defaults: number[];

    /**
     * Decodes a Skills message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Skills
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): Moniker.Skills;
  }
}

/** Properties of a MonikerList. */
export interface IMonikerList {
  /** MonikerList data */
  data?: IMoniker[] | null;
}

/** Represents a MonikerList. */
export class MonikerList implements IMonikerList {
  /**
   * Constructs a new MonikerList.
   * @param [properties] Properties to set
   */
  constructor(properties?: IMonikerList);

  /** MonikerList data. */
  public data: IMoniker[];

  /**
   * Decodes a MonikerList message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns MonikerList
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number
  ): MonikerList;
}

/** Properties of a Skill. */
export interface ISkill {
  /** Skill skillID */
  skillID?: number | null;

  /** Skill sortID */
  sortID?: number | null;

  /** Skill point */
  point?: number | null;

  /** Skill type */
  type?: Skill.Type | null;

  /** Skill conflictID */
  conflictID?: number | null;

  /** Skill advanced */
  advanced?: boolean | null;

  /** Skill unique */
  unique?: boolean | null;

  /** Skill characterID */
  characterID?: number | null;

  /** Skill monikerID */
  monikerID?: number | null;

  /** Skill matchingTalentLevels */
  matchingTalentLevels?: Skill.Levels | null;

  /** Skill inheritable */
  inheritable?: boolean | null;
}

/** Represents a Skill. */
export class Skill implements ISkill {
  /**
   * Constructs a new Skill.
   * @param [properties] Properties to set
   */
  constructor(properties?: ISkill);

  /** Skill skillID. */
  public skillID: number;

  /** Skill sortID. */
  public sortID: number;

  /** Skill point. */
  public point: number;

  /** Skill type. */
  public type: Skill.Type;

  /** Skill conflictID. */
  public conflictID: number;

  /** Skill advanced. */
  public advanced: boolean;

  /** Skill unique. */
  public unique: boolean;

  /** Skill characterID. */
  public characterID: number;

  /** Skill monikerID. */
  public monikerID: number;

  /** Skill matchingTalentLevels. */
  public matchingTalentLevels: Skill.Levels;

  /** Skill inheritable. */
  public inheritable: boolean;

  /**
   * Decodes a Skill message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns Skill
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number
  ): Skill;
}

export namespace Skill {
  /** Type enum. */
  enum Type {
    BUFF_SPEED = 0,
    BUFF_ACCELERATION = 1,
    BUFF_POSITIONING = 2,
    BUFF_VISION = 3,
    BUFF_STARTING = 4,
    DEBUFF_SPEED = 5,
    DEBUFF_STAMINA = 6,
    DEBUFF_AGITATION = 7,
    DEBUFF_CALM = 8,
    DEBUFF_VISION = 9,
    RECOVERY_STAMINA = 10,
    SUPPORT_SPEED = 11,
    SUPPORT_STAMINA = 12,
    SUPPORT_POWER = 13,
    SUPPORT_TENACITY = 14,
    SUPPORT_GENERAL = 15,
    SUPPORT_STRATEGY = 16,
    WEAK_FATIGUE = 17,
    WEAK_STARTING = 18,
    WEAK_MENTAL = 19,
    WEAK_WILL = 20,
    WEAK_RACE = 21,
    BUFF_SPEED_TEAM = 22,
    BUFF_ACCELERATION_TEAM = 23,
    RECOVERY_STAMINA_TEAM = 24,
  }

  /** Levels enum. */
  enum Levels {
    FROM_1_TO_5 = 0,
    FROM_1_TO_2 = 1,
    FROM_3_TO_5 = 2,
  }
}

/** Properties of a SkillList. */
export interface ISkillList {
  /** SkillList data */
  data?: ISkill[] | null;
}

/** Represents a SkillList. */
export class SkillList implements ISkillList {
  /**
   * Constructs a new SkillList.
   * @param [properties] Properties to set
   */
  constructor(properties?: ISkillList);

  /** SkillList data. */
  public data: ISkill[];

  /**
   * Decodes a SkillList message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns SkillList
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number
  ): SkillList;
}

/** Properties of a SupportCard. */
export interface ISupportCard {
  /** SupportCard cardID */
  cardID?: number | null;

  /** SupportCard characterID */
  characterID?: number | null;

  /** SupportCard rarity */
  rarity?: SupportCard.Rarity | null;

  /** SupportCard type */
  type?: SupportCard.Type | null;

  /** SupportCard skills */
  skills?: number[] | null;

  /** SupportCard events */
  events?: number[] | null;
}

/** Represents a SupportCard. */
export class SupportCard implements ISupportCard {
  /**
   * Constructs a new SupportCard.
   * @param [properties] Properties to set
   */
  constructor(properties?: ISupportCard);

  /** SupportCard cardID. */
  public cardID: number;

  /** SupportCard characterID. */
  public characterID: number;

  /** SupportCard rarity. */
  public rarity: SupportCard.Rarity;

  /** SupportCard type. */
  public type: SupportCard.Type;

  /** SupportCard skills. */
  public skills: number[];

  /** SupportCard events. */
  public events: number[];

  /**
   * Decodes a SupportCard message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns SupportCard
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number
  ): SupportCard;
}

export namespace SupportCard {
  /** Rarity enum. */
  enum Rarity {
    R = 0,
    SR = 1,
    SSR = 2,
  }

  /** Type enum. */
  enum Type {
    SPEED = 0,
    STAMINA = 1,
    POWER = 2,
    TENACITY = 3,
    INTELLIGENCE = 4,
    FRIEND = 5,
  }
}

/** Properties of a SupportCardList. */
export interface ISupportCardList {
  /** SupportCardList data */
  data?: ISupportCard[] | null;
}

/** Represents a SupportCardList. */
export class SupportCardList implements ISupportCardList {
  /**
   * Constructs a new SupportCardList.
   * @param [properties] Properties to set
   */
  constructor(properties?: ISupportCardList);

  /** SupportCardList data. */
  public data: ISupportCard[];

  /**
   * Decodes a SupportCardList message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns SupportCardList
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number
  ): SupportCardList;
}
