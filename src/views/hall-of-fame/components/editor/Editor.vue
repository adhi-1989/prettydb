<template>
  <article class="data-editor-root">
    <nav class="navigation">
      <div class="button-container" @click="transitionPage('prev')">
        <icon-ion-caret-back class="transition-button" />
      </div>
      <div class="pagination">
        <template v-for="page in Pages" :key="page">
          <div
            class="sphere"
            :class="{ active: isPageActive(page) }"
            @click="transitionPageDirect(page)"
          />
        </template>
      </div>
      <div class="button-container" @click="transitionPage('next')">
        <icon-ion-caret-forward class="transition-button" />
      </div>
    </nav>

    <div ref="mainContentRef" class="main-content">
      <transition :name="transitionName">
        <div
          class="content character"
          v-if="isPageActive(Pages.CHARACTER_EDITOR)"
        >
          <character-editor />
        </div>
        <div
          class="content status"
          v-else-if="isPageActive(Pages.STATUS_EDITOR)"
        >
          <status-editor />
        </div>
        <div
          class="content ability"
          v-else-if="isPageActive(Pages.ABILITY_EDITOR)"
        >
          <ability-editor />
        </div>
        <div class="content skill" v-else-if="isPageActive(Pages.SKILL_EDITOR)">
          <skill-editor />
        </div>
        <div
          class="content factor"
          v-else-if="isPageActive(Pages.FACTOR_EDITOR)"
        >
          <factor-editor />
        </div>
        <div
          class="content history"
          v-else-if="isPageActive(Pages.HISTORY_EDITOR)"
        >
          <history-editor />
        </div>
        <div class="content preview" v-else-if="isPageActive(Pages.PREVIEW)">
          <viewer>
            <template #controllers>
              <div class="controller" @click="closeEditor(false)">
                {{ t("ui.save") }}
              </div>
              <div class="controller" @click="closeEditor(true)">
                {{ t("ui.discard") }}
              </div>
            </template>
          </viewer>
        </div>
      </transition>
    </div>
  </article>
</template>

<script lang="ts">
import { computed, defineComponent, inject, readonly, ref } from "vue";
import { useSwipe } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import {
  actionInjectionKey,
  fallbackActionFactory,
  fallbackStateFactory,
  stateInjectionKey,
} from "@/views/hall-of-fame/logic/dependency";
import CharacterEditor from "@/views/hall-of-fame/components/editor/CharacterEditor.vue";
import StatusEditor from "@/views/hall-of-fame/components/editor/StatusEditor.vue";
import AbilityEditor from "@/views/hall-of-fame/components/editor/AbilityEditor.vue";
import SkillEditor from "@/views/hall-of-fame/components/editor/SkillEditor.vue";
import FactorEditor from "@/views/hall-of-fame/components/editor/FactorEditor.vue";
import HistoryEditor from "@/views/hall-of-fame/components/editor/HistoryEditor.vue";
import Viewer from "@/views/hall-of-fame/components/viewer/Viewer.vue";

const Pages = {
  CHARACTER_EDITOR: 0,
  STATUS_EDITOR: 1,
  ABILITY_EDITOR: 2,
  SKILL_EDITOR: 3,
  FACTOR_EDITOR: 4,
  HISTORY_EDITOR: 5,
  PREVIEW: 6,
} as const;

type Page = typeof Pages[keyof typeof Pages];

type Direction = "next" | "prev";

export default defineComponent({
  components: {
    CharacterEditor,
    StatusEditor,
    AbilityEditor,
    SkillEditor,
    FactorEditor,
    HistoryEditor,
    Viewer,
  },
  data() {
    return {
      Pages,
    };
  },
  setup() {
    const { t } = useI18n();
    const { closeView, saveEditData } = inject(
      actionInjectionKey,
      fallbackActionFactory,
      true
    );
    const { editData } = inject(stateInjectionKey, fallbackStateFactory, true);
    const closeEditor = (discard: boolean) => {
      if (!discard) {
        saveEditData().then(() => {
          closeView("editor");
        });
      } else {
        closeView("editor");
      }
    };

    const activePage = ref<Page>(Pages.CHARACTER_EDITOR);
    const direction = ref<Direction>("next");
    const isPageActive = (page: Page) => {
      return activePage.value === page;
    };
    const transitionPageDirect = (page: Page) => {
      const _activePage = activePage.value;
      if (_activePage === page) {
        return;
      } else if (_activePage < page) {
        direction.value = "next";
      } else if (_activePage > page) {
        direction.value = "prev";
      }
      activePage.value = page;
    };
    const transitionPage = (direction: Direction) => {
      const index = activePage.value + (direction === "next" ? 1 : -1);
      const page = Object.values(Pages).find((x) => x === index);
      if (page !== undefined) {
        transitionPageDirect(page);
      }
    };
    const transitionName = computed(() => {
      return direction.value === "next" ? "slide-next" : "slide-prev";
    });

    const mainContentRef = ref<Element>();
    const { lengthX } = useSwipe(mainContentRef, {
      onSwipeEnd: (e, direction) => {
        if (mainContentRef.value !== undefined) {
          const content: Element = mainContentRef.value;
          if (Math.abs(lengthX.value) / content.clientWidth >= 0.4) {
            if (direction === "RIGHT") {
              transitionPage("prev");
            } else if (direction === "LEFT") {
              transitionPage("next");
            }
          }
        }
      },
    });

    return {
      t,
      activePage: readonly(activePage),
      closeEditor,
      editData,
      isPageActive,
      transitionPageDirect,
      transitionPage,
      transitionName,
      mainContentRef,
    };
  },
});
</script>

<style lang="scss">
.data-editor-root {
  @apply flex flex-col overflow-hidden w-[18rem] mx-auto h-full;
  @apply sm:(w-[24.25rem]);
  @apply md:(w-[32rem]);

  > .navigation {
    @apply flex justify-between h-[1.75rem] px-[0.125rem] rounded-md bg-[#fafafa] border-1;
    @apply sm:(h-[2rem] px-[0.25rem]);
    @apply md:(h-[2.5rem]);

    > .button-container {
      @apply flex items-center w-[1.75rem] h-[1.75rem] cursor-pointer;
      @apply sm:(w-[2rem] h-[2rem]);
      @apply md:(w-[2.5rem] h-[2.5rem]);

      &:first-child {
        @apply justify-start;
      }

      &:last-child {
        @apply justify-end;
      }

      > .transition-button {
        @apply w-full h-full p-[0.125rem];
        @apply md:(p-[0.25rem]);
      }
    }

    > .pagination {
      @apply flex-grow flex gap-x-[0.25rem] justify-evenly items-center h-[1.75rem];
      @apply sm:(gap-x-[0.5rem] h-[2rem]);
      @apply md:(gap-x-[1rem] h-[2.5rem]);

      > .sphere {
        @apply relative w-[1.5rem] h-[1.5rem] cursor-pointer;
        @apply sm:(w-[1.75rem] h-[1.75rem]);
        @apply md:(w-[2rem] h-[2rem]);

        @variants after {
          @apply absolute w-[0.375rem] h-[0.375rem] inset-0 m-auto rounded-full bg-[#d0d0d0];
          content: "";

          &.active {
            @apply w-[0.5rem] h-[0.5rem] bg-[#8fd54a];
            @apply md:(w-[0.625rem] h-[0.625rem]);
          }
        }
      }
    }
  }

  > .main-content {
    @apply relative overflow-hidden h-[calc(100%-1.75rem-0.5rem)] mt-[0.5rem] bg-[#fafafa] rounded-md;
    @apply sm:(h-[calc(100%-2rem-0.75rem)] mt-[0.75rem]);
    @apply md:(h-[calc(100%-2.5rem-1rem)] mt-[1rem]);

    > .content {
      @apply w-full h-full p-[0.5rem] rounded-md border;
      @apply sm:(p-[0.75rem]);
      @apply md:(p-[1rem]);

      &.preview {
        @apply p-0 border-0;
      }
    }

    > .slide-next {
      &-enter-active {
        animation: slideInRight;
        animation-duration: 0.5s;
      }

      &-leave-active {
        animation: slideOutLeft;
        animation-duration: 0.5s;
        position: absolute;
      }
    }

    > .slide-prev {
      &-enter-active {
        animation: slideInLeft;
        animation-duration: 0.5s;
      }

      &-leave-active {
        animation: slideOutRight;
        animation-duration: 0.5s;
        position: absolute;
      }
    }
  }
}
</style>
