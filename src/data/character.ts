import { hashCode, createNumMap } from "/@/util/common";

export const TalentLevels = [1, 2, 3, 4, 5] as const;

export type TalentLevel = typeof TalentLevels[number];

const Characters = [
  /* スペシャルウィーク */ { CHARACTER_ID: 0, SORT_ID: 0 },
  /* サイレンススズカ */ { CHARACTER_ID: 1, SORT_ID: 1 },
  /* トウカイテイオー */ { CHARACTER_ID: 2, SORT_ID: 2 },
  /* マルゼンスキー */ { CHARACTER_ID: 3, SORT_ID: 3 },
  /* オグリキャップ */ { CHARACTER_ID: 5, SORT_ID: 5 },
  /* ゴールドシップ */ { CHARACTER_ID: 6, SORT_ID: 6 },
  /* ウオッカ */ { CHARACTER_ID: 7, SORT_ID: 7 },
  /* ダイワスカーレット */ { CHARACTER_ID: 8, SORT_ID: 8 },
  /* タイキシャトル */ { CHARACTER_ID: 9, SORT_ID: 9 },
  /* グラスワンダー */ { CHARACTER_ID: 10, SORT_ID: 10 },
  /* メジロマックイーン */ { CHARACTER_ID: 12, SORT_ID: 12 },
  /* エルコンドルパサー */ { CHARACTER_ID: 13, SORT_ID: 13 },
  /* テイエムオペラオー */ { CHARACTER_ID: 14, SORT_ID: 14 },
  /* ナリタブライアン */ { CHARACTER_ID: 15, SORT_ID: 15 },
  /* シンボリルドルフ */ { CHARACTER_ID: 16, SORT_ID: 16 },
  /* エアグルーヴ */ { CHARACTER_ID: 17, SORT_ID: 17 },
  /* セイウンスカイ */ { CHARACTER_ID: 20, SORT_ID: 20 },
  /* ビワハヤヒデ */ { CHARACTER_ID: 22, SORT_ID: 22 },
  /* マヤノトップガン */ { CHARACTER_ID: 23, SORT_ID: 23 },
  /* ミホノブルボン */ { CHARACTER_ID: 25, SORT_ID: 25 },
  /* メジロライアン */ { CHARACTER_ID: 26, SORT_ID: 26 },
  /* ライスシャワー */ { CHARACTER_ID: 29, SORT_ID: 29 },
  /* アグネスタキオン */ { CHARACTER_ID: 31, SORT_ID: 31 },
  /* ウイニングチケット */ { CHARACTER_ID: 34, SORT_ID: 34 },
  /* カレンチャン */ { CHARACTER_ID: 37, SORT_ID: 37 },
  /* サクラバクシンオー */ { CHARACTER_ID: 40, SORT_ID: 40 },
  /* スーパークリーク */ { CHARACTER_ID: 44, SORT_ID: 44 },
  /* スマートファルコン */ { CHARACTER_ID: 45, SORT_ID: 45 },
  /* ナリタタイシン */ { CHARACTER_ID: 49, SORT_ID: 49 },
  /* ハルウララ */ { CHARACTER_ID: 51, SORT_ID: 51 },
  /* マチカネフクキタル */ { CHARACTER_ID: 55, SORT_ID: 55 },
  /* ナイスネイチャ */ { CHARACTER_ID: 59, SORT_ID: 59 },
  /* キングヘイロー */ { CHARACTER_ID: 60, SORT_ID: 60 },
  /* ヒシアマゾン */ { CHARACTER_ID: 11, SORT_ID: 11 },
] as const;

const Monikers = [
  /* スペシャルウィーク:スペシャルドリーマー */ {
    CHARACTER_ID: 0,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 3,
  },
  /* サイレンススズカ:サイレントイノセンス */ {
    CHARACTER_ID: 1,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 3,
  },
  /* トウカイテイオー:トップ・オブ・ジョイフル */ {
    CHARACTER_ID: 2,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 3,
  },
  /* トウカイテイオー:ビヨンド・ザ・ホライズン */ {
    CHARACTER_ID: 2,
    MONIKER_ID: 1,
    INITIAL_TALENT_LEVEL: 3,
  },
  /* マルゼンスキー:フォーミュラオブルージュ */ {
    CHARACTER_ID: 3,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 3,
  },
  /* オグリキャップ:スターライトビート */ {
    CHARACTER_ID: 5,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 3,
  },
  /* ゴールドシップ:レッドストライフ */ {
    CHARACTER_ID: 6,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 2,
  },
  /* ウオッカ:ワイルドトップギア */ {
    CHARACTER_ID: 7,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 2,
  },
  /* ダイワスカーレット:トップ・オブ・ブルー */ {
    CHARACTER_ID: 8,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 2,
  },
  /* タイキシャトル:ワイルド・フロンティア */ {
    CHARACTER_ID: 9,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 3,
  },
  /* グラスワンダー:岩穿つ青 */ {
    CHARACTER_ID: 10,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 2,
  },
  /* メジロマックイーン:エレガンス・ライン */ {
    CHARACTER_ID: 12,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 3,
  },
  /* メジロマックイーン:エンド・オブ・スカイ */ {
    CHARACTER_ID: 12,
    MONIKER_ID: 1,
    INITIAL_TALENT_LEVEL: 3,
  },
  /* エルコンドルパサー:エル☆Número 1 */ {
    CHARACTER_ID: 13,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 2,
  },
  /* テイエムオペラオー:オー・ソレ・スーオ！ */ {
    CHARACTER_ID: 14,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 3,
  },
  /* ナリタブライアン:Maverick */ {
    CHARACTER_ID: 15,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 3,
  },
  /* シンボリルドルフ:ロード・オブ・エンペラー */ {
    CHARACTER_ID: 16,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 3,
  },
  /* エアグルーヴ:エンプレスロード */ {
    CHARACTER_ID: 17,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 2,
  },
  /* エアグルーヴ:クエルクス・キウィーリス */ {
    CHARACTER_ID: 17,
    MONIKER_ID: 1,
    INITIAL_TALENT_LEVEL: 3,
  },
  /* セイウンスカイ:あおぐもサミング */ {
    CHARACTER_ID: 20,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 3,
  },
  /* ビワハヤヒデ:pf.Victory formula... */ {
    CHARACTER_ID: 22,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 3,
  },
  /* マヤノトップガン:すくらんぶる☆ゾーン */ {
    CHARACTER_ID: 23,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 2,
  },
  /* マヤノトップガン:サンライト・ブーケ */ {
    CHARACTER_ID: 23,
    MONIKER_ID: 1,
    INITIAL_TALENT_LEVEL: 3,
  },
  /* ミホノブルボン:MB-19890425 */ {
    CHARACTER_ID: 25,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 3,
  },
  /* メジロライアン:ストレート・ライン */ {
    CHARACTER_ID: 26,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 1,
  },
  /* ライスシャワー:ローゼスドリーム */ {
    CHARACTER_ID: 29,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 3,
  },
  /* アグネスタキオン:tach-nology */ {
    CHARACTER_ID: 31,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 1,
  },
  /* ウイニングチケット:Go To Winning! */ {
    CHARACTER_ID: 34,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 1,
  },
  /* カレンチャン:フィーユ・エクレール */ {
    CHARACTER_ID: 37,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 3,
  },
  /* サクラバクシンオー:サクラ、すすめ！ */ {
    CHARACTER_ID: 40,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 1,
  },
  /* スーパークリーク:マーマリングストリーム */ {
    CHARACTER_ID: 44,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 2,
  },
  /* スマートファルコン:あぶそりゅーと☆LOVE */ {
    CHARACTER_ID: 45,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 3,
  },
  /* ナリタタイシン:Nevertheless */ {
    CHARACTER_ID: 49,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 3,
  },
  /* ハルウララ:うららん一等賞♪ */ {
    CHARACTER_ID: 51,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 1,
  },
  /* マチカネフクキタル:運気上昇☆幸福万来 */ {
    CHARACTER_ID: 55,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 1,
  },
  /* ナイスネイチャ:ポインセチア・リボン */ {
    CHARACTER_ID: 59,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 1,
  },
  /* キングヘイロー:キング・オブ・エメラルド */ {
    CHARACTER_ID: 60,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 1,
  },
  /* ヒシアマゾン:アマゾネス・ラピス */ {
    CHARACTER_ID: 11,
    MONIKER_ID: 0,
    INITIAL_TALENT_LEVEL: 3,
  },
  /* エルコンドルパサー:クルルカン・モンク */ {
    CHARACTER_ID: 13,
    MONIKER_ID: 1,
    INITIAL_TALENT_LEVEL: 3,
  },
  /* グラスワンダー:セイントジェード・ヒーラー */ {
    CHARACTER_ID: 10,
    MONIKER_ID: 1,
    INITIAL_TALENT_LEVEL: 3,
  },
] as const;

export type Character = {
  readonly CHARACTER_ID: number;
  readonly SORT_ID: number;
};
export type Moniker = {
  readonly CHARACTER_ID: number;
  readonly MONIKER_ID: number;
  readonly INITIAL_TALENT_LEVEL: TalentLevel;
};

export const AllCharacter = Object.freeze(
  Characters.map((x) => x as Character)
);
export const AllMoniker = Object.freeze(Monikers.map((x) => x as Moniker));

export const NULL_CHARACTER: Character = {
  CHARACTER_ID: -1,
  SORT_ID: -1,
};

export const NULL_MONIKER: Moniker = {
  CHARACTER_ID: -1,
  MONIKER_ID: 0,
  INITIAL_TALENT_LEVEL: 1,
};

const characterMap = Object.freeze(
  createNumMap(AllCharacter.map((x) => [x.CHARACTER_ID, x]))
);

const monikerMap = Object.freeze(
  createNumMap(
    AllMoniker.map((x) => [hashCode(x.CHARACTER_ID, x.MONIKER_ID), x])
  )
);

export function getCharacter(characterID: number): Character {
  return characterMap[characterID] || NULL_CHARACTER;
}

export function getMoniker(characterID: number, monikerID: number): Moniker {
  return monikerMap[hashCode(characterID, monikerID)] || NULL_MONIKER;
}

export function getAllMoniker(characterID: number): Array<Moniker> {
  return AllMoniker.filter((x) => x.CHARACTER_ID == characterID);
}
