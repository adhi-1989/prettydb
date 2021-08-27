<template>
  <section :class="$style.profile">
    <div :class="$style.portrait">
      <img :class="$style.image" :src="getPortrait(character)" alt="" />
      <div :class="$style.talent">
        <template v-for="level in AllTalentLevel" :key="level">
          <img :class="$style.level" :src="getLevelIcon(level)" alt="" />
        </template>
      </div>
    </div>

    <div :class="$style.score">
      <img :class="$style.rank" :src="getRankGradeIcon(history.score)" alt="" />
      <span :class="$style.text">{{ history.score }}</span>
    </div>

    <div :class="$style.identify">
      <div :class="$style.moniker">[{{ t(getMonikerNameKey(character)) }}]</div>
      <div :class="$style.name">{{ t(getCharacterNameKey(character)) }}</div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { useI18n } from "vue-i18n";
import { Character } from "@/data";
import { getPortrait, getRankGradeIcon } from "@/views/logic/resources/images";
import { State } from "@/views/hall-of-fame/logic/dependency";
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

    const { viewData } = State(inject);
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

<style lang="scss" module>
.profile {
  @apply flex gap-x-[0.5rem] px-[0.5rem];
  @apply sm:(px-[0.75rem] my-[0.25rem]);
  @apply md:(px-[1rem] my-[0.5rem]);

  > .portrait {
    @apply relative;

    > .image {
      @apply w-[4rem] h-[4rem];
      @apply sm:(w-[5rem] h-[5rem]);
      @apply md:(w-[7rem] h-[7rem]);
    }

    > .talent {
      @apply absolute inset-x-0 mx-auto bottom-0 flex flex-row-reverse justify-center;
      @apply sm:(bottom-[-0.125rem]);

      > .level {
        @apply w-[1rem] h-[1rem];
        @apply sm:(w-[1.25rem] h-[1.25rem]);
        @apply md:(w-[1.675rem] h-[1.675rem]);

        &:not(:last-child) {
          @apply ml-[-0.25rem];
          @apply sm:(ml-[-0.375rem]);
          @apply md:(ml-[-0.5rem]);
        }
      }
    }
  }

  > .score {
    @apply text-center flex flex-col justify-center;

    > .rank {
      @apply w-[1.875rem] h-[1.875rem];
      @apply sm:(w-[2.5rem] h-[2.5rem]);
      @apply md:(w-[3.5rem] h-[3.5rem]);
    }

    > .text {
      @apply font-bold text-xxs;
      @apply sm:(text-xs);
      @apply md:(text-base);
    }
  }

  > .identify {
    @apply flex-grow font-bold text-center text-xxs flex flex-col justify-center;
    @apply sm:(text-xs);
    @apply md:(text-base);
  }
}
</style>
