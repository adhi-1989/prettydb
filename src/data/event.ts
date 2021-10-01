import { EventList } from "@/data/_protobuf";
import axios from "axios";
import _ from "@/util/lodash";
import { maps, objects } from "@/util";
import eventDataUrl from "#/assets/data/event.dat?url";

const { orDefault, immutable } = objects;

export type EventIdentify = {
  eventID: number;
};

export type Event = Readonly<EventIdentify> & {
  readonly skills: ReadonlyArray<number>;
};

export interface EventStatic {
  get isLoaded(): boolean;

  get null(): Event;

  get all(): ReadonlyArray<Event>;

  get(eventID: number): Event;

  get(identify: EventIdentify): Event;

  getNameKey(eventID: number): string;

  getNameKey(identify: EventIdentify): string;
}

export const NULL_EVENT = immutable<Event>({
  eventID: -1,
  skills: [],
});

let _isLoaded = false;
let _allEvent: ReadonlyArray<Event>;
let _eventByIdMap: Record<number, Event>;
(async () => {
  const data = await axios
    .get<ArrayBuffer>(eventDataUrl, { responseType: "arraybuffer" })
    .then((x) => new Uint8Array(x.data))
    .catch(() => Promise.resolve(new Uint8Array()));

  _allEvent = Object.freeze<Array<Event>>(
    _.sortBy(
      EventList.decode(data).data.map((x) => {
        return immutable<Event>({
          eventID: orDefault(x.eventID, -1),
          skills: orDefault(x.skills, []),
        });
      }),
      ["sortID"]
    )
  );

  _eventByIdMap = Object.freeze(
    maps.NumberMap(_allEvent.map((x) => [x.eventID, x]))
  );

  _isLoaded = true;
})();

export const Event: EventStatic = {
  get isLoaded(): boolean {
    return _isLoaded;
  },
  get null(): Event {
    return NULL_EVENT;
  },
  get all(): ReadonlyArray<Event> {
    return orDefault(_allEvent, () => Object.freeze([]));
  },
  get(arg: number | EventIdentify): Event {
    const map = orDefault(_eventByIdMap, []);
    return orDefault(map[_.isNumber(arg) ? arg : arg.eventID], NULL_EVENT);
  },
  getNameKey(arg: number | EventIdentify): string {
    const eventID = _.isNumber(arg) ? arg : arg.eventID;
    return `event.${eventID}.name`;
  },
};
