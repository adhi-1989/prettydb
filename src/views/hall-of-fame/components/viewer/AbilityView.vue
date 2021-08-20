<template>
  <section class="ability-view-root">
    <template v-for="container in AllContainer" :key="container.type">
      <div class="ability-generic-term" :data-ability-type="container.type">
        {{ t(`game-system.ability.${container.type}.generic-term`) }}
      </div>
      <template v-for="identify in container.abilities" :key="identify">
        <div class="ability-item" :data-ability-type="container.type">
          <div class="name">
            {{ t(`game-system.ability.${container.type}.${identify}`) }}
          </div>
          <img
            class="grade"
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
import { getAbilityGradeIcon } from "@/views/logic/resources/images";
import { useI18n } from "vue-i18n";
import { Ability } from "@/data";
import {
  fallbackStateFactory,
  stateInjectionKey,
} from "@/views/hall-of-fame/logic/dependency";

export default defineComponent({
  data() {
    return {
      AllContainer: Ability.allContainer,
      getAbilityGradeIcon,
    };
  },
  setup() {
    const { t } = useI18n();

    const { viewData } = inject(stateInjectionKey, fallbackStateFactory, true);
    const { ability } = viewData.value;

    return {
      t,
      ability,
    };
  },
});
</script>

<style lang="scss">
.ability-view-root {
  @apply grid gap-[0.25rem] items-center px-[0.5rem];
  @apply sm:(gap-[0.5rem] px-[1.5rem]);

  > .ability-generic-term {
    @apply font-bold text-[0.5rem];
    @apply sm:(text-[0.75rem]);
    @apply md:(text-[1rem]);
  }

  > .ability-item {
    @apply flex justify-between items-center border-[1px] border-[#dfd4c8] rounded px-[0.125rem] py-[0.125rem];
    @apply sm:(px-[0.175rem] py-[0.175rem]);
    @apply md:(border-[2px] px-[0.25rem] py-[0.25rem]);

    > .name {
      @include text-overflow-omit;
      @apply flex-grow font-bold text-[0.5rem] text-center;
      @apply sm:(text-[0.675rem]);
      @apply md:(text-[0.95rem]);
    }

    > .grade {
      @apply w-[0.875rem];
      @apply sm:(w-[1rem]);
      @apply md:(w-[1.5rem]);
    }
  }

  > [data-ability-type="racetrack"] {
    grid-row-start: 1;
  }

  > [data-ability-type="distance"] {
    grid-row-start: 2;
  }

  > [data-ability-type="running-style"] {
    grid-row-start: 3;
  }
}
</style>
