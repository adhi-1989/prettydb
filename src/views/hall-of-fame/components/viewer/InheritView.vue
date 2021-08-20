<template>
  <section class="inherit-view-root">
    <div class="inherit-view">
      <div class="header">
        {{ t("pages.hall-of-fame.viewer.inherit-view.label.factor") }}
      </div>

      <div class="data-child">
        <div class="portrait-container">
          <img class="rank" :src="getRankGradeIcon(history.score)" alt="" />
          <img class="portrait" :src="getPortrait(character)" alt="" />
        </div>

        <div class="factor-item-group">
          <template v-for="{ factor, level } in factors" :key="factor.factorID">
            <factor-card :factor="factor" :level="level" />
          </template>
        </div>
      </div>

      <div class="invisible">
        <span>{{
          t("pages.hall-of-fame.viewer.inherit-view.label.parents")
        }}</span>
        <hr />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import { useI18n } from "vue-i18n";
import { Factor } from "@/data";
import { getPortrait, getRankGradeIcon } from "@/views/logic/resources/images";
import {
  fallbackStateFactory,
  stateInjectionKey,
} from "@/views/hall-of-fame/logic/dependency";
import FactorCard from "@/views/components/widget/FactorCard.vue";

export default defineComponent({
  components: {
    FactorCard,
  },
  data() {
    return {
      getPortrait,
      getRankGradeIcon,
    };
  },
  setup() {
    const { t } = useI18n();

    const { viewData } = inject(stateInjectionKey, fallbackStateFactory, true);
    const { character, factors, history } = viewData.value;
    const _factors = computed(() => {
      return factors
        .map((x) => {
          return { factor: Factor.get(x.factorID), level: x.factorLevel };
        })
        .sort((x, y) => x.factor.sortID - y.factor.sortID);
    });

    return {
      t,
      character,
      factors: _factors,
      history,
    };
  },
});
</script>

<style lang="scss">
.inherit-view-root {
  @apply rounded overflow-y-scroll h-full bg-[#f2f2f2] p-[0.5rem];

  > .inherit-view {
    @apply h-full;

    > .header {
      @apply font-bold text-[#fefefe] text-[0.75rem] rounded-sm bg-gradient-to-t from-[#8ac73e] to-[#8ac73e] pl-[0.25rem] py-[0.125rem];
      @apply md:(text-[0.875rem] pl-[0.375rem] py-[0.25rem]);
    }

    > .data-child {
      @apply flex gap-x-[0.25rem];

      > .portrait-container {
        @apply pt-[0.25rem] relative;

        > .rank {
          @apply absolute top-[0.375rem] right-0 w-[1.5rem];
          @apply md:(w-[2.25rem]);
        }

        > .portrait {
          @apply w-[3.25rem];
          @apply md:(w-[5rem]);
        }
      }

      > .factor-item-group {
        @apply flex-1 grid grid-cols-2 grid-flow-row auto-rows-min gap-[0.375rem] py-[0.5rem];
        @apply md:(gap-[0.5rem] py-[1rem]);
      }
    }
  }
}
</style>
