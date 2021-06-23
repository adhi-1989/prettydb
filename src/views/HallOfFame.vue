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
              <div class="controller" @click="openEditor()" v-t="'ui.edit'" />
              <div class="controller" @click="closeViewer()" v-t="'ui.close'" />
            </div>
          </viewer>
          <editor
            :edit-data="getInjectionData()"
            v-else-if="activeContent === ActiveContent.EDITOR"
            @click.ctrl="closeEditor()"
          >
            <div class="controller-container">
              <div class="controller" @click="saveEditData()" v-t="'ui.save'" />
              <div
                class="controller"
                @click="closeEditor()"
                v-t="'ui.discard'"
              />
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
import _ from "lodash";
import { HallOfFameDTO, db, fetch, upsert } from "/@/db/hall-of-fame";
import List from "/@/components/hall-of-fame/content/list/List.vue";
import Viewer from "/@/components/hall-of-fame/content/viewer/Viewer.vue";
import Editor from "/@/components/hall-of-fame/content/editor/Editor.vue";
import { useI18n } from "/~/vue-i18n";

const ActiveContent = {
  LIST: 0,
  VIEWER: 1,
  EDITOR: 2,
} as const;

type ActiveContentKey = typeof ActiveContent[keyof typeof ActiveContent];

export default defineComponent({
  name: "HallOfFame",
  components: {
    List,
    Viewer,
    Editor,
  },
  data() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    return {
      ActiveContent,
      t,
    };
  },
  setup() {
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

<style lang="scss" scoped>
.hall-of-fame-root {
  @apply relative overflow-hidden h-full;
  > .modal-view {
    @apply absolute overflow-hidden h-full;
    &:not(:empty) {
      @apply w-full z-10;
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
        > .controller {
          @include button-gradient;
          @apply font-bold text-[0.875rem] rounded-md px-[0.5rem] py-[0.125rem] border cursor-pointer;
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
@screen xs {
  .hall-of-fame-root {
    > .modal-view {
      > .view-container {
        .controller-container {
          > .controller {
            @apply text-[1.25rem] rounded-lg px-[1rem] py-[0.25rem];
          }
        }
      }
    }
    > .standard-view {
      @apply max-w-[48rem] mx-auto;
    }
  }
}
</style>

<i18n locale="ja" src="/locales/ja/app/ui.json" />
