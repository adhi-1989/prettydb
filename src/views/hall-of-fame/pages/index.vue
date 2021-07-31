<template>
  <article class="hall-of-fame-root">
    <!-- modal view -->
    <div class="modal-view">
      <transition name="view-container">
        <div class="view-container" v-if="!isViewActive('list')">
          <transition name="view" mode="out-in">
            <div class="view" v-if="isViewActive('viewer')">
              <viewer />
            </div>
            <div class="view" v-else-if="isViewActive('editor')">
              <editor />
            </div>
          </transition>
        </div>
      </transition>
    </div>

    <!-- standard view -->
    <div class="standard-view" :data-active="isViewActive('list')">
      <list />
    </div>
  </article>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  provide,
  reactive,
  readonly,
  ref,
} from "vue";
import _ from "@/util/lodash";
import { Dto, db, fetch, upsert } from "@/views/hall-of-fame/logic/db";
import List from "@/views/hall-of-fame/components/list/List.vue";
import Viewer from "@/views/hall-of-fame/components/viewer/Viewer.vue";
import Editor from "@/views/hall-of-fame/components/editor/Editor.vue";
import { useI18n } from "vue-i18n";
import { useHead } from "~/@vueuse/head";
import {
  ViewType,
  actionInjectionKey,
  stateInjectionKey,
} from "@/views/hall-of-fame/logic/dependency";

export default defineComponent({
  components: {
    List,
    Viewer,
    Editor,
  },
  setup() {
    const { t } = useI18n();
    useHead({
      title: t("pages.hall-of-fame.title"),
      meta: [
        { name: "description", content: t("pages.hall-of-fame.description") },
      ],
      link: [
        { rel: "canonical", href: "https://prettydb.adhi.jp/hall-of-fame" },
      ],
    });

    const activeView = ref<ViewType>("list");
    const parentView: Array<ViewType> = [];
    const dataList = reactive<Array<Dto>>([]);
    const viewDataIndex = ref(-1);
    const viewData = ref(Dto());
    const viewDataBackup = ref<Dto | undefined>(undefined);
    const editData = ref(Dto());

    const refreshList = () => {
      dataList.splice(0);
      db.histories
        .orderBy("registerDate")
        .limit(200)
        .toArray()
        .then((x) => {
          x.forEach((y) => {
            fetch(y.id).then((dto) => {
              dataList.push(dto);
            });
          });
        });
    };

    const isViewActive = (type: ViewType) => {
      return activeView.value == type;
    };
    const openView = (type: ViewType) => {
      if (type === "viewer") {
        viewData.value = dataList[viewDataIndex.value];
      } else if (type === "editor") {
        if (viewDataIndex.value < 0) {
          editData.value = Dto();
        } else {
          viewDataBackup.value = viewData.value;
          editData.value = _.cloneDeep(dataList[viewDataIndex.value]);
        }
        viewData.value = editData.value;
      }
      parentView.push(activeView.value);
      activeView.value = type;
    };
    const closeView = (type: ViewType) => {
      if (activeView.value === type) {
        if (type === "viewer") {
          viewDataIndex.value = -1;
        } else if (type === "editor" && viewDataBackup.value != undefined) {
          viewData.value = viewDataBackup.value;
          viewDataBackup.value = undefined;
        }
        activeView.value = parentView.pop() || "list";
      }
    };

    provide(actionInjectionKey, {
      openView,
      closeView,
      setViewDataIndex: (index: number) => {
        viewDataIndex.value = index;
      },
      saveEditData: () => {
        return upsert(editData.value).then(() => {
          refreshList();
          viewDataBackup.value = undefined;
          return Promise.resolve();
        });
      },
    });

    provide(stateInjectionKey, {
      dataList: computed(() => dataList.map(readonly)),
      viewData: readonly(viewData),
      editData: editData,
    });

    onMounted(() => {
      refreshList();
    });

    return {
      t,
      isViewActive,
    };
  },
});
</script>

<style lang="scss">
.hall-of-fame-root {
  @apply relative overflow-hidden h-full;
  > .modal-view {
    @apply absolute overflow-hidden;
    &:not(:empty) {
      @apply w-full h-full z-1;
    }

    > .view-container {
      @apply relative h-full w-full;
      &-enter-active {
        animation: zoomIn;
        animation-duration: 0.3s;
      }

      &-leave-active {
        animation: zoomOut;
        animation-duration: 0.3s;
      }

      > .view {
        @apply overflow-hidden h-full w-full p-[1rem];
        &-enter-active {
          animation: flipInY;
          animation-duration: 0.25s;
        }

        &-leave-active {
          animation: flipOutY;
          animation-duration: 0.25s;
          @apply absolute;
        }
      }
    }
  }

  > .standard-view {
    @apply overflow-hidden h-full;
    &[data-active="false"] {
      @apply filter blur-sm;
    }
  }
}
</style>
