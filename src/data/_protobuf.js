/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader,
  $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const Character = ($root.Character = (() => {
  /**
   * Properties of a Character.
   * @exports ICharacter
   * @interface ICharacter
   * @property {number|null} [characterID] Character characterID
   * @property {number|null} [sortID] Character sortID
   */

  /**
   * Constructs a new Character.
   * @exports Character
   * @classdesc Represents a Character.
   * @implements ICharacter
   * @constructor
   * @param {ICharacter=} [properties] Properties to set
   */
  function Character(properties) {
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * Character characterID.
   * @member {number} characterID
   * @memberof Character
   * @instance
   */
  Character.prototype.characterID = 0;

  /**
   * Character sortID.
   * @member {number} sortID
   * @memberof Character
   * @instance
   */
  Character.prototype.sortID = 0;

  /**
   * Decodes a Character message from the specified reader or buffer.
   * @function decode
   * @memberof Character
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {Character} Character
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Character.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.Character();
    while (reader.pos < end) {
      let tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.characterID = reader.int32();
          break;
        case 2:
          message.sortID = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  return Character;
})());

export const CharacterList = ($root.CharacterList = (() => {
  /**
   * Properties of a CharacterList.
   * @exports ICharacterList
   * @interface ICharacterList
   * @property {Array.<ICharacter>|null} [data] CharacterList data
   */

  /**
   * Constructs a new CharacterList.
   * @exports CharacterList
   * @classdesc Represents a CharacterList.
   * @implements ICharacterList
   * @constructor
   * @param {ICharacterList=} [properties] Properties to set
   */
  function CharacterList(properties) {
    this.data = [];
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * CharacterList data.
   * @member {Array.<ICharacter>} data
   * @memberof CharacterList
   * @instance
   */
  CharacterList.prototype.data = $util.emptyArray;

  /**
   * Decodes a CharacterList message from the specified reader or buffer.
   * @function decode
   * @memberof CharacterList
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {CharacterList} CharacterList
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  CharacterList.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.CharacterList();
    while (reader.pos < end) {
      let tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (!(message.data && message.data.length)) message.data = [];
          message.data.push($root.Character.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  return CharacterList;
})());

export const Event = ($root.Event = (() => {
  /**
   * Properties of an Event.
   * @exports IEvent
   * @interface IEvent
   * @property {number|null} [eventID] Event eventID
   * @property {Array.<number>|null} [skills] Event skills
   */

  /**
   * Constructs a new Event.
   * @exports Event
   * @classdesc Represents an Event.
   * @implements IEvent
   * @constructor
   * @param {IEvent=} [properties] Properties to set
   */
  function Event(properties) {
    this.skills = [];
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * Event eventID.
   * @member {number} eventID
   * @memberof Event
   * @instance
   */
  Event.prototype.eventID = 0;

  /**
   * Event skills.
   * @member {Array.<number>} skills
   * @memberof Event
   * @instance
   */
  Event.prototype.skills = $util.emptyArray;

  /**
   * Decodes an Event message from the specified reader or buffer.
   * @function decode
   * @memberof Event
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {Event} Event
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Event.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.Event();
    while (reader.pos < end) {
      let tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.eventID = reader.int32();
          break;
        case 2:
          if (!(message.skills && message.skills.length)) message.skills = [];
          if ((tag & 7) === 2) {
            let end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) message.skills.push(reader.int32());
          } else message.skills.push(reader.int32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  return Event;
})());

export const EventList = ($root.EventList = (() => {
  /**
   * Properties of an EventList.
   * @exports IEventList
   * @interface IEventList
   * @property {Array.<IEvent>|null} [data] EventList data
   */

  /**
   * Constructs a new EventList.
   * @exports EventList
   * @classdesc Represents an EventList.
   * @implements IEventList
   * @constructor
   * @param {IEventList=} [properties] Properties to set
   */
  function EventList(properties) {
    this.data = [];
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * EventList data.
   * @member {Array.<IEvent>} data
   * @memberof EventList
   * @instance
   */
  EventList.prototype.data = $util.emptyArray;

  /**
   * Decodes an EventList message from the specified reader or buffer.
   * @function decode
   * @memberof EventList
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {EventList} EventList
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  EventList.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.EventList();
    while (reader.pos < end) {
      let tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (!(message.data && message.data.length)) message.data = [];
          message.data.push($root.Event.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  return EventList;
})());

export const Factor = ($root.Factor = (() => {
  /**
   * Properties of a Factor.
   * @exports IFactor
   * @interface IFactor
   * @property {number|null} [factorID] Factor factorID
   * @property {number|null} [sortID] Factor sortID
   * @property {Factor.Type|null} [type] Factor type
   * @property {number|null} [skillID] Factor skillID
   */

  /**
   * Constructs a new Factor.
   * @exports Factor
   * @classdesc Represents a Factor.
   * @implements IFactor
   * @constructor
   * @param {IFactor=} [properties] Properties to set
   */
  function Factor(properties) {
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * Factor factorID.
   * @member {number} factorID
   * @memberof Factor
   * @instance
   */
  Factor.prototype.factorID = 0;

  /**
   * Factor sortID.
   * @member {number} sortID
   * @memberof Factor
   * @instance
   */
  Factor.prototype.sortID = 0;

  /**
   * Factor type.
   * @member {Factor.Type} type
   * @memberof Factor
   * @instance
   */
  Factor.prototype.type = 0;

  /**
   * Factor skillID.
   * @member {number} skillID
   * @memberof Factor
   * @instance
   */
  Factor.prototype.skillID = 0;

  /**
   * Decodes a Factor message from the specified reader or buffer.
   * @function decode
   * @memberof Factor
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {Factor} Factor
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Factor.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.Factor();
    while (reader.pos < end) {
      let tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.factorID = reader.int32();
          break;
        case 2:
          message.sortID = reader.int32();
          break;
        case 3:
          message.type = reader.int32();
          break;
        case 4:
          message.skillID = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  /**
   * Type enum.
   * @name Factor.Type
   * @enum {number}
   * @property {number} STATUS=0 STATUS value
   * @property {number} ABILITY=1 ABILITY value
   * @property {number} UNIQUE_SKILL=2 UNIQUE_SKILL value
   * @property {number} RACE=3 RACE value
   * @property {number} SKILL=4 SKILL value
   * @property {number} SCENARIO=5 SCENARIO value
   */
  Factor.Type = (function () {
    const valuesById = {},
      values = Object.create(valuesById);
    values[(valuesById[0] = "STATUS")] = 0;
    values[(valuesById[1] = "ABILITY")] = 1;
    values[(valuesById[2] = "UNIQUE_SKILL")] = 2;
    values[(valuesById[3] = "RACE")] = 3;
    values[(valuesById[4] = "SKILL")] = 4;
    values[(valuesById[5] = "SCENARIO")] = 5;
    return values;
  })();

  return Factor;
})());

export const FactorList = ($root.FactorList = (() => {
  /**
   * Properties of a FactorList.
   * @exports IFactorList
   * @interface IFactorList
   * @property {Array.<IFactor>|null} [data] FactorList data
   */

  /**
   * Constructs a new FactorList.
   * @exports FactorList
   * @classdesc Represents a FactorList.
   * @implements IFactorList
   * @constructor
   * @param {IFactorList=} [properties] Properties to set
   */
  function FactorList(properties) {
    this.data = [];
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * FactorList data.
   * @member {Array.<IFactor>} data
   * @memberof FactorList
   * @instance
   */
  FactorList.prototype.data = $util.emptyArray;

  /**
   * Decodes a FactorList message from the specified reader or buffer.
   * @function decode
   * @memberof FactorList
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {FactorList} FactorList
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  FactorList.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.FactorList();
    while (reader.pos < end) {
      let tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (!(message.data && message.data.length)) message.data = [];
          message.data.push($root.Factor.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  return FactorList;
})());

export const Moniker = ($root.Moniker = (() => {
  /**
   * Properties of a Moniker.
   * @exports IMoniker
   * @interface IMoniker
   * @property {number|null} [characterID] Moniker characterID
   * @property {number|null} [monikerID] Moniker monikerID
   * @property {number|null} [initialTalentLevel] Moniker initialTalentLevel
   * @property {Object.<string,Moniker.IStatus>|null} [initialStatus] Moniker initialStatus
   * @property {Moniker.IAbilities|null} [initialAbility] Moniker initialAbility
   * @property {Moniker.IStatus|null} [growthRate] Moniker growthRate
   * @property {Moniker.ISkills|null} [skills] Moniker skills
   * @property {Array.<number>|null} [events] Moniker events
   */

  /**
   * Constructs a new Moniker.
   * @exports Moniker
   * @classdesc Represents a Moniker.
   * @implements IMoniker
   * @constructor
   * @param {IMoniker=} [properties] Properties to set
   */
  function Moniker(properties) {
    this.initialStatus = {};
    this.events = [];
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * Moniker characterID.
   * @member {number} characterID
   * @memberof Moniker
   * @instance
   */
  Moniker.prototype.characterID = 0;

  /**
   * Moniker monikerID.
   * @member {number} monikerID
   * @memberof Moniker
   * @instance
   */
  Moniker.prototype.monikerID = 0;

  /**
   * Moniker initialTalentLevel.
   * @member {number} initialTalentLevel
   * @memberof Moniker
   * @instance
   */
  Moniker.prototype.initialTalentLevel = 0;

  /**
   * Moniker initialStatus.
   * @member {Object.<string,Moniker.IStatus>} initialStatus
   * @memberof Moniker
   * @instance
   */
  Moniker.prototype.initialStatus = $util.emptyObject;

  /**
   * Moniker initialAbility.
   * @member {Moniker.IAbilities|null|undefined} initialAbility
   * @memberof Moniker
   * @instance
   */
  Moniker.prototype.initialAbility = null;

  /**
   * Moniker growthRate.
   * @member {Moniker.IStatus|null|undefined} growthRate
   * @memberof Moniker
   * @instance
   */
  Moniker.prototype.growthRate = null;

  /**
   * Moniker skills.
   * @member {Moniker.ISkills|null|undefined} skills
   * @memberof Moniker
   * @instance
   */
  Moniker.prototype.skills = null;

  /**
   * Moniker events.
   * @member {Array.<number>} events
   * @memberof Moniker
   * @instance
   */
  Moniker.prototype.events = $util.emptyArray;

  /**
   * Decodes a Moniker message from the specified reader or buffer.
   * @function decode
   * @memberof Moniker
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {Moniker} Moniker
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Moniker.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.Moniker(),
      key,
      value;
    while (reader.pos < end) {
      let tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.characterID = reader.int32();
          break;
        case 2:
          message.monikerID = reader.int32();
          break;
        case 3:
          message.initialTalentLevel = reader.int32();
          break;
        case 4:
          if (message.initialStatus === $util.emptyObject)
            message.initialStatus = {};
          let end2 = reader.uint32() + reader.pos;
          key = 0;
          value = null;
          while (reader.pos < end2) {
            let tag2 = reader.uint32();
            switch (tag2 >>> 3) {
              case 1:
                key = reader.int32();
                break;
              case 2:
                value = $root.Moniker.Status.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag2 & 7);
                break;
            }
          }
          message.initialStatus[key] = value;
          break;
        case 5:
          message.initialAbility = $root.Moniker.Abilities.decode(
            reader,
            reader.uint32()
          );
          break;
        case 6:
          message.growthRate = $root.Moniker.Status.decode(
            reader,
            reader.uint32()
          );
          break;
        case 7:
          message.skills = $root.Moniker.Skills.decode(reader, reader.uint32());
          break;
        case 8:
          if (!(message.events && message.events.length)) message.events = [];
          if ((tag & 7) === 2) {
            let end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) message.events.push(reader.int32());
          } else message.events.push(reader.int32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  Moniker.Status = (function () {
    /**
     * Properties of a Status.
     * @memberof Moniker
     * @interface IStatus
     * @property {number|null} [speed] Status speed
     * @property {number|null} [stamina] Status stamina
     * @property {number|null} [power] Status power
     * @property {number|null} [tenacity] Status tenacity
     * @property {number|null} [intelligence] Status intelligence
     */

    /**
     * Constructs a new Status.
     * @memberof Moniker
     * @classdesc Represents a Status.
     * @implements IStatus
     * @constructor
     * @param {Moniker.IStatus=} [properties] Properties to set
     */
    function Status(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * Status speed.
     * @member {number} speed
     * @memberof Moniker.Status
     * @instance
     */
    Status.prototype.speed = 0;

    /**
     * Status stamina.
     * @member {number} stamina
     * @memberof Moniker.Status
     * @instance
     */
    Status.prototype.stamina = 0;

    /**
     * Status power.
     * @member {number} power
     * @memberof Moniker.Status
     * @instance
     */
    Status.prototype.power = 0;

    /**
     * Status tenacity.
     * @member {number} tenacity
     * @memberof Moniker.Status
     * @instance
     */
    Status.prototype.tenacity = 0;

    /**
     * Status intelligence.
     * @member {number} intelligence
     * @memberof Moniker.Status
     * @instance
     */
    Status.prototype.intelligence = 0;

    /**
     * Decodes a Status message from the specified reader or buffer.
     * @function decode
     * @memberof Moniker.Status
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Moniker.Status} Status
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Status.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.Moniker.Status();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.speed = reader.int32();
            break;
          case 2:
            message.stamina = reader.int32();
            break;
          case 3:
            message.power = reader.int32();
            break;
          case 4:
            message.tenacity = reader.int32();
            break;
          case 5:
            message.intelligence = reader.int32();
            break;
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    return Status;
  })();

  /**
   * Ability enum.
   * @name Moniker.Ability
   * @enum {number}
   * @property {number} G=0 G value
   * @property {number} F=1 F value
   * @property {number} E=2 E value
   * @property {number} D=3 D value
   * @property {number} C=4 C value
   * @property {number} B=5 B value
   * @property {number} A=6 A value
   * @property {number} S=7 S value
   */
  Moniker.Ability = (function () {
    const valuesById = {},
      values = Object.create(valuesById);
    values[(valuesById[0] = "G")] = 0;
    values[(valuesById[1] = "F")] = 1;
    values[(valuesById[2] = "E")] = 2;
    values[(valuesById[3] = "D")] = 3;
    values[(valuesById[4] = "C")] = 4;
    values[(valuesById[5] = "B")] = 5;
    values[(valuesById[6] = "A")] = 6;
    values[(valuesById[7] = "S")] = 7;
    return values;
  })();

  Moniker.Abilities = (function () {
    /**
     * Properties of an Abilities.
     * @memberof Moniker
     * @interface IAbilities
     * @property {Moniker.Ability|null} [turf] Abilities turf
     * @property {Moniker.Ability|null} [dirt] Abilities dirt
     * @property {Moniker.Ability|null} [short] Abilities short
     * @property {Moniker.Ability|null} [mile] Abilities mile
     * @property {Moniker.Ability|null} [middle] Abilities middle
     * @property {Moniker.Ability|null} [long] Abilities long
     * @property {Moniker.Ability|null} [nige] Abilities nige
     * @property {Moniker.Ability|null} [senko] Abilities senko
     * @property {Moniker.Ability|null} [sashi] Abilities sashi
     * @property {Moniker.Ability|null} [oikomi] Abilities oikomi
     */

    /**
     * Constructs a new Abilities.
     * @memberof Moniker
     * @classdesc Represents an Abilities.
     * @implements IAbilities
     * @constructor
     * @param {Moniker.IAbilities=} [properties] Properties to set
     */
    function Abilities(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * Abilities turf.
     * @member {Moniker.Ability} turf
     * @memberof Moniker.Abilities
     * @instance
     */
    Abilities.prototype.turf = 0;

    /**
     * Abilities dirt.
     * @member {Moniker.Ability} dirt
     * @memberof Moniker.Abilities
     * @instance
     */
    Abilities.prototype.dirt = 0;

    /**
     * Abilities short.
     * @member {Moniker.Ability} short
     * @memberof Moniker.Abilities
     * @instance
     */
    Abilities.prototype.short = 0;

    /**
     * Abilities mile.
     * @member {Moniker.Ability} mile
     * @memberof Moniker.Abilities
     * @instance
     */
    Abilities.prototype.mile = 0;

    /**
     * Abilities middle.
     * @member {Moniker.Ability} middle
     * @memberof Moniker.Abilities
     * @instance
     */
    Abilities.prototype.middle = 0;

    /**
     * Abilities long.
     * @member {Moniker.Ability} long
     * @memberof Moniker.Abilities
     * @instance
     */
    Abilities.prototype.long = 0;

    /**
     * Abilities nige.
     * @member {Moniker.Ability} nige
     * @memberof Moniker.Abilities
     * @instance
     */
    Abilities.prototype.nige = 0;

    /**
     * Abilities senko.
     * @member {Moniker.Ability} senko
     * @memberof Moniker.Abilities
     * @instance
     */
    Abilities.prototype.senko = 0;

    /**
     * Abilities sashi.
     * @member {Moniker.Ability} sashi
     * @memberof Moniker.Abilities
     * @instance
     */
    Abilities.prototype.sashi = 0;

    /**
     * Abilities oikomi.
     * @member {Moniker.Ability} oikomi
     * @memberof Moniker.Abilities
     * @instance
     */
    Abilities.prototype.oikomi = 0;

    /**
     * Decodes an Abilities message from the specified reader or buffer.
     * @function decode
     * @memberof Moniker.Abilities
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Moniker.Abilities} Abilities
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Abilities.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.Moniker.Abilities();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.turf = reader.int32();
            break;
          case 2:
            message.dirt = reader.int32();
            break;
          case 3:
            message.short = reader.int32();
            break;
          case 4:
            message.mile = reader.int32();
            break;
          case 5:
            message.middle = reader.int32();
            break;
          case 6:
            message.long = reader.int32();
            break;
          case 7:
            message.nige = reader.int32();
            break;
          case 8:
            message.senko = reader.int32();
            break;
          case 9:
            message.sashi = reader.int32();
            break;
          case 10:
            message.oikomi = reader.int32();
            break;
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    return Abilities;
  })();

  Moniker.Skills = (function () {
    /**
     * Properties of a Skills.
     * @memberof Moniker
     * @interface ISkills
     * @property {number|null} [awakeningLevel2] Skills awakeningLevel2
     * @property {number|null} [awakeningLevel3] Skills awakeningLevel3
     * @property {number|null} [awakeningLevel4] Skills awakeningLevel4
     * @property {number|null} [awakeningLevel5] Skills awakeningLevel5
     * @property {Array.<number>|null} [defaults] Skills defaults
     */

    /**
     * Constructs a new Skills.
     * @memberof Moniker
     * @classdesc Represents a Skills.
     * @implements ISkills
     * @constructor
     * @param {Moniker.ISkills=} [properties] Properties to set
     */
    function Skills(properties) {
      this.defaults = [];
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * Skills awakeningLevel2.
     * @member {number} awakeningLevel2
     * @memberof Moniker.Skills
     * @instance
     */
    Skills.prototype.awakeningLevel2 = 0;

    /**
     * Skills awakeningLevel3.
     * @member {number} awakeningLevel3
     * @memberof Moniker.Skills
     * @instance
     */
    Skills.prototype.awakeningLevel3 = 0;

    /**
     * Skills awakeningLevel4.
     * @member {number} awakeningLevel4
     * @memberof Moniker.Skills
     * @instance
     */
    Skills.prototype.awakeningLevel4 = 0;

    /**
     * Skills awakeningLevel5.
     * @member {number} awakeningLevel5
     * @memberof Moniker.Skills
     * @instance
     */
    Skills.prototype.awakeningLevel5 = 0;

    /**
     * Skills defaults.
     * @member {Array.<number>} defaults
     * @memberof Moniker.Skills
     * @instance
     */
    Skills.prototype.defaults = $util.emptyArray;

    /**
     * Decodes a Skills message from the specified reader or buffer.
     * @function decode
     * @memberof Moniker.Skills
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Moniker.Skills} Skills
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Skills.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.Moniker.Skills();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.awakeningLevel2 = reader.int32();
            break;
          case 2:
            message.awakeningLevel3 = reader.int32();
            break;
          case 3:
            message.awakeningLevel4 = reader.int32();
            break;
          case 4:
            message.awakeningLevel5 = reader.int32();
            break;
          case 5:
            if (!(message.defaults && message.defaults.length))
              message.defaults = [];
            if ((tag & 7) === 2) {
              let end2 = reader.uint32() + reader.pos;
              while (reader.pos < end2) message.defaults.push(reader.int32());
            } else message.defaults.push(reader.int32());
            break;
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    return Skills;
  })();

  return Moniker;
})());

export const MonikerList = ($root.MonikerList = (() => {
  /**
   * Properties of a MonikerList.
   * @exports IMonikerList
   * @interface IMonikerList
   * @property {Array.<IMoniker>|null} [data] MonikerList data
   */

  /**
   * Constructs a new MonikerList.
   * @exports MonikerList
   * @classdesc Represents a MonikerList.
   * @implements IMonikerList
   * @constructor
   * @param {IMonikerList=} [properties] Properties to set
   */
  function MonikerList(properties) {
    this.data = [];
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * MonikerList data.
   * @member {Array.<IMoniker>} data
   * @memberof MonikerList
   * @instance
   */
  MonikerList.prototype.data = $util.emptyArray;

  /**
   * Decodes a MonikerList message from the specified reader or buffer.
   * @function decode
   * @memberof MonikerList
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {MonikerList} MonikerList
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  MonikerList.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.MonikerList();
    while (reader.pos < end) {
      let tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (!(message.data && message.data.length)) message.data = [];
          message.data.push($root.Moniker.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  return MonikerList;
})());

export const Skill = ($root.Skill = (() => {
  /**
   * Properties of a Skill.
   * @exports ISkill
   * @interface ISkill
   * @property {number|null} [skillID] Skill skillID
   * @property {number|null} [sortID] Skill sortID
   * @property {number|null} [point] Skill point
   * @property {Skill.Type|null} [type] Skill type
   * @property {number|null} [conflictID] Skill conflictID
   * @property {boolean|null} [advanced] Skill advanced
   * @property {boolean|null} [unique] Skill unique
   * @property {number|null} [characterID] Skill characterID
   * @property {number|null} [monikerID] Skill monikerID
   * @property {Skill.Levels|null} [matchingTalentLevels] Skill matchingTalentLevels
   * @property {boolean|null} [inheritable] Skill inheritable
   */

  /**
   * Constructs a new Skill.
   * @exports Skill
   * @classdesc Represents a Skill.
   * @implements ISkill
   * @constructor
   * @param {ISkill=} [properties] Properties to set
   */
  function Skill(properties) {
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * Skill skillID.
   * @member {number} skillID
   * @memberof Skill
   * @instance
   */
  Skill.prototype.skillID = 0;

  /**
   * Skill sortID.
   * @member {number} sortID
   * @memberof Skill
   * @instance
   */
  Skill.prototype.sortID = 0;

  /**
   * Skill point.
   * @member {number} point
   * @memberof Skill
   * @instance
   */
  Skill.prototype.point = 0;

  /**
   * Skill type.
   * @member {Skill.Type} type
   * @memberof Skill
   * @instance
   */
  Skill.prototype.type = 0;

  /**
   * Skill conflictID.
   * @member {number} conflictID
   * @memberof Skill
   * @instance
   */
  Skill.prototype.conflictID = 0;

  /**
   * Skill advanced.
   * @member {boolean} advanced
   * @memberof Skill
   * @instance
   */
  Skill.prototype.advanced = false;

  /**
   * Skill unique.
   * @member {boolean} unique
   * @memberof Skill
   * @instance
   */
  Skill.prototype.unique = false;

  /**
   * Skill characterID.
   * @member {number} characterID
   * @memberof Skill
   * @instance
   */
  Skill.prototype.characterID = 0;

  /**
   * Skill monikerID.
   * @member {number} monikerID
   * @memberof Skill
   * @instance
   */
  Skill.prototype.monikerID = 0;

  /**
   * Skill matchingTalentLevels.
   * @member {Skill.Levels} matchingTalentLevels
   * @memberof Skill
   * @instance
   */
  Skill.prototype.matchingTalentLevels = 0;

  /**
   * Skill inheritable.
   * @member {boolean} inheritable
   * @memberof Skill
   * @instance
   */
  Skill.prototype.inheritable = false;

  /**
   * Decodes a Skill message from the specified reader or buffer.
   * @function decode
   * @memberof Skill
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {Skill} Skill
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Skill.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.Skill();
    while (reader.pos < end) {
      let tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.skillID = reader.int32();
          break;
        case 2:
          message.sortID = reader.int32();
          break;
        case 3:
          message.point = reader.int32();
          break;
        case 4:
          message.type = reader.int32();
          break;
        case 5:
          message.conflictID = reader.int32();
          break;
        case 6:
          message.advanced = reader.bool();
          break;
        case 7:
          message.unique = reader.bool();
          break;
        case 8:
          message.characterID = reader.int32();
          break;
        case 9:
          message.monikerID = reader.int32();
          break;
        case 10:
          message.matchingTalentLevels = reader.int32();
          break;
        case 11:
          message.inheritable = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  /**
   * Type enum.
   * @name Skill.Type
   * @enum {number}
   * @property {number} BUFF_SPEED=0 BUFF_SPEED value
   * @property {number} BUFF_ACCELERATION=1 BUFF_ACCELERATION value
   * @property {number} BUFF_POSITIONING=2 BUFF_POSITIONING value
   * @property {number} BUFF_VISION=3 BUFF_VISION value
   * @property {number} BUFF_STARTING=4 BUFF_STARTING value
   * @property {number} DEBUFF_SPEED=5 DEBUFF_SPEED value
   * @property {number} DEBUFF_STAMINA=6 DEBUFF_STAMINA value
   * @property {number} DEBUFF_AGITATION=7 DEBUFF_AGITATION value
   * @property {number} DEBUFF_CALM=8 DEBUFF_CALM value
   * @property {number} DEBUFF_VISION=9 DEBUFF_VISION value
   * @property {number} RECOVERY_STAMINA=10 RECOVERY_STAMINA value
   * @property {number} SUPPORT_SPEED=11 SUPPORT_SPEED value
   * @property {number} SUPPORT_STAMINA=12 SUPPORT_STAMINA value
   * @property {number} SUPPORT_POWER=13 SUPPORT_POWER value
   * @property {number} SUPPORT_TENACITY=14 SUPPORT_TENACITY value
   * @property {number} SUPPORT_GENERAL=15 SUPPORT_GENERAL value
   * @property {number} SUPPORT_STRATEGY=16 SUPPORT_STRATEGY value
   * @property {number} WEAK_FATIGUE=17 WEAK_FATIGUE value
   * @property {number} WEAK_STARTING=18 WEAK_STARTING value
   * @property {number} WEAK_MENTAL=19 WEAK_MENTAL value
   * @property {number} WEAK_WILL=20 WEAK_WILL value
   * @property {number} WEAK_RACE=21 WEAK_RACE value
   * @property {number} BUFF_SPEED_TEAM=22 BUFF_SPEED_TEAM value
   * @property {number} BUFF_ACCELERATION_TEAM=23 BUFF_ACCELERATION_TEAM value
   * @property {number} BUFF_POSITIONING_TEAM=24 BUFF_POSITIONING_TEAM value
   * @property {number} RECOVERY_STAMINA_TEAM=25 RECOVERY_STAMINA_TEAM value
   * @property {number} WEAK_DEMONSTRATE=26 WEAK_DEMONSTRATE value
   */
  Skill.Type = (function () {
    const valuesById = {},
      values = Object.create(valuesById);
    values[(valuesById[0] = "BUFF_SPEED")] = 0;
    values[(valuesById[1] = "BUFF_ACCELERATION")] = 1;
    values[(valuesById[2] = "BUFF_POSITIONING")] = 2;
    values[(valuesById[3] = "BUFF_VISION")] = 3;
    values[(valuesById[4] = "BUFF_STARTING")] = 4;
    values[(valuesById[5] = "DEBUFF_SPEED")] = 5;
    values[(valuesById[6] = "DEBUFF_STAMINA")] = 6;
    values[(valuesById[7] = "DEBUFF_AGITATION")] = 7;
    values[(valuesById[8] = "DEBUFF_CALM")] = 8;
    values[(valuesById[9] = "DEBUFF_VISION")] = 9;
    values[(valuesById[10] = "RECOVERY_STAMINA")] = 10;
    values[(valuesById[11] = "SUPPORT_SPEED")] = 11;
    values[(valuesById[12] = "SUPPORT_STAMINA")] = 12;
    values[(valuesById[13] = "SUPPORT_POWER")] = 13;
    values[(valuesById[14] = "SUPPORT_TENACITY")] = 14;
    values[(valuesById[15] = "SUPPORT_GENERAL")] = 15;
    values[(valuesById[16] = "SUPPORT_STRATEGY")] = 16;
    values[(valuesById[17] = "WEAK_FATIGUE")] = 17;
    values[(valuesById[18] = "WEAK_STARTING")] = 18;
    values[(valuesById[19] = "WEAK_MENTAL")] = 19;
    values[(valuesById[20] = "WEAK_WILL")] = 20;
    values[(valuesById[21] = "WEAK_RACE")] = 21;
    values[(valuesById[22] = "BUFF_SPEED_TEAM")] = 22;
    values[(valuesById[23] = "BUFF_ACCELERATION_TEAM")] = 23;
    values[(valuesById[24] = "BUFF_POSITIONING_TEAM")] = 24;
    values[(valuesById[25] = "RECOVERY_STAMINA_TEAM")] = 25;
    values[(valuesById[26] = "WEAK_DEMONSTRATE")] = 26;
    return values;
  })();

  /**
   * Levels enum.
   * @name Skill.Levels
   * @enum {number}
   * @property {number} FROM_1_TO_2=0 FROM_1_TO_2 value
   * @property {number} FROM_3_TO_5=1 FROM_3_TO_5 value
   */
  Skill.Levels = (function () {
    const valuesById = {},
      values = Object.create(valuesById);
    values[(valuesById[0] = "FROM_1_TO_2")] = 0;
    values[(valuesById[1] = "FROM_3_TO_5")] = 1;
    return values;
  })();

  return Skill;
})());

export const SkillList = ($root.SkillList = (() => {
  /**
   * Properties of a SkillList.
   * @exports ISkillList
   * @interface ISkillList
   * @property {Array.<ISkill>|null} [data] SkillList data
   */

  /**
   * Constructs a new SkillList.
   * @exports SkillList
   * @classdesc Represents a SkillList.
   * @implements ISkillList
   * @constructor
   * @param {ISkillList=} [properties] Properties to set
   */
  function SkillList(properties) {
    this.data = [];
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * SkillList data.
   * @member {Array.<ISkill>} data
   * @memberof SkillList
   * @instance
   */
  SkillList.prototype.data = $util.emptyArray;

  /**
   * Decodes a SkillList message from the specified reader or buffer.
   * @function decode
   * @memberof SkillList
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {SkillList} SkillList
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  SkillList.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.SkillList();
    while (reader.pos < end) {
      let tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (!(message.data && message.data.length)) message.data = [];
          message.data.push($root.Skill.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  return SkillList;
})());

export const SupportCard = ($root.SupportCard = (() => {
  /**
   * Properties of a SupportCard.
   * @exports ISupportCard
   * @interface ISupportCard
   * @property {number|null} [cardID] SupportCard cardID
   * @property {number|null} [characterID] SupportCard characterID
   * @property {SupportCard.Rarity|null} [rarity] SupportCard rarity
   * @property {SupportCard.Type|null} [type] SupportCard type
   * @property {Array.<number>|null} [skills] SupportCard skills
   * @property {Array.<number>|null} [events] SupportCard events
   */

  /**
   * Constructs a new SupportCard.
   * @exports SupportCard
   * @classdesc Represents a SupportCard.
   * @implements ISupportCard
   * @constructor
   * @param {ISupportCard=} [properties] Properties to set
   */
  function SupportCard(properties) {
    this.skills = [];
    this.events = [];
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * SupportCard cardID.
   * @member {number} cardID
   * @memberof SupportCard
   * @instance
   */
  SupportCard.prototype.cardID = 0;

  /**
   * SupportCard characterID.
   * @member {number} characterID
   * @memberof SupportCard
   * @instance
   */
  SupportCard.prototype.characterID = 0;

  /**
   * SupportCard rarity.
   * @member {SupportCard.Rarity} rarity
   * @memberof SupportCard
   * @instance
   */
  SupportCard.prototype.rarity = 0;

  /**
   * SupportCard type.
   * @member {SupportCard.Type} type
   * @memberof SupportCard
   * @instance
   */
  SupportCard.prototype.type = 0;

  /**
   * SupportCard skills.
   * @member {Array.<number>} skills
   * @memberof SupportCard
   * @instance
   */
  SupportCard.prototype.skills = $util.emptyArray;

  /**
   * SupportCard events.
   * @member {Array.<number>} events
   * @memberof SupportCard
   * @instance
   */
  SupportCard.prototype.events = $util.emptyArray;

  /**
   * Decodes a SupportCard message from the specified reader or buffer.
   * @function decode
   * @memberof SupportCard
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {SupportCard} SupportCard
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  SupportCard.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.SupportCard();
    while (reader.pos < end) {
      let tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cardID = reader.int32();
          break;
        case 2:
          message.characterID = reader.int32();
          break;
        case 3:
          message.rarity = reader.int32();
          break;
        case 4:
          message.type = reader.int32();
          break;
        case 5:
          if (!(message.skills && message.skills.length)) message.skills = [];
          if ((tag & 7) === 2) {
            let end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) message.skills.push(reader.int32());
          } else message.skills.push(reader.int32());
          break;
        case 6:
          if (!(message.events && message.events.length)) message.events = [];
          if ((tag & 7) === 2) {
            let end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) message.events.push(reader.int32());
          } else message.events.push(reader.int32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  /**
   * Rarity enum.
   * @name SupportCard.Rarity
   * @enum {number}
   * @property {number} R=0 R value
   * @property {number} SR=1 SR value
   * @property {number} SSR=2 SSR value
   */
  SupportCard.Rarity = (function () {
    const valuesById = {},
      values = Object.create(valuesById);
    values[(valuesById[0] = "R")] = 0;
    values[(valuesById[1] = "SR")] = 1;
    values[(valuesById[2] = "SSR")] = 2;
    return values;
  })();

  /**
   * Type enum.
   * @name SupportCard.Type
   * @enum {number}
   * @property {number} SPEED=0 SPEED value
   * @property {number} STAMINA=1 STAMINA value
   * @property {number} POWER=2 POWER value
   * @property {number} TENACITY=3 TENACITY value
   * @property {number} INTELLIGENCE=4 INTELLIGENCE value
   * @property {number} FRIEND=5 FRIEND value
   */
  SupportCard.Type = (function () {
    const valuesById = {},
      values = Object.create(valuesById);
    values[(valuesById[0] = "SPEED")] = 0;
    values[(valuesById[1] = "STAMINA")] = 1;
    values[(valuesById[2] = "POWER")] = 2;
    values[(valuesById[3] = "TENACITY")] = 3;
    values[(valuesById[4] = "INTELLIGENCE")] = 4;
    values[(valuesById[5] = "FRIEND")] = 5;
    return values;
  })();

  return SupportCard;
})());

export const SupportCardList = ($root.SupportCardList = (() => {
  /**
   * Properties of a SupportCardList.
   * @exports ISupportCardList
   * @interface ISupportCardList
   * @property {Array.<ISupportCard>|null} [data] SupportCardList data
   */

  /**
   * Constructs a new SupportCardList.
   * @exports SupportCardList
   * @classdesc Represents a SupportCardList.
   * @implements ISupportCardList
   * @constructor
   * @param {ISupportCardList=} [properties] Properties to set
   */
  function SupportCardList(properties) {
    this.data = [];
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * SupportCardList data.
   * @member {Array.<ISupportCard>} data
   * @memberof SupportCardList
   * @instance
   */
  SupportCardList.prototype.data = $util.emptyArray;

  /**
   * Decodes a SupportCardList message from the specified reader or buffer.
   * @function decode
   * @memberof SupportCardList
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {SupportCardList} SupportCardList
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  SupportCardList.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.SupportCardList();
    while (reader.pos < end) {
      let tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (!(message.data && message.data.length)) message.data = [];
          message.data.push($root.SupportCard.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  return SupportCardList;
})());

export { $root as default };
