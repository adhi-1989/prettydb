<template>
  <section :class="[$style.card, frameType]">
    <div :class="$style.content">
      <div :class="$style.label">{{ factorName }}</div>
      <div v-if="isLevelValid" :class="$style.level">
        <template v-for="factorLevel in allLevel" :key="factorLevel">
          <img :class="$style.icon" :src="getLevelIcon(factorLevel)" alt="" />
        </template>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { FactorLevel } from "@/data";
import { computed, defineProps, useCssModule, withDefaults } from "vue";
import { useI18n } from "vue-i18n";
import { Factor } from "@/data";
import starFill from "#/images/level/star-fill.svg";
import starEmpty from "#/images/level/star-empty.svg";

const props = withDefaults(defineProps<{ factor: Factor; level?: number }>(), {
  level: -1,
});

const _style = useCssModule();
const { t } = useI18n();

const allLevel = Factor.allLevel;

const factorName = computed(() => {
  return t(Factor.getNameKey(props.factor));
});

const frameType = computed(() => {
  const { status, ability, uniqueSkill, standard } = _style;
  switch (props.factor.type) {
    case "status":
      return status;
    case "ability":
      return ability;
    case "unique-skill":
      return uniqueSkill;
    default:
      return standard;
  }
});

const isLevelValid = computed(() => {
  return props.level >= 1 && props.level <= 3;
});

function getLevelIcon(level: FactorLevel): string {
  return level <= props.level ? starFill : starEmpty;
}
</script>

<style lang="scss" module>
.card {
  @apply font-bold rounded-md;
  box-shadow: 0 1px 1px 0 #b8b6c3;
  @screen md {
    @apply rounded-lg;
    box-shadow: 0 2px 1px 0 #b8b6c3;
  }

  &.standard {
    @apply bg-[#ccccd0];

    > .content {
      @apply bg-[#e2e2e2];
    }
  }

  &.status {
    @apply text-[#fefefe] bg-[#53a2ed];

    > .content {
      @apply bg-[#64b8f0];
    }
  }

  &.ability {
    @apply text-[#fefefe] bg-[#ed72a6];

    > .content {
      @apply bg-[#ee7fb0];
    }
  }

  &.uniqueSkill {
    @apply text-[#fefefe] bg-[#99ce4d];

    > .content {
      @apply bg-[#a3d251];
    }
  }

  > .content {
    @apply relative text-xxs p-[0.25rem] rounded-md border-1 border-transparent bg-clip-padding;
    @apply md:(text-xs p-[0.375rem] border-2);

    > .label {
      @apply truncate ml-[0.25rem];
    }

    > .level {
      @apply absolute inset-x-0 mx-auto bottom-[-0.375rem] flex gap-x-[0.125rem] justify-center;
      @apply md:(bottom-[-0.5rem]);

      > .icon {
        @apply w-[0.75rem] h-[0.75rem];
        @apply md:(w-[1rem] h-[1rem]);
      }
    }
  }
}
</style>
