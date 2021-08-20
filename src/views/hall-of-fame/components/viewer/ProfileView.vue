<template>
  <section class="profile-view-root">
    <div class="portrait-container">
      <img class="portrait" :src="getPortrait(character)" alt="" />
      <div class="talent-level-container">
        <template v-for="level in AllTalentLevel" :key="level">
          <img
            class="talent-level"
            :class="`level-${level}`"
            :src="getLevelIcon(level)"
            alt=""
          />
        </template>
      </div>
    </div>

    <div class="score-and-rank">
      <img class="rank" :src="getRankGradeIcon(history.score)" alt="" />
      <span class="score">{{ history.score }}</span>
    </div>

    <div class="name-card">
      <div class="moniker">[{{ t(getMonikerNameKey(character)) }}]</div>
      <div class="name">{{ t(getCharacterNameKey(character)) }}</div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { useI18n } from "vue-i18n";
import { Character } from "@/data";
import { getPortrait, getRankGradeIcon } from "@/views/logic/resources/images";
import {
  fallbackStateFactory,
  stateInjectionKey,
} from "@/views/hall-of-fame/logic/dependency";
import starFill from "#/images/level/star-fill.svg";
import starEmpty from "#/images/level/star-empty.svg";

export default defineComponent({
  data() {
    return {
      AllTalentLevel: [...Character.allTalentLevel].reverse(),
      getCharacterNameKey: Character.getNameKey,
      getMonikerNameKey: Character.getMonikerNameKey,
      getPortrait,
      getRankGradeIcon,
    };
  },
  setup() {
    const { t } = useI18n();

    const { viewData } = inject(stateInjectionKey, fallbackStateFactory, true);
    const { character, history } = viewData.value;
    const getLevelIcon = (level: number): string => {
      return level <= character.talentLevel ? starFill : starEmpty;
    };

    return {
      t,
      character,
      history,
      getLevelIcon,
    };
  },
});
</script>

<style lang="scss">
.profile-view-root {
  @apply flex gap-x-[0.5rem] px-[0.5rem] pb-[0.5rem];
  @apply sm:(gap-x-[1rem] px-[0.5rem] pb-[0.5rem]);

  > .portrait-container {
    @apply relative;

    > .portrait {
      @apply w-[4.5rem];
      @apply sm:(w-[7rem]);
    }

    > .talent-level-container {
      @apply absolute inset-x-0 mx-auto bottom-0 flex flex-row-reverse justify-center;

      > .talent-level {
        @apply w-[1rem] object-scale-down;
        @apply sm:(w-[1.5rem]);

        &:not(.level-1) {
          @apply ml-[-0.25rem];
          @apply sm:(ml-[-0.375rem]);
        }
      }
    }
  }

  > .score-and-rank {
    @apply flex flex-col justify-center text-center;

    > .rank {
      @apply object-scale-down w-[2.25rem];
      @apply sm:(w-[3.5rem]);
    }

    > .score {
      @apply font-bold text-[0.75rem];
      @apply sm:(text-[1rem]);
    }
  }

  > .name-card {
    @apply flex-grow flex flex-col justify-center font-bold text-center text-[0.75rem];
    @apply sm:(text-[1rem]);
  }
}
</style>
