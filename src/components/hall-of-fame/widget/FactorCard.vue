<template>
  <div class="factor-card" :data-factor-type="getFactorType(factor)">
    <div class="content">
      <div class="label" v-t="`factor.${factor.factorID}.name`" />
      <div class="factor-level-container">
        <template v-for="level in FactorLevels" :key="level">
          <img
            class="factor-level"
            :src="FillStarIcon"
            alt=""
            v-if="level <= factor.factorLevel"
          />
          <img class="factor-level" :src="EmptyStarIcon" alt="" v-else />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { CharacterDTO, FactorDTO } from "/@/db/hall-of-fame";
import { FactorTypes, getFactor, FactorLevels } from "/@/data";
import { useI18n } from "vue-i18n";
import FillStarIcon from "/assets/image/level/star-fill.svg?url";
import EmptyStarIcon from "/assets/image/level/star-empty.svg?url";

export default defineComponent({
  name: "FactorCard",
  props: {
    factor: {
      type: Object as PropType<FactorDTO>,
      required: true,
    },
    character: {
      type: Object as PropType<CharacterDTO>,
      required: true,
    },
  },
  data() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    return {
      FactorTypes,
      FactorLevels,
      FillStarIcon,
      EmptyStarIcon,
      t,
    };
  },
  setup() {
    const getFactorType = (factor: FactorDTO) => {
      const factorType = getFactor(factor.factorID).TYPE;
      if (factorType == FactorTypes.STATUS) {
        return "status";
      } else if (factorType == FactorTypes.ABILITY) {
        return "ability";
      } else if (factorType == FactorTypes.UNIQUE_SKILL) {
        return "unique-skill";
      } else {
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
  &[data-factor-type="unique-skill"] {
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

<i18n locale="ja" src="/locales/ja/game/factor.json" />
