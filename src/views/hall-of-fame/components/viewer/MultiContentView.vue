<template>
  <section class="multi-content-view-root">
    <div class="content-selector">
      <div class="selector-item-group">
        <template v-for="content in AllContent" :key="content">
          <div
            class="selector-item-wrapper"
            :class="{ active: isContentActive(content) }"
          >
            <button class="selector-item" @click="setActiveContent(content)">
              {{ t(`pages.hall-of-fame.viewer.${content}.selector`) }}
            </button>
          </div>
        </template>
      </div>
    </div>

    <div class="content-view">
      <component :is="activeContent" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, readonly, ref } from "vue";
import { useI18n } from "vue-i18n";
import SkillView from "@/views/hall-of-fame/components/viewer/SkillView.vue";
import InheritView from "@/views/hall-of-fame/components/viewer/InheritView.vue";
import HistoryView from "@/views/hall-of-fame/components/viewer/HistoryView.vue";

const AllContent = ["skill-view", "inherit-view", "history-view"] as const;

type Content = typeof AllContent[number];

export default defineComponent({
  components: {
    SkillView,
    InheritView,
    HistoryView,
  },
  data() {
    return {
      AllContent,
    };
  },
  setup() {
    const { t } = useI18n();

    const activeContent = ref<Content>("skill-view");
    const isContentActive = (content: Content) => {
      return content === activeContent.value;
    };
    const setActiveContent = (content: Content) => {
      activeContent.value = content;
    };

    return {
      t,
      activeContent: readonly(activeContent),
      isContentActive,
      setActiveContent,
    };
  },
});
</script>

<style lang="scss">
.multi-content-view-root {
  @apply flex flex-col h-full;

  > .content-selector {
    @apply px-[0.375rem];

    > .selector-item-group {
      @apply flex rounded-full overflow-hidden;

      > .selector-item-wrapper {
        @apply text-[0.75rem] w-full;
        @apply md:(text-[1rem]);

        > .selector-item {
          @apply font-bold w-full border-1 border-b-2 border-transparent rounded-none bg-clip-padding py-[0.125rem];
          @apply sm:(py-[0.2rem]);
          @apply md:(py-[0.25rem] border-2 border-b-3);
        }

        &:first-child {
          @apply rounded-l-full;

          > .selector-item {
            @apply rounded-l-full;
          }
        }

        &:last-child {
          @apply rounded-r-full;

          > .selector-item {
            @apply rounded-r-full;
          }
        }

        &:not(.active) {
          @apply bg-gradient-to-t from-[#97979e] to-[#d0cfd4];

          > .selector-item {
            @include button-gradient;
          }

          &:not(:last-child) > .selector-item {
            @apply border-r-0 pr-[1px];
            @apply md:(pr-[2px]);
          }
        }

        &.active {
          @apply bg-gradient-to-t from-[#588728] via-[#96ce40] to-[#a8d944] text-[#fefefe];

          > .selector-item {
            @apply bg-gradient-to-t from-[#78bb3a] to-[#b1de46];
          }

          & + .selector-item-wrapper:not(.active) > .selector-item {
            @apply border-l-0 pl-[1px];
            @apply md:(pl-[2px]);
          }
        }
      }
    }
  }

  > .content-view {
    @apply flex-grow overflow-hidden mt-[0.5rem] px-[0.75rem];
    @apply sm:(mt-[0.75rem] px-[1rem]);
  }
}
</style>
