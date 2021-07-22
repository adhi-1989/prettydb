<template>
  <article class="hall-of-fame-root">
    <!-- modal view -->
    <div class="modal-view">
      <transition name="view-container">
        <div class="view-container" v-if="activeContent !== ActiveContent.LIST">
          <viewer
            :view-data="getInjectionData()"
            v-if="activeContent === ActiveContent.VIEWER"
            @click.ctrl="closeViewer()"
          >
            <div class="controller-container">
              <div class="controller" @click="openEditor()">
                {{ t("ui.edit") }}
              </div>
              <div class="controller" @click="closeViewer()">
                {{ t("ui.close") }}
              </div>
            </div>
          </viewer>
          <editor
            :edit-data="getInjectionData()"
            v-else-if="activeContent === ActiveContent.EDITOR"
            @click.ctrl="closeEditor()"
          >
            <div class="controller-container">
              <div class="controller" @click="saveEditData()">
                {{ t("ui.save") }}
              </div>
              <div class="controller" @click="closeEditor()">
                {{ t("ui.discard") }}
              </div>
            </div>
          </editor>
        </div>
      </transition>
    </div>

    <!-- standard view -->
    <div
      class="standard-view"
      :data-active="activeContent === ActiveContent.LIST"
    >
      <list
        :data-list="dataList"
        @openViewer="openViewer"
        @openEditor="openEditor"
      />
    </div>
  </article>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  readonly,
  ref,
  toRaw,
} from "vue";
import _ from "@/util/lodash";
import {
  HallOfFameDTO,
  db,
  fetch,
  upsert,
} from "@/views/hall-of-fame/logic/db";
import List from "@/views/hall-of-fame/components/list/List.vue";
import Viewer from "@/views/hall-of-fame/components/viewer/Viewer.vue";
import Editor from "@/views/hall-of-fame/components/editor/Editor.vue";
import { useI18n } from "vue-i18n";
import { useHead } from "~/@vueuse/head";

const ActiveContent = {
  LIST: 0,
  VIEWER: 1,
  EDITOR: 2,
} as const;

type ActiveContentKey = typeof ActiveContent[keyof typeof ActiveContent];

export default defineComponent({
  components: {
    List,
    Viewer,
    Editor,
  },
  data() {
    return {
      ActiveContent,
    };
  },
  setup() {
    const { t } = useI18n();
    useHead({
      title: t("pages.hall-of-fame.title"),
      meta: [
        { name: "description", content: t("pages.hall-of-fame.description") },
      ],
    });

    const dataList: Array<HallOfFameDTO> = reactive([]);
    const activeContent = ref<ActiveContentKey>(ActiveContent.LIST);

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

    let injectionData = HallOfFameDTO();
    const getInjectionData = () => {
      if (activeContent.value == ActiveContent.EDITOR) {
        return reactive(injectionData) as HallOfFameDTO;
      } else {
        return readonly(injectionData) as HallOfFameDTO;
      }
    };
    const openViewer = (index: number) => {
      injectionData = dataList[index];
      activeContent.value = ActiveContent.VIEWER;
    };
    const closeViewer = () => {
      injectionData = HallOfFameDTO();
      activeContent.value = ActiveContent.LIST;
    };

    let parentMode: ActiveContentKey = ActiveContent.LIST;
    let backupData = HallOfFameDTO();
    const openEditor = (clearInjectionData = false) => {
      if (clearInjectionData) {
        injectionData = HallOfFameDTO();
      }
      parentMode = activeContent.value;
      backupData = _.cloneDeep(toRaw(injectionData));
      activeContent.value = ActiveContent.EDITOR;
    };
    const closeEditor = (discard = true) => {
      if (discard) {
        injectionData = backupData;
      }
      activeContent.value = parentMode;
    };
    const saveEditData = () => {
      upsert(injectionData).then(() => {
        refreshList();
      });
      closeEditor(false);
    };

    onMounted(() => {
      refreshList();
    });

    return {
      t,
      dataList: readonly(dataList) as Array<HallOfFameDTO>,
      activeContent: readonly(activeContent),
      getInjectionData,
      openViewer,
      closeViewer,
      openEditor,
      closeEditor,
      saveEditData,
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
      @apply overflow-hidden h-full p-[1rem];
      &-enter-active {
        animation: zoomIn;
        animation-duration: 0.3s;
      }

      &-leave-active {
        animation: zoomOut;
        animation-duration: 0.3s;
      }

      .controller-container {
        @apply flex gap-x-[2rem] justify-center;
        @apply xs:(text-[1.25rem] rounded-lg px-[1rem] py-[0.25rem]);
        > .controller {
          @include button-gradient;
          @apply font-bold text-[0.875rem] rounded-md px-[0.5rem] py-[0.25rem] border cursor-pointer;
          @apply xs:(text-[1.125rem] px-[1rem] py-[0.5rem]);
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
