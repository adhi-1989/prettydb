<template>
  <!-- multi content view -->
  <section class="multi-content-root">
    <!-- content selector -->
    <div class="content-selector">
      <div class="selector-item-group">
        <template v-for="content in AllContent" :key="content">
          <div
            class="selector-item-wrapper"
            :data-active="isContentActive(content)"
          >
            <button
              class="selector-item"
              v-t="`viewer.${content}.selector`"
              @click="setActiveContent(content)"
            />
          </div>
        </template>
      </div>
    </div>

    <!-- content view -->
    <div class="content-view">
      <component :is="activeContent" :view-data="viewData" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, readonly, ref } from "vue";
import { HallOfFameDTO } from "/@/db/hall-of-fame";
import SkillView from "/@/components/hall-of-fame/content/viewer/SkillView.vue";
import InheritView from "/@/components/hall-of-fame/content/viewer/InheritView.vue";
import HistoryView from "/@/components/hall-of-fame/content/viewer/HistoryView.vue";
import { useI18n } from "vue-i18n";

const Content = {
  SKILL: "skill-view",
  INHERIT: "inherit-view",
  HISTORY: "history-view",
} as const;

const AllContent = Object.freeze(Object.entries(Content).map((x) => x[1]));

type ContentType = typeof Content[keyof typeof Content];

export default defineComponent({
  name: "MultiContentView",
  components: {
    SkillView,
    InheritView,
    HistoryView,
  },
  props: {
    viewData: {
      type: Object as PropType<HallOfFameDTO>,
      required: true,
    },
  },
  data() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    return {
      Content,
      AllContent,
      t,
    };
  },
  setup() {
    const activeContent = ref<ContentType>(Content.SKILL);
    const isContentActive = (content: ContentType) => {
      return content === activeContent.value;
    };
    const setActiveContent = (content: ContentType) => {
      activeContent.value = content;
    };
    return {
      activeContent: readonly(activeContent),
      isContentActive,
      setActiveContent,
    };
  },
});
</script>

<style lang="scss" scoped>
.multi-content-root {
  @apply flex flex-col h-full;
  > .content-selector {
    @apply px-[0.375rem];
    > .selector-item-group {
      @apply flex rounded-full overflow-hidden;
      box-shadow: 0 1px 2px 0 #b7b6c2;
      > .selector-item-wrapper {
        @apply text-[0.75rem] w-full;
        > .selector-item {
          @apply w-full border-[2px] border-[#0000] bg-clip-padding;
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
        &[data-active="false"] {
          @apply bg-gradient-to-t from-[#97979e] to-[#d0cfd4];
          > .selector-item {
            @include button-gradient;
          }
          &:not(:last-child) > .selector-item {
            @apply border-r-0 pr-[2px];
          }
        }
        &[data-active="true"] {
          @apply bg-gradient-to-t from-[#588728] via-[#96ce40] to-[#a8d944] text-[#fefefe];
          > .selector-item {
            @apply bg-gradient-to-t from-[#78bb3a] to-[#b1de46];
          }
          & + .selector-item-wrapper[data-active="false"] > .selector-item {
            @apply border-l-0 pl-[2px];
          }
        }
      }
    }
  }
  > .content-view {
    @apply flex-grow overflow-hidden mt-[0.5rem] px-[0.75rem];
  }
}
@screen xs {
  .multi-content-root {
    > .content-selector {
      @apply px-[0.5rem];
      > .selector-item-group {
        @apply flex rounded-full overflow-hidden;
        box-shadow: 0 0 0 transparent;
        > .selector-item-wrapper {
          @apply text-[1rem];
        }
      }
    }
    > .content-view {
      @apply mt-[0.75rem] px-[0.75rem];
    }
  }
}
</style>

<i18n locale="ja" src="/locales/ja/app/hall-of-fame.json" />
