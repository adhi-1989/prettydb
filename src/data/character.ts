import { hashCode, createNumMap } from "@/util";
import _ from "@/util/lodash";

export type CharacterIdentify = {
  characterID: number;
};

export type Character = Readonly<CharacterIdentify> & {
  readonly sortID: number;
};

export type MonikerIdentify = {
  characterID: number;
  monikerID: number;
};

export type Moniker = Readonly<MonikerIdentify> & {
  readonly initialTalentLevel: TalentLevel;
};

export type TalentLevel = 1 | 2 | 3 | 4 | 5;

const Characters: Array<Character> = [
  /* スペシャルウィーク */ { characterID: 0, sortID: 0 },
  /* サイレンススズカ */ { characterID: 1, sortID: 1 },
  /* トウカイテイオー */ { characterID: 2, sortID: 2 },
  /* マルゼンスキー */ { characterID: 3, sortID: 3 },
  /* オグリキャップ */ { characterID: 5, sortID: 5 },
  /* ゴールドシップ */ { characterID: 6, sortID: 6 },
  /* ウオッカ */ { characterID: 7, sortID: 7 },
  /* ダイワスカーレット */ { characterID: 8, sortID: 8 },
  /* タイキシャトル */ { characterID: 9, sortID: 9 },
  /* グラスワンダー */ { characterID: 10, sortID: 10 },
  /* メジロマックイーン */ { characterID: 12, sortID: 12 },
  /* エルコンドルパサー */ { characterID: 13, sortID: 13 },
  /* テイエムオペラオー */ { characterID: 14, sortID: 14 },
  /* ナリタブライアン */ { characterID: 15, sortID: 15 },
  /* シンボリルドルフ */ { characterID: 16, sortID: 16 },
  /* エアグルーヴ */ { characterID: 17, sortID: 17 },
  /* セイウンスカイ */ { characterID: 20, sortID: 20 },
  /* ビワハヤヒデ */ { characterID: 22, sortID: 22 },
  /* マヤノトップガン */ { characterID: 23, sortID: 23 },
  /* ミホノブルボン */ { characterID: 25, sortID: 25 },
  /* メジロライアン */ { characterID: 26, sortID: 26 },
  /* ライスシャワー */ { characterID: 29, sortID: 29 },
  /* アグネスタキオン */ { characterID: 31, sortID: 31 },
  /* ウイニングチケット */ { characterID: 34, sortID: 34 },
  /* カレンチャン */ { characterID: 37, sortID: 37 },
  /* サクラバクシンオー */ { characterID: 40, sortID: 40 },
  /* スーパークリーク */ { characterID: 44, sortID: 44 },
  /* スマートファルコン */ { characterID: 45, sortID: 45 },
  /* ナリタタイシン */ { characterID: 49, sortID: 49 },
  /* ハルウララ */ { characterID: 51, sortID: 51 },
  /* マチカネフクキタル */ { characterID: 55, sortID: 55 },
  /* ナイスネイチャ */ { characterID: 59, sortID: 59 },
  /* キングヘイロー */ { characterID: 60, sortID: 60 },
  /* ヒシアマゾン */ { characterID: 11, sortID: 11 },
  /* フジキセキ */ { characterID: 4, sortID: 4 },
  /* ゴールドシチー */ { characterID: 39, sortID: 39 },
];

const Monikers: Array<Moniker> = [
  /* スペシャルウィーク:スペシャルドリーマー */ {
    characterID: 0,
    monikerID: 0,
    initialTalentLevel: 3,
  },
  /* サイレンススズカ:サイレントイノセンス */ {
    characterID: 1,
    monikerID: 0,
    initialTalentLevel: 3,
  },
  /* トウカイテイオー:トップ・オブ・ジョイフル */ {
    characterID: 2,
    monikerID: 0,
    initialTalentLevel: 3,
  },
  /* トウカイテイオー:ビヨンド・ザ・ホライズン */ {
    characterID: 2,
    monikerID: 1,
    initialTalentLevel: 3,
  },
  /* マルゼンスキー:フォーミュラオブルージュ */ {
    characterID: 3,
    monikerID: 0,
    initialTalentLevel: 3,
  },
  /* オグリキャップ:スターライトビート */ {
    characterID: 5,
    monikerID: 0,
    initialTalentLevel: 3,
  },
  /* ゴールドシップ:レッドストライフ */ {
    characterID: 6,
    monikerID: 0,
    initialTalentLevel: 2,
  },
  /* ウオッカ:ワイルドトップギア */ {
    characterID: 7,
    monikerID: 0,
    initialTalentLevel: 2,
  },
  /* ダイワスカーレット:トップ・オブ・ブルー */ {
    characterID: 8,
    monikerID: 0,
    initialTalentLevel: 2,
  },
  /* タイキシャトル:ワイルド・フロンティア */ {
    characterID: 9,
    monikerID: 0,
    initialTalentLevel: 3,
  },
  /* グラスワンダー:岩穿つ青 */ {
    characterID: 10,
    monikerID: 0,
    initialTalentLevel: 2,
  },
  /* メジロマックイーン:エレガンス・ライン */ {
    characterID: 12,
    monikerID: 0,
    initialTalentLevel: 3,
  },
  /* メジロマックイーン:エンド・オブ・スカイ */ {
    characterID: 12,
    monikerID: 1,
    initialTalentLevel: 3,
  },
  /* エルコンドルパサー:エル☆Número 1 */ {
    characterID: 13,
    monikerID: 0,
    initialTalentLevel: 2,
  },
  /* テイエムオペラオー:オー・ソレ・スーオ！ */ {
    characterID: 14,
    monikerID: 0,
    initialTalentLevel: 3,
  },
  /* ナリタブライアン:Maverick */ {
    characterID: 15,
    monikerID: 0,
    initialTalentLevel: 3,
  },
  /* シンボリルドルフ:ロード・オブ・エンペラー */ {
    characterID: 16,
    monikerID: 0,
    initialTalentLevel: 3,
  },
  /* エアグルーヴ:エンプレスロード */ {
    characterID: 17,
    monikerID: 0,
    initialTalentLevel: 2,
  },
  /* エアグルーヴ:クエルクス・キウィーリス */ {
    characterID: 17,
    monikerID: 1,
    initialTalentLevel: 3,
  },
  /* セイウンスカイ:あおぐもサミング */ {
    characterID: 20,
    monikerID: 0,
    initialTalentLevel: 3,
  },
  /* ビワハヤヒデ:pf.Victory formula... */ {
    characterID: 22,
    monikerID: 0,
    initialTalentLevel: 3,
  },
  /* マヤノトップガン:すくらんぶる☆ゾーン */ {
    characterID: 23,
    monikerID: 0,
    initialTalentLevel: 2,
  },
  /* マヤノトップガン:サンライト・ブーケ */ {
    characterID: 23,
    monikerID: 1,
    initialTalentLevel: 3,
  },
  /* ミホノブルボン:MB-19890425 */ {
    characterID: 25,
    monikerID: 0,
    initialTalentLevel: 3,
  },
  /* メジロライアン:ストレート・ライン */ {
    characterID: 26,
    monikerID: 0,
    initialTalentLevel: 1,
  },
  /* ライスシャワー:ローゼスドリーム */ {
    characterID: 29,
    monikerID: 0,
    initialTalentLevel: 3,
  },
  /* アグネスタキオン:tach-nology */ {
    characterID: 31,
    monikerID: 0,
    initialTalentLevel: 1,
  },
  /* ウイニングチケット:Go To Winning! */ {
    characterID: 34,
    monikerID: 0,
    initialTalentLevel: 1,
  },
  /* カレンチャン:フィーユ・エクレール */ {
    characterID: 37,
    monikerID: 0,
    initialTalentLevel: 3,
  },
  /* サクラバクシンオー:サクラ、すすめ！ */ {
    characterID: 40,
    monikerID: 0,
    initialTalentLevel: 1,
  },
  /* スーパークリーク:マーマリングストリーム */ {
    characterID: 44,
    monikerID: 0,
    initialTalentLevel: 2,
  },
  /* スマートファルコン:あぶそりゅーと☆LOVE */ {
    characterID: 45,
    monikerID: 0,
    initialTalentLevel: 3,
  },
  /* ナリタタイシン:Nevertheless */ {
    characterID: 49,
    monikerID: 0,
    initialTalentLevel: 3,
  },
  /* ハルウララ:うららん一等賞♪ */ {
    characterID: 51,
    monikerID: 0,
    initialTalentLevel: 1,
  },
  /* マチカネフクキタル:運気上昇☆幸福万来 */ {
    characterID: 55,
    monikerID: 0,
    initialTalentLevel: 1,
  },
  /* ナイスネイチャ:ポインセチア・リボン */ {
    characterID: 59,
    monikerID: 0,
    initialTalentLevel: 1,
  },
  /* キングヘイロー:キング・オブ・エメラルド */ {
    characterID: 60,
    monikerID: 0,
    initialTalentLevel: 1,
  },
  /* ヒシアマゾン:アマゾネス・ラピス */ {
    characterID: 11,
    monikerID: 0,
    initialTalentLevel: 3,
  },
  /* エルコンドルパサー:クルルカン・モンク */ {
    characterID: 13,
    monikerID: 1,
    initialTalentLevel: 3,
  },
  /* グラスワンダー:セイントジェード・ヒーラー */ {
    characterID: 10,
    monikerID: 1,
    initialTalentLevel: 3,
  },
  /* フジキセキ:シューティンスタァ・ルヴュ */ {
    characterID: 4,
    monikerID: 0,
    initialTalentLevel: 3,
  },
  /* ゴールドシチー:オーセンティック/1928 */ {
    characterID: 39,
    monikerID: 0,
    initialTalentLevel: 3,
  },
  /* スペシャルウィーク:ほっぴん♪ビタミンハート */ {
    characterID: 0,
    monikerID: 1,
    initialTalentLevel: 3,
  },
  /* マルゼンスキー:ぶっとび☆さまーナイト */ {
    characterID: 3,
    monikerID: 1,
    initialTalentLevel: 3,
  },
];

export const NULL_CHARACTER: Character = Object.freeze({
  characterID: -1,
  sortID: -1,
});

export const NULL_MONIKER: Moniker = Object.freeze({
  characterID: -1,
  monikerID: -1,
  initialTalentLevel: 1,
});

export const AllTalentLevel: Readonly<Array<TalentLevel>> = Object.freeze([
  1, 2, 3, 4, 5,
]);

export const AllCharacter: Readonly<Array<Character>> = Object.freeze(
  Characters.sort((x, y) => x.sortID - y.sortID)
);

export const AllMoniker: Readonly<Array<Moniker>> = Object.freeze(
  Monikers.sort((x, y) => {
    if (x.characterID != y.characterID) {
      return x.characterID - y.characterID;
    }
    return x.monikerID - y.monikerID;
  })
);

const characterMap = Object.freeze(
  createNumMap(AllCharacter.map((x) => [x.characterID, x]))
);

const monikerMap = Object.freeze(
  createNumMap(AllMoniker.map((x) => [hashCode(x.characterID, x.monikerID), x]))
);

export function getCharacter(characterID: number): Character;
export function getCharacter(identify: CharacterIdentify): Character;
export function getCharacter(arg: number | CharacterIdentify): Character {
  if (_.isNumber(arg)) {
    return characterMap[arg];
  }
  return characterMap[arg.characterID];
}

export function getMoniker(characterID: number, monikerID: number): Moniker;
export function getMoniker(identify: MonikerIdentify): Moniker;
export function getMoniker(
  arg1: number | MonikerIdentify,
  arg2?: number
): Moniker {
  if (_.isNumber(arg1)) {
    if (!_.isNumber(arg2)) throw Error(`arg2 must be number: ${arg2}`);
    return monikerMap[hashCode(arg1, arg2)] || NULL_MONIKER;
  }
  return monikerMap[hashCode(arg1.characterID, arg1.monikerID)] || NULL_MONIKER;
}

export function getAllMoniker(characterID: number): Array<Moniker> {
  return AllMoniker.filter((x) => x.characterID == characterID);
}
