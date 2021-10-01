/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const protobuf = require("protobufjs");

const dataCharacter = require("./raw/character");
const dataMoniker = require("./raw/moniker");
const dataSkill = require("./raw/skill");
const dataFactor = require("./raw/factor");
const dataSupportCard = require("./raw/support_card");
const dataEvent = require("./raw/event");
/* eslint-enable @typescript-eslint/no-var-requires */

console.log("Generate protobuf-binary for data");

const protoDir = "proto/data";
const outDir = "src/assets/data";

protobuf.load(path.resolve(protoDir, "character.proto"), (err, root) => {
  if (err) throw err;

  const CharacterList = root.lookupType("CharacterList");

  const characters = CharacterList.create(dataCharacter());

  const characterData = `${outDir}/character.dat`;

  console.log(`Try generate data: ${characterData}`);

  fs.writeFileSync(characterData, CharacterList.encode(characters).finish());

  console.log(`Success generate data: ${characterData}`);
});

protobuf.load(path.resolve(protoDir, "moniker.proto"), (err, root) => {
  if (err) throw err;

  const { Ability } = root.lookupType("Moniker");
  const MonikerList = root.lookupType("MonikerList");

  const monikers = MonikerList.create(dataMoniker(Ability));

  const monikerData = `${outDir}/moniker.dat`;

  console.log(`Try generate data: ${monikerData}`);

  fs.writeFileSync(monikerData, MonikerList.encode(monikers).finish());

  console.log(`Success generate data: ${monikerData}`);
});

protobuf.load(path.resolve(protoDir, "skill.proto"), (err, root) => {
  if (err) throw err;

  const { Type, Levels } = root.lookupType("Skill");
  const SkillList = root.lookupType("SkillList");

  const skills = SkillList.create(dataSkill(Type, Levels));

  const skillData = `${outDir}/skill.dat`;

  console.log(`Try generate data: ${skillData}`);

  fs.writeFileSync(skillData, SkillList.encode(skills).finish());

  console.log(`Success generate data: ${skillData}`);
});

protobuf.load(path.resolve(protoDir, "factor.proto"), (err, root) => {
  if (err) throw err;

  const { Type } = root.lookupType("Factor");
  const FactorList = root.lookupType("FactorList");

  const factors = FactorList.create(dataFactor(Type));

  const factorData = `${outDir}/factor.dat`;

  console.log(`Try generate data: ${factorData}`);

  fs.writeFileSync(factorData, FactorList.encode(factors).finish());

  console.log(`Success generate data: ${factorData}`);
});

protobuf.load(path.resolve(protoDir, "support_card.proto"), (err, root) => {
  if (err) throw err;

  const { Rarity, Type } = root.lookupType("SupportCard");
  const SupportCardList = root.lookupType("SupportCardList");

  const cards = SupportCardList.create(dataSupportCard(Rarity, Type));

  const cardData = `${outDir}/support_card.dat`;

  console.log(`Try generate data: ${cardData}`);

  fs.writeFileSync(cardData, SupportCardList.encode(cards).finish());

  console.log(`Success generate data: ${cardData}`);
});

protobuf.load(path.resolve(protoDir, "event.proto"), (err, root) => {
  if (err) throw err;

  const EventList = root.lookupType("EventList");

  const events = EventList.create(dataEvent());

  const eventData = `${outDir}/event.dat`;

  console.log(`Try generate data: ${eventData}`);

  fs.writeFileSync(eventData, EventList.encode(events).finish());

  console.log(`Success generate data: ${eventData}`);
});
