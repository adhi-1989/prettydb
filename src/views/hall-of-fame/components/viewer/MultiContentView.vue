<template>
  <section :class="$style.view">
    <div :class="$style.selectorBar">
      <div :class="$style.items">
        <template v-for="content in AllContent" :key="content">
          <div
            :class="[
              $style.item,
              { [$style.active]: isContentActive(content) },
            ]"
          >
            <button :class="$style.button" @click="setActiveContent(content)">
              {{ t(`pages.hall-of-fame.viewer.${content}.selector`) }}
            </button>
          </div>
        </template>
      </div>
    </div>

    <div :class="$style.content">
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

<style lang="scss" module>
.view {
  @apply flex flex-col h-full;

  > .selectorBar {
    @apply px-[0.375rem];

    > .items {
      @apply flex rounded-full overflow-hidden;
      box-shadow: 0 1px 1px 0 #b8b6c3;

      > .item {
        @apply text-xs w-full;
        @apply md:(text-base);

        > .button {
          @apply font-bold w-full p-[0.075rem] rounded-none border-1 border-transparent bg-clip-padding;
          @apply sm:(py-[0.125rem] border-2);
        }

        &:first-child {
          @apply rounded-l-full;

          > .button {
            @apply rounded-l-full;
          }
        }

        &:last-child {
          @apply rounded-r-full;

          > .button {
            @apply rounded-r-full;
          }
        }

        &:not(.active) {
          @apply bg-gradient-to-t from-[#97979e] to-[#d0cfd4];

          > .button {
            @include button-gradient;
          }

          &:not(:last-child) > .button {
            @apply border-r-0 pr-[1px];
            @apply sm:(pr-[2px]);
          }
        }

        &.active {
          @apply bg-gradient-to-t from-[#588728] via-[#96ce40] to-[#a8d944] text-[#fefefe];

          > .button {
            @apply bg-gradient-to-t from-[#78bb3a] via-[#99cf41] to-[#b1de46];
          }

          & + .selector:not(.active) > .button {
            @apply border-l-0 pl-[1px];
            @apply sm:(pl-[2px]);
          }
        }
      }
    }
  }

  > .content {
    @apply flex-grow mt-[0.5rem] px-[0.75rem] overflow-hidden;
    @apply sm:(mt-[0.75rem] px-[1rem]);
  }
}
</style>
