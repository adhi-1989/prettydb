<template>
  <section class="factor-editor-root">
    <div class="tools">
      <label class="search-bar" :class="{ disabled: isFilterSettingsActive }">
        <icon-ion-search class="icon" />
        <input
          class="input"
          type="text"
          :placeholder="
            t('pages.hall-of-fame.editor.factor.search-bar.placeholder')
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
            <span class="description">{{
              t("pages.hall-of-fame.editor.factor.filter.description")
            }}</span>
            <hr class="horizontal" />
          </div>

          <div class="filter-selector">
            <div class="secondary-selector-item-group">
              <template
                v-for="item in SecondaryFilterMetadata"
                :key="item.filterID"
              >
                <div class="selector-item" @click="toggleFilterActive(item)">
                  <div
                    class="checkbox"
                    :class="{ checked: isFilterActive(item) }"
                  >
                    <icon-ion-checkmark class="icon" />
                  </div>
                  <template v-if="isLevelFilter(item)">
                    <div class="level">
                      <template
                        v-for="level in getFilterLevel(item)"
                        :key="level"
                      >
                        <img class="icon" :src="starFill" alt="" />
                      </template>
                    </div>
                  </template>
                </div>
              </template>
            </div>
            <div class="factor-type-selector-item-group">
              <template
                v-for="item in FactorTypeFilterMetadata"
                :key="item.filterID"
              >
                <template v-if="isFactorTypeFilter(item)">
                  <div
                    class="selector-item"
                    :class="{ active: isFilterActive(item) }"
                    @click="toggleFilterActive(item)"
                  >
                    <span class="label">
                      {{
                        t(
                          `pages.hall-of-fame.editor.factor.filter.label.${item.factorType}`
                        )
                      }}
                    </span>
                  </div>
                </template>
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
        <div class="factor-list-container">
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

          <div class="factor-list">
            <div class="factor-item-group">
              <transition-group name="factor-item">
                <template
                  v-for="(item, index) in displayFactorList"
                  :key="item.hashCode"
                >
                  <div
                    class="factor-item"
                    :class="{ marked: isMarked('upper', item) }"
                    :style="{ gridArea: calcGridArea(index) }"
                    @click="toggleMark('upper', item)"
                  >
                    <factor-card :factor="item.factor" :level="item.level" />
                  </div>
                </template>
              </transition-group>
            </div>
          </div>
        </div>

        <div class="factor-transfer-controller">
          <div class="transfer-button" @click="transferMarkedItems('upper')">
            <icon-ion-caret-up class="icon" />
            <span class="label">{{ t("ui.remove") }}</span>
          </div>
          <div class="transfer-button" @click="transferMarkedItems('lower')">
            <icon-ion-caret-down class="icon" />
            <span class="label">{{ t("ui.add") }}</span>
          </div>
        </div>

        <div class="expressed-factor-list">
          <div class="factor-item-group">
            <transition-group name="factor-item">
              <template
                v-for="(item, index) in expressedFactorList"
                :key="item.hashCode"
              >
                <div
                  class="factor-item"
                  :class="{ marked: isMarked('lower', item) }"
                  :style="{ gridArea: calcGridArea(index) }"
                  @click="toggleMark('lower', item)"
                >
                  <factor-card :factor="item.factor" :level="item.level" />
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
import { Factor, FactorLevel, FactorType, Skill } from "@/data";
import { numbers, objects } from "@/util";
import _ from "@/util/lodash";
import { selectInputValueOnFocus } from "@/views/logic/dom";
import { FactorDto } from "@/views/hall-of-fame/logic/db";
import {
  fallbackStateFactory,
  stateInjectionKey,
} from "@/views/hall-of-fame/logic/dependency";
import FactorCard from "@/views/components/widget/FactorCard.vue";
import starFill from "#/images/level/star-fill.svg";

type FilterRaw = [number, boolean];
type FilterStore = Array<FilterRaw>;
type FilterIdentify = {
  filterID: number;
};
type Filter = FilterIdentify & {
  active: boolean;
};
type FilterType =
  | "expressible-only"
  | "level-1"
  | "level-2"
  | "level-3"
  | "factor-type";
type FilterMetadataBase = FilterIdentify & {
  type: FilterType;
  default: boolean;
};
type FilterMetadataFactorType = FilterMetadataBase & {
  type: "factor-type";
  factorType: FactorType;
};
type FilterMetadata = FilterMetadataBase | FilterMetadataFactorType;

const filterStore = useStorage<FilterStore>(
  "prettydb/hall-of-fame/factor-filter",
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
    type: "expressible-only",
    default: false,
  },
]);

const SecondaryFilterMetadata: ReadonlyArray<FilterMetadataBase> =
  Object.freeze([
    {
      filterID: 64,
      type: "level-1",
      default: true,
    },
    {
      filterID: 65,
      type: "level-2",
      default: true,
    },
    {
      filterID: 66,
      type: "level-3",
      default: true,
    },
  ]);

const FactorTypeFilterMetadata: ReadonlyArray<FilterMetadataFactorType> =
  Object.freeze(
    Factor.allType.map<FilterMetadataFactorType>((x, index) => {
      return {
        filterID: 128 + index,
        type: "factor-type",
        default: true,
        factorType: x,
      };
    })
  );

const AllFilterMetadata: ReadonlyArray<FilterMetadata> = Object.freeze([
  //...PrimaryFilterMetadata,
  ...SecondaryFilterMetadata,
  ...FactorTypeFilterMetadata,
]);

function filterToMetadata(value: Filter): FilterMetadata {
  return objects.orDefault(
    _.find(AllFilterMetadata, { filterID: value.filterID }),
    () => ({
      filterID: -1,
      type: "expressible-only",
      default: false,
    })
  );
}

function isLevelFilter(filter: FilterMetadata): boolean {
  const types: Array<FilterType> = ["level-1", "level-2", "level-3"];
  return types.includes(filter.type);
}

function getFilterLevel(filter: FilterMetadata): number {
  if (filter.type === "level-1") {
    return 1;
  } else if (filter.type === "level-2") {
    return 2;
  } else if (filter.type === "level-3") {
    return 3;
  }
  return -1;
}

function isFactorTypeFilter(
  filter: FilterMetadata
): filter is FilterMetadataFactorType {
  return filter.type === "factor-type";
}

type FactorItem = {
  factor: Factor;
  level: FactorLevel;
  hashCode: number;
};

type MarkedFactorList = Array<FactorItem>;

type TransferDirection = "upper" | "lower";

const ExclusiveTypes = Object.freeze<FactorType>([
  "status",
  "ability",
  "unique-skill",
]);

export default defineComponent({
  components: {
    FactorCard,
  },
  data() {
    return {
      selectInputValueOnFocus,
      starFill,
      SecondaryFilterMetadata,
      FactorTypeFilterMetadata,
      isLevelFilter,
      getFilterLevel,
      isFactorTypeFilter,
    };
  },
  setup() {
    const { t } = useI18n();

    const { editData } = inject(stateInjectionKey, fallbackStateFactory, true);
    const { character, factors } = editData.value;

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

    const expressedFactorList = computed<Array<FactorItem>>(() => {
      return factors
        .map<FactorItem>((x) => {
          return {
            factor: Factor.get(x),
            level: x.factorLevel,
            hashCode: numbers.hashCode(x.factorID, x.factorLevel),
          };
        })
        .sort((x, y) => {
          return x.factor.sortID - y.factor.sortID;
        });
    });

    const searchQuery = ref("");
    const _factorFilter = computed(() => {
      return (v: FactorItem): boolean => {
        const filters = allFilter()
          .filter((x) => x.active)
          .map(filterToMetadata)
          .filter((x) => x.filterID !== -1);
        //const primary = filters.filter((x) => _.some(PrimaryFilterMetadata, { filterID: x.filterID }));
        const secondary = filters.filter((x) =>
          _.some(SecondaryFilterMetadata, { filterID: x.filterID })
        );
        const factorType = filters.filter((x) =>
          _.some(FactorTypeFilterMetadata, { filterID: x.filterID })
        );
        return (
          _.some(secondary, (x) => {
            if (x.type === "level-1") {
              return v.level === 1;
            } else if (x.type === "level-2") {
              return v.level === 2;
            } else if (x.type === "level-3") {
              return v.level === 3;
            }
            return false;
          }) &&
          _.some(factorType, { factorType: v.factor.type }) &&
          t(Factor.getNameKey(v.factor)).includes(searchQuery.value)
        );
      };
    });
    const _filteredFactorList = computed(() => {
      const uniqueSkill = Skill.getUnique(character);
      const result: Array<FactorItem> = [];

      Factor.all.forEach((x) => {
        const expressed = expressedFactorList.value.filter(
          (y) => y.factor === x
        );
        Factor.allLevel.forEach((y) => {
          if (_.some(expressed, { level: y })) {
            return;
          }
          if (Factor.checkUniqueSkill(x) && x.skillID !== uniqueSkill.skillID) {
            return uniqueSkill.inheritable;
          }
          const item: FactorItem = {
            factor: x,
            level: y,
            hashCode: numbers.hashCode(x.factorID, y),
          };
          if (_factorFilter.value(item)) {
            result.push(item);
          }
        });
      });

      return _.sortBy(result, ["factor.sortID", "level"]);
    });

    const _currentPage = ref(1);

    const displayFactorList = computed<Array<FactorItem>>(() => {
      return _filteredFactorList.value.slice(
        (_currentPage.value - 1) * 32,
        _currentPage.value * 32
      );
    });

    const maxPage = computed<number>(() => {
      return Math.ceil(_filteredFactorList.value.length / 32);
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

    const _markedItems = reactive<Record<TransferDirection, MarkedFactorList>>({
      upper: [],
      lower: [],
    });
    const toggleMark = (direction: TransferDirection, item: FactorItem) => {
      if (direction === "upper") {
        const index = _markedItems.upper.indexOf(item);
        if (index === -1) {
          _.remove(_markedItems.upper, (x) => {
            return ExclusiveTypes.includes(x.factor.type)
              ? x.factor.type === item.factor.type
              : x.factor.factorID === item.factor.factorID;
          });
          _markedItems.upper.push(item);
        } else {
          _markedItems.upper.splice(index, 1);
        }
      } else if (direction === "lower") {
        const index = _markedItems.lower.indexOf(item);
        if (index === -1) {
          _markedItems.lower.push(item);
        } else {
          _markedItems.lower.splice(index, 1);
        }
      }
    };
    const isMarked = (
      direction: TransferDirection,
      item: FactorItem
    ): boolean => {
      if (direction === "upper") {
        return _markedItems.upper.includes(item);
      } else if (direction === "lower") {
        return _markedItems.lower.includes(item);
      }
      return false;
    };
    const transferMarkedItems = (to: TransferDirection) => {
      if (to === "upper") {
        _.remove(factors, (x) => {
          return _.some(
            _markedItems.lower,
            (y) => y.factor.factorID === x.factorID
          );
        });
        _markedItems.lower.splice(0);
      } else if (to === "lower") {
        _markedItems.upper.forEach((x) => {
          _.remove(factors, (y) => {
            const factor = Factor.get(y);
            if (ExclusiveTypes.includes(factor.type)) {
              return factor.type === x.factor.type;
            }
            return y.factorID === x.factor.factorID;
          });
          factors.push(
            FactorDto({
              factorID: x.factor.factorID,
              factorLevel: x.level,
            })
          );
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
      isFilterSettingsActive,
      toggleFilterSettingsActive,
      isFilterActive,
      toggleFilterActive,
      setAllFilter,
      expressedFactorList,
      searchQuery,
      displayFactorList,
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
.factor-editor-root {
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
          @apply sm:(gap-y-[1.5rem] h-[calc(100%-1rem-0.75rem)] mt-[0.75rem]);
          @apply md:(gap-y-[2rem] h-[calc(100%-1rem-1rem)] mt-[1rem]);

          > .secondary-selector-item-group {
            @apply grid grid-cols-3 gap-x-[0.75rem];

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

              > .level {
                @apply flex gap-x-[0.125rem];

                > .icon {
                  @apply w-[1rem] h-[1rem];
                  @apply sm:(w-[1.5rem] h-[1.5rem]);
                }
              }
            }
          }

          > .factor-type-selector-item-group {
            @apply grid grid-cols-3 gap-[0.75rem];

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

      > .factor-list-container {
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

        > .factor-list {
          @apply h-[calc(100%-2rem)] bg-[#f2f2f2] rounded-md overflow-y-scroll;
          @apply sm:(h-[calc(100%-2.5rem)]);
          @apply md:(h-[calc(100%-3rem)]);

          > .factor-item-group {
            @apply relative grid grid-cols-2 gap-x-[0.5rem] gap-y-[0.75rem] p-[0.5rem] pb-[0.75rem];
            @apply sm:(p-[0.75rem]);
            @apply md:(gap-[1rem]);

            > .factor-item {
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

      > .factor-transfer-controller {
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

      > .expressed-factor-list {
        @apply h-[calc(((100%-2rem-(0.5rem*2))/2)-2rem)] bg-[#f2f2f2] rounded-md overflow-y-scroll;
        @apply sm:(h-[calc(((100%-2.25rem-(0.75rem*2))/2)-2.5rem)]);
        @apply md:(h-[calc(((100%-2.25rem-(0.75rem*2))/2)-3rem)]);

        > .factor-item-group {
          @apply relative grid grid-cols-2 gap-x-[0.5rem] gap-y-[0.75rem] p-[0.5rem] pb-[0.75rem];
          @apply sm:(p-[0.75rem]);
          @apply md:(gap-[1rem]);

          > .factor-item {
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
