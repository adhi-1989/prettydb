<template>
  <!-- inherit -->
  <section class="inherit-view-root">
    <div class="inherit-view">
      <!-- header -->
      <div class="header">
        {{ t("pages.hall-of-fame.viewer.inherit-view.label.factor") }}
      </div>

      <!-- factor data that child -->
      <div class="data-child">
        <div class="portrait-container">
          <img class="rank" :src="getRankGradeIcon(history.score)" alt="" />
          <img
            class="portrait"
            :src="getPortrait(character.characterID, character.monikerID)"
            alt=""
          />
        </div>

        <!-- factor list -->
        <div class="factor-item-group">
          <template v-for="factor in factors.values()" :key="factor.factorID">
            <factor-card :character="character" :factor="factor" />
          </template>
        </div>
      </div>

      <!-- separator -->
      <div class="">
        <span>{{
          t("pages.hall-of-fame.viewer.inherit-view.label.parents")
        }}</span>
        <hr />
      </div>

      <!-- parent 1 -->
      <!-- parent 2 -->
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, readonly } from "vue";
import FactorCard from "#/views/hall-of-fame/components/widget/FactorCard.vue";
import { HallOfFameDTO } from "#/views/hall-of-fame/logic/db";
import { getPortrait, getRankGradeIcon } from "#/views/logic/resources/images";
import { useI18n } from "vue-i18n";

export default defineComponent({
  components: {
    FactorCard,
  },
  props: {
    viewData: {
      type: Object as PropType<HallOfFameDTO>,
      required: true,
    },
  },
  data() {
    const { t } = useI18n();
    return {
      getPortrait,
      getRankGradeIcon,
      t,
    };
  },
  setup(props) {
    return {
      character: readonly(props.viewData.character),
      factors: readonly(props.viewData.factors),
      history: readonly(props.viewData.history),
    };
  },
});
</script>

<style lang="scss" scoped>
.inherit-view-root {
  @apply rounded overflow-hidden h-full bg-[#f2f2f2] p-[0.5rem];
  > .inherit-view {
    @apply overflow-y-scroll h-full;
    > .header {
      @apply font-bold text-[#fefefe] text-[0.75rem] rounded-sm bg-gradient-to-t from-[#8ac73e] to-[#8ac73e] px-[0.25rem];
    }

    > .data-child {
      @apply flex;
      > .portrait-container {
        @apply w-[20%] pt-[0.25rem] relative;
        > .rank {
          @apply absolute top-[0.375rem] right-0 w-[40%];
        }
      }

      > .factor-item-group {
        @apply flex-1 grid grid-cols-2 grid-flow-row auto-rows-min gap-[0.375rem] p-[0.5rem];
      }
    }
  }
}

@screen xs {
  .inherit-view-root {
    > .inherit-view {
      > .data-child {
        > .portrait-container {
          @apply w-[5rem];
          > .rank {
            @apply w-[2rem];
          }
        }

        > .factor-item-group {
          @apply gap-y-[0.5rem] py-[0.75rem];
        }
      }
    }
  }
}
</style>
