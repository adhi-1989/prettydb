import { InjectionKey, Ref, DeepReadonly, ref, readonly } from "vue";
import { Dto } from "@/views/hall-of-fame/logic/db";

export type ViewType = "list" | "viewer" | "editor";

export type Action = {
  openView: (type: ViewType) => void;
  closeView: (type: ViewType) => void;
  setViewDataIndex: (index: number) => void;
  saveEditData: () => Promise<void>;
};

export type State = {
  dataList: Ref<Array<DeepReadonly<Dto>>>;
  viewData: Ref<DeepReadonly<Dto>>;
  editData: Ref<Dto>;
};

export const actionInjectionKey: InjectionKey<Action> = Symbol();

export const stateInjectionKey: InjectionKey<State> = Symbol();

export const fallbackActionFactory = (): Action => {
  return {
    openView: () => void 0,
    closeView: () => void 0,
    setViewDataIndex: () => void 0,
    saveEditData: () => Promise.resolve(),
  };
};

export const fallbackStateFactory = (): State => {
  return {
    dataList: ref([]),
    viewData: ref(readonly(Dto())),
    editData: ref(Dto()),
  };
};
