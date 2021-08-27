import {
  ComputedRef,
  DeepReadonly,
  InjectionKey,
  Ref,
  inject as InjectMethod,
  ref,
  readonly,
  computed,
} from "vue";
import { Dto } from "@/views/hall-of-fame/logic/db";

export type ViewType = "list" | "viewer" | "editor";

export type Action = {
  openView: (type: ViewType) => void;
  closeView: (type: ViewType) => void;
  setViewDataIndex: (index: number) => void;
  saveEditData: () => Promise<void>;
  setDataListOffset: (offset: number) => void;
};

export type State = {
  isDataEmpty: ComputedRef<boolean>;
  dataCount: ComputedRef<number>;
  dataList: ComputedRef<Array<DeepReadonly<Dto>>>;
  viewData: Ref<DeepReadonly<Dto>>;
  editData: Ref<Dto>;
};

export const actionInjectionKey: InjectionKey<Action> = Symbol();

export const stateInjectionKey: InjectionKey<State> = Symbol();

export const fallbackActionFactory = (): Action => ({
  openView: () => void 0,
  closeView: () => void 0,
  setViewDataIndex: () => void 0,
  saveEditData: () => Promise.resolve(),
  setDataListOffset: () => void 0,
});

export const fallbackStateFactory = (): State => ({
  isDataEmpty: computed(() => true),
  dataCount: computed(() => 0),
  dataList: computed(() => []),
  viewData: ref(readonly(Dto())),
  editData: ref(Dto()),
});

type inject = typeof InjectMethod;

export function Action(inject: inject): Action {
  return inject(actionInjectionKey, fallbackActionFactory, true);
}

export function State(inject: inject): State {
  return inject(stateInjectionKey, fallbackStateFactory, true);
}
