<template>
  <!-- history -->
  <section class="history-view-root">
    <div class="history-view">
      <!-- header -->
      <div class="header">
        <span class="text" v-t="'viewer.history-view.label.result'" />
        <hr class="horizontal" />
      </div>

      <!-- results -->
      <div class="result-view">
        <div
          class="result-label fans-number"
          v-t="'glossary.history.fans-number'"
        />
        <div class="result-value fans-number">{{ history.fansNumber }}</div>

        <div class="result-label score" v-t="'glossary.history.score'" />
        <div class="result-value score">{{ history.score }}</div>

        <div
          class="result-label register-date"
          v-t="'glossary.history.register-date'"
        />
        <div class="result-value register-date">
          {{ d(history.registerDate) }}
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, readonly } from "vue";
import { HallOfFameDTO } from "/@/db/hall-of-fame";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "HistoryView",
  props: {
    viewData: {
      type: Object as PropType<HallOfFameDTO>,
      required: true,
    },
  },
  data() {
    const { t, d } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    return {
      t,
      d,
    };
  },
  setup(props) {
    return {
      history: readonly(props.viewData.history),
    };
  },
});
</script>

<style lang="scss" scoped>
.history-view-root {
  @apply rounded overflow-hidden h-full bg-[#f2f2f2] p-[0.5rem];
  > .history-view {
    @apply overflow-y-scroll;
    > .header {
      @apply flex items-center gap-x-[0.375rem];
      > .text {
        @apply font-bold text-[0.75rem];
      }
      > .horizontal {
        @apply flex-grow;
      }
    }
    > .result-view {
      @apply font-bold grid gap-x-[0.5rem] gap-y-[0.125rem] items-center p-[0.25rem];
      grid-template-columns: max-content 1fr;
      > .result-label {
        @apply text-center text-[0.75rem] rounded-full px-[0.5rem] bg-[#fefefe];
      }
      > .result-value {
        @apply text-[0.875rem];
      }
    }
  }
}
@screen xs {
  .history-view-root {
    > .history-view {
      > .result-view {
        @apply gap-x-[0.75rem] gap-y-[0.5rem];
        > .result-label {
          @apply text-[0.875rem] px-[1rem];
        }
        > .result-value {
          @apply text-[1.125rem];
        }
      }
    }
  }
}
</style>

<i18n locale="ja" src="/locales/ja/app/hall-of-fame.json" />
<i18n locale="ja" src="/locales/ja/game/glossary.json" />
