<template>
  <section class="skill-filter-root">
    <div class="input-container">
      <div class="icon">
        <icon-ion-search />
      </div>
      <input
        class="input"
        type="text"
        v-model="filterQuery"
        @input="updateFilter()"
        @focus="selectInputValueOnFocus"
      />
    </div>
    <div v-if="false">
      <div>すべてオン</div>
      <div>すべてオフ</div>
      <div class="filter-item-group">
        <div
          class="filter-item"
          v-for="type in FilterTypes"
          :key="type"
          :data-checked="isCheckedFilter(type)"
          @click="toggleFilter(type)"
        >
          <div class="checkbox">
            <icon-ion-checkmark />
          </div>
          <span>{{ type }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { SkillDTO } from "@/views/hall-of-fame/logic/db";
import { createNumMap, NumMap } from "@/util";
import { getSkill, SkillType, SkillTypes } from "@/data";
import { selectInputValueOnFocus } from "@/views/logic/dom";
import { useI18n } from "vue-i18n";

const FilterTypes = {
  SKILL_TYPE_BUFF_SPEED: 0,
  SKILL_TYPE_BUFF_ACCELERATION: 1,
  SKILL_TYPE_BUFF_POSITIONING: 2,
  SKILL_TYPE_BUFF_VISION: 3,
  SKILL_TYPE_BUFF_STARTING: 4,
  SKILL_TYPE_DEBUFF_SPEED: 5,
  SKILL_TYPE_DEBUFF_STAMINA: 6,
  SKILL_TYPE_DEBUFF_AGITATION: 7,
  SKILL_TYPE_DEBUFF_CALM: 8,
  SKILL_TYPE_DEBUFF_VISION: 9,
  SKILL_TYPE_RECOVERY_STAMINA: 10,
  SKILL_TYPE_SUPPORT_SPEED: 11,
  SKILL_TYPE_SUPPORT_STAMINA: 12,
  SKILL_TYPE_SUPPORT_POWER: 13,
  SKILL_TYPE_SUPPORT_TENACITY: 14,
  SKILL_TYPE_SUPPORT_GENERAL: 15,
  SKILL_TYPE_SUPPORT_STRATEGY: 16,
  SKILL_TYPE_WEAK_STARTING: 17,
  UNIQUE_SKILL: 128,
  ADVANCED_SKILL: 129,
  STANDARD_SKILL: 130,
} as const;

const filterTypeBySkillType = Object.freeze(
  createNumMap([
    [FilterTypes.SKILL_TYPE_BUFF_SPEED, SkillTypes.BUFF_SPEED],
    [FilterTypes.SKILL_TYPE_BUFF_ACCELERATION, SkillTypes.BUFF_ACCELERATION],
    [FilterTypes.SKILL_TYPE_BUFF_POSITIONING, SkillTypes.BUFF_POSITIONING],
    [FilterTypes.SKILL_TYPE_BUFF_VISION, SkillTypes.BUFF_VISION],
    [FilterTypes.SKILL_TYPE_BUFF_STARTING, SkillTypes.BUFF_STARTING],
    [FilterTypes.SKILL_TYPE_DEBUFF_SPEED, SkillTypes.DEBUFF_SPEED],
    [FilterTypes.SKILL_TYPE_DEBUFF_STAMINA, SkillTypes.DEBUFF_STAMINA],
    [FilterTypes.SKILL_TYPE_DEBUFF_AGITATION, SkillTypes.DEBUFF_AGITATION],
    [FilterTypes.SKILL_TYPE_DEBUFF_CALM, SkillTypes.DEBUFF_CALM],
    [FilterTypes.SKILL_TYPE_DEBUFF_VISION, SkillTypes.DEBUFF_VISION],
    [FilterTypes.SKILL_TYPE_RECOVERY_STAMINA, SkillTypes.RECOVERY_STAMINA],
    [FilterTypes.SKILL_TYPE_SUPPORT_SPEED, SkillTypes.SUPPORT_SPEED],
    [FilterTypes.SKILL_TYPE_SUPPORT_STAMINA, SkillTypes.SUPPORT_STAMINA],
    [FilterTypes.SKILL_TYPE_SUPPORT_POWER, SkillTypes.SUPPORT_POWER],
    [FilterTypes.SKILL_TYPE_SUPPORT_TENACITY, SkillTypes.SUPPORT_TENACITY],
    [FilterTypes.SKILL_TYPE_SUPPORT_GENERAL, SkillTypes.SUPPORT_GENERAL],
    [FilterTypes.SKILL_TYPE_SUPPORT_STRATEGY, SkillTypes.SUPPORT_STRATEGY],
    [FilterTypes.SKILL_TYPE_WEAK_STARTING, SkillTypes.WEAK_STARTING],
  ])
);

type FilterType = typeof FilterTypes[keyof typeof FilterTypes];

function isSkillTypeFilter(type: FilterType): boolean {
  return (
    type >= FilterTypes.SKILL_TYPE_BUFF_SPEED &&
    type <= FilterTypes.SKILL_TYPE_WEAK_STARTING
  );
}

function getSkillType(type: FilterType): SkillType {
  const result = filterTypeBySkillType[type];
  if (result != undefined) {
    return result;
  } else {
    console.warn("Illegal skill type filter: " + type);
    return SkillTypes.BUFF_SPEED;
  }
}

export default defineComponent({
  emits: ["updateFilter"],
  data() {
    return {
      FilterTypes,
      selectInputValueOnFocus,
    };
  },
  setup(props, { emit }) {
    const { t } = useI18n();

    const filterQuery = ref("");
    const checkedFlags = reactive<NumMap<boolean>>({});
    Object.values(FilterTypes).forEach((x) => (checkedFlags[x] = true));

    const isCheckedFilter = (type: FilterType) => {
      return checkedFlags[type];
    };
    const toggleFilter = (type: FilterType) => {
      checkedFlags[type] = !checkedFlags[type];
      updateFilter();
    };
    const updateFilter = () => {
      emit("updateFilter", (skill: SkillDTO) => {
        if (filterQuery.value.length > 0) {
          const name = t(`skill.${skill.skillID}.name`);
          if (!name.includes(filterQuery.value)) {
            return false;
          }
        }
        for (const type of Object.values(FilterTypes)) {
          if (checkedFlags[type]) {
            continue;
          }
          if (isSkillTypeFilter(type)) {
            if (getSkill(skill.skillID).TYPE == getSkillType(type)) {
              return false;
            }
          } else if (type == FilterTypes.UNIQUE_SKILL) {
            if (getSkill(skill.skillID).UNIQUE) {
              return false;
            }
          } else if (type == FilterTypes.ADVANCED_SKILL) {
            if (getSkill(skill.skillID).ADVANCED) {
              return false;
            }
          } else if (type == FilterTypes.STANDARD_SKILL) {
            const s = getSkill(skill.skillID);
            if (!s.UNIQUE && !s.ADVANCED) {
              return false;
            }
          }
        }
        return true;
      });
    };

    return {
      filterQuery,
      updateFilter,
      isCheckedFilter,
      toggleFilter,
    };
  },
});
</script>

<style lang="scss" scoped>
.skill-filter-root {
  > .input-container {
    @apply flex rounded-full bg-[#fefefe] border px-[0.25rem] py-[0.125rem];
    > .icon {
      @apply w-[1.5rem] h-[1.5rem];
    }
    > .input {
      @apply w-full bg-transparent;
    }
  }
  > .filter-item-group {
    @apply grid grid-cols-7 gap-[0.5rem];
    > .filter-item {
      @apply flex gap-x-[0.5rem] items-center bg-[#8fd54a];
      &[data-checked="false"] {
        > .checkbox {
          visibility: hidden;
        }
      }
      > .checkbox {
        @apply w-[1rem] h-[1rem];
      }
    }
  }
}
</style>
