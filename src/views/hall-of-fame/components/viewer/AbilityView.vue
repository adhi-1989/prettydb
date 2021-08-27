<template>
  <section :class="$style.ability">
    <template v-for="container in AllContainer" :key="container.type">
      <div :class="[$style.typeName, rowStart($style, container.type)]">
        {{ t(getTypeNameKey(container.type)) }}
      </div>
      <template v-for="identify in container.abilities" :key="identify">
        <div :class="[$style.item, rowStart($style, container.type)]">
          <div :class="$style.name">
            {{ t(getNameKey(identify)) }}
          </div>
          <img
            :class="$style.grade"
            :src="getAbilityGradeIcon(ability[identify])"
            alt=""
          />
        </div>
      </template>
    </template>
  </section>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { getAbilityGradeIcon } from "@/views/_common/logic/resources/images";
import { useI18n } from "vue-i18n";
import { Ability, AbilityType } from "@/data";
import { State } from "@/views/hall-of-fame/logic/dependency";

export default defineComponent({
  data() {
    return {
      AllContainer: Ability.allContainer,
      getTypeNameKey: Ability.getTypeNameKey,
      getNameKey: Ability.getNameKey,
      getAbilityGradeIcon,
    };
  },
  setup() {
    const { t } = useI18n();

    const { viewData } = State(inject);
    const { ability } = viewData.value;

    const rowStart = (
      { racetrack, distance, runningStyle }: Record<string, string>,
      type: AbilityType
    ): string => {
      if (type === "racetrack") {
        return racetrack;
      }
      return type === "distance" ? distance : runningStyle;
    };

    return {
      t,
      ability,
      rowStart,
    };
  },
});
</script>

<style lang="scss" module>
.ability {
  @apply grid gap-[0.25rem] items-center px-[0.5rem];
  @apply sm:(gap-[0.5rem] px-[1.5rem]);

  > .typeName {
    @apply font-bold text-xxs;
    @apply sm:(text-xs);
    @apply md:(text-base);
  }

  > .item {
    @apply flex justify-between items-center border-1 border-[#dfd4c8] rounded px-[0.125rem] py-[0.125rem];
    @apply sm:(px-[0.175rem] py-[0.175rem]);
    @apply md:(border-2 px-[0.25rem] py-[0.25rem]);

    > .name {
      @apply flex-grow truncate font-bold text-xxs text-center;
      @apply sm:(text-xs);
      @apply md:(text-base);
    }

    > .grade {
      @apply w-[0.875rem] h-[0.875rem];
      @apply sm:(w-[1rem] h-[1rem]);
      @apply md:(w-[1.5rem] h-[1.5rem]);
    }
  }

  > .typeName,
  .item {
    &.racetrack {
      grid-row-start: 1;
    }

    &.distance {
      grid-row-start: 2;
    }

    &.runningStyle {
      grid-row-start: 3;
    }
  }
}
</style>
