<template>
  <div class="skill-card" :class="frameType" v-bind="$attrs">
    <div class="content">
      <div class="icon">
        <img :src="skillTypeIcon" alt="" />
      </div>
      <div class="label">{{ t(getNameKey(skill)) }}</div>
      <div class="level" v-if="isOwnUnique && uniqueSkillLevel !== -1">
        {{
          t("components.widget.skill-card.unique-level", { uniqueSkillLevel })
        }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { useI18n } from "vue-i18n";
import { Skill, UniqueSkillLevel, UniqueSkillOwner } from "@/data";
import { getSkillTypeIcon } from "@/views/logic/resources/images";

export default defineComponent({
  props: {
    skill: {
      type: Object as PropType<Skill>,
      required: true,
    },
    owner: {
      type: Object as PropType<UniqueSkillOwner>,
      required: true,
    },
    uniqueSkillLevel: {
      type: Number as PropType<UniqueSkillLevel>,
      default: -1,
    },
  },
  data() {
    return {
      getNameKey: Skill.getNameKey,
    };
  },
  setup(props) {
    const { t } = useI18n();

    const frameType = computed(() => {
      if (props.skill === Skill.getUnique(props.owner)) {
        return "unique";
      }
      return props.skill.advanced ? "advanced" : "standard";
    });
    const skillTypeIcon = computed(() => {
      return getSkillTypeIcon(props.skill.type);
    });
    const isOwnUnique = computed(() => {
      return props.skill === Skill.getUnique(props.owner);
    });

    return {
      t,
      frameType,
      skillTypeIcon,
      isOwnUnique,
    };
  },
});
</script>

<style lang="scss">
.skill-card {
  @apply rounded-md;
  @apply md:(rounded-lg);
  box-shadow: rgba(0, 0, 0, 0.33) 0 1px 1px;
  @screen md {
    box-shadow: rgba(0, 0, 0, 0.33) 0 2px 1px;
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
    @apply font-bold text-[0.5rem] flex items-center rounded-md py-[0.2rem] border-1 border-transparent;
    @apply sm:(py-[0.25rem]);
    @apply md:(text-[0.875rem] rounded-lg border-2);

    > .icon {
      @apply flex-shrink-0 w-[1rem] h-[1rem] ml-[0.2rem];
      @apply sm:(w-[1.375rem] h-[1.375rem] ml-[0.25rem]);
      @apply md:(w-[2rem] h-[2rem] ml-[0.3rem]);
    }

    > .label {
      @include text-overflow-omit;
      @apply flex-1 ml-[0.2rem];
      @apply sm:(ml-[0.25rem]);
    }

    > .level {
      @apply mr-[0.2rem];
      @apply sm:(mr-[0.25rem]);
      @apply md:(mr-[0.3rem]);
    }
  }
}
</style>
