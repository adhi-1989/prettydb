<template>
  <section class="factor-filter-root">
    <div class="input-container">
      <div class="icon">
        <search-icon />
      </div>
      <input class="input" type="text" v-model="filterQuery" @input="updateFilter()" @focus="selectInputValueOnFocus" />
    </div>
    <div v-if="false">
      <div class="filter-item-group">
        <div
          class="filter-item"
          v-for="type in FilterTypes"
          :key="type"
          :data-checked="isCheckedFilter(type)"
          @click="toggleFilter(type)"
        >
          <div class="checkbox">
            <checkmark-icon />
          </div>
          <span>{{ type }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { createNumMap, NumMap } from "/@/util/common";
import { FactorDTO } from "/@/db/hall-of-fame";
import { FactorTypes, getFactor, FactorType } from "/@/data";
import { useI18n } from "vue-i18n";
import { selectInputValueOnFocus } from "/@/util/ui";
import SearchIcon from "/icon/search-sharp.svg?component";
import CheckmarkIcon from "/icon/checkmark.svg?component";

const FilterTypes = {
  STATUS: 0,
  ABILITY: 1,
  UNIQUE_SKILL: 2,
  SKILL: 3,
  RACE: 4,
  SCENARIO: 5,
  LEVEL_1: 128,
  LEVEL_2: 129,
  LEVEL_3: 130,
} as const;

const filterTypeByFactorType = Object.freeze(
  createNumMap([
    [FilterTypes.STATUS, FactorTypes.STATUS],
    [FilterTypes.ABILITY, FactorTypes.ABILITY],
    [FilterTypes.UNIQUE_SKILL, FactorTypes.UNIQUE_SKILL],
    [FilterTypes.SKILL, FactorTypes.SKILL],
    [FilterTypes.RACE, FactorTypes.RACE],
    [FilterTypes.SCENARIO, FactorTypes.SCENARIO],
  ])
);

type FilterType = typeof FilterTypes[keyof typeof FilterTypes];

function isFactorTypeFilter(type: FilterType): boolean {
  return type >= FilterTypes.STATUS && type <= FilterTypes.SCENARIO;
}

function getFactorType(type: FilterType): FactorType {
  const result = filterTypeByFactorType[type];
  if (result != undefined) {
    return result;
  } else {
    console.warn("Illegal factor type filter: " + type);
    return FactorTypes.STATUS;
  }
}

export default defineComponent({
  name: "FactorFilter",
  components: {
    SearchIcon,
    CheckmarkIcon,
  },
  emits: ["updateFilter"],
  data() {
    return {
      FilterTypes,
      selectInputValueOnFocus,
    };
  },
  setup(props, { emit }) {
    const { t } = useI18n({
      useScope: "local",
      inheritLocale: true,
    });

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
      emit("updateFilter", (factor: FactorDTO) => {
        if (filterQuery.value.length > 0) {
          const name = t(`factor.${factor.factorID}.name`);
          if (!name.includes(filterQuery.value)) {
            return false;
          }
        }
        for (const type of Object.values(FilterTypes)) {
          if (checkedFlags[type]) {
            continue;
          }
          if (isFactorTypeFilter(type)) {
            if (getFactor(factor.factorID).TYPE == getFactorType(type)) {
              return false;
            }
          } else if (type == FilterTypes.LEVEL_1) {
            if (factor.factorLevel == 1) {
              return false;
            }
          } else if (type == FilterTypes.LEVEL_2) {
            if (factor.factorLevel == 2) {
              return false;
            }
          } else if (type == FilterTypes.LEVEL_3) {
            if (factor.factorLevel == 3) {
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
.factor-filter-root {
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

<i18n locale="ja" src="/locales/ja/game/factor.json" />
