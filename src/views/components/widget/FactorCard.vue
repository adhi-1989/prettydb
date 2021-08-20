<template>
  <div class="factor-card" :class="frameType">
    <div class="content">
      <div class="label">{{ t(getNameKey(factor)) }}</div>
      <div class="factor-level-container" v-if="isLevelValid">
        <template v-for="level in AllFactorLevel" :key="level">
          <img class="factor-level" :src="getLevelIcon(level)" alt="" />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { useI18n } from "vue-i18n";
import { Factor, FactorLevel } from "@/data";
import starFill from "#/images/level/star-fill.svg";
import starEmpty from "#/images/level/star-empty.svg";

export default defineComponent({
  props: {
    factor: {
      type: Object as PropType<Factor>,
      required: true,
    },
    level: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      AllFactorLevel: Factor.allLevel,
      getNameKey: Factor.getNameKey,
    };
  },
  setup(props) {
    const { t } = useI18n();

    const frameType = computed(() => {
      const type = props.factor.type;
      switch (type) {
        case "status":
        case "ability":
        case "unique-skill":
          return type;
        default:
          return "standard";
      }
    });
    const isLevelValid = computed(() => {
      return props.level >= 1 && props.level <= 3;
    });
    const getLevelIcon = (level: FactorLevel): string => {
      return level <= props.level ? starFill : starEmpty;
    };

    return {
      t,
      frameType,
      isLevelValid,
      getLevelIcon,
    };
  },
});
</script>

<style lang="scss">
.factor-card {
  @apply font-bold rounded-md text-[0.5rem];
  @apply md:(text-[0.875rem]);
  box-shadow: 0 2px 2px #b3b2be;

  &.standard {
    @apply bg-[#ccccd0];

    > .content {
      @apply bg-[#e2e2e2];
    }
  }

  &.status {
    @apply text-[#fefefe];
    @apply bg-[#53a2ed];

    > .content {
      @apply bg-[#64b8f0];
    }
  }

  &.ability {
    @apply text-[#fefefe];
    @apply bg-[#ed72a6];

    > .content {
      @apply bg-[#ee7fb0];
    }
  }

  &.unique-skill {
    @apply text-[#fefefe];
    @apply bg-[#99ce4d];

    > .content {
      @apply bg-[#a3d251];
    }
  }

  > .content {
    @apply relative rounded-md px-[0.5rem] py-[0.375rem] border-1 border-transparent bg-clip-padding;
    @apply md:(py-[0.5rem]);

    > .label {
      @include text-overflow-omit;
    }

    > .factor-level-container {
      @apply absolute inset-x-0 mx-auto bottom-[-0.375rem] flex gap-x-[0.125rem] justify-center;
      @apply md:(bottom-[-0.5rem]);
      > .factor-level {
        @apply object-scale-down h-[0.75rem];
        @apply md:(h-[1rem]);
      }
    }
  }
}
</style>
