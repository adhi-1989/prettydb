<template>
  <article :class="$style.editor">
    <main ref="mainRef" :class="$style.main">
      <transition
        :name="$style.slide"
        @enter="transitionEnter"
        @leave="transitionLeave"
      >
        <div
          :class="[$style.content, { [$style.preview]: isPagePreview }]"
          :key="page"
        >
          <component :is="component" v-if="!isPagePreview" />
          <viewer v-else>
            <template #controllers>
              <div :class="$style.controller" @click="closeEditor(true)">
                <div :class="$style.content">
                  <icon-ion-close :class="$style.icon" />
                  <span :class="$style.text">{{ t("ui.discard") }}</span>
                </div>
              </div>
              <div
                :class="[$style.controller, $style.save]"
                @click="closeEditor(false)"
              >
                <div :class="$style.content">
                  <icon-ion-checkmark-done :class="$style.icon" />
                  <span :class="$style.text">{{ t("ui.save") }}</span>
                </div>
              </div>
            </template>
          </viewer>
        </div>
      </transition>
    </main>

    <nav :class="$style.navigation">
      <pagination v-model="page" :max="7" :sphere="true" />
    </nav>
  </article>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref, watch } from "vue";
import { useSwipe } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import _ from "@/util/lodash";
import {
  slideInLeft,
  slideInRight,
  slideOutLeft,
  slideOutRight,
} from "@/views/_common/logic/dom/animation";
import { Action, State } from "@/views/hall-of-fame/logic/dependency";
import Pagination from "@/views/_common/components/widget/Pagination.vue";
import CharacterEditor from "@/views/hall-of-fame/components/editor/CharacterEditor.vue";
import StatusEditor from "@/views/hall-of-fame/components/editor/StatusEditor.vue";
import AbilityEditor from "@/views/hall-of-fame/components/editor/AbilityEditor.vue";
import SkillEditor from "@/views/hall-of-fame/components/editor/SkillEditor.vue";
import FactorEditor from "@/views/hall-of-fame/components/editor/FactorEditor.vue";
import HistoryEditor from "@/views/hall-of-fame/components/editor/HistoryEditor.vue";
import Viewer from "@/views/hall-of-fame/components/viewer/Viewer.vue";

type Component =
  | "character-editor"
  | "status-editor"
  | "ability-editor"
  | "skill-editor"
  | "factor-editor"
  | "history-editor"
  | "viewer";

type Page = {
  readonly index: number;
  readonly component: Component;
};

const Pages: ReadonlyArray<Page> = Object.freeze([
  {
    index: 1,
    component: "character-editor",
  },
  {
    index: 2,
    component: "status-editor",
  },
  {
    index: 3,
    component: "ability-editor",
  },
  {
    index: 4,
    component: "skill-editor",
  },
  {
    index: 5,
    component: "factor-editor",
  },
  {
    index: 6,
    component: "history-editor",
  },
  {
    index: 7,
    component: "viewer",
  },
]);

type Direction = "next" | "prev";

export default defineComponent({
  components: {
    Pagination,
    CharacterEditor,
    StatusEditor,
    AbilityEditor,
    SkillEditor,
    FactorEditor,
    HistoryEditor,
    Viewer,
  },
  setup() {
    const { t } = useI18n();

    const { closeView, saveEditData } = Action(inject);
    const { editData } = State(inject);

    const closeEditor = (discard: boolean) => {
      if (!discard) {
        saveEditData().then(() => {
          closeView("editor");
        });
      } else {
        closeView("editor");
      }
    };

    const page = ref(1);
    const component = computed(() => {
      return (
        Pages.filter((x) => x.index === page.value)
          .map((x) => x.component)
          .pop() || "character-editor"
      );
    });
    const isPagePreview = computed(() => component.value === "viewer");

    const _direction = ref<Direction>("next");

    const _slideInRight = slideInRight({
      duration: 500,
      easing: "ease-in-out",
    });
    const _slideInLeft = slideInLeft({
      duration: 500,
      easing: "ease-in-out",
    });
    const transitionEnter = computed(() => {
      return _direction.value === "next" ? _slideInLeft : _slideInRight;
    });

    const _slideOutRight = slideOutRight({
      duration: 500,
      easing: "ease-in-out",
    });
    const _slideOutLeft = slideOutLeft({
      duration: 500,
      easing: "ease-in-out",
    });
    const transitionLeave = computed(() => {
      return _direction.value === "next" ? _slideOutLeft : _slideOutRight;
    });

    const _movePage = (direction: Direction) => {
      const index = page.value + (direction === "next" ? 1 : -1);
      if (_.some(Pages, { index })) {
        page.value = index;
      }
    };

    const mainRef = ref<Element>();
    const { lengthX } = useSwipe(mainRef, {
      onSwipeEnd: (e, direction) => {
        if (mainRef.value !== undefined) {
          const content: Element = mainRef.value;
          if (Math.abs(lengthX.value) / content.clientWidth >= 0.4) {
            if (direction === "RIGHT") {
              _movePage("prev");
            } else if (direction === "LEFT") {
              _movePage("next");
            }
          }
        }
      },
    });

    watch(
      () => page.value,
      (newValue, oldValue) => {
        if (oldValue < newValue) {
          _direction.value = "next";
        } else if (oldValue > newValue) {
          _direction.value = "prev";
        }
      }
    );

    return {
      t,
      editData,
      closeEditor,
      page,
      component,
      isPagePreview,
      transitionEnter,
      transitionLeave,
      mainRef,
    };
  },
});
</script>

<style lang="scss" module>
.controller {
  @include button-border;
  @apply font-bold text-center rounded-lg cursor-pointer;

  &.save {
    @include button-border(false);

    > .content {
      @include button-content(false);
      @apply md:(border-2);
    }
  }

  > .content {
    @include button-content;
    @apply flex gap-x-[0.25rem] items-center w-full h-full px-[0.5rem] py-[0.25rem] rounded-lg;
    @apply sm:(gap-x-[0.5rem] px-[0.75rem] py-[0.375rem]);
    @apply md:(px-[1rem] border-2);

    > .icon {
      @apply w-[1rem] h-[1rem];
      @apply sm:(w-[1.5rem] h-[1.5rem]);
      @apply md:(w-[2rem] h-[2rem]);
    }

    > .text {
      @apply text-xs;
      @apply sm:(text-lg);
      @apply md:(text-xl);
    }
  }
}

.editor {
  @apply flex flex-col gap-y-[0.5rem] max-w-[32rem] h-full mx-auto overflow-hidden;
  @apply sm:(gap-y-[0.75rem]);
  @apply md:(gap-y-[1rem]);

  > .main {
    @apply relative h-[calc(100%-2rem-0.5rem)] rounded-md overflow-hidden bg-[#fafafa];
    @apply sm:(h-[calc(100%-2.5rem-0.75rem)]);
    @apply md:(h-[calc(100%-3rem-1rem)]);

    > .content {
      @apply w-full h-full p-[0.5rem] rounded-md border bg-[#fafafa];
      @apply sm:(p-[0.75rem]);
      @apply md:(p-[1rem]);

      &.preview {
        @apply p-0 border-0;
      }
    }

    > .slide {
      &:global(-leave-active) {
        @apply absolute;
      }
    }
  }

  > .navigation {
    @apply w-full h-[2rem] rounded-md bg-[#fafafa] border-1;
    @apply sm:(h-[2.5rem] px-[0.25rem]);
    @apply md:(h-[3rem]);
  }
}
</style>
