<template>
  <!-- ability editor -->
  <section class="ability-editor-root">
    <!-- ability preview -->
    <div class="ability-preview">
      <template v-for="ability in AbilityStructure" :key="ability.type">
        <div class="ability-generic-term" :data-ability-type="ability.type">
          {{ t(`game-system.ability.${ability.type}.generic-term`) }}
        </div>
        <div
          class="ability-container"
          :data-ability-type="ability.type"
          v-for="key in ability.values"
          :key="key"
          :data-selected="isEditing(key)"
          @click="setEditing(key)"
        >
          <div class="ability-name">
            {{ t(`game-system.ability.${ability.type}.${key}`) }}
          </div>
          <img class="ability-value" :src="getAbilityGradeIcon(key)" alt="" />
        </div>
      </template>
    </div>

    <!-- grade selector -->
    <div class="grade-selector">
      <div class="grade-item-group">
        <template v-for="grade in AbilityGrades" :key="grade">
          <div class="grade-item" @click="setAbilityGrade(grade)">
            <img
              class="grade-image"
              :src="getAbilityGradeIcon_(grade)"
              alt=""
            />
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from "vue";
import {
  AbilityStructure,
  AbilityKey,
  AbilityGrades,
  AbilityGrade,
  AbilityKeys,
} from "@/data";
import { getAbilityGradeIcon } from "@/views/logic/resources/images";
import { HallOfFameDTO } from "@/views/hall-of-fame/logic/db";
import { useI18n } from "vue-i18n";

export default defineComponent({
  props: {
    editData: {
      type: Object as PropType<HallOfFameDTO>,
      required: true,
    },
  },
  data() {
    const { t } = useI18n();
    return {
      getAbilityGradeIcon_: getAbilityGradeIcon,
      AbilityStructure,
      AbilityGrades: Object.values(AbilityGrades).reverse(),
      t,
    };
  },
  setup(props) {
    const ability = reactive(props.editData.ability);

    const editing = ref<AbilityKey>(AbilityKeys.TURF);
    const setEditing = (key: AbilityKey) => {
      editing.value = key;
    };
    const isEditing = (key: AbilityKey) => {
      return editing.value == key;
    };
    const rotateEditing = () => {
      if (isEditing(AbilityKeys.TURF)) {
        setEditing(AbilityKeys.DIRT);
      } else if (isEditing(AbilityKeys.DIRT)) {
        setEditing(AbilityKeys.SHORT);
      } else if (isEditing(AbilityKeys.SHORT)) {
        setEditing(AbilityKeys.MILE);
      } else if (isEditing(AbilityKeys.MILE)) {
        setEditing(AbilityKeys.MIDDLE);
      } else if (isEditing(AbilityKeys.MIDDLE)) {
        setEditing(AbilityKeys.LONG);
      } else if (isEditing(AbilityKeys.LONG)) {
        setEditing(AbilityKeys.NIGE);
      } else if (isEditing(AbilityKeys.NIGE)) {
        setEditing(AbilityKeys.SENKO);
      } else if (isEditing(AbilityKeys.SENKO)) {
        setEditing(AbilityKeys.SASHI);
      } else if (isEditing(AbilityKeys.SASHI)) {
        setEditing(AbilityKeys.OIKOMI);
      } else {
        setEditing(AbilityKeys.TURF);
      }
    };
    const setAbilityGrade = (grade: AbilityGrade) => {
      ability[editing.value] = grade;
      rotateEditing();
    };
    return {
      getAbilityGradeIcon: (key: AbilityKey) =>
        getAbilityGradeIcon(ability[key]),
      setEditing,
      isEditing,
      rotateEditing,
      setAbilityGrade,
    };
  },
});
</script>

<style lang="scss" scoped>
.ability-editor-root {
  @apply font-bold p-[0.5rem] bg-[#fafafa];
  > .ability-preview {
    @apply grid grid-cols-2 gap-[0.75rem];
    > .ability-generic-term {
      @apply col-span-2 text-[0.875rem];
    }

    > .ability-container {
      @apply flex justify-between items-center border rounded-md shadow-sm p-[0.25rem] bg-[#fefefe] cursor-pointer;
      &[data-selected="true"] {
        @apply ring;
      }

      > .ability-name {
        @apply flex-grow text-center text-[0.75rem];
      }

      > .ability-value {
        @apply w-[1.25rem];
      }
    }
  }

  > .grade-selector {
    @apply mt-[1.5rem] bg-[#f2f2f2] rounded-md;
    > .grade-item-group {
      @apply grid grid-cols-4 gap-[1rem] h-full p-[1rem];
      place-items: center;

      > .grade-item {
        @apply h-[2rem] w-[2rem] p-[0.25rem] bg-[#fefefe] rounded-md cursor-pointer;
      }
    }
  }
}

@screen xs {
  .ability-editor-root {
    > .ability-preview {
      @apply grid grid-cols-4 gap-[1rem];
      > .ability-generic-term {
        @apply col-span-4 text-[1rem];
      }

      > .ability-container {
        > .ability-name {
          @apply text-[0.875rem];
        }

        > .ability-value {
          @apply w-[1.5rem];
        }
      }
    }

    > .grade-selector {
      @apply mt-[2rem];
      > .grade-item-group {
        @apply flex gap-[1rem] justify-between h-full p-[1rem];
        > .grade-item {
          @apply h-[2.5rem] w-[2.5rem] p-[0.25rem];
        }
      }
    }
  }
}
</style>
