<template>
  <section class="skill-editor-root">
    <div class="tools">
      <label class="search-bar" :class="{ disabled: isFilterSettingsActive }">
        <icon-ion-search class="icon" />
        <input
          class="input"
          type="text"
          :placeholder="
            t('pages.hall-of-fame.editor.skill.search-bar.placeholder')
          "
          v-model="searchQuery"
          @focus="selectInputValueOnFocus"
          :disabled="isFilterSettingsActive"
        />
      </label>

      <button class="filter-button" @click="toggleFilterSettingsActive()">
        <transition name="fade">
          <template v-if="!isFilterSettingsActive">
            <icon-ion-filter class="icon" />
          </template>
          <template v-else-if="isFilterSettingsActive">
            <icon-ion-close class="icon" />
          </template>
        </transition>
      </button>
    </div>

    <div class="content">
      <div class="filter-settings-container" v-if="isFilterSettingsActive">
        <div class="main">
          <div class="header">
            <span class="description">
              {{ t("pages.hall-of-fame.editor.skill.filter.description") }}
            </span>
            <hr class="horizontal" />
          </div>

          <div class="filter-selector">
            <div class="secondary-selector-item-group">
              <template
                v-for="item in SecondaryFilterMetadata"
                :key="item.filterID"
              >
                <div
                  class="selector-item"
                  :class="{ active: isFilterActive(item) }"
                  @click="toggleFilterActive(item)"
                >
                  <span class="label">
                    {{
                      t(
                        `pages.hall-of-fame.editor.skill.filter.label.${item.type}`
                      )
                    }}
                  </span>
                </div>
              </template>
            </div>
            <div class="skill-type-selector-item-group">
              <template
                v-for="item in SkillTypeFilterMetadata"
                :key="item.filterID"
              >
                <div class="selector-item" @click="toggleFilterActive(item)">
                  <div
                    class="checkbox"
                    :class="{ checked: isFilterActive(item) }"
                  >
                    <icon-ion-checkmark class="icon" />
                  </div>
                  <template v-if="isSkillTypeFilter(item)">
                    <img
                      class="icon"
                      :src="getSkillTypeIcon(item.skillType)"
                      alt=""
                    />
                  </template>
                </div>
              </template>
            </div>
          </div>
        </div>

        <div class="controller-container">
          <button class="controller" @click="setAllFilter(true)">
            {{ t("ui.select-all") }}
          </button>
          <button class="controller" @click="setAllFilter(false)">
            {{ t("ui.deselect-all") }}
          </button>
        </div>
      </div>

      <div class="editor-container" v-else>
        <div class="skill-list-container">
          <div class="navigation">
            <div class="button-container" @click="movePage(-1)">
              <icon-ion-caret-back class="transition-button" />
            </div>
            <div class="pages">
              <template v-for="page in pages" :key="page">
                <div
                  class="page"
                  :class="pageClass(page)"
                  @click="setPage(page)"
                >
                  {{ page }}
                </div>
              </template>
            </div>
            <div class="button-container" @click="movePage(1)">
              <icon-ion-caret-forward class="transition-button" />
            </div>
          </div>

          <div class="skill-list">
            <div class="skill-item-group">
              <transition-group name="skill-item">
                <template
                  v-for="(skill, index) in displaySkillList"
                  :key="skill.skillID"
                >
                  <div
                    class="skill-item"
                    :class="{ marked: isMarked('upper', skill) }"
                    :style="{ gridArea: calcGridArea(index) }"
                    @click="toggleMark('upper', skill)"
                  >
                    <skill-card
                      :skill="skill"
                      :owner="character"
                      :unique-skill-level="metadata.uniqueSkillLevel"
                    />
                  </div>
                </template>
              </transition-group>
            </div>
          </div>
        </div>

        <div class="skill-transfer-controller">
          <div class="transfer-button" @click="transferMarkedItems('upper')">
            <icon-ion-caret-up class="icon" />
            <span class="label">{{ t("ui.remove") }}</span>
          </div>
          <div class="transfer-button" @click="transferMarkedItems('lower')">
            <icon-ion-caret-down class="icon" />
            <span class="label">{{ t("ui.add") }}</span>
          </div>
        </div>

        <div class="acquired-skill-list">
          <div class="skill-item-group">
            <transition-group name="skill-item">
              <template
                v-for="(skill, index) in acquiredSkillList"
                :key="skill.skillID"
              >
                <div
                  class="skill-item"
                  :class="{ marked: isMarked('lower', skill) }"
                  :style="{ gridArea: calcGridArea(index) }"
                  @click="toggleMark('lower', skill)"
                >
                  <skill-card
                    :skill="skill"
                    :owner="character"
                    :unique-skill-level="metadata.uniqueSkillLevel"
                  />
                </div>
              </template>
            </transition-group>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  reactive,
  readonly,
  ref,
  watch,
} from "vue";
import { useStorage, useToggle } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { Skill, SkillType } from "@/data";
import { objects } from "@/util";
import _ from "@/util/lodash";
import { selectInputValueOnFocus } from "@/views/logic/dom";
import { getSkillTypeIcon } from "@/views/logic/resources/images";
import { SkillDto } from "@/views/hall-of-fame/logic/db";
import {
  fallbackStateFactory,
  stateInjectionKey,
} from "@/views/hall-of-fame/logic/dependency";
import SkillCard from "@/views/components/widget/SkillCard.vue";

type FilterRaw = [number, boolean];
type FilterStore = Array<FilterRaw>;
type FilterIdentify = {
  filterID: number;
};
type Filter = FilterIdentify & {
  active: boolean;
};
type FilterType =
  | "learnable-only"
  | "unique"
  | "advanced"
  | "standard"
  | "skill-type";
type FilterMetadataBase = FilterIdentify & {
  type: FilterType;
  default: boolean;
};
type FilterMetadataSkillType = FilterMetadataBase & {
  type: "skill-type";
  skillType: SkillType;
};
type FilterMetadata = FilterMetadataBase | FilterMetadataSkillType;

const filterStore = useStorage<FilterStore>(
  "prettydb/hall-of-fame/skill-filter",
  []
);

function rawToFilter(value: FilterRaw): Filter {
  return {
    filterID: value[0],
    get active(): boolean {
      return value[1];
    },
    set active(v: boolean) {
      value[1] = v;
    },
  };
}

function allFilter(): Filter[] {
  return filterStore.value.map(rawToFilter);
}

const PrimaryFilterMetadata: ReadonlyArray<FilterMetadataBase> = Object.freeze([
  {
    filterID: 0,
    type: "learnable-only",
    default: false,
  },
]);

const SecondaryFilterMetadata: ReadonlyArray<FilterMetadataBase> =
  Object.freeze([
    {
      filterID: 64,
      type: "standard",
      default: true,
    },
    {
      filterID: 65,
      type: "advanced",
      default: true,
    },
    {
      filterID: 66,
      type: "unique",
      default: true,
    },
  ]);

const SkillTypeFilterMetadata: ReadonlyArray<FilterMetadataSkillType> =
  Object.freeze(
    Skill.allType.map<FilterMetadataSkillType>((x, index) => {
      return {
        filterID: 128 + index,
        type: "skill-type",
        default: true,
        skillType: x,
      };
    })
  );

const AllFilterMetadata: ReadonlyArray<FilterMetadata> = Object.freeze([
  //...PrimaryFilterMetadata,
  ...SecondaryFilterMetadata,
  ...SkillTypeFilterMetadata,
]);

function filterToMetadata(value: Filter): FilterMetadata {
  return objects.orDefault(
    _.find(AllFilterMetadata, { filterID: value.filterID }),
    () => ({
      filterID: -1,
      type: "learnable-only",
      default: false,
    })
  );
}

function isSkillTypeFilter(
  filter: FilterMetadata
): filter is FilterMetadataSkillType {
  return filter.type === "skill-type";
}

type MarkedSkillList = Array<Skill>;

type TransferDirection = "upper" | "lower";

export default defineComponent({
  components: {
    SkillCard,
  },
  data() {
    return {
      selectInputValueOnFocus,
      getSkillTypeIcon,
      SecondaryFilterMetadata,
      SkillTypeFilterMetadata,
      isSkillTypeFilter,
    };
  },
  setup() {
    const { t } = useI18n();

    const { editData } = inject(stateInjectionKey, fallbackStateFactory, true);
    const { character, skills, metadata } = editData.value;

    const [isFilterSettingsActive, toggleFilterSettingsActive] = useToggle();
    const isFilterActive = (identify: FilterIdentify): boolean => {
      return _.some(allFilter(), { active: true, filterID: identify.filterID });
    };
    const toggleFilterActive = (identify: FilterIdentify) => {
      const filter = objects.orDefault(
        _.find(allFilter(), { filterID: identify.filterID }),
        () => ({
          filterID: -1,
          active: false,
        })
      );
      filter.active = !filter.active;
    };
    const setAllFilter = (active: boolean) => {
      allFilter().forEach((x) => {
        x.active = active;
      });
    };

    const _uniqueSkill = Skill.getUnique(character);
    const acquiredSkillList = computed<Array<Skill>>(() => {
      return skills.map(Skill.get).sort((x, y) => {
        if (x === _uniqueSkill) {
          return -1;
        } else if (y === _uniqueSkill) {
          return 1;
        }
        return x.sortID - y.sortID;
      });
    });

    const searchQuery = ref("");
    const _skillFilter = computed(() => {
      return (v: Skill): boolean => {
        const filters = allFilter()
          .filter((x) => x.active)
          .map(filterToMetadata)
          .filter((x) => x.filterID !== -1);
        //const primary = filters.filter((x) => _.some(PrimaryFilterMetadata, { filterID: x.filterID }));
        const secondary = filters.filter((x) =>
          _.some(SecondaryFilterMetadata, { filterID: x.filterID })
        );
        const skillType = filters.filter((x) =>
          _.some(SkillTypeFilterMetadata, { filterID: x.filterID })
        );
        return (
          _.some(secondary, (x) => {
            if (x.type === "unique") {
              return v.unique;
            } else if (x.type === "advanced") {
              return v.advanced;
            } else if (x.type === "standard") {
              return !v.unique && !v.advanced;
            }
            return false;
          }) &&
          _.some(skillType, { skillType: v.type }) &&
          t(Skill.getNameKey(v)).includes(searchQuery.value)
        );
      };
    });
    const _filteredSkillList = computed(() => {
      return Skill.all
        .filter((x) => !acquiredSkillList.value.includes(x))
        .filter((x) => (Skill.checkUnique(x) ? x.inheritable : true))
        .filter(_skillFilter.value);
    });

    const _currentPage = ref(1);

    const displaySkillList = computed<Array<Skill>>(() => {
      return _filteredSkillList.value.slice(
        (_currentPage.value - 1) * 32,
        _currentPage.value * 32
      );
    });

    const maxPage = computed<number>(() => {
      return Math.ceil(_filteredSkillList.value.length / 32);
    });
    const setPage = (page: number | string) => {
      if (_.isNumber(page)) {
        _currentPage.value = page;
      }
    };
    const movePage = (n: number) => {
      setPage(_.clamp(_currentPage.value + n, 1, maxPage.value));
    };
    const pageClass = (page: number | string) => {
      return {
        button: _.isNumber(page),
        selected: _currentPage.value === page,
      };
    };
    const pages = computed<Array<number | string>>(() => {
      const max = maxPage.value;
      if (max <= 1) {
        return max === 1 ? [1] : [];
      } else if (max < 6) {
        return _.range(1, max + 1);
      }
      const page = _currentPage.value;
      if (page <= 4) {
        return [1, 2, 3, 4, 5, "...", max];
      } else if (page > 4 && page <= max - 4) {
        return [1, "...", page - 1, page, page + 1, "...", max];
      } else {
        return [
          1,
          "...",
          maxPage.value - 4,
          maxPage.value - 3,
          maxPage.value - 2,
          maxPage.value - 1,
          maxPage.value,
        ];
      }
    });

    const _markedItems = reactive<Record<TransferDirection, MarkedSkillList>>({
      upper: [],
      lower: [],
    });
    const toggleMark = (direction: TransferDirection, skill: Skill) => {
      if (direction === "upper") {
        const index = _markedItems.upper.indexOf(skill);
        if (index === -1) {
          if (_.isNumber(skill.conflictID)) {
            _.remove(_markedItems.upper, (x) => {
              return _.isNumber(x.conflictID)
                ? x.conflictID === skill.conflictID
                : false;
            });
          }
          _markedItems.upper.push(skill);
        } else {
          _markedItems.upper.splice(index, 1);
        }
      } else if (direction === "lower") {
        const index = _markedItems.lower.indexOf(skill);
        if (index === -1) {
          if (skill !== _uniqueSkill) {
            _markedItems.lower.push(skill);
          }
        } else {
          _markedItems.lower.splice(index, 1);
        }
      }
    };
    const isMarked = (direction: TransferDirection, skill: Skill): boolean => {
      if (direction === "upper") {
        return _markedItems.upper.includes(skill);
      } else if (direction === "lower") {
        return _markedItems.lower.includes(skill);
      }
      return false;
    };
    const transferMarkedItems = (to: TransferDirection) => {
      if (to === "upper") {
        _.remove(skills, (x) =>
          _.some(_markedItems.lower, { skillID: x.skillID })
        );
        _markedItems.lower.splice(0);
      } else if (to === "lower") {
        _markedItems.upper.forEach((x) => {
          if (_.isNumber(x.conflictID)) {
            _.remove(skills, (y) => {
              const skill = Skill.get(y);
              return (
                _.isNumber(skill.conflictID) &&
                skill.conflictID === x.conflictID
              );
            });
          }
          skills.push(SkillDto(x));
        });
        _markedItems.upper.splice(0);
      }
    };
    const calcGridArea = (i: number): string => {
      const row = Math.floor(i / 2) + 1;
      const col = (i % 2) + 1;
      return `${row} / ${col}`;
    };

    watch(
      () => maxPage.value,
      (newValue, oldValue) => {
        if (oldValue === 0 && oldValue !== newValue) {
          _currentPage.value = 1;
        } else if (newValue < _currentPage.value) {
          _currentPage.value = newValue;
        }
      }
    );

    onMounted(() => {
      AllFilterMetadata.forEach((x) => {
        const { filterID } = x;
        if (!_.some(allFilter(), { filterID })) {
          filterStore.value.push([filterID, x.default]);
        }
      });
      _.remove(
        filterStore.value,
        (x) => !_.some(AllFilterMetadata, { filterID: x[0] })
      );
    });

    return {
      t,
      character: readonly(character),
      metadata: readonly(metadata),
      searchQuery,
      isFilterSettingsActive,
      toggleFilterSettingsActive,
      isFilterActive,
      toggleFilterActive,
      setAllFilter,
      acquiredSkillList,
      displaySkillList,
      maxPage,
      setPage,
      movePage,
      pageClass,
      pages,
      toggleMark,
      isMarked,
      transferMarkedItems,
      calcGridArea,
    };
  },
});
</script>

<style lang="scss">
.skill-editor-root {
  @apply h-full;

  > .tools {
    @apply flex gap-x-[0.5rem] overflow-hidden h-[1.75rem];
    @apply sm:(h-[2rem]);
    @apply md:(h-[2.5rem]);

    > .search-bar {
      @apply flex-grow flex gap-x-[0.5rem] items-center h-[1.75rem] rounded-md bg-[#fefefe] border;
      @apply sm:(h-[2rem]);
      @apply md:(h-[2.5rem]);

      > .icon {
        @apply w-[1.75rem] h-[1.75rem] p-[0.25rem];
        @apply sm:(w-[2rem] h-[2rem] p-[0.375rem]);
        @apply md:(w-[2.5rem] h-[2.5rem]);
      }

      > .input {
        @apply flex-grow bg-transparent;
        @apply md:(text-[1.25rem]);
      }

      &.disabled {
        @apply bg-[#e0e0e0];
      }
    }

    > .filter-button {
      @apply w-[1.75rem] h-[1.75rem];
      @apply sm:(w-[2rem] h-[2rem]);
      @apply md:(w-[2.5rem] h-[2.5rem]);

      > .icon {
        @apply w-full h-full p-[0.125rem];
        @apply sm:(p-[0.25rem]);
        @apply md:(p-[0.375rem]);
      }
    }
  }

  > .content {
    @apply h-[calc(100%-1.75rem-0.5rem)] mt-[0.5rem];
    @apply sm:(h-[calc(100%-2rem-0.75rem)] mt-[0.75rem]);
    @apply md:(h-[calc(100%-2.5rem-1rem)] mt-[1rem]);

    > .filter-settings-container {
      @apply flex flex-col gap-y-[0.5rem] h-full;
      @apply sm:(gap-y-[0.75rem]);
      @apply md:(gap-y-[1rem]);

      > .main {
        @apply h-[calc(100%-0.5rem-1.5rem)] p-[0.5rem] rounded-md bg-[#f2f2f2];
        @apply sm:(h-[calc(100%-0.75rem-1.75rem)] p-[0.75rem]);
        @apply md:(h-[calc(100%-1rem-2rem)] p-[1rem]);

        > .header {
          @apply flex items-center gap-x-[0.375rem] h-[1rem];
          @apply sm:(gap-x-[0.5rem]);
          @apply md:(gap-x-[0.75rem]);

          > .description {
            @apply text-[0.5rem];
            @apply sm:(text-[0.75rem]);
            @apply md:(text-[1rem]);
          }

          > .horizontal {
            @apply flex-grow border-[#d2d2d2];
          }
        }

        > .filter-selector {
          @apply flex flex-col gap-y-[1rem] overflow-y-scroll h-[calc(100%-1rem-0.5rem)] mt-[0.5rem];
          @apply sm:(h-[calc(100%-1rem-0.75rem)] mt-[0.75rem]);
          @apply md:(h-[calc(100%-1rem-1rem)] mt-[1rem]);

          > .secondary-selector-item-group {
            @apply grid grid-cols-3 gap-x-[0.75rem];

            > .selector-item {
              @apply text-center text-[0.75rem] py-[0.25rem] bg-[#fafafa] rounded-md border cursor-pointer;
              @apply sm:(py-[0.5rem]);
              @apply md:(text-[1rem]);

              &.active {
                @apply bg-[#8fd54a] border-[#8fd54a];

                > .label {
                  @apply text-[#fafafa];
                }
              }

              &:not(.active):hover {
                @apply border-[#8fd54a];
              }
            }
          }

          > .skill-type-selector-item-group {
            @apply grid grid-cols-4 gap-y-[1rem] pt-[0.25rem];
            @apply sm:(gap-y-[0.75rem]);
            @apply md:(gap-y-[1rem]);

            > .selector-item {
              @apply flex items-center gap-x-[0.25rem] cursor-pointer;

              > .checkbox {
                @apply border rounded-md w-[1rem] h-[1rem] bg-gradient-to-t from-[#7fbf3cff] via-[#90ca3fff] to-[#a2d543ff] text-[#fafafa];
                @apply md:(w-[1.5rem] h-[1.5rem]);

                > .icon {
                  @apply invisible w-full h-full p-[0.0625rem];
                }

                &.checked {
                  > .icon {
                    @apply visible;
                  }
                }
              }

              > .icon {
                @apply w-[2rem] h-[2rem];
                @apply sm:(w-[2.5rem] h-[2.5rem]);
                @apply md:(w-[3rem] h-[3rem]);
              }
            }
          }
        }
      }

      > .controller-container {
        @apply flex gap-x-[1rem] h-[1.5rem];
        @apply sm:(h-[1.75rem]);
        @apply md:(h-[2rem]);

        > .controller {
          @apply font-bold text-[0.5rem] px-[0.5rem];
          @apply sm:(text-[0.75rem]);
          @apply md:(font-bold text-[1rem] px-[1rem] py-[0.5rem]);
        }
      }
    }

    > .editor-container {
      @apply flex flex-col gap-y-[0.5rem] h-full;
      @apply sm:(gap-y-[0.75rem]);
      @apply md:(gap-y-[1rem]);

      > .skill-list-container {
        @apply h-[calc(((100%-2rem-(0.5rem*2))/2)+2rem)] overflow-hidden;
        @apply sm:(h-[calc(((100%-2.25rem-(0.75rem*2))/2)+2.5rem)]);
        @apply md:(h-[calc(((100%-2.25rem-(0.75rem*2))/2)+3rem)]);

        > .navigation {
          @apply flex justify-between items-center h-[2rem];
          @apply sm:(h-[2.5rem]);
          @apply md:(h-[3rem]);

          > .button-container {
            @apply cursor-pointer;

            > .transition-button {
              @apply w-[1.5rem] h-[1.5rem];
              @apply sm:(w-[1.75rem] h-[1.75rem]);
              @apply md:(w-[2rem] h-[2rem]);
            }
          }

          > .pages {
            @apply flex-1 flex justify-evenly;

            > .page {
              @apply flex justify-center items-center w-[1.25rem] h-[1.25rem] rounded-md;
              @apply sm:(text-[1.125rem] w-[1.5rem] h-[1.5rem]);
              @apply md:(text-[1.25rem] w-[1.75rem] h-[1.75rem]);

              &.button {
                @apply cursor-pointer;

                &:not(.selected):hover {
                  @apply border;
                }
              }

              &.selected {
                @apply bg-[#c0c0c0] text-[#fafafa];
              }
            }
          }
        }

        > .skill-list {
          @apply h-[calc(100%-2rem)] bg-[#f2f2f2] rounded-md overflow-y-scroll;
          @apply sm:(h-[calc(100%-2.5rem)]);
          @apply md:(h-[calc(100%-3rem)]);

          > .skill-item-group {
            @apply relative grid grid-cols-2 gap-[0.5rem] p-[0.5rem];
            @apply sm:(p-[0.75rem]);
            @apply md:(gap-[0.75rem]);

            > .skill-item {
              @apply cursor-pointer;

              &-move {
                transition: transform 0.5s;
              }

              &-enter-active {
                animation: zoomIn;
                animation-duration: 0.5s;
              }

              &-leave-active {
                @apply absolute;
                animation: zoomOut;
                animation-duration: 0.5s;
              }

              &.marked {
                @apply ring rounded-sm;
              }
            }
          }
        }
      }

      > .skill-transfer-controller {
        @apply flex justify-evenly items-center h-[2rem];
        @apply sm:(h-[2.25rem]);
        @apply md:(h-[2.5rem]);

        > .transfer-button {
          @include button-gradient;
          @apply flex justify-evenly items-center px-[0.5rem] py-[0.125rem] rounded-md border cursor-pointer;

          > .icon {
            @apply w-[1.5rem] h-[1.5rem];
            @apply sm:(w-[1.75rem] h-[1.75rem]);
            @apply md:(w-[2rem] h-[2rem]);
          }

          > .label {
            @apply font-bold text-[0.875rem] px-[0.5rem];
            @apply sm:(text-[1rem]);
            @apply md:(text-[1.125rem]);
          }
        }
      }

      > .acquired-skill-list {
        @apply h-[calc(((100%-2rem-(0.5rem*2))/2)-2rem)] bg-[#f2f2f2] rounded-md overflow-y-scroll;
        @apply sm:(h-[calc(((100%-2.25rem-(0.75rem*2))/2)-2.5rem)]);
        @apply md:(h-[calc(((100%-2.25rem-(0.75rem*2))/2)-3rem)]);

        > .skill-item-group {
          @apply relative grid grid-cols-2 gap-[0.5rem] p-[0.5rem];
          @apply sm:(p-[0.75rem]);
          @apply md:(gap-[0.75rem]);

          > .skill-item {
            @apply cursor-pointer;

            &-move {
              transition: transform 0.5s;
            }

            &-enter-active {
              animation: zoomIn;
              animation-duration: 0.5s;
            }

            &-leave-active {
              @apply absolute;
              animation: zoomOut;
              animation-duration: 0.5s;
            }

            &.marked {
              @apply ring rounded-sm;
            }
          }
        }
      }
    }
  }
}
</style>
