import { SupportCard as _SupportCard, SupportCardList } from "@/data/_protobuf";
import { maps, objects } from "@/util";
import axios from "axios";
import _ from "@/util/lodash";
import supportCardDataUrl from "#/assets/data/support_card.dat?url";

const { orDefault, immutable } = objects;

export type Rarity = "r" | "sr" | "ssr";

export type SupportCardType =
  | "speed"
  | "stamina"
  | "power"
  | "tenacity"
  | "intelligence"
  | "friend";

export type SupportCardIdentify = {
  cardID: number;
};

export type SupportCard = Readonly<SupportCardIdentify> & {
  readonly characterID: number;
  readonly rarity: Rarity;
  readonly type: SupportCardType;
  readonly skills: ReadonlyArray<number>;
  readonly events: ReadonlyArray<number>;
};

export interface SupportCardStatic {
  get isLoaded(): boolean;

  get null(): SupportCard;

  get all(): ReadonlyArray<SupportCard>;

  get allType(): ReadonlyArray<SupportCardType>;

  get(cardID: number): SupportCard;

  get(identify: SupportCardIdentify): SupportCard;

  getCaptionKey(cardID: number): string;

  getCaptionKey(identify: SupportCardIdentify): string;
}

export const NULL_SUPPORT_CARD = immutable<SupportCard>({
  cardID: -1,
  characterID: -1,
  rarity: "r",
  type: "speed",
  skills: [],
  events: [],
});

const _allSupportCardType = Object.freeze<Array<SupportCardType>>([
  "speed",
  "stamina",
  "power",
  "tenacity",
  "intelligence",
  "friend",
]);

let _isLoaded = false;
let _allCard: ReadonlyArray<SupportCard>;
let _cardByIdMap: Record<number, SupportCard>;
(async () => {
  const data = await axios
    .get<ArrayBuffer>(supportCardDataUrl, { responseType: "arraybuffer" })
    .then((x) => new Uint8Array(x.data))
    .catch(() => Promise.resolve(new Uint8Array()));

  _allCard = Object.freeze<Array<SupportCard>>(
    _.sortBy(
      SupportCardList.decode(data).data.map((x) => {
        const rarity = ((): Rarity => {
          switch (orDefault(x.rarity, _SupportCard.Rarity.R)) {
            case _SupportCard.Rarity.R:
              return "r";
            case _SupportCard.Rarity.SR:
              return "sr";
            case _SupportCard.Rarity.SSR:
              return "ssr";
          }
        })();
        const type = ((): SupportCardType => {
          switch (orDefault(x.type, _SupportCard.Type.SPEED)) {
            case _SupportCard.Type.SPEED:
              return "speed";
            case _SupportCard.Type.STAMINA:
              return "stamina";
            case _SupportCard.Type.POWER:
              return "power";
            case _SupportCard.Type.TENACITY:
              return "tenacity";
            case _SupportCard.Type.INTELLIGENCE:
              return "intelligence";
            case _SupportCard.Type.FRIEND:
              return "friend";
          }
        })();

        return immutable<SupportCard>({
          cardID: orDefault(x.cardID, -1),
          characterID: orDefault(x.characterID, -1),
          rarity,
          type,
          skills: orDefault(x.skills, []),
          events: orDefault(x.events, []),
        });
      }),
      ["sortID"]
    )
  );

  _cardByIdMap = Object.freeze(
    maps.NumberMap(_allCard.map((x) => [x.cardID, x]))
  );

  _isLoaded = true;
})();

export const SupportCard: SupportCardStatic = {
  get isLoaded(): boolean {
    return _isLoaded;
  },
  get null(): SupportCard {
    return NULL_SUPPORT_CARD;
  },
  get all(): ReadonlyArray<SupportCard> {
    return orDefault(_allCard, () => Object.freeze([]));
  },
  get allType(): ReadonlyArray<SupportCardType> {
    return _allSupportCardType;
  },
  get(arg: number | SupportCardIdentify): SupportCard {
    const map = orDefault(_cardByIdMap, []);
    return orDefault(
      map[_.isNumber(arg) ? arg : arg.cardID],
      NULL_SUPPORT_CARD
    );
  },
  getCaptionKey(arg: number | SupportCardIdentify): string {
    const cardID = _.isNumber(arg) ? arg : arg.cardID;
    return `support-card.${cardID}.caption`;
  },
};
