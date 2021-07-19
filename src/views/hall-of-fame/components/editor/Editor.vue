<template>
  <!-- editor -->
  <article class="data-editor-root">
    <!-- navigation -->
    <nav class="navigation">
      <icon-ion-caret-back
        class="transition-button"
        @click="transitionPrevPage()"
      />
      <div class="pagination">
        <div
          class="sphere"
          :data-page-active="isPageActive(Pages.CHARACTER_EDITOR)"
          @click="transitionPage(Pages.CHARACTER_EDITOR)"
        />
        <div
          class="sphere"
          :data-page-active="isPageActive(Pages.STATUS_EDITOR)"
          @click="transitionPage(Pages.STATUS_EDITOR)"
        />
        <div
          class="sphere"
          :data-page-active="isPageActive(Pages.ABILITY_EDITOR)"
          @click="transitionPage(Pages.ABILITY_EDITOR)"
        />
        <div
          class="sphere"
          :data-page-active="isPageActive(Pages.SKILL_EDITOR)"
          @click="transitionPage(Pages.SKILL_EDITOR)"
        />
        <div
          class="sphere"
          :data-page-active="isPageActive(Pages.FACTOR_EDITOR)"
          @click="transitionPage(Pages.FACTOR_EDITOR)"
        />
        <div
          class="sphere"
          :data-page-active="isPageActive(Pages.HISTORY_EDITOR)"
          @click="transitionPage(Pages.HISTORY_EDITOR)"
        />
        <div
          class="sphere"
          :data-page-active="isPageActive(Pages.PREVIEW)"
          @click="transitionPage(Pages.PREVIEW)"
        />
      </div>
      <icon-ion-caret-forward
        class="transition-button"
        @click="transitionNextPage()"
      />
    </nav>

    <!-- main content -->
    <div class="main-content">
      <transition :name="getTransitionName">
        <keep-alive>
          <div
            class="content character"
            v-if="isPageActive(Pages.CHARACTER_EDITOR)"
          >
            <character-editor :edit-data="editData" />
          </div>
          <div
            class="content status"
            v-else-if="isPageActive(Pages.STATUS_EDITOR)"
          >
            <status-editor :edit-data="editData" />
          </div>
          <div
            class="content ability"
            v-else-if="isPageActive(Pages.ABILITY_EDITOR)"
          >
            <ability-editor :edit-data="editData" />
          </div>
          <div
            class="content skill"
            v-else-if="isPageActive(Pages.SKILL_EDITOR)"
          >
            <skill-editor :edit-data="editData" />
          </div>
          <div
            class="content factor"
            v-else-if="isPageActive(Pages.FACTOR_EDITOR)"
          >
            <factor-editor :edit-data="editData" />
          </div>
          <div
            class="content history"
            v-else-if="isPageActive(Pages.HISTORY_EDITOR)"
          >
            <history-editor :edit-data="editData" />
          </div>
          <div class="content preview" v-else-if="isPageActive(Pages.PREVIEW)">
            <viewer :view-data="editData">
              <slot />
            </viewer>
          </div>
        </keep-alive>
      </transition>
    </div>
  </article>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { HallOfFameDTO } from "@/views/hall-of-fame/logic/db";
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

const Directions = {
  NEXT: 0,
  PREV: 1,
} as const;

type Page = typeof Pages[keyof typeof Pages];
type Direction = typeof Directions[keyof typeof Directions];

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
  props: {
    editData: {
      type: Object as PropType<HallOfFameDTO>,
      required: true,
    },
  },
  data() {
    return {
      Pages,
    };
  },
  setup() {
    const activePage = ref<Page>(Pages.CHARACTER_EDITOR);
    const direction = ref<Direction>(Directions.NEXT);
    const isPageActive = (page: Page) => {
      return activePage.value === page;
    };
    const transitionPage = (page: Page) => {
      if (activePage.value == page) {
        return;
      } else if (activePage.value < page) {
        direction.value = Directions.NEXT;
      } else if (activePage.value > page) {
        direction.value = Directions.PREV;
      }
      activePage.value = page;
    };
    const transitionNextPage = () => {
      if (activePage.value == Pages.PREVIEW) {
        return;
      } else if (activePage.value == Pages.CHARACTER_EDITOR) {
        transitionPage(Pages.STATUS_EDITOR);
      } else if (activePage.value == Pages.STATUS_EDITOR) {
        transitionPage(Pages.ABILITY_EDITOR);
      } else if (activePage.value == Pages.ABILITY_EDITOR) {
        transitionPage(Pages.SKILL_EDITOR);
      } else if (activePage.value == Pages.SKILL_EDITOR) {
        transitionPage(Pages.FACTOR_EDITOR);
      } else if (activePage.value == Pages.FACTOR_EDITOR) {
        transitionPage(Pages.HISTORY_EDITOR);
      } else if (activePage.value == Pages.HISTORY_EDITOR) {
        transitionPage(Pages.PREVIEW);
      }
    };
    const transitionPrevPage = () => {
      if (activePage.value == Pages.CHARACTER_EDITOR) {
        return;
      } else if (activePage.value == Pages.PREVIEW) {
        transitionPage(Pages.HISTORY_EDITOR);
      } else if (activePage.value == Pages.HISTORY_EDITOR) {
        transitionPage(Pages.FACTOR_EDITOR);
      } else if (activePage.value == Pages.FACTOR_EDITOR) {
        transitionPage(Pages.SKILL_EDITOR);
      } else if (activePage.value == Pages.SKILL_EDITOR) {
        transitionPage(Pages.ABILITY_EDITOR);
      } else if (activePage.value == Pages.ABILITY_EDITOR) {
        transitionPage(Pages.STATUS_EDITOR);
      } else if (activePage.value == Pages.STATUS_EDITOR) {
        transitionPage(Pages.CHARACTER_EDITOR);
      }
    };
    const getTransitionName = computed(() => {
      return direction.value == Directions.NEXT ? "slide-next" : "slide-prev";
    });
    return {
      isPageActive,
      transitionPage,
      transitionNextPage,
      transitionPrevPage,
      getTransitionName,
    };
  },
});
</script>

<style lang="scss" scoped>
.data-editor-root {
  @apply flex flex-col h-full;
  user-select: none;

  > .navigation {
    @apply flex justify-between items-center h-[2rem] px-[0.25rem] rounded-full bg-[#fafafa] shadow;
    > .transition-button {
      @apply rounded-md w-[2rem] h-[2rem] cursor-pointer;
    }

    > .pagination {
      @apply flex-grow flex gap-x-[3%] justify-center items-center;
      > .sphere {
        @apply relative w-[1.5rem] h-[1.5rem] cursor-pointer;
        &:after {
          @apply absolute w-[0.5rem] h-[0.5rem] inset-0 m-auto rounded-full bg-[#00000020];
          content: "";
        }

        &[data-page-active="true"]:after {
          @apply bg-[#8fd54a];
        }
      }
    }
  }

  > .main-content {
    @apply relative h-[calc(100%-2rem-0.5rem)] mt-[0.5rem] rounded-md bg-[#fafafa] shadow overflow-hidden;
    > .content {
      @apply w-full h-full p-[0.5rem];
      &.preview {
        @apply p-0;
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

@screen xs {
  .data-editor-root {
    @apply max-w-[32rem] mx-auto;
    > .navigation {
      @apply h-[2.25rem];
      > .transition-button {
        @apply w-[2.25rem];
      }

      > .pagination {
        @apply gap-x-[0.5rem] p-0;
        > .sphere {
          @apply relative w-[2.25rem] h-[2.25rem] cursor-pointer;
        }
      }
    }

    > .main-content {
      @apply h-[calc(100%-2.25rem-0.5rem)];
    }
  }
}
</style>
