<template>
  <section :class="$style.root">
    <div :class="$style.container">
      <div :class="$style.skill">
        <label :class="$style.editor">
          <span :class="$style.label">
            {{ t("pages.hall-of-fame.editor.extra.skill.unique-skill") }}
          </span>
          <div :class="$style.wrapper">
            <input
              :class="$style.input"
              type="number"
              min="1"
              max="6"
              :value="metadata.uniqueSkillLevel"
              @change="setUniqueSkillLevel"
              @focus="selectInputValueOnFocus"
            />
          </div>
        </label>
      </div>

      <div :class="$style.result">
        <label :class="$style.editor">
          <span :class="$style.label">
            {{ t("game-system.history.fans-number") }}
          </span>
          <input
            :class="$style.input"
            type="number"
            min="0"
            max="1000000"
            :value="history.fansNumber"
            @change="setFansNumber"
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
            min="0"
            max="100000"
            :value="history.score"
            @change="setScore"
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
            :value="dayjs(history.registerDate).format('YYYY-MM-DD')"
            @change="setRegisterDate"
          />
        </label>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { useI18n } from "vue-i18n";
import dayjs from "dayjs";
import { selectInputValueOnFocus } from "@/views/logic/dom";
import {
  fallbackStateFactory,
  stateInjectionKey,
} from "@/views/hall-of-fame/logic/dependency";
import { UniqueSkillLevel } from "@/data";

const today = dayjs().format("YYYY-MM-DD");

export default defineComponent({
  data() {
    return {
      selectInputValueOnFocus,
      today,
      dayjs,
    };
  },
  setup() {
    //TODO: やっつけで作業したので、ちゃんと見直しする
    const { t } = useI18n();

    const { editData } = inject(stateInjectionKey, fallbackStateFactory, true);
    const { history, metadata } = editData.value;

    const setUniqueSkillLevel = (event: Event) => {
      if (event.target !== null) {
        const input = event.target as HTMLInputElement;
        metadata.uniqueSkillLevel = Number(input.value) as UniqueSkillLevel;
      }
    };

    const setFansNumber = (event: Event) => {
      if (event.target !== null) {
        const input = event.target as HTMLInputElement;
        history.fansNumber = Number(input.value);
      }
    };

    const setScore = (event: Event) => {
      if (event.target !== null) {
        const input = event.target as HTMLInputElement;
        history.score = Number(input.value);
      }
    };

    const setRegisterDate = (event: Event) => {
      if (event.target !== null) {
        const input = event.target as HTMLInputElement;
        history.registerDate = dayjs(input.value).toDate();
      }
    };

    return {
      t,
      history,
      metadata,
      setUniqueSkillLevel,
      setFansNumber,
      setScore,
      setRegisterDate,
    };
  },
});
</script>

<style lang="scss" module>
.root {
  @apply h-full;

  > .container {
    @apply flex flex-col gap-y-[1rem];

    > .skill {
      @apply p-[0.5rem] rounded-md bg-[#f2f2f2];

      > .editor {
        @apply text-[0.875rem] flex gap-x-[0.5rem] items-center;
        @apply md:(text-[1rem]);

        > .label {
          @apply px-[0.5rem] py-[0.25rem] rounded-full bg-[#fefefe];
        }

        > .wrapper {
          @apply rounded-md bg-[#fafafa] border px-[0.5rem];

          > .input {
            @apply bg-transparent;
          }
        }
      }
    }

    > .result {
      @apply flex flex-col gap-y-[0.5rem] p-[0.5rem] rounded-md bg-[#f2f2f2];

      > .editor {
        @apply flex gap-x-[0.5rem] text-[0.875rem];
        @apply md:(text-[1rem]);

        > .label {
          @apply px-[0.5rem] py-[0.25rem] rounded-full bg-[#fefefe];
        }

        > .input {
          @apply rounded-md bg-[#fafafa] border px-[0.5rem];
        }
      }
    }
  }
}
</style>
