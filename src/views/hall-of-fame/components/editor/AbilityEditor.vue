<template>
  <section :class="$style.abilityEditor">
    <div :class="$style.view">
      <template v-for="{ type, abilities } in AllAbilityContainer" :key="type">
        <div :class="$style.abilityType">
          <span :class="$style.text">{{ t(getAbilityTypeNameKey(type)) }}</span>
          <hr :class="$style.horizontal" />
        </div>

        <div :class="$style.abilities">
          <template v-for="identify in abilities" :key="identify">
            <div
              :class="[
                $style.ability,
                { [$style.focused]: isAbilityFocused(identify) },
              ]"
              @click="setFocus(type, identify)"
            >
              <div :class="$style.label">
                {{ t(getAbilityNameKey(identify)) }}
              </div>
              <img
                :class="$style.icon"
                :src="getAbilityGradeIcon(getAbilityGrade(identify))"
                alt=""
              />
            </div>
          </template>
        </div>
      </template>
    </div>

    <div :class="$style.editor">
      <div :class="$style.label">{{ editorLabel }}</div>
      <div :class="$style.gradeSelectors">
        <div
          v-for="grade in OrderedAbilityGrades"
          :key="grade"
          :class="[
            $style.selector,
            { [$style.selected]: isFocusedAbilityGradeEquals(grade) },
          ]"
          @click="setFocusedAbilityGrade(grade)"
        >
          <img :class="$style.icon" :src="getAbilityGradeIcon(grade)" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from "vue";
import { useI18n } from "vue-i18n";
import { Ability, AbilityGrade, AbilityIdentify, AbilityType } from "@/data";
import { getAbilityGradeIcon } from "@/views/_common/logic/resources/images";
import { State } from "@/views/hall-of-fame/logic/dependency";

const OrderedAbilityGrades: Array<AbilityGrade> = [
  "s",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
];

const AbilityRotation: Record<AbilityIdentify, AbilityIdentify> = {
  turf: "dirt",
  dirt: "short",
  short: "mile",
  mile: "middle",
  middle: "long",
  long: "nige",
  nige: "senko",
  senko: "sashi",
  sashi: "oikomi",
  oikomi: "turf",
};

export default defineComponent({
  data() {
    return {
      AllAbilityContainer: Ability.allContainer,
      getAbilityNameKey: Ability.getNameKey,
      getAbilityTypeNameKey: Ability.getTypeNameKey,
      getAbilityGradeIcon,
      OrderedAbilityGrades,
    };
  },
  setup() {
    const { t } = useI18n();

    const { editData } = State(inject);
    const { ability } = editData.value;

    const getAbilityGrade = (identify: AbilityIdentify): AbilityGrade => {
      return ability[identify];
    };

    const focus = ref<[AbilityType, AbilityIdentify]>(["racetrack", "turf"]);
    const setFocus = (type: AbilityType, identify: AbilityIdentify) => {
      focus.value = [type, identify];
    };
    const isAbilityFocused = (identify: AbilityIdentify) => {
      return focus.value[1] === identify;
    };
    const isAbilityGradeEquals = (
      identify: AbilityIdentify,
      grade: AbilityGrade
    ) => {
      return ability[identify] === grade;
    };
    const setAbilityGrade = (
      type: AbilityType,
      identify: AbilityIdentify,
      grade: AbilityGrade
    ) => {
      ability[identify] = grade;
      setFocus(type, identify);
    };

    const editorLabel = computed(() => {
      const [type, identify] = focus.value;
      const typeName = t(Ability.getTypeNameKey(type));
      const abilityName = t(Ability.getNameKey(identify));
      return `${typeName} : ${abilityName}`;
    });
    const isFocusedAbilityGradeEquals = (grade: AbilityGrade) => {
      return isAbilityGradeEquals(focus.value[1], grade);
    };
    const setFocusedAbilityGrade = (grade: AbilityGrade) => {
      const identify = focus.value[1];
      ability[identify] = grade;

      const next = AbilityRotation[identify];
      setFocus(Ability.getType(next), next);
    };

    return {
      t,
      getAbilityGrade,
      setFocus,
      isAbilityFocused,
      isAbilityGradeEquals,
      setAbilityGrade,
      editorLabel,
      isFocusedAbilityGradeEquals,
      setFocusedAbilityGrade,
    };
  },
});
</script>

<style lang="scss" module>
.abilityEditor {
  @apply flex flex-col gap-y-[0.5rem] h-full;
  @apply sm:(gap-y-[1rem]);

  > .view {
    @apply p-[0.5rem] rounded-md bg-[#f2f2f2];

    > .abilityType {
      @apply flex gap-x-[0.375rem] items-center px-[0.5rem] py-[0.25rem];

      > .text {
        @apply text-[0.875rem];
        @apply sm:(text-[1rem]);
      }

      > .horizontal {
        @apply flex-grow border-[#d2d2d2];
      }
    }

    > .abilities {
      @apply grid grid-cols-2 justify-items-center;

      > .ability {
        @apply flex gap-x-[0.5rem] items-center h-[2.5rem] cursor-pointer;
        @apply sm:(h-[3.5rem]);

        &:not(.focused):hover {
          > .label {
            @apply border-[#8fd54a];
          }
        }

        &.focused {
          > .label {
            @apply text-[#fafafa] bg-[#8fd54a];
          }
        }

        > .label {
          @apply text-center text-[0.875rem] w-[5rem] px-[0.25rem] py-[0.25rem] rounded-md bg-[#fafafa] border;
          @apply sm:(text-[1rem] w-[7rem] px-[0.5rem] py-[0.5rem]);
        }

        > .icon {
          @apply w-[1.5rem] h-[1.5rem];
          @apply sm:(w-[2rem] h-[2rem]);
        }
      }
    }
  }

  > .editor {
    @apply flex flex-col gap-y-[1rem] p-[0.5rem] rounded-md border;

    > .label {
      @apply flex text-[0.875rem] px-[0.5rem] py-[0.25rem];
      @apply sm:(text-[1rem]);
    }

    > .gradeSelectors {
      @apply grid grid-cols-4 gap-y-[1.25rem] justify-items-center py-[0.25rem];
      @apply sm:(gap-y-[1.75rem]);

      > .selector {
        @apply cursor-pointer rounded-md;

        > .icon {
          @apply w-[2rem] h-[2rem];
        }

        &:not(.selected):hover {
          @apply ring;
        }

        &.selected {
          @apply ring ring-[#8fd54a];
        }
      }
    }
  }
}
</style>
