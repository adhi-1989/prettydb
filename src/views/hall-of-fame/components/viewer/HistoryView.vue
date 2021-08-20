<template>
  <section class="history-view-root">
    <div class="history-view">
      <div class="header">
        <span class="text">{{
          t("pages.hall-of-fame.viewer.history-view.label.result")
        }}</span>
        <hr class="horizontal" />
      </div>

      <div class="result-view">
        <div class="result-label fans-number">
          {{ t("game-system.history.fans-number") }}
        </div>
        <div class="result-value fans-number">
          {{ fansNumber }}
        </div>

        <div class="result-label score">
          {{ t("game-system.history.score") }}
        </div>
        <div class="result-value score">{{ score }}</div>

        <div class="result-label register-date">
          {{ t("game-system.history.register-date") }}
        </div>
        <div class="result-value register-date">
          {{ registerDate }}
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import { useI18n } from "vue-i18n";
import dayjs from "dayjs";
import {
  fallbackStateFactory,
  stateInjectionKey,
} from "@/views/hall-of-fame/logic/dependency";

export default defineComponent({
  setup() {
    const { t, locale } = useI18n();

    const { viewData } = inject(stateInjectionKey, fallbackStateFactory, true);
    const { history } = viewData.value;
    const fansNumber = computed(() => {
      const fansNumber = new Intl.NumberFormat(locale.value).format(
        history.fansNumber
      );
      return t("pages.hall-of-fame.viewer.history-view.format.fans-number", {
        fansNumber,
      });
    });
    const score = computed(() => {
      return new Intl.NumberFormat(locale.value).format(history.score);
    });
    const registerDate = computed(() => {
      return dayjs(history.registerDate).format("YYYY / MM / DD");
    });

    return {
      t,
      fansNumber,
      score,
      registerDate,
    };
  },
});
</script>

<style lang="scss">
.history-view-root {
  @apply rounded overflow-hidden h-full bg-[#f2f2f2] p-[0.5rem];

  > .history-view {
    @apply overflow-y-scroll;

    > .header {
      @apply flex items-center gap-x-[0.375rem];

      > .text {
        @apply font-bold text-[0.5rem] py-[0.25rem];
        @apply sm:(text-[0.65rem]);
        @apply md:(text-[0.875rem]);
      }

      > .horizontal {
        @apply flex-grow;
      }
    }

    > .result-view {
      @apply font-bold grid gap-x-[0.5rem] gap-y-[0.25rem] items-center p-[0.25rem] grid-cols-[max-content,1fr];
      @apply sm:(gap-x-[0.75rem] gap-y-[0.5rem]);

      > .result-label {
        @apply text-center text-[0.65rem] rounded-full px-[0.5rem] py-[0.25rem] bg-[#fefefe];
        @apply sm:(text-[0.75rem]);
        @apply md:(text-[1rem] px-[0.75rem]);
      }

      > .result-value {
        @apply text-[0.875rem];
        @apply sm:(text-[1rem]);
        @apply md:(text-[1.25rem]);
      }
    }
  }
}
</style>
