<template>
  <section :class="$style.history">
    <div :class="$style.view">
      <div :class="$style.header">
        <span :class="$style.text">{{
          t("pages.hall-of-fame.viewer.history-view.label.result")
        }}</span>
        <hr :class="$style.horizontal" />
      </div>

      <div :class="$style.result">
        <div :class="$style.label">
          {{ t("game-system.history.fans-number") }}
        </div>
        <div :class="$style.value">
          {{ fansNumber }}
        </div>

        <div :class="$style.label">
          {{ t("game-system.history.score") }}
        </div>
        <div :class="$style.value">{{ score }}</div>

        <div :class="$style.label">
          {{ t("game-system.history.register-date") }}
        </div>
        <div :class="$style.value">
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
import { State } from "@/views/hall-of-fame/logic/dependency";

export default defineComponent({
  setup() {
    const { t, locale } = useI18n();

    const { viewData } = State(inject);
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

<style lang="scss" module>
.history {
  @apply h-full px-[0.5rem] rounded bg-[#f2f2f2] overflow-hidden;
  @apply md:(px-[0.75rem] py-[0.125rem]);

  > .view {
    @apply overflow-y-scroll;

    > .header {
      @apply flex gap-x-[0.375rem] items-center;

      > .text {
        @apply font-bold text-xxs py-[0.25rem];
        @apply sm:(text-xs);
        @apply md:(text-base);
      }

      > .horizontal {
        @apply flex-grow border-[#d2d2d2];
      }
    }

    > .result {
      @apply font-bold grid grid-cols-[max-content,1fr] gap-x-[0.5rem] gap-y-[0.25rem] items-center p-[0.25rem];
      @apply sm:(gap-x-[0.75rem]);
      @apply md:(gap-y-[0.5rem]);

      > .label {
        @apply text-center text-xxs px-[0.5rem] py-[0.075rem] rounded-full bg-[#fefefe];
        @apply sm:(text-xs);
        @apply md:(text-base px-[0.75rem]);
      }

      > .value {
        @apply text-sm;
        @apply sm:(text-base);
        @apply md:(text-xl);
      }
    }
  }
}
</style>
