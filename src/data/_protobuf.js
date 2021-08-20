/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
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
   * Creates a new Character instance using the specified properties.
   * @function create
   * @memberof Character
   * @static
   * @param {ICharacter=} [properties] Properties to set
   * @returns {Character} Character instance
   */
  Character.create = function create(properties) {
    return new Character(properties);
  };

  /**
   * Encodes the specified Character message. Does not implicitly {@link Character.verify|verify} messages.
   * @function encode
   * @memberof Character
   * @static
   * @param {ICharacter} message Character message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Character.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (
      message.characterID != null &&
      Object.hasOwnProperty.call(message, "characterID")
    )
      writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.characterID);
    if (message.sortID != null && Object.hasOwnProperty.call(message, "sortID"))
      writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.sortID);
    return writer;
  };

  /**
   * Encodes the specified Character message, length delimited. Does not implicitly {@link Character.verify|verify} messages.
   * @function encodeDelimited
   * @memberof Character
   * @static
   * @param {ICharacter} message Character message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Character.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

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

  /**
   * Decodes a Character message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof Character
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {Character} Character
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Character.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies a Character message.
   * @function verify
   * @memberof Character
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  Character.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected";
    if (message.characterID != null && message.hasOwnProperty("characterID"))
      if (!$util.isInteger(message.characterID))
        return "characterID: integer expected";
    if (message.sortID != null && message.hasOwnProperty("sortID"))
      if (!$util.isInteger(message.sortID)) return "sortID: integer expected";
    return null;
  };

  /**
   * Creates a Character message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof Character
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {Character} Character
   */
  Character.fromObject = function fromObject(object) {
    if (object instanceof $root.Character) return object;
    let message = new $root.Character();
    if (object.characterID != null)
      message.characterID = object.characterID | 0;
    if (object.sortID != null) message.sortID = object.sortID | 0;
    return message;
  };

  /**
   * Creates a plain object from a Character message. Also converts values to other types if specified.
   * @function toObject
   * @memberof Character
   * @static
   * @param {Character} message Character
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  Character.toObject = function toObject(message, options) {
    if (!options) options = {};
    let object = {};
    if (options.defaults) {
      object.characterID = 0;
      object.sortID = 0;
    }
    if (message.characterID != null && message.hasOwnProperty("characterID"))
      object.characterID = message.characterID;
    if (message.sortID != null && message.hasOwnProperty("sortID"))
      object.sortID = message.sortID;
    return object;
  };

  /**
   * Converts this Character to JSON.
   * @function toJSON
   * @memberof Character
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  Character.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
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
   * Creates a new CharacterList instance using the specified properties.
   * @function create
   * @memberof CharacterList
   * @static
   * @param {ICharacterList=} [properties] Properties to set
   * @returns {CharacterList} CharacterList instance
   */
  CharacterList.create = function create(properties) {
    return new CharacterList(properties);
  };

  /**
   * Encodes the specified CharacterList message. Does not implicitly {@link CharacterList.verify|verify} messages.
   * @function encode
   * @memberof CharacterList
   * @static
   * @param {ICharacterList} message CharacterList message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  CharacterList.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (message.data != null && message.data.length)
      for (let i = 0; i < message.data.length; ++i)
        $root.Character.encode(
          message.data[i],
          writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
        ).ldelim();
    return writer;
  };

  /**
   * Encodes the specified CharacterList message, length delimited. Does not implicitly {@link CharacterList.verify|verify} messages.
   * @function encodeDelimited
   * @memberof CharacterList
   * @static
   * @param {ICharacterList} message CharacterList message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  CharacterList.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

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

  /**
   * Decodes a CharacterList message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof CharacterList
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {CharacterList} CharacterList
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  CharacterList.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies a CharacterList message.
   * @function verify
   * @memberof CharacterList
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  CharacterList.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected";
    if (message.data != null && message.hasOwnProperty("data")) {
      if (!Array.isArray(message.data)) return "data: array expected";
      for (let i = 0; i < message.data.length; ++i) {
        let error = $root.Character.verify(message.data[i]);
        if (error) return "data." + error;
      }
    }
    return null;
  };

  /**
   * Creates a CharacterList message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof CharacterList
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {CharacterList} CharacterList
   */
  CharacterList.fromObject = function fromObject(object) {
    if (object instanceof $root.CharacterList) return object;
    let message = new $root.CharacterList();
    if (object.data) {
      if (!Array.isArray(object.data))
        throw TypeError(".CharacterList.data: array expected");
      message.data = [];
      for (let i = 0; i < object.data.length; ++i) {
        if (typeof object.data[i] !== "object")
          throw TypeError(".CharacterList.data: object expected");
        message.data[i] = $root.Character.fromObject(object.data[i]);
      }
    }
    return message;
  };

  /**
   * Creates a plain object from a CharacterList message. Also converts values to other types if specified.
   * @function toObject
   * @memberof CharacterList
   * @static
   * @param {CharacterList} message CharacterList
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  CharacterList.toObject = function toObject(message, options) {
    if (!options) options = {};
    let object = {};
    if (options.arrays || options.defaults) object.data = [];
    if (message.data && message.data.length) {
      object.data = [];
      for (let j = 0; j < message.data.length; ++j)
        object.data[j] = $root.Character.toObject(message.data[j], options);
    }
    return object;
  };

  /**
   * Converts this CharacterList to JSON.
   * @function toJSON
   * @memberof CharacterList
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  CharacterList.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  return CharacterList;
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
   * Creates a new Factor instance using the specified properties.
   * @function create
   * @memberof Factor
   * @static
   * @param {IFactor=} [properties] Properties to set
   * @returns {Factor} Factor instance
   */
  Factor.create = function create(properties) {
    return new Factor(properties);
  };

  /**
   * Encodes the specified Factor message. Does not implicitly {@link Factor.verify|verify} messages.
   * @function encode
   * @memberof Factor
   * @static
   * @param {IFactor} message Factor message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Factor.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (
      message.factorID != null &&
      Object.hasOwnProperty.call(message, "factorID")
    )
      writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.factorID);
    if (message.sortID != null && Object.hasOwnProperty.call(message, "sortID"))
      writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.sortID);
    if (message.type != null && Object.hasOwnProperty.call(message, "type"))
      writer.uint32(/* id 3, wireType 0 =*/ 24).int32(message.type);
    if (
      message.skillID != null &&
      Object.hasOwnProperty.call(message, "skillID")
    )
      writer.uint32(/* id 4, wireType 0 =*/ 32).int32(message.skillID);
    return writer;
  };

  /**
   * Encodes the specified Factor message, length delimited. Does not implicitly {@link Factor.verify|verify} messages.
   * @function encodeDelimited
   * @memberof Factor
   * @static
   * @param {IFactor} message Factor message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Factor.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

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
   * Decodes a Factor message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof Factor
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {Factor} Factor
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Factor.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies a Factor message.
   * @function verify
   * @memberof Factor
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  Factor.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected";
    if (message.factorID != null && message.hasOwnProperty("factorID"))
      if (!$util.isInteger(message.factorID))
        return "factorID: integer expected";
    if (message.sortID != null && message.hasOwnProperty("sortID"))
      if (!$util.isInteger(message.sortID)) return "sortID: integer expected";
    if (message.type != null && message.hasOwnProperty("type"))
      switch (message.type) {
        default:
          return "type: enum value expected";
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
      }
    if (message.skillID != null && message.hasOwnProperty("skillID"))
      if (!$util.isInteger(message.skillID)) return "skillID: integer expected";
    return null;
  };

  /**
   * Creates a Factor message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof Factor
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {Factor} Factor
   */
  Factor.fromObject = function fromObject(object) {
    if (object instanceof $root.Factor) return object;
    let message = new $root.Factor();
    if (object.factorID != null) message.factorID = object.factorID | 0;
    if (object.sortID != null) message.sortID = object.sortID | 0;
    switch (object.type) {
      case "STATUS":
      case 0:
        message.type = 0;
        break;
      case "ABILITY":
      case 1:
        message.type = 1;
        break;
      case "UNIQUE_SKILL":
      case 2:
        message.type = 2;
        break;
      case "RACE":
      case 3:
        message.type = 3;
        break;
      case "SKILL":
      case 4:
        message.type = 4;
        break;
      case "SCENARIO":
      case 5:
        message.type = 5;
        break;
    }
    if (object.skillID != null) message.skillID = object.skillID | 0;
    return message;
  };

  /**
   * Creates a plain object from a Factor message. Also converts values to other types if specified.
   * @function toObject
   * @memberof Factor
   * @static
   * @param {Factor} message Factor
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  Factor.toObject = function toObject(message, options) {
    if (!options) options = {};
    let object = {};
    if (options.defaults) {
      object.factorID = 0;
      object.sortID = 0;
      object.type = options.enums === String ? "STATUS" : 0;
      object.skillID = 0;
    }
    if (message.factorID != null && message.hasOwnProperty("factorID"))
      object.factorID = message.factorID;
    if (message.sortID != null && message.hasOwnProperty("sortID"))
      object.sortID = message.sortID;
    if (message.type != null && message.hasOwnProperty("type"))
      object.type =
        options.enums === String
          ? $root.Factor.Type[message.type]
          : message.type;
    if (message.skillID != null && message.hasOwnProperty("skillID"))
      object.skillID = message.skillID;
    return object;
  };

  /**
   * Converts this Factor to JSON.
   * @function toJSON
   * @memberof Factor
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  Factor.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
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
   * Creates a new FactorList instance using the specified properties.
   * @function create
   * @memberof FactorList
   * @static
   * @param {IFactorList=} [properties] Properties to set
   * @returns {FactorList} FactorList instance
   */
  FactorList.create = function create(properties) {
    return new FactorList(properties);
  };

  /**
   * Encodes the specified FactorList message. Does not implicitly {@link FactorList.verify|verify} messages.
   * @function encode
   * @memberof FactorList
   * @static
   * @param {IFactorList} message FactorList message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  FactorList.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (message.data != null && message.data.length)
      for (let i = 0; i < message.data.length; ++i)
        $root.Factor.encode(
          message.data[i],
          writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
        ).ldelim();
    return writer;
  };

  /**
   * Encodes the specified FactorList message, length delimited. Does not implicitly {@link FactorList.verify|verify} messages.
   * @function encodeDelimited
   * @memberof FactorList
   * @static
   * @param {IFactorList} message FactorList message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  FactorList.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

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

  /**
   * Decodes a FactorList message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof FactorList
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {FactorList} FactorList
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  FactorList.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies a FactorList message.
   * @function verify
   * @memberof FactorList
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  FactorList.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected";
    if (message.data != null && message.hasOwnProperty("data")) {
      if (!Array.isArray(message.data)) return "data: array expected";
      for (let i = 0; i < message.data.length; ++i) {
        let error = $root.Factor.verify(message.data[i]);
        if (error) return "data." + error;
      }
    }
    return null;
  };

  /**
   * Creates a FactorList message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof FactorList
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {FactorList} FactorList
   */
  FactorList.fromObject = function fromObject(object) {
    if (object instanceof $root.FactorList) return object;
    let message = new $root.FactorList();
    if (object.data) {
      if (!Array.isArray(object.data))
        throw TypeError(".FactorList.data: array expected");
      message.data = [];
      for (let i = 0; i < object.data.length; ++i) {
        if (typeof object.data[i] !== "object")
          throw TypeError(".FactorList.data: object expected");
        message.data[i] = $root.Factor.fromObject(object.data[i]);
      }
    }
    return message;
  };

  /**
   * Creates a plain object from a FactorList message. Also converts values to other types if specified.
   * @function toObject
   * @memberof FactorList
   * @static
   * @param {FactorList} message FactorList
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  FactorList.toObject = function toObject(message, options) {
    if (!options) options = {};
    let object = {};
    if (options.arrays || options.defaults) object.data = [];
    if (message.data && message.data.length) {
      object.data = [];
      for (let j = 0; j < message.data.length; ++j)
        object.data[j] = $root.Factor.toObject(message.data[j], options);
    }
    return object;
  };

  /**
   * Converts this FactorList to JSON.
   * @function toJSON
   * @memberof FactorList
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  FactorList.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
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
   * Creates a new Moniker instance using the specified properties.
   * @function create
   * @memberof Moniker
   * @static
   * @param {IMoniker=} [properties] Properties to set
   * @returns {Moniker} Moniker instance
   */
  Moniker.create = function create(properties) {
    return new Moniker(properties);
  };

  /**
   * Encodes the specified Moniker message. Does not implicitly {@link Moniker.verify|verify} messages.
   * @function encode
   * @memberof Moniker
   * @static
   * @param {IMoniker} message Moniker message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Moniker.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (
      message.characterID != null &&
      Object.hasOwnProperty.call(message, "characterID")
    )
      writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.characterID);
    if (
      message.monikerID != null &&
      Object.hasOwnProperty.call(message, "monikerID")
    )
      writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.monikerID);
    if (
      message.initialTalentLevel != null &&
      Object.hasOwnProperty.call(message, "initialTalentLevel")
    )
      writer
        .uint32(/* id 3, wireType 0 =*/ 24)
        .int32(message.initialTalentLevel);
    return writer;
  };

  /**
   * Encodes the specified Moniker message, length delimited. Does not implicitly {@link Moniker.verify|verify} messages.
   * @function encodeDelimited
   * @memberof Moniker
   * @static
   * @param {IMoniker} message Moniker message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Moniker.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

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
      message = new $root.Moniker();
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  /**
   * Decodes a Moniker message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof Moniker
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {Moniker} Moniker
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Moniker.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies a Moniker message.
   * @function verify
   * @memberof Moniker
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  Moniker.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected";
    if (message.characterID != null && message.hasOwnProperty("characterID"))
      if (!$util.isInteger(message.characterID))
        return "characterID: integer expected";
    if (message.monikerID != null && message.hasOwnProperty("monikerID"))
      if (!$util.isInteger(message.monikerID))
        return "monikerID: integer expected";
    if (
      message.initialTalentLevel != null &&
      message.hasOwnProperty("initialTalentLevel")
    )
      if (!$util.isInteger(message.initialTalentLevel))
        return "initialTalentLevel: integer expected";
    return null;
  };

  /**
   * Creates a Moniker message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof Moniker
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {Moniker} Moniker
   */
  Moniker.fromObject = function fromObject(object) {
    if (object instanceof $root.Moniker) return object;
    let message = new $root.Moniker();
    if (object.characterID != null)
      message.characterID = object.characterID | 0;
    if (object.monikerID != null) message.monikerID = object.monikerID | 0;
    if (object.initialTalentLevel != null)
      message.initialTalentLevel = object.initialTalentLevel | 0;
    return message;
  };

  /**
   * Creates a plain object from a Moniker message. Also converts values to other types if specified.
   * @function toObject
   * @memberof Moniker
   * @static
   * @param {Moniker} message Moniker
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  Moniker.toObject = function toObject(message, options) {
    if (!options) options = {};
    let object = {};
    if (options.defaults) {
      object.characterID = 0;
      object.monikerID = 0;
      object.initialTalentLevel = 0;
    }
    if (message.characterID != null && message.hasOwnProperty("characterID"))
      object.characterID = message.characterID;
    if (message.monikerID != null && message.hasOwnProperty("monikerID"))
      object.monikerID = message.monikerID;
    if (
      message.initialTalentLevel != null &&
      message.hasOwnProperty("initialTalentLevel")
    )
      object.initialTalentLevel = message.initialTalentLevel;
    return object;
  };

  /**
   * Converts this Moniker to JSON.
   * @function toJSON
   * @memberof Moniker
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  Moniker.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

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
   * Creates a new MonikerList instance using the specified properties.
   * @function create
   * @memberof MonikerList
   * @static
   * @param {IMonikerList=} [properties] Properties to set
   * @returns {MonikerList} MonikerList instance
   */
  MonikerList.create = function create(properties) {
    return new MonikerList(properties);
  };

  /**
   * Encodes the specified MonikerList message. Does not implicitly {@link MonikerList.verify|verify} messages.
   * @function encode
   * @memberof MonikerList
   * @static
   * @param {IMonikerList} message MonikerList message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  MonikerList.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (message.data != null && message.data.length)
      for (let i = 0; i < message.data.length; ++i)
        $root.Moniker.encode(
          message.data[i],
          writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
        ).ldelim();
    return writer;
  };

  /**
   * Encodes the specified MonikerList message, length delimited. Does not implicitly {@link MonikerList.verify|verify} messages.
   * @function encodeDelimited
   * @memberof MonikerList
   * @static
   * @param {IMonikerList} message MonikerList message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  MonikerList.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

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

  /**
   * Decodes a MonikerList message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof MonikerList
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {MonikerList} MonikerList
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  MonikerList.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies a MonikerList message.
   * @function verify
   * @memberof MonikerList
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  MonikerList.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected";
    if (message.data != null && message.hasOwnProperty("data")) {
      if (!Array.isArray(message.data)) return "data: array expected";
      for (let i = 0; i < message.data.length; ++i) {
        let error = $root.Moniker.verify(message.data[i]);
        if (error) return "data." + error;
      }
    }
    return null;
  };

  /**
   * Creates a MonikerList message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof MonikerList
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {MonikerList} MonikerList
   */
  MonikerList.fromObject = function fromObject(object) {
    if (object instanceof $root.MonikerList) return object;
    let message = new $root.MonikerList();
    if (object.data) {
      if (!Array.isArray(object.data))
        throw TypeError(".MonikerList.data: array expected");
      message.data = [];
      for (let i = 0; i < object.data.length; ++i) {
        if (typeof object.data[i] !== "object")
          throw TypeError(".MonikerList.data: object expected");
        message.data[i] = $root.Moniker.fromObject(object.data[i]);
      }
    }
    return message;
  };

  /**
   * Creates a plain object from a MonikerList message. Also converts values to other types if specified.
   * @function toObject
   * @memberof MonikerList
   * @static
   * @param {MonikerList} message MonikerList
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  MonikerList.toObject = function toObject(message, options) {
    if (!options) options = {};
    let object = {};
    if (options.arrays || options.defaults) object.data = [];
    if (message.data && message.data.length) {
      object.data = [];
      for (let j = 0; j < message.data.length; ++j)
        object.data[j] = $root.Moniker.toObject(message.data[j], options);
    }
    return object;
  };

  /**
   * Converts this MonikerList to JSON.
   * @function toJSON
   * @memberof MonikerList
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  MonikerList.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
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
   * @property {Skill.TalentLevelMatcher|null} [talentLevelMatcher] Skill talentLevelMatcher
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
   * Skill talentLevelMatcher.
   * @member {Skill.TalentLevelMatcher} talentLevelMatcher
   * @memberof Skill
   * @instance
   */
  Skill.prototype.talentLevelMatcher = 0;

  /**
   * Skill inheritable.
   * @member {boolean} inheritable
   * @memberof Skill
   * @instance
   */
  Skill.prototype.inheritable = false;

  /**
   * Creates a new Skill instance using the specified properties.
   * @function create
   * @memberof Skill
   * @static
   * @param {ISkill=} [properties] Properties to set
   * @returns {Skill} Skill instance
   */
  Skill.create = function create(properties) {
    return new Skill(properties);
  };

  /**
   * Encodes the specified Skill message. Does not implicitly {@link Skill.verify|verify} messages.
   * @function encode
   * @memberof Skill
   * @static
   * @param {ISkill} message Skill message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Skill.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (
      message.skillID != null &&
      Object.hasOwnProperty.call(message, "skillID")
    )
      writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.skillID);
    if (message.sortID != null && Object.hasOwnProperty.call(message, "sortID"))
      writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.sortID);
    if (message.point != null && Object.hasOwnProperty.call(message, "point"))
      writer.uint32(/* id 3, wireType 0 =*/ 24).int32(message.point);
    if (message.type != null && Object.hasOwnProperty.call(message, "type"))
      writer.uint32(/* id 4, wireType 0 =*/ 32).int32(message.type);
    if (
      message.conflictID != null &&
      Object.hasOwnProperty.call(message, "conflictID")
    )
      writer.uint32(/* id 5, wireType 0 =*/ 40).int32(message.conflictID);
    if (
      message.advanced != null &&
      Object.hasOwnProperty.call(message, "advanced")
    )
      writer.uint32(/* id 6, wireType 0 =*/ 48).bool(message.advanced);
    if (message.unique != null && Object.hasOwnProperty.call(message, "unique"))
      writer.uint32(/* id 7, wireType 0 =*/ 56).bool(message.unique);
    if (
      message.characterID != null &&
      Object.hasOwnProperty.call(message, "characterID")
    )
      writer.uint32(/* id 8, wireType 0 =*/ 64).int32(message.characterID);
    if (
      message.monikerID != null &&
      Object.hasOwnProperty.call(message, "monikerID")
    )
      writer.uint32(/* id 9, wireType 0 =*/ 72).int32(message.monikerID);
    if (
      message.talentLevelMatcher != null &&
      Object.hasOwnProperty.call(message, "talentLevelMatcher")
    )
      writer
        .uint32(/* id 10, wireType 0 =*/ 80)
        .int32(message.talentLevelMatcher);
    if (
      message.inheritable != null &&
      Object.hasOwnProperty.call(message, "inheritable")
    )
      writer.uint32(/* id 11, wireType 0 =*/ 88).bool(message.inheritable);
    return writer;
  };

  /**
   * Encodes the specified Skill message, length delimited. Does not implicitly {@link Skill.verify|verify} messages.
   * @function encodeDelimited
   * @memberof Skill
   * @static
   * @param {ISkill} message Skill message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Skill.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

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
          message.talentLevelMatcher = reader.int32();
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
   * Decodes a Skill message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof Skill
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {Skill} Skill
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Skill.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies a Skill message.
   * @function verify
   * @memberof Skill
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  Skill.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected";
    if (message.skillID != null && message.hasOwnProperty("skillID"))
      if (!$util.isInteger(message.skillID)) return "skillID: integer expected";
    if (message.sortID != null && message.hasOwnProperty("sortID"))
      if (!$util.isInteger(message.sortID)) return "sortID: integer expected";
    if (message.point != null && message.hasOwnProperty("point"))
      if (!$util.isInteger(message.point)) return "point: integer expected";
    if (message.type != null && message.hasOwnProperty("type"))
      switch (message.type) {
        default:
          return "type: enum value expected";
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
          break;
      }
    if (message.conflictID != null && message.hasOwnProperty("conflictID"))
      if (!$util.isInteger(message.conflictID))
        return "conflictID: integer expected";
    if (message.advanced != null && message.hasOwnProperty("advanced"))
      if (typeof message.advanced !== "boolean")
        return "advanced: boolean expected";
    if (message.unique != null && message.hasOwnProperty("unique"))
      if (typeof message.unique !== "boolean")
        return "unique: boolean expected";
    if (message.characterID != null && message.hasOwnProperty("characterID"))
      if (!$util.isInteger(message.characterID))
        return "characterID: integer expected";
    if (message.monikerID != null && message.hasOwnProperty("monikerID"))
      if (!$util.isInteger(message.monikerID))
        return "monikerID: integer expected";
    if (
      message.talentLevelMatcher != null &&
      message.hasOwnProperty("talentLevelMatcher")
    )
      switch (message.talentLevelMatcher) {
        default:
          return "talentLevelMatcher: enum value expected";
        case 0:
        case 1:
        case 2:
          break;
      }
    if (message.inheritable != null && message.hasOwnProperty("inheritable"))
      if (typeof message.inheritable !== "boolean")
        return "inheritable: boolean expected";
    return null;
  };

  /**
   * Creates a Skill message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof Skill
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {Skill} Skill
   */
  Skill.fromObject = function fromObject(object) {
    if (object instanceof $root.Skill) return object;
    let message = new $root.Skill();
    if (object.skillID != null) message.skillID = object.skillID | 0;
    if (object.sortID != null) message.sortID = object.sortID | 0;
    if (object.point != null) message.point = object.point | 0;
    switch (object.type) {
      case "BUFF_SPEED":
      case 0:
        message.type = 0;
        break;
      case "BUFF_ACCELERATION":
      case 1:
        message.type = 1;
        break;
      case "BUFF_POSITIONING":
      case 2:
        message.type = 2;
        break;
      case "BUFF_VISION":
      case 3:
        message.type = 3;
        break;
      case "BUFF_STARTING":
      case 4:
        message.type = 4;
        break;
      case "DEBUFF_SPEED":
      case 5:
        message.type = 5;
        break;
      case "DEBUFF_STAMINA":
      case 6:
        message.type = 6;
        break;
      case "DEBUFF_AGITATION":
      case 7:
        message.type = 7;
        break;
      case "DEBUFF_CALM":
      case 8:
        message.type = 8;
        break;
      case "DEBUFF_VISION":
      case 9:
        message.type = 9;
        break;
      case "RECOVERY_STAMINA":
      case 10:
        message.type = 10;
        break;
      case "SUPPORT_SPEED":
      case 11:
        message.type = 11;
        break;
      case "SUPPORT_STAMINA":
      case 12:
        message.type = 12;
        break;
      case "SUPPORT_POWER":
      case 13:
        message.type = 13;
        break;
      case "SUPPORT_TENACITY":
      case 14:
        message.type = 14;
        break;
      case "SUPPORT_GENERAL":
      case 15:
        message.type = 15;
        break;
      case "SUPPORT_STRATEGY":
      case 16:
        message.type = 16;
        break;
      case "WEAK_FATIGUE":
      case 17:
        message.type = 17;
        break;
      case "WEAK_STARTING":
      case 18:
        message.type = 18;
        break;
      case "WEAK_MENTAL":
      case 19:
        message.type = 19;
        break;
      case "WEAK_WILL":
      case 20:
        message.type = 20;
        break;
      case "WEAK_RACE":
      case 21:
        message.type = 21;
        break;
    }
    if (object.conflictID != null) message.conflictID = object.conflictID | 0;
    if (object.advanced != null) message.advanced = Boolean(object.advanced);
    if (object.unique != null) message.unique = Boolean(object.unique);
    if (object.characterID != null)
      message.characterID = object.characterID | 0;
    if (object.monikerID != null) message.monikerID = object.monikerID | 0;
    switch (object.talentLevelMatcher) {
      case "FROM_1_TO_5":
      case 0:
        message.talentLevelMatcher = 0;
        break;
      case "FROM_1_TO_2":
      case 1:
        message.talentLevelMatcher = 1;
        break;
      case "FROM_3_TO_5":
      case 2:
        message.talentLevelMatcher = 2;
        break;
    }
    if (object.inheritable != null)
      message.inheritable = Boolean(object.inheritable);
    return message;
  };

  /**
   * Creates a plain object from a Skill message. Also converts values to other types if specified.
   * @function toObject
   * @memberof Skill
   * @static
   * @param {Skill} message Skill
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  Skill.toObject = function toObject(message, options) {
    if (!options) options = {};
    let object = {};
    if (options.defaults) {
      object.skillID = 0;
      object.sortID = 0;
      object.point = 0;
      object.type = options.enums === String ? "BUFF_SPEED" : 0;
      object.conflictID = 0;
      object.advanced = false;
      object.unique = false;
      object.characterID = 0;
      object.monikerID = 0;
      object.talentLevelMatcher = options.enums === String ? "FROM_1_TO_5" : 0;
      object.inheritable = false;
    }
    if (message.skillID != null && message.hasOwnProperty("skillID"))
      object.skillID = message.skillID;
    if (message.sortID != null && message.hasOwnProperty("sortID"))
      object.sortID = message.sortID;
    if (message.point != null && message.hasOwnProperty("point"))
      object.point = message.point;
    if (message.type != null && message.hasOwnProperty("type"))
      object.type =
        options.enums === String
          ? $root.Skill.Type[message.type]
          : message.type;
    if (message.conflictID != null && message.hasOwnProperty("conflictID"))
      object.conflictID = message.conflictID;
    if (message.advanced != null && message.hasOwnProperty("advanced"))
      object.advanced = message.advanced;
    if (message.unique != null && message.hasOwnProperty("unique"))
      object.unique = message.unique;
    if (message.characterID != null && message.hasOwnProperty("characterID"))
      object.characterID = message.characterID;
    if (message.monikerID != null && message.hasOwnProperty("monikerID"))
      object.monikerID = message.monikerID;
    if (
      message.talentLevelMatcher != null &&
      message.hasOwnProperty("talentLevelMatcher")
    )
      object.talentLevelMatcher =
        options.enums === String
          ? $root.Skill.TalentLevelMatcher[message.talentLevelMatcher]
          : message.talentLevelMatcher;
    if (message.inheritable != null && message.hasOwnProperty("inheritable"))
      object.inheritable = message.inheritable;
    return object;
  };

  /**
   * Converts this Skill to JSON.
   * @function toJSON
   * @memberof Skill
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  Skill.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
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
    return values;
  })();

  /**
   * TalentLevelMatcher enum.
   * @name Skill.TalentLevelMatcher
   * @enum {number}
   * @property {number} FROM_1_TO_5=0 FROM_1_TO_5 value
   * @property {number} FROM_1_TO_2=1 FROM_1_TO_2 value
   * @property {number} FROM_3_TO_5=2 FROM_3_TO_5 value
   */
  Skill.TalentLevelMatcher = (function () {
    const valuesById = {},
      values = Object.create(valuesById);
    values[(valuesById[0] = "FROM_1_TO_5")] = 0;
    values[(valuesById[1] = "FROM_1_TO_2")] = 1;
    values[(valuesById[2] = "FROM_3_TO_5")] = 2;
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
   * Creates a new SkillList instance using the specified properties.
   * @function create
   * @memberof SkillList
   * @static
   * @param {ISkillList=} [properties] Properties to set
   * @returns {SkillList} SkillList instance
   */
  SkillList.create = function create(properties) {
    return new SkillList(properties);
  };

  /**
   * Encodes the specified SkillList message. Does not implicitly {@link SkillList.verify|verify} messages.
   * @function encode
   * @memberof SkillList
   * @static
   * @param {ISkillList} message SkillList message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  SkillList.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (message.data != null && message.data.length)
      for (let i = 0; i < message.data.length; ++i)
        $root.Skill.encode(
          message.data[i],
          writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
        ).ldelim();
    return writer;
  };

  /**
   * Encodes the specified SkillList message, length delimited. Does not implicitly {@link SkillList.verify|verify} messages.
   * @function encodeDelimited
   * @memberof SkillList
   * @static
   * @param {ISkillList} message SkillList message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  SkillList.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

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

  /**
   * Decodes a SkillList message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof SkillList
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {SkillList} SkillList
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  SkillList.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies a SkillList message.
   * @function verify
   * @memberof SkillList
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  SkillList.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected";
    if (message.data != null && message.hasOwnProperty("data")) {
      if (!Array.isArray(message.data)) return "data: array expected";
      for (let i = 0; i < message.data.length; ++i) {
        let error = $root.Skill.verify(message.data[i]);
        if (error) return "data." + error;
      }
    }
    return null;
  };

  /**
   * Creates a SkillList message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof SkillList
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {SkillList} SkillList
   */
  SkillList.fromObject = function fromObject(object) {
    if (object instanceof $root.SkillList) return object;
    let message = new $root.SkillList();
    if (object.data) {
      if (!Array.isArray(object.data))
        throw TypeError(".SkillList.data: array expected");
      message.data = [];
      for (let i = 0; i < object.data.length; ++i) {
        if (typeof object.data[i] !== "object")
          throw TypeError(".SkillList.data: object expected");
        message.data[i] = $root.Skill.fromObject(object.data[i]);
      }
    }
    return message;
  };

  /**
   * Creates a plain object from a SkillList message. Also converts values to other types if specified.
   * @function toObject
   * @memberof SkillList
   * @static
   * @param {SkillList} message SkillList
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  SkillList.toObject = function toObject(message, options) {
    if (!options) options = {};
    let object = {};
    if (options.arrays || options.defaults) object.data = [];
    if (message.data && message.data.length) {
      object.data = [];
      for (let j = 0; j < message.data.length; ++j)
        object.data[j] = $root.Skill.toObject(message.data[j], options);
    }
    return object;
  };

  /**
   * Converts this SkillList to JSON.
   * @function toJSON
   * @memberof SkillList
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  SkillList.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  return SkillList;
})());

export { $root as default };
