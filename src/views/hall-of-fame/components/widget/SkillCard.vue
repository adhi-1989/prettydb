<template>
  <!-- skill -->
  <div
    class="skill-card"
    v-bind="$attrs"
    :data-unique="isOwnUnique"
    :data-advanced="isAdvanced"
  >
    <div class="content">
      <div class="icon">
        <img :src="skillTypeIcon" alt="" />
      </div>
      <div class="label">{{ t(`skill.${skill.skillID}.name`) }}</div>
      <div class="level" v-if="isOwnUnique">
        <!-- TODO: Lv => 国際化したほうがいい？ -->
        Lv{{ character.uniqueSkillLevel }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { CharacterDTO, SkillDTO } from "@/views/hall-of-fame/logic/db";
import { getSkill, getUniqueSkill } from "@/data";
import { useI18n } from "vue-i18n";
import { getSkillTypeIcon } from "@/views/logic/resources/images";

export default defineComponent({
  props: {
    skill: {
      type: Object as PropType<SkillDTO>,
      required: true,
    },
    character: {
      type: Object as PropType<CharacterDTO>,
      required: true,
    },
  },
  data() {
    const { t } = useI18n();
    return {
      t,
    };
  },
  setup(props) {
    const skill = getSkill(props.skill.skillID);
    const skillTypeIcon = computed(() => {
      return getSkillTypeIcon(skill.TYPE);
    });
    const isOwnUnique = computed(() => {
      return skill === getUniqueSkill(props.character);
    });
    const isAdvanced = computed(() => {
      return skill.ADVANCED;
    });
    return {
      skillTypeIcon,
      isOwnUnique,
      isAdvanced,
    };
  },
});
</script>

<style lang="scss">
.skill-card {
  @include text-stroke(#fefefe);
  @apply shadow rounded-md text-[0.5rem];
  background: linear-gradient(
    to right,
    #d9cde4,
    #c4c2e5 37%,
    #bcb8df 63%,
    #9895bc
  );

  > .content {
    @apply flex items-center rounded-md py-[0.25rem];
    border: solid 2px transparent;
    background: linear-gradient(
      to right,
      #fdf4f4,
      #e4e4f5 37%,
      #dad7ee 63%,
      #b6b5cc
    );
    background-clip: padding-box;

    > .icon {
      @apply w-[1.25rem] h-[1.25rem] ml-[0.25rem];
    }

    > .label {
      @include text-overflow-omit;
      @apply font-bold ml-[0.25rem];
    }

    > .level {
      @apply font-bold mr-[0.125rem] hidden;
    }
  }

  &[data-unique="true"] {
    background: linear-gradient(
      to right,
      #c3fdbf,
      #99c4fa 37%,
      #af9bfd 63%,
      #fe8bda
    );

    > .content {
      border: solid 2px transparent;
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

  &[data-advanced="true"] {
    background: linear-gradient(
      to right,
      #fedd72,
      #ffcc48 37%,
      #ffb931 63%,
      #fea613
    );

    > .content {
      border: solid 2px transparent;
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
}

@screen xs {
  .skill-card {
    @apply text-[0.875rem];
    > .content {
      @apply py-[0.25rem];
      > .icon {
        @apply w-[1.75rem] h-[1.75rem];
      }

      > .label {
        @apply ml-[0.5rem];
      }

      > .level {
        @apply mr-[0.25rem];
      }
    }
  }
}
</style>
