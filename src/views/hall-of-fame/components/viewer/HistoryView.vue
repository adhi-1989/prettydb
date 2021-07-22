<template>
  <!-- history -->
  <section class="history-view-root">
    <div class="history-view">
      <!-- header -->
      <div class="header">
        <span class="text">{{
          t("pages.hall-of-fame.viewer.history-view.label.result")
        }}</span>
        <hr class="horizontal" />
      </div>

      <!-- results -->
      <div class="result-view">
        <div class="result-label fans-number">
          {{ t("game-system.history.fans-number") }}
        </div>
        <div class="result-value fans-number">{{ history.fansNumber }}</div>

        <div class="result-label score">
          {{ t("game-system.history.score") }}
        </div>
        <div class="result-value score">{{ history.score }}</div>

        <div class="result-label register-date">
          {{ t("game-system.history.register-date") }}
        </div>
        <div class="result-value register-date">
          {{ d(history.registerDate) }}
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, readonly } from "vue";
import { Dto } from "@/views/hall-of-fame/logic/db";
import { useI18n } from "vue-i18n";

export default defineComponent({
  props: {
    viewData: {
      type: Object as PropType<Dto>,
      required: true,
    },
  },
  data() {
    const { t, d } = useI18n();
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
        @apply font-bold text-[0.75rem] py-[0.25rem];
      }

      > .horizontal {
        @apply flex-grow;
      }
    }

    > .result-view {
      @apply font-bold grid gap-x-[0.5rem] gap-y-[0.25rem] items-center p-[0.25rem];
      grid-template-columns: max-content 1fr;

      > .result-label {
        @apply text-center text-[0.75rem] rounded-full px-[0.5rem] py-[0.25rem] bg-[#fefefe];
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
