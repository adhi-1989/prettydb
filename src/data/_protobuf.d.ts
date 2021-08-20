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
   * Creates a new Character instance using the specified properties.
   * @param [properties] Properties to set
   * @returns Character instance
   */
  public static create(properties?: ICharacter): Character;

  /**
   * Encodes the specified Character message. Does not implicitly {@link Character.verify|verify} messages.
   * @param message Character message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: ICharacter,
    writer?: $protobuf.Writer
  ): $protobuf.Writer;

  /**
   * Encodes the specified Character message, length delimited. Does not implicitly {@link Character.verify|verify} messages.
   * @param message Character message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: ICharacter,
    writer?: $protobuf.Writer
  ): $protobuf.Writer;

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

  /**
   * Decodes a Character message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns Character
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array
  ): Character;

  /**
   * Verifies a Character message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

  /**
   * Creates a Character message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns Character
   */
  public static fromObject(object: { [k: string]: any }): Character;

  /**
   * Creates a plain object from a Character message. Also converts values to other types if specified.
   * @param message Character
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: Character,
    options?: $protobuf.IConversionOptions
  ): { [k: string]: any };

  /**
   * Converts this Character to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
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
   * Creates a new CharacterList instance using the specified properties.
   * @param [properties] Properties to set
   * @returns CharacterList instance
   */
  public static create(properties?: ICharacterList): CharacterList;

  /**
   * Encodes the specified CharacterList message. Does not implicitly {@link CharacterList.verify|verify} messages.
   * @param message CharacterList message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: ICharacterList,
    writer?: $protobuf.Writer
  ): $protobuf.Writer;

  /**
   * Encodes the specified CharacterList message, length delimited. Does not implicitly {@link CharacterList.verify|verify} messages.
   * @param message CharacterList message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: ICharacterList,
    writer?: $protobuf.Writer
  ): $protobuf.Writer;

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

  /**
   * Decodes a CharacterList message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns CharacterList
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array
  ): CharacterList;

  /**
   * Verifies a CharacterList message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

  /**
   * Creates a CharacterList message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns CharacterList
   */
  public static fromObject(object: { [k: string]: any }): CharacterList;

  /**
   * Creates a plain object from a CharacterList message. Also converts values to other types if specified.
   * @param message CharacterList
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: CharacterList,
    options?: $protobuf.IConversionOptions
  ): { [k: string]: any };

  /**
   * Converts this CharacterList to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
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
   * Creates a new Factor instance using the specified properties.
   * @param [properties] Properties to set
   * @returns Factor instance
   */
  public static create(properties?: IFactor): Factor;

  /**
   * Encodes the specified Factor message. Does not implicitly {@link Factor.verify|verify} messages.
   * @param message Factor message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: IFactor,
    writer?: $protobuf.Writer
  ): $protobuf.Writer;

  /**
   * Encodes the specified Factor message, length delimited. Does not implicitly {@link Factor.verify|verify} messages.
   * @param message Factor message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: IFactor,
    writer?: $protobuf.Writer
  ): $protobuf.Writer;

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

  /**
   * Decodes a Factor message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns Factor
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): Factor;

  /**
   * Verifies a Factor message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

  /**
   * Creates a Factor message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns Factor
   */
  public static fromObject(object: { [k: string]: any }): Factor;

  /**
   * Creates a plain object from a Factor message. Also converts values to other types if specified.
   * @param message Factor
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: Factor,
    options?: $protobuf.IConversionOptions
  ): { [k: string]: any };

  /**
   * Converts this Factor to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
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
   * Creates a new FactorList instance using the specified properties.
   * @param [properties] Properties to set
   * @returns FactorList instance
   */
  public static create(properties?: IFactorList): FactorList;

  /**
   * Encodes the specified FactorList message. Does not implicitly {@link FactorList.verify|verify} messages.
   * @param message FactorList message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: IFactorList,
    writer?: $protobuf.Writer
  ): $protobuf.Writer;

  /**
   * Encodes the specified FactorList message, length delimited. Does not implicitly {@link FactorList.verify|verify} messages.
   * @param message FactorList message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: IFactorList,
    writer?: $protobuf.Writer
  ): $protobuf.Writer;

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

  /**
   * Decodes a FactorList message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns FactorList
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array
  ): FactorList;

  /**
   * Verifies a FactorList message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

  /**
   * Creates a FactorList message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns FactorList
   */
  public static fromObject(object: { [k: string]: any }): FactorList;

  /**
   * Creates a plain object from a FactorList message. Also converts values to other types if specified.
   * @param message FactorList
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: FactorList,
    options?: $protobuf.IConversionOptions
  ): { [k: string]: any };

  /**
   * Converts this FactorList to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
}

/** Properties of a Moniker. */
export interface IMoniker {
  /** Moniker characterID */
  characterID?: number | null;

  /** Moniker monikerID */
  monikerID?: number | null;

  /** Moniker initialTalentLevel */
  initialTalentLevel?: number | null;
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

  /**
   * Creates a new Moniker instance using the specified properties.
   * @param [properties] Properties to set
   * @returns Moniker instance
   */
  public static create(properties?: IMoniker): Moniker;

  /**
   * Encodes the specified Moniker message. Does not implicitly {@link Moniker.verify|verify} messages.
   * @param message Moniker message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: IMoniker,
    writer?: $protobuf.Writer
  ): $protobuf.Writer;

  /**
   * Encodes the specified Moniker message, length delimited. Does not implicitly {@link Moniker.verify|verify} messages.
   * @param message Moniker message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: IMoniker,
    writer?: $protobuf.Writer
  ): $protobuf.Writer;

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

  /**
   * Decodes a Moniker message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns Moniker
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): Moniker;

  /**
   * Verifies a Moniker message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

  /**
   * Creates a Moniker message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns Moniker
   */
  public static fromObject(object: { [k: string]: any }): Moniker;

  /**
   * Creates a plain object from a Moniker message. Also converts values to other types if specified.
   * @param message Moniker
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: Moniker,
    options?: $protobuf.IConversionOptions
  ): { [k: string]: any };

  /**
   * Converts this Moniker to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
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
   * Creates a new MonikerList instance using the specified properties.
   * @param [properties] Properties to set
   * @returns MonikerList instance
   */
  public static create(properties?: IMonikerList): MonikerList;

  /**
   * Encodes the specified MonikerList message. Does not implicitly {@link MonikerList.verify|verify} messages.
   * @param message MonikerList message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: IMonikerList,
    writer?: $protobuf.Writer
  ): $protobuf.Writer;

  /**
   * Encodes the specified MonikerList message, length delimited. Does not implicitly {@link MonikerList.verify|verify} messages.
   * @param message MonikerList message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: IMonikerList,
    writer?: $protobuf.Writer
  ): $protobuf.Writer;

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

  /**
   * Decodes a MonikerList message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns MonikerList
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array
  ): MonikerList;

  /**
   * Verifies a MonikerList message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

  /**
   * Creates a MonikerList message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns MonikerList
   */
  public static fromObject(object: { [k: string]: any }): MonikerList;

  /**
   * Creates a plain object from a MonikerList message. Also converts values to other types if specified.
   * @param message MonikerList
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: MonikerList,
    options?: $protobuf.IConversionOptions
  ): { [k: string]: any };

  /**
   * Converts this MonikerList to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
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

  /** Skill talentLevelMatcher */
  talentLevelMatcher?: Skill.TalentLevelMatcher | null;

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

  /** Skill talentLevelMatcher. */
  public talentLevelMatcher: Skill.TalentLevelMatcher;

  /** Skill inheritable. */
  public inheritable: boolean;

  /**
   * Creates a new Skill instance using the specified properties.
   * @param [properties] Properties to set
   * @returns Skill instance
   */
  public static create(properties?: ISkill): Skill;

  /**
   * Encodes the specified Skill message. Does not implicitly {@link Skill.verify|verify} messages.
   * @param message Skill message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: ISkill,
    writer?: $protobuf.Writer
  ): $protobuf.Writer;

  /**
   * Encodes the specified Skill message, length delimited. Does not implicitly {@link Skill.verify|verify} messages.
   * @param message Skill message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: ISkill,
    writer?: $protobuf.Writer
  ): $protobuf.Writer;

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

  /**
   * Decodes a Skill message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns Skill
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): Skill;

  /**
   * Verifies a Skill message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

  /**
   * Creates a Skill message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns Skill
   */
  public static fromObject(object: { [k: string]: any }): Skill;

  /**
   * Creates a plain object from a Skill message. Also converts values to other types if specified.
   * @param message Skill
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: Skill,
    options?: $protobuf.IConversionOptions
  ): { [k: string]: any };

  /**
   * Converts this Skill to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
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
  }

  /** TalentLevelMatcher enum. */
  enum TalentLevelMatcher {
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
   * Creates a new SkillList instance using the specified properties.
   * @param [properties] Properties to set
   * @returns SkillList instance
   */
  public static create(properties?: ISkillList): SkillList;

  /**
   * Encodes the specified SkillList message. Does not implicitly {@link SkillList.verify|verify} messages.
   * @param message SkillList message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: ISkillList,
    writer?: $protobuf.Writer
  ): $protobuf.Writer;

  /**
   * Encodes the specified SkillList message, length delimited. Does not implicitly {@link SkillList.verify|verify} messages.
   * @param message SkillList message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: ISkillList,
    writer?: $protobuf.Writer
  ): $protobuf.Writer;

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

  /**
   * Decodes a SkillList message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns SkillList
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(
    reader: $protobuf.Reader | Uint8Array
  ): SkillList;

  /**
   * Verifies a SkillList message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null;

  /**
   * Creates a SkillList message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns SkillList
   */
  public static fromObject(object: { [k: string]: any }): SkillList;

  /**
   * Creates a plain object from a SkillList message. Also converts values to other types if specified.
   * @param message SkillList
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: SkillList,
    options?: $protobuf.IConversionOptions
  ): { [k: string]: any };

  /**
   * Converts this SkillList to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any };
}
