<template>
  <!-- ability editor -->
  <section class="ability-editor-root">
    <!-- ability preview -->
    <div class="ability-preview">
      <template v-for="container in AllAbilityContainer" :key="container.type">
        <div class="ability-generic-term" :data-ability-type="container.type">
          {{ t(`game-system.ability.${container.type}.generic-term`) }}
        </div>
        <div
          class="ability-container"
          :data-ability-type="container.type"
          v-for="ability in container.abilities"
          :key="ability"
          :data-selected="isEditing(ability)"
          @click="setEditing(ability)"
        >
          <div class="ability-name">
            {{ t(`game-system.ability.${container.type}.${ability}`) }}
          </div>
          <img class="ability-value" :src="getGradeIcon(ability)" alt="" />
        </div>
      </template>
    </div>

    <!-- grade selector -->
    <div class="grade-selector">
      <div class="grade-item-group">
        <template v-for="grade in AbilityGrades" :key="grade">
          <div class="grade-item" @click="setAbilityGrade(grade)">
            <img class="grade-image" :src="getAbilityGradeIcon(grade)" alt="" />
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from "vue";
import { AbilityGrade, Ability, AllAbilityContainer } from "@/data";
import { getAbilityGradeIcon } from "@/views/logic/resources/images";
import { Dto } from "@/views/hall-of-fame/logic/db";
import { useI18n } from "vue-i18n";

const AbilityGrades: Array<AbilityGrade> = [
  "s",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
];

const AbilityRotation: Record<Ability, Ability> = {
  turf: "dirt",
  dirt: "short",
  short: "mile",
  mile: "middle",
  middle: "long",
  long: "nige",
  nige: "senko",
  senko: "sashi",
  sashi: "oikomi",
  oikomi: "turf",
};

export default defineComponent({
  props: {
    editData: {
      type: Object as PropType<Dto>,
      required: true,
    },
  },
  data() {
    const { t } = useI18n();
    return {
      getAbilityGradeIcon,
      AllAbilityContainer,
      AbilityGrades,
      t,
    };
  },
  setup(props) {
    const abilityDto = reactive(props.editData.ability);

    const editing = ref<Ability>("turf");
    const setEditing = (ability: Ability) => {
      editing.value = ability;
    };
    const isEditing = (ability: Ability) => {
      return editing.value == ability;
    };
    const rotateEditing = () => {
      setEditing(AbilityRotation[editing.value]);
    };
    const setAbilityGrade = (grade: AbilityGrade) => {
      abilityDto[editing.value] = grade;
      rotateEditing();
    };
    return {
      getGradeIcon: (ability: Ability) =>
        getAbilityGradeIcon(abilityDto[ability]),
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
