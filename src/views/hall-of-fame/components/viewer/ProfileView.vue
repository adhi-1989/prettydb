<template>
  <!-- profile -->
  <section class="profile-view-root">
    <!-- portrait -->
    <div class="portrait-container">
      <img
        class="image portrait"
        :src="getPortrait(character.characterID, character.monikerID)"
        alt=""
      />
      <div class="talent-level-container">
        <template v-for="level in TalentLevels" :key="level">
          <img
            class="talent-level"
            :src="starFill"
            alt=""
            v-if="level <= character.talentLevel"
          />
          <img class="talent-level" :src="starEmpty" alt="" v-else />
        </template>
      </div>
    </div>
    <!-- score & rank -->
    <div class="score-and-rank">
      <img class="image rank" :src="getRankGradeIcon(history.score)" alt="" />
      <span class="text score">{{ history.score }}</span>
    </div>
    <!-- name & moniker -->
    <div class="name-card">
      <div class="text moniker">[{{ t(getMonikerKey(character)) }}]</div>
      <div class="text name">{{ t(getCharacterNameKey(character)) }}</div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, readonly } from "vue";
import { HallOfFameDTO } from "@/views/hall-of-fame/logic/db";
import { getPortrait, getRankGradeIcon } from "@/views/logic/resources/images";
import { getCharacterNameKey, getMonikerKey } from "@/views/logic/i18n";
import { useI18n } from "vue-i18n";
import { TalentLevels } from "@/data";
import _ from "@/util/lodash";
import starFill from "#/images/level/star-fill.svg";
import starEmpty from "#/images/level/star-empty.svg";

export default defineComponent({
  props: {
    viewData: {
      type: Object as PropType<HallOfFameDTO>,
      required: true,
    },
  },
  data() {
    const { t } = useI18n();
    return {
      TalentLevels: _.reverse([...TalentLevels]),
      getPortrait,
      getRankGradeIcon,
      getCharacterNameKey,
      getMonikerKey,
      starFill,
      starEmpty,
      t,
    };
  },
  setup(props) {
    return {
      character: readonly(props.viewData.character),
      history: readonly(props.viewData.history),
    };
  },
});
</script>

<style lang="scss" scoped>
.profile-view-root {
  @apply flex gap-x-[0.5rem] px-[0.5rem] pb-[0.5rem];
  > .portrait-container {
    @apply w-[25%] relative;
    > .talent-level-container {
      @apply absolute inset-x-0 mx-auto bottom-0 flex justify-center;
      flex-direction: row-reverse;

      > .talent-level {
        @apply w-[23%] object-scale-down;
        &:not(:last-child) {
          @apply ml-[-0.25rem];
        }
      }
    }
  }

  > .score-and-rank {
    @apply flex flex-col justify-center text-center w-[15%];
    > .image.rank {
      @apply object-scale-down;
    }

    > .text.score {
      @apply font-bold text-[0.75rem];
    }
  }

  > .name-card {
    @apply flex-grow flex flex-col justify-center font-bold text-center text-[0.8rem];
  }
}

@screen xs {
  .profile-view-root {
    @apply gap-x-[1rem] px-[2.5rem] pb-[0.5rem];
    > .portrait-container {
      @apply w-[7rem];
      > .talent-level-container {
        > .talent-level {
          @apply h-[1.375rem];
          width: inherit;

          &:not(:last-child) {
            @apply ml-[-0.375rem];
          }
        }
      }
    }

    > .score-and-rank {
      @apply w-[3.5rem];
      > .text.score {
        @apply text-[1rem];
      }
    }

    > .name-card {
      @apply text-[1.0625rem];
    }
  }
}
</style>
