<template>
  <article :class="$style.hallOfFame">
    <section :class="$style.overlay">
      <transition @enter="zoomIn" @leave="zoomOut" :css="false">
        <div :class="$style.container" v-if="!isViewActive('list')">
          <transition
            mode="out-in"
            @enter="flipInY"
            @leave="flipOutY"
            :css="false"
          >
            <viewer v-if="isViewActive('viewer')" />
            <editor v-else-if="isViewActive('editor')" />
          </transition>
        </div>
      </transition>
    </section>

    <section
      :class="[$style.main, { [$style.background]: !isViewActive('list') }]"
    >
      <list />
    </section>
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
import { useHead } from "@vueuse/head";
import { useI18n } from "vue-i18n";
import _ from "@/util/lodash";
import {
  flipInY,
  flipOutY,
  zoomIn,
  zoomOut,
} from "@/views/_common/logic/dom/animation";
import { db, Dto } from "@/views/hall-of-fame/logic/db";
import {
  actionInjectionKey,
  stateInjectionKey,
  ViewType,
} from "@/views/hall-of-fame/logic/dependency";
import List from "@/views/hall-of-fame/components/list/List.vue";
import Viewer from "@/views/hall-of-fame/components/viewer/Viewer.vue";
import Editor from "@/views/hall-of-fame/components/editor/Editor.vue";

export default defineComponent({
  components: {
    List,
    Viewer,
    Editor,
  },
  data() {
    return {
      zoomIn: zoomIn({
        duration: 250,
        easing: "ease-out",
      }),
      zoomOut: zoomOut({
        duration: 250,
        easing: "ease-out",
      }),
      flipInY: flipInY({
        duration: 250,
        easing: "ease-in-out",
      }),
      flipOutY: flipOutY({
        duration: 250,
        easing: "ease-in-out",
      }),
    };
  },
  setup() {
    const { t } = useI18n();

    useHead({
      title: t("head.hall-of-fame.title"),
      meta: [
        { name: "description", content: t("head.hall-of-fame.description") },
      ],
    });

    const isDataEmpty = ref(false);
    const dataCount = ref(0);
    const dataList = reactive<Array<Dto>>([]);
    const listOffset = ref(0);
    const orderType = ref("register-date");

    const activeView = ref<ViewType>("list");
    const parentView: Array<ViewType> = [];
    const viewDataIndex = ref(-1);
    const viewData = ref(Dto());
    const viewDataBackup = ref<Dto | undefined>(undefined);
    const editData = ref(Dto());

    const refreshList = () => {
      dataCount.value = 0;
      dataList.splice(0);

      db.IDs.toCollection()
        .first()
        .then((x) => {
          isDataEmpty.value = x === undefined;
        });

      if (orderType.value === "register-date") {
        db.histories
          .orderBy("registerDate")
          .offset(listOffset.value)
          .limit(32)
          .toArray()
          .then((x) => {
            x.forEach((y) => {
              db.fetch(y.id).then((dto) => {
                dataList.push(dto);
              });
            });
          })
          .finally(() => {
            db.histories.count().then((x) => {
              dataCount.value = x;
            });
          });
      }
    };

    const isViewActive = (type: ViewType) => {
      return activeView.value === type;
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
        } else if (type === "editor" && viewDataBackup.value !== undefined) {
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
        return db.upsert(editData.value).then(() => {
          refreshList();
          viewDataBackup.value = undefined;
          return Promise.resolve();
        });
      },
      setDataListOffset: (offset: number) => {
        listOffset.value = offset;
        refreshList();
      },
    });

    provide(stateInjectionKey, {
      isDataEmpty: computed(() => isDataEmpty.value),
      dataCount: computed(() => dataCount.value),
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

<style lang="scss" module>
.content {
  @apply w-[18rem] min-h-[32rem] h-[calc(100%-2rem)] mx-auto my-[1rem];
  @apply sm:(w-[24.25rem] min-h-[43rem]);
  @apply md:(w-[32rem] min-h-[54rem]);
  @apply lg:(w-[40rem]);
  @apply xl:(w-[48rem]);
}

.hallOfFame {
  @apply relative h-full overflow-auto;

  > .overlay {
    @apply absolute;

    &:not(:empty) {
      @extend .content;
      @apply inset-0 z-10;
    }

    > .container {
      @apply h-full w-full overflow-hidden;
    }
  }

  > .main {
    @extend .content;

    &.background {
      @apply filter blur-sm;
    }
  }
}
</style>
