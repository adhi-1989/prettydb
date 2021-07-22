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
        <template v-for="page in Pages" :key="page">
          <div
            class="sphere"
            :data-page-active="isPageActive(page)"
            @click="transitionPage(page)"
          />
        </template>
      </div>
      <icon-ion-caret-forward
        class="transition-button"
        @click="transitionNextPage()"
      />
    </nav>

    <!-- main content -->
    <div class="main-content">
      <transition :name="transitionName">
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
        </keep-alive>
      </transition>
    </div>
  </article>
</template>

<script lang="ts">
import { computed, defineComponent, inject, readonly, ref } from "vue";
import CharacterEditor from "@/views/hall-of-fame/components/editor/CharacterEditor.vue";
import StatusEditor from "@/views/hall-of-fame/components/editor/StatusEditor.vue";
import AbilityEditor from "@/views/hall-of-fame/components/editor/AbilityEditor.vue";
import SkillEditor from "@/views/hall-of-fame/components/editor/SkillEditor.vue";
import FactorEditor from "@/views/hall-of-fame/components/editor/FactorEditor.vue";
import HistoryEditor from "@/views/hall-of-fame/components/editor/HistoryEditor.vue";
import Viewer from "@/views/hall-of-fame/components/viewer/Viewer.vue";
import {
  actionInjectionKey,
  fallbackActionFactory,
  fallbackStateFactory,
  stateInjectionKey,
} from "@/views/hall-of-fame/logic/dependency";
import { useI18n } from "~/vue-i18n";
import _ from "@/util/lodash";

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
    const transitionPage = (page: Page) => {
      const _activePage = activePage.value;
      if (_activePage == page) {
        return;
      } else if (_activePage < page) {
        direction.value = "next";
      } else if (_activePage > page) {
        direction.value = "prev";
      }
      activePage.value = page;
    };
    const transitionNextPage = () => {
      const nextIndex = activePage.value + 1;
      const nextPage = _.values(Pages).find((x) => x == nextIndex);
      if (nextPage != undefined) {
        transitionPage(nextPage);
      }
    };
    const transitionPrevPage = () => {
      const prevIndex = activePage.value - 1;
      const prevPage = _.values(Pages).find((x) => x == prevIndex);
      if (prevPage != undefined) {
        transitionPage(prevPage);
      }
    };
    const transitionName = computed(() => {
      return direction.value == "next" ? "slide-next" : "slide-prev";
    });
    return {
      t,
      activePage: readonly(activePage),
      closeEditor,
      editData,
      isPageActive,
      transitionPage,
      transitionNextPage,
      transitionPrevPage,
      transitionName,
    };
  },
});
</script>

<style lang="scss">
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
