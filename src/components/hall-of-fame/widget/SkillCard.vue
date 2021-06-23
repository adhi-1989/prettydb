<template>
  <!-- skill -->
  <div
    class="skill-card"
    v-bind="$attrs"
    :data-unique="isOwnUnique"
    :data-advanced="isAdvanced"
  >
    <div class="content">
      <div class="label" v-t="`skill.${skill.skillID}.name`" />
      <div class="level" v-if="isOwnUnique">
        <!-- TODO: Lv => 国際化したほうがいい？ -->
        Lv{{ character.uniqueSkillLevel }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { CharacterDTO, SkillDTO } from "/@/db/hall-of-fame";
import { getSkill, getUniqueSkill } from "/@/data";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "SkillCard",
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
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    return {
      t,
    };
  },
  setup(props) {
    const isOwnUnique = computed(() => {
      return getSkill(props.skill.skillID) === getUniqueSkill(props.character);
    });
    const isAdvanced = computed(() => {
      return getSkill(props.skill.skillID).ADVANCED;
    });
    return {
      isOwnUnique,
      isAdvanced,
    };
  },
});
</script>

<style lang="scss">
.skill-card {
  @include text-stroke;
  @apply shadow rounded-md text-[0.5rem];
  background: linear-gradient(
    to right,
    #d9cde4,
    #c4c2e5 37%,
    #bcb8df 63%,
    #9895bc
  );
  > .content {
    @apply flex justify-between rounded-md py-[0.25rem];
    border: solid 2px transparent;
    background: linear-gradient(
      to right,
      #fdf4f4,
      #e4e4f5 37%,
      #dad7ee 63%,
      #b6b5cc
    );
    background-clip: padding-box;
    > .label {
      @include text-overflow-omit;
      @apply font-bold ml-[0.5rem];
    }
    > .level {
      @apply font-bold mr-[0.125rem];
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
      @apply py-[0.5rem];
      > .level {
        @apply mr-[0.25rem];
      }
    }
  }
}
</style>

<i18n locale="ja" src="/locales/ja/game/skill.json" />
