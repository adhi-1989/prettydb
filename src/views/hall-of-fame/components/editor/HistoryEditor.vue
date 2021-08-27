<template>
  <section :class="$style.historyEditor">
    <div :class="$style.container">
      <div :class="$style.section">
        <label :class="$style.editor">
          <span :class="$style.label">
            {{ t("pages.hall-of-fame.editor.extra.metadata.unique-skill") }}
          </span>
          <input
            :class="$style.input"
            type="number"
            :min="1"
            :max="6"
            v-model="uniqueSkillLevel"
            @focus="selectInputValueOnFocus"
          />
        </label>

        <label :class="$style.editor">
          <span :class="$style.label">
            {{ t("pages.hall-of-fame.editor.extra.metadata.transferred") }}
          </span>
          <input
            :class="$style.input"
            type="checkbox"
            v-model="transferred"
            @focus="selectInputValueOnFocus"
          />
        </label>

        <label :class="$style.editor">
          <span :class="$style.label">
            {{ t("pages.hall-of-fame.editor.extra.metadata.rental") }}
          </span>
          <input
            :class="$style.input"
            type="checkbox"
            v-model="rental"
            @focus="selectInputValueOnFocus"
          />
        </label>
      </div>

      <div :class="$style.section">
        <label :class="$style.editor">
          <span :class="$style.label">
            {{ t("game-system.history.fans-number") }}
          </span>
          <input
            :class="$style.input"
            type="number"
            :min="0"
            :max="1000000"
            v-model="fansNumber"
            @focus="selectInputValueOnFocus"
          />
        </label>

        <label :class="$style.editor">
          <span :class="$style.label">
            {{ t("game-system.history.score") }}
          </span>
          <input
            :class="$style.input"
            type="number"
            :min="0"
            :max="100000"
            v-model="score"
            @focus="selectInputValueOnFocus"
          />
        </label>

        <label :class="$style.editor">
          <span :class="$style.label">
            {{ t("game-system.history.register-date") }}
          </span>
          <input
            :class="$style.input"
            type="date"
            min="2021-02-24"
            :max="today"
            v-model="registerDate"
          />
        </label>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from "vue";
import { useI18n } from "vue-i18n";
import _ from "@/util/lodash";
import type { UniqueSkillLevel } from "@/data";
import { selectInputValueOnFocus } from "@/views/logic/dom";
import { State } from "@/views/hall-of-fame/logic/dependency";
import dayjs from "dayjs";

const today = dayjs().format("YYYY-MM-DD");

export default defineComponent({
  data() {
    return {
      selectInputValueOnFocus,
      today,
    };
  },
  setup() {
    const { t } = useI18n();

    const { editData } = State(inject);
    const { history, metadata } = editData.value;

    const uniqueSkillLevel = computed({
      get: () => metadata.uniqueSkillLevel,
      set: (level: number) =>
        (metadata.uniqueSkillLevel = _.clamp(level, 1, 6) as UniqueSkillLevel),
    });
    const transferred = computed({
      get: () => metadata.transferred,
      set: (value: boolean) => (metadata.transferred = value),
    });
    const rental = computed({
      get: () => metadata.rental,
      set: (value: boolean) => (metadata.rental = value),
    });

    const fansNumber = computed({
      get: () => history.fansNumber,
      set: (value: number) => (history.fansNumber = value),
    });
    const score = computed({
      get: () => history.score,
      set: (value: number) => (history.score = value),
    });
    const registerDate = computed({
      get: () => dayjs(history.registerDate).format("YYYY-MM-DD"),
      set: (date: string) => (history.registerDate = dayjs(date).toDate()),
    });

    return {
      t,
      uniqueSkillLevel,
      transferred,
      rental,
      fansNumber,
      score,
      registerDate,
    };
  },
});
</script>

<style lang="scss" module>
.historyEditor {
  @apply h-full;

  > .container {
    @apply grid grid-cols-[max-content,1fr] gap-[1rem] items-center p-[0.75rem] rounded-md bg-[#f2f2f2];

    > .section {
      @apply contents;

      > .category {
        @apply contents;

        > .label {
          @apply px-[0.5rem] py-[0.25rem] rounded-full bg-[#fefefe] border;
        }
      }

      > .editor {
        @apply contents;

        > .label {
          @apply text-center text-xxs px-[0.5rem] py-[0.25rem] rounded-full bg-[#fefefe] border cursor-pointer;
          @apply sm:(text-xs);
          @apply md:(text-base);
        }

        > .input {
          @apply text-xxs py-[0.25rem] rounded-md bg-[#fafafa] border px-[0.5rem];
          @apply sm:(text-xs);
          @apply md:(text-base);

          &[type="checkbox"] {
            @apply cursor-pointer;
            @apply sm:(w-[0.875rem] h-[0.875rem]);
            @apply md:(w-[1.25rem] h-[1.25rem]);
          }
        }
      }
    }
  }
}
</style>
