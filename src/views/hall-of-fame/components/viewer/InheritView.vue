<template>
  <section :class="$style.inherit">
    <div :class="$style.view">
      <div :class="$style.header">
        {{ t("pages.hall-of-fame.viewer.inherit-view.label.factor") }}
      </div>

      <div :class="$style.main">
        <div :class="$style.portrait">
          <img
            :class="$style.rank"
            :src="getRankGradeIcon(history.score)"
            alt=""
          />
          <img :class="$style.image" :src="getPortrait(character)" alt="" />
        </div>

        <div :class="$style.factors">
          <div
            :class="$style.factor"
            v-for="{ factor, level } in factors"
            :key="factor.factorID"
          >
            <factor-card :factor="factor" :level="level" />
          </div>
        </div>
      </div>

      <div :class="$style.invisible">
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
import {
  getPortrait,
  getRankGradeIcon,
} from "@/views/_common/logic/resources/images";
import {
  fallbackStateFactory,
  stateInjectionKey,
} from "@/views/hall-of-fame/logic/dependency";
import FactorCard from "@/views/_common/components/widget/FactorCard.vue";

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

<style lang="scss" module>
.inherit {
  @apply rounded overflow-y-scroll h-full bg-[#f2f2f2] p-[0.5rem];

  > .view {
    @apply h-full;

    > .header {
      @apply font-bold text-[#fefefe] text-xs rounded-sm bg-gradient-to-t from-[#8ac73e] to-[#8ac73e] pl-[0.25rem] py-[0.125rem];
    }

    > .main {
      @apply flex gap-x-[0.25rem];

      > .portrait {
        @apply flex-shrink-0 pt-[0.25rem] relative;

        > .rank {
          @apply absolute top-[0.375rem] right-0 w-[1.5rem] h-[1.5rem];
          @apply md:(w-[2.25rem] h-[2.25rem]);
        }

        > .image {
          @apply w-[3.75rem] h-[3.75rem];
          @apply md:(w-[5rem] h-[5rem]);
        }
      }

      > .factors {
        @apply flex-1 grid grid-cols-1 grid-flow-row auto-rows-min gap-y-[0.5rem] py-[0.5rem];
        @apply sm:(grid-cols-2 gap-x-[0.375rem]);
        @apply md:(py-[0.75rem] gap-y-[0.75rem]);
      }
    }
  }
}
</style>
