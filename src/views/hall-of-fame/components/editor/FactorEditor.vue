<template>
  <section :class="$style.factorEditor">
    <div :class="$style.tools">
      <search-bar
        :class="$style.searchBar"
        v-model="searchQuery"
        :placeholder="
          t('pages.hall-of-fame.editor.factor.search-bar.placeholder')
        "
      />

      <button
        :class="$style.filterButton"
        @click="toggleFilterSettingsActive()"
      >
        <transition :name="$style.icon" @enter="fadeIn" @leave="fadeOut">
          <template v-if="!isFilterSettingsActive">
            <icon-ion-filter :class="$style.icon" />
          </template>
          <template v-else-if="isFilterSettingsActive">
            <icon-ion-close :class="$style.icon" />
          </template>
        </transition>
      </button>
    </div>

    <div :class="$style.content">
      <div :class="$style.filterSettings" v-if="isFilterSettingsActive">
        <div :class="$style.main">
          <div :class="$style.header">
            {{ t("pages.hall-of-fame.editor.factor.filter.description") }}
          </div>

          <div :class="$style.filterContainer">
            <div :class="$style.secondarySelectors">
              <div :class="$style.header">
                {{
                  t("pages.hall-of-fame.editor.factor.filter.category.level")
                }}
              </div>

              <div :class="$style.selectors">
                <template
                  v-for="item in SecondaryFilterMetadata"
                  :key="item.filterID"
                >
                  <div
                    :class="$style.selector"
                    @click="toggleFilterActive(item)"
                  >
                    <div
                      :class="[
                        $style.checkbox,
                        { [$style.checked]: isFilterActive(item) },
                      ]"
                    >
                      <icon-fa-solid-check :class="$style.icon" />
                    </div>
                    <div :class="$style.level" v-if="isLevelFilter(item)">
                      <template
                        v-for="level in getFilterLevel(item)"
                        :key="level"
                      >
                        <img :class="$style.icon" :src="starFill" alt="" />
                      </template>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <div :class="$style.factorTypeSelectors">
              <div :class="$style.header">
                {{
                  t(
                    "pages.hall-of-fame.editor.factor.filter.category.factor-type"
                  )
                }}
              </div>

              <div :class="$style.selectors">
                <template
                  v-for="item in FactorTypeFilterMetadata"
                  :key="item.filterID"
                >
                  <div
                    :class="$style.selector"
                    @click="toggleFilterActive(item)"
                  >
                    <div
                      :class="[
                        $style.checkbox,
                        { [$style.checked]: isFilterActive(item) },
                      ]"
                    >
                      <icon-fa-solid-check :class="$style.icon" />
                    </div>
                    <span :class="$style.label">
                      {{
                        t(
                          `pages.hall-of-fame.editor.factor.filter.label.${item.factorType}`
                        )
                      }}
                    </span>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>

        <div :class="$style.controllers">
          <button :class="$style.controller" @click="setAllFilter(true)">
            {{ t("ui.select-all") }}
          </button>
          <button :class="$style.controller" @click="setAllFilter(false)">
            {{ t("ui.deselect-all") }}
          </button>
        </div>
      </div>

      <div :class="$style.editorContainer" v-else>
        <div :class="$style.factorListContainer">
          <div :class="$style.pages">
            <pagination v-model="page" :max="maxPage" />
          </div>

          <div :class="$style.factorList">
            <div :class="$style.factors">
              <transition-group
                :name="$style.factor"
                @enter="zoomIn"
                @leave="zoomOut"
              >
                <template
                  v-for="(item, index) in displayFactorList"
                  :key="item.hashCode"
                >
                  <div
                    :class="[
                      $style.factor,
                      { [$style.marked]: isMarked('upper', item) },
                    ]"
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

        <div :class="$style.controllers">
          <div :class="$style.button" @click="transferMarkedItems('upper')">
            <div :class="$style.content">
              <icon-ion-arrow-up :class="$style.icon" />
              <span :class="$style.label">{{ t("ui.remove") }}</span>
            </div>
          </div>
          <div :class="$style.button" @click="transferMarkedItems('lower')">
            <div :class="$style.content">
              <icon-ion-arrow-down :class="$style.icon" />
              <span :class="$style.label">{{ t("ui.add") }}</span>
            </div>
          </div>
        </div>

        <div :class="$style.acquiredFactorList">
          <div :class="$style.factors">
            <transition-group
              :name="$style.factor"
              @enter="zoomIn"
              @leave="zoomOut"
            >
              <template
                v-for="(item, index) in expressedFactorList"
                :key="item.hashCode"
              >
                <div
                  :class="[
                    $style.factor,
                    { [$style.marked]: isMarked('lower', item) },
                  ]"
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
import { State } from "@/views/hall-of-fame/logic/dependency";
import FactorCard from "@/views/components/widget/FactorCard.vue";
import starFill from "#/images/level/star-fill.svg";
import { fadeIn, fadeOut, zoomIn, zoomOut } from "@/views/logic/dom/animation";
import SearchBar from "@/views/components/widget/SearchBar.vue";
import Pagination from "@/views/components/widget/Pagination.vue";

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
    SearchBar,
    Pagination,
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
      fadeIn: fadeIn({
        duration: 250,
      }),
      fadeOut: fadeOut({
        duration: 250,
      }),
      zoomIn: zoomIn({
        duration: 250,
      }),
      zoomOut: zoomOut({
        duration: 250,
      }),
    };
  },
  setup() {
    const { t } = useI18n();

    const { editData } = State(inject);
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

    const _page = ref(1);
    const maxPage = computed<number>(() => {
      return Math.ceil(_filteredFactorList.value.length / 32);
    });

    const displayFactorList = computed<Array<FactorItem>>(() => {
      return _filteredFactorList.value.slice(
        (_page.value - 1) * 32,
        _page.value * 32
      );
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
          _page.value = 1;
        } else if (newValue < _page.value) {
          _page.value = newValue;
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
      page: _page,
      maxPage,
      toggleMark,
      isMarked,
      transferMarkedItems,
      calcGridArea,
    };
  },
});
</script>

<style lang="scss" module>
@mixin factorList {
  @apply relative grid grid-cols-2 gap-[0.5rem] p-[0.5rem];
  @apply sm:(p-[0.75rem]);
  @apply md:(gap-[0.75rem]);

  > .factor {
    @apply w-full cursor-pointer;

    &:global(-move) {
      transition: transform 0.5s;
    }

    @include leave-active {
      @apply absolute;
    }

    &.marked {
      @apply rounded-sm ring ring-[#8fd54a];
    }
  }
}

.factorEditor {
  @apply h-full;

  > .tools {
    @apply flex gap-x-[0.5rem] h-[1.75rem] overflow-hidden;
    @apply sm:(h-[2rem]);
    @apply md:(h-[2.5rem]);

    > .searchBar {
      @apply flex-grow;
    }

    > .filterButton {
      @apply rounded-md bg-[#fefefe] border;

      > .icon {
        @apply w-[1.75rem] h-[1.75rem] p-[0.125rem];
        @apply sm:(w-[2rem] h-[2rem] p-[0.25rem]);
        @apply md:(w-[2.5rem] h-[2.5rem] p-[0.375rem]);

        @include leave-active {
          @apply absolute;
        }
      }
    }
  }

  > .content {
    @apply h-[calc(100%-1.75rem-0.5rem)] mt-[0.5rem];
    @apply sm:(h-[calc(100%-2rem-0.75rem)] mt-[0.75rem]);
    @apply md:(h-[calc(100%-2.5rem-1rem)] mt-[1rem]);

    > .filterSettings {
      @apply flex flex-col gap-y-[0.5rem] h-full;
      @apply sm:(gap-y-[0.75rem]);
      @apply md:(gap-y-[1rem]);

      > .main {
        @apply h-[calc(100%-0.5rem-1.5rem)] p-[0.5rem] rounded-md bg-[#f2f2f2];
        @apply sm:(h-[calc(100%-0.75rem-2rem)] p-[0.75rem]);
        @apply md:(h-[calc(100%-1rem-2.5rem)] p-[1rem]);

        > .header {
          @apply text-xxs text-[#8fd54a] h-[0.875rem] border-b-1 border-[#8fd54a];
          @apply sm:(text-xs h-[1rem]);
          @apply md:(text-base h-[1.5rem]);
        }

        > .filterContainer {
          @apply flex flex-col gap-y-[1rem] overflow-y-scroll h-[calc(100%-1rem-0.5rem)] mt-[0.5rem];
          @apply sm:(h-[calc(100%-1rem-0.75rem)] mt-[0.75rem]);
          @apply md:(h-[calc(100%-1rem-1rem)] mt-[1rem]);

          > .secondarySelectors {
            @apply px-[0.5rem];

            > .header {
              @apply text-xxs border-b-1 border-[#d0d0d0];
              @apply sm:(text-xs);
              @apply md:(text-base);
            }

            > .selectors {
              @apply grid grid-cols-2 gap-[0.75rem] pt-[0.5rem];
              @apply sm:(gap-y-[1rem]);

              > .selector {
                @apply text-center text-xxs flex items-center gap-x-[0.375rem] items-center cursor-pointer;
                @apply sm:(text-xs gap-x-[0.5rem]);
                @apply md:(text-base gap-x-[0.75rem]);

                > .checkbox {
                  @apply w-[1rem] h-[1rem] rounded border bg-[#fefefe];
                  @apply sm:(w-[1.5rem] h-[1.5rem]);
                  @apply md:(w-[2rem] h-[2rem] border-2);

                  > .icon {
                    @apply text-[#e0e0e0] w-full h-full p-[0.125rem];
                    @apply sm:(p-[0.2rem]);
                    @apply md:(p-[0.25rem]);
                  }

                  &.checked {
                    > .icon {
                      @apply text-[#8fd54a];
                    }
                  }
                }

                > .level {
                  @apply flex gap-x-[0.125rem];
                  @apply sm:(gap-x-[0.25rem]);

                  > .icon {
                    @apply w-[1.25rem] h-[1.25rem]
                    @apply sm:(w-[1.75rem] h-[1.75rem]);
                    @apply md:(w-[2.25rem] h-[2.25rem]);
                  }
                }
              }
            }
          }

          > .factorTypeSelectors {
            @apply px-[0.5rem];

            > .header {
              @apply text-xxs border-b-1 border-[#d0d0d0];
              @apply sm:(text-xs);
              @apply md:(text-base);
            }

            > .selectors {
              @apply grid grid-cols-2 gap-[0.75rem] pt-[0.5rem];
              @apply sm:(gap-y-[1rem]);

              > .selector {
                @apply text-center text-xs flex gap-x-[0.375rem] items-center cursor-pointer;
                @apply sm:(text-sm gap-x-[0.5rem]);
                @apply md:(text-lg gap-x-[0.75rem]);

                > .checkbox {
                  @apply w-[1rem] h-[1rem] rounded border bg-[#fefefe];
                  @apply sm:(w-[1.5rem] h-[1.5rem]);
                  @apply md:(w-[2rem] h-[2rem] border-2);

                  > .icon {
                    @apply text-[#e0e0e0] w-full h-full p-[0.125rem];
                    @apply sm:(p-[0.2rem]);
                    @apply md:(p-[0.25rem]);
                  }

                  &.checked {
                    > .icon {
                      @apply text-[#8fd54a];
                    }
                  }
                }
              }
            }
          }
        }
      }

      > .controllers {
        @apply flex justify-around gap-x-[1rem];

        > .controller {
          @apply font-bold text-xxs h-[1.5rem] px-[0.5rem] rounded-full border bg-[#fefefe];
          @apply sm:(text-sm h-[2rem] px-[1rem]);
          @apply md:(text-lg h-[2.5rem] px-[1.5rem]);
        }
      }
    }

    > .editorContainer {
      @apply flex flex-col gap-y-[0.5rem] h-full;
      @apply sm:(gap-y-[0.75rem]);
      @apply md:(gap-y-[1rem]);

      > .factorListContainer {
        @apply h-[calc(((100%-2rem-(0.5rem*2))/2)+2rem)] overflow-hidden;
        @apply sm:(h-[calc(((100%-2.25rem-(0.75rem*2))/2)+2.5rem)]);
        @apply md:(h-[calc(((100%-2.25rem-(0.75rem*2))/2)+3rem)]);

        > .pages {
          @apply w-full;
        }

        > .factorList {
          @apply h-[calc(100%-2rem)] bg-[#f2f2f2] rounded-md overflow-y-scroll;
          @apply sm:(h-[calc(100%-2.5rem)]);
          @apply md:(h-[calc(100%-3rem)]);

          > .factors {
            @include factorList;
          }
        }
      }

      > .controllers {
        @apply flex justify-evenly items-center;

        > .button {
          @include button-border;
          @apply h-[2rem] rounded-md cursor-pointer;
          @apply sm:(h-[2.25rem]);
          @apply md:(h-[2.5rem]);

          > .content {
            @include button-content;
            @apply flex items-center px-[0.5rem] rounded-md;
            @apply md:(border-2);

            > .icon {
              @apply w-[1.5rem] h-[1.5rem];
              @apply sm:(w-[1.75rem] h-[1.75rem]);
              @apply md:(w-[2rem] h-[2rem]);
            }

            > .label {
              @apply font-bold text-sm px-[0.5rem];
              @apply sm:(text-base);
              @apply md:(text-lg);
            }
          }
        }
      }

      > .acquiredFactorList {
        @apply h-[calc(((100%-2rem-(0.5rem*2))/2)-2rem)] bg-[#f2f2f2] rounded-md overflow-y-scroll;
        @apply sm:(h-[calc(((100%-2.25rem-(0.75rem*2))/2)-2.5rem)]);
        @apply md:(h-[calc(((100%-2.25rem-(0.75rem*2))/2)-3rem)]);

        > .factors {
          @include factorList;
        }
      }
    }
  }
}
</style>
