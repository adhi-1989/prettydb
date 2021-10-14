<template>
  <section :class="[$style.card, frameType]" v-bind="$attrs">
    <div :class="$style.content">
      <div :class="$style.icon">
        <img :src="skillTypeIcon" alt="" />
      </div>
      <div :class="$style.label">{{ skillName }}</div>
      <div v-if="isOwnUnique" :class="$style.level">
        {{ uniqueSkillLevel }}
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { UniqueSkillLevel, UniqueSkillOwner } from "@/data";
import { defineProps, withDefaults, useCssModule, computed } from "vue";
import { useI18n } from "vue-i18n";
import { Skill } from "@/data";
import { getSkillTypeIcon } from "@/views/_common/logic/resources/images";

type UniqueSkillInfo = {
  owner: UniqueSkillOwner;
  level: UniqueSkillLevel;
};

const props = withDefaults(
  defineProps<{ skill: Skill; unique?: UniqueSkillInfo }>(),
  {
    unique: () => {
      return {
        owner: {
          characterID: -1,
          monikerID: -1,
          talentLevel: 1,
        },
        level: 1,
      };
    },
  }
);

const _style = useCssModule();
const { t } = useI18n();

const skillName = computed(() => {
  return t(Skill.getNameKey(props.skill));
});

const uniqueSkillLevel = computed(() => {
  return t("components.widget.skill-card.unique-level", {
    uniqueSkillLevel: props.unique.level,
  });
});

const isOwnUnique = computed(() => {
  return props.skill === Skill.getUnique(props.unique.owner);
});

const frameType = computed(() => {
  const { standard, advanced, unique } = _style;
  if (isOwnUnique.value) {
    return unique;
  }
  return props.skill.advanced ? advanced : standard;
});

const skillTypeIcon = computed(() => {
  return getSkillTypeIcon(props.skill.type);
});
</script>

<style lang="scss" module>
.card {
  @apply rounded-md;
  box-shadow: 0 1px 1px 0 #b8b6c3;
  @screen md {
    @apply rounded-lg;
    box-shadow: 0 2px 1px 0 #b8b6c3;
  }

  &.standard {
    background: linear-gradient(
      to right,
      #d9cde4,
      #c4c2e5 37%,
      #bcb8df 63%,
      #9895bc
    );

    > .content {
      background: linear-gradient(
        to right,
        #fdf4f4,
        #e4e4f5 37%,
        #dad7ee 63%,
        #b6b5cc
      );
      background-clip: padding-box;
    }
  }

  &.advanced {
    background: linear-gradient(
      to right,
      #fedd72,
      #ffcc48 37%,
      #ffb931 63%,
      #fea613
    );

    > .content {
      background: linear-gradient(
        to right,
        #fefded,
        #ffe992 37%,
        #ffd569 63%,
        #ffc12d
      );
      background-clip: padding-box;
    }
  }

  &.unique {
    background: linear-gradient(
      to right,
      #c3fdbf,
      #99c4fa 37%,
      #af9bfd 63%,
      #fe8bda
    );

    > .content {
      background: linear-gradient(
        to right,
        #f1fed7,
        #bce9fe 37%,
        #ccc9ff 63%,
        #ffbae9
      );
      background-clip: padding-box;
    }
  }

  > .content {
    @include text-stroke(#fefefe);
    @apply relative font-bold text-xxs flex items-center py-[0.125rem] rounded-md border-1 border-transparent;
    @apply sm:(py-[0.25rem] gap-x-[0.25rem]);
    @apply md:(text-xs border-2);

    > .icon {
      @apply flex-shrink-0 w-[1.125rem] h-[1.125rem] ml-[0.2rem];
      @apply sm:(w-[1.25rem] h-[1.25rem]);
      @apply md:(w-[1.75rem] h-[1.75rem]);
    }

    > .label {
      @apply absolute left-[0.5rem] truncate transform scale-75 w-full;
      @apply sm:(static transform-none w-auto);
    }

    > .level {
      @apply absolute right-0 transform scale-75;
      @apply sm:(transform-none right-[0.125rem]);
    }
  }
}
</style>
