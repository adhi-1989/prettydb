<template>
  <div class="factor-card" :data-factor-type="getFactorType(factor)">
    <div class="content">
      <div class="label">{{ t(`factor.${factor.factorID}.name`) }}</div>
      <div class="factor-level-container">
        <template v-for="level in AllFactorLevel" :key="level">
          <img
            class="factor-level"
            :src="starFill"
            alt=""
            v-if="level <= factor.factorLevel"
          />
          <img class="factor-level" :src="starEmpty" alt="" v-else />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { CharacterDto, FactorDto } from "@/views/hall-of-fame/logic/db";
import { getFactor, AllFactorLevel } from "@/data";
import { useI18n } from "vue-i18n";
import starFill from "#/images/level/star-fill.svg";
import starEmpty from "#/images/level/star-empty.svg";

export default defineComponent({
  props: {
    factor: {
      type: Object as PropType<FactorDto>,
      required: true,
    },
    character: {
      type: Object as PropType<CharacterDto>,
      required: true,
    },
  },
  data() {
    const { t } = useI18n();
    return {
      AllFactorLevel,
      starFill,
      starEmpty,
      t,
    };
  },
  setup() {
    const getFactorType = (factor: FactorDto) => {
      const factorType = getFactor(factor.factorID).type;
      switch (factorType) {
        case "status":
        case "ability":
        case "uniqueSkill":
          return factorType;
        default:
          return "standard";
      }
    };
    return {
      getFactorType,
    };
  },
});
</script>

<style lang="scss">
.factor-card {
  @apply shadow rounded-md text-[0.5rem] mb-[0.375rem];
  background-color: #ccccd0;
  box-shadow: 0 2px 2px #b3b2be;

  > .content {
    @apply relative rounded-md px-[0.5rem] py-[0.25rem];
    border: solid 1px transparent;
    background-color: #e2e2e2;
    background-clip: padding-box;

    > .label {
      @include text-overflow-omit;
    }

    > .factor-level-container {
      @apply absolute inset-x-0 mx-auto bottom-[-0.4375rem] flex gap-x-[0.25rem] justify-center;
      > .factor-level {
        @apply h-[0.875rem] object-scale-down;
      }
    }
  }

  &[data-factor-type="status"] {
    color: #fefefe;
    background-color: #53a2ed;

    > .content {
      background-color: #64b8f0;
    }
  }

  &[data-factor-type="ability"] {
    color: #fefefe;
    background-color: #ed72a6;

    > .content {
      background-color: #ee7fb0;
    }
  }

  &[data-factor-type="uniqueSkill"] {
    color: #fefefe;
    background-color: #99ce4d;

    > .content {
      background-color: #a3d251;
    }
  }
}

@screen xs {
  .factor-card {
    @apply text-[0.875rem] mb-[0.375rem];
    > .content {
      @apply rounded-md px-[0.5rem] py-[0.375rem];
      > .factor-level-container {
        @apply bottom-[-0.5rem] gap-x-[0.375rem];
        > .factor-level {
          @apply h-[1rem];
        }
      }
    }
  }
}
</style>
