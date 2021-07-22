<template>
  <!-- ability -->
  <section class="ability-view-root">
    <template v-for="abilityKey in AbilityStructure" :key="abilityKey.type">
      <div class="ability-generic-term" :data-ability-type="abilityKey.type">
        {{ t(`game-system.ability.${abilityKey.type}.generic-term`) }}
      </div>
      <div
        class="ability-container"
        :data-ability-type="abilityKey.type"
        v-for="key in abilityKey.values"
        :key="key"
      >
        <div class="ability-name">
          {{ t(`game-system.ability.${abilityKey.type}.${key}`) }}
        </div>
        <img class="ability-value" :src="getAbilityGradeIcon(key)" alt="" />
      </div>
    </template>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, readonly } from "vue";
import { Dto } from "@/views/hall-of-fame/logic/db";
import { getAbilityGradeIcon } from "@/views/logic/resources/images";
import { useI18n } from "vue-i18n";
import { AbilityStructure, AbilityKey } from "@/data";

export default defineComponent({
  props: {
    viewData: {
      type: Object as PropType<Dto>,
      required: true,
    },
  },
  data() {
    const { t } = useI18n();
    return {
      AbilityStructure,
      t,
    };
  },
  setup(props) {
    const ability = readonly(props.viewData.ability);
    return {
      getAbilityGradeIcon: (key: AbilityKey) =>
        getAbilityGradeIcon(ability[key]),
    };
  },
});
</script>

<style lang="scss" scoped>
.ability-view-root {
  @apply grid gap-x-[0.5rem] gap-y-[0.5rem] items-center px-[1rem];
  grid-template-columns: 2.75rem repeat(4, 1fr);

  > .ability-generic-term {
    @apply font-bold text-[0.625rem];
  }

  > .ability-container {
    @apply flex justify-between items-center border-[2px] border-[#dfd4c8] rounded px-[0.125rem] py-[0.125rem];
    > .ability-name {
      @include text-overflow-omit;
      @apply font-bold text-[0.5rem] text-center w-full;
    }

    > .ability-value {
      @apply w-[0.875rem];
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

@screen xs {
  .ability-view-root {
    @apply gap-x-[0.5rem] gap-y-[0.5rem] px-[2rem];
    grid-template-columns: 4rem repeat(4, 1fr);

    > .ability-generic-term {
      @apply text-[0.8rem];
    }

    > .ability-container {
      @apply px-[0.125rem] py-[0.125rem];
      > .ability-name {
        @apply text-[0.8rem];
      }

      > .ability-value {
        @apply w-[1.25rem];
      }
    }
  }
}
</style>
