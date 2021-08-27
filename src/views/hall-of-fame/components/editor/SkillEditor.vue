<template>
  <section :class="$style.skillEditor">
    <div :class="$style.tools">
      <search-bar
        :class="$style.searchBar"
        v-model="searchQuery"
        :placeholder="
          t('pages.hall-of-fame.editor.skill.search-bar.placeholder')
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
            {{ t("pages.hall-of-fame.editor.skill.filter.description") }}
          </div>

          <div :class="$style.filterContainer">
            <div :class="$style.secondarySelectors">
              <div :class="$style.header">
                {{
                  t(
                    "pages.hall-of-fame.editor.skill.filter.category.general-classification"
                  )
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
                    <span :class="$style.label">
                      {{
                        t(
                          `pages.hall-of-fame.editor.skill.filter.label.${item.type}`
                        )
                      }}
                    </span>
                  </div>
                </template>
              </div>
            </div>

            <div :class="$style.skillTypeSelectors">
              <div :class="$style.header">
                {{
                  t(
                    "pages.hall-of-fame.editor.skill.filter.category.skill-type"
                  )
                }}
              </div>

              <div :class="$style.selectors">
                <template
                  v-for="item in SkillTypeFilterMetadata"
                  :key="item.filterID"
                >
                  <div
                    :class="$style.selector"
                    @click="toggleFilterActive(item)"
                  >
                    <template v-if="isSkillTypeFilter(item)">
                      <div
                        :class="[
                          $style.checkbox,
                          { [$style.checked]: isFilterActive(item) },
                        ]"
                      >
                        <icon-fa-solid-check :class="$style.icon" />
                      </div>
                      <img
                        :class="$style.icon"
                        :src="getSkillTypeIcon(item.skillType)"
                        alt=""
                      />
                    </template>
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
        <div :class="$style.skillListContainer">
          <div :class="$style.pages">
            <pagination v-model="page" :max="maxPage" />
          </div>

          <div :class="$style.skillList">
            <div :class="$style.skills">
              <transition-group
                :name="$style.skill"
                @enter="zoomIn"
                @leave="zoomOut"
              >
                <template
                  v-for="(skill, index) in displaySkillList"
                  :key="skill.skillID"
                >
                  <div
                    :class="[
                      $style.skill,
                      { [$style.marked]: isMarked('upper', skill) },
                    ]"
                    :style="{ gridArea: calcGridArea(index) }"
                    @click="toggleMark('upper', skill)"
                  >
                    <skill-card
                      :skill="skill"
                      :unique="{
                        owner: character,
                        level: metadata.uniqueSkillLevel,
                      }"
                    />
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

        <div :class="$style.acquiredSkillList">
          <div :class="$style.skills">
            <transition-group
              :name="$style.skill"
              @enter="zoomIn"
              @leave="zoomOut"
            >
              <template
                v-for="(skill, index) in acquiredSkillList"
                :key="skill.skillID"
              >
                <div
                  :class="[
                    $style.skill,
                    { [$style.marked]: isMarked('lower', skill) },
                  ]"
                  :style="{ gridArea: calcGridArea(index) }"
                  @click="toggleMark('lower', skill)"
                >
                  <skill-card
                    :skill="skill"
                    :unique="{
                      owner: character,
                      level: metadata.uniqueSkillLevel,
                    }"
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
import { State } from "@/views/hall-of-fame/logic/dependency";
import SearchBar from "@/views/components/widget/SearchBar.vue";
import Pagination from "@/views/components/widget/Pagination.vue";
import SkillCard from "@/views/components/widget/SkillCard.vue";
import { fadeIn, fadeOut, zoomIn, zoomOut } from "@/views/logic/dom/animation";

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
    SearchBar,
    Pagination,
    SkillCard,
  },
  data() {
    return {
      selectInputValueOnFocus,
      getSkillTypeIcon,
      SecondaryFilterMetadata,
      SkillTypeFilterMetadata,
      isSkillTypeFilter,
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

    const _page = ref(1);
    const maxPage = computed<number>(() => {
      return Math.ceil(_filteredSkillList.value.length / 32);
    });

    const displaySkillList = computed<Array<Skill>>(() => {
      return _filteredSkillList.value.slice(
        (_page.value - 1) * 32,
        _page.value * 32
      );
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
@mixin skillList {
  @apply relative grid grid-cols-2 gap-[0.5rem] p-[0.5rem];
  @apply sm:(p-[0.75rem]);
  @apply md:(gap-[0.75rem]);

  > .skill {
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

.skillEditor {
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
              @apply grid grid-cols-2 gap-[0.5rem] pt-[0.5rem];

              > .selector {
                @apply text-center text-xxs flex gap-x-[0.375rem] items-center cursor-pointer;
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
              }
            }
          }

          > .skillTypeSelectors {
            @apply px-[0.5rem];

            > .header {
              @apply text-xxs border-b-1 border-[#d0d0d0];
              @apply sm:(text-xs);
              @apply md:(text-base);
            }

            > .selectors {
              @apply grid grid-cols-3 gap-[0.5rem] pt-[0.5rem];

              > .selector {
                @apply text-xxs flex items-center gap-x-[0.25rem] h-[2rem] cursor-pointer;
                @apply sm:(text-sm gap-x-[0.5rem] h-[2.5rem]);
                @apply md:(text-lg gap-x-[0.75rem] h-[3rem]);

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

                > .icon {
                  @apply w-[2rem] h-[2rem];
                  @apply sm:(w-[2.5rem] h-[2.5rem]);
                  @apply md:(w-[3rem] h-[3rem]);
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

      > .skillListContainer {
        @apply h-[calc(((100%-2rem-(0.5rem*2))/2)+2rem)] overflow-hidden;
        @apply sm:(h-[calc(((100%-2.25rem-(0.75rem*2))/2)+2.5rem)]);
        @apply md:(h-[calc(((100%-2.25rem-(0.75rem*2))/2)+3rem)]);

        > .pages {
          @apply w-full;
        }

        > .skillList {
          @apply h-[calc(100%-2rem)] bg-[#f2f2f2] rounded-md overflow-y-scroll;
          @apply sm:(h-[calc(100%-2.5rem)]);
          @apply md:(h-[calc(100%-3rem)]);

          > .skills {
            @include skillList;
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

      > .acquiredSkillList {
        @apply h-[calc(((100%-2rem-(0.5rem*2))/2)-2rem)] bg-[#f2f2f2] rounded-md overflow-y-scroll;
        @apply sm:(h-[calc(((100%-2.25rem-(0.75rem*2))/2)-2.5rem)]);
        @apply md:(h-[calc(((100%-2.25rem-(0.75rem*2))/2)-3rem)]);

        > .skills {
          @include skillList;
        }
      }
    }
  }
}
</style>
