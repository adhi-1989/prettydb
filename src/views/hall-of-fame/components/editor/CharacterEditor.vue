<template>
  <section :class="$style.characterEditor">
    <div :class="$style.tools">
      <search-bar
        :class="$style.searchBar"
        v-model="searchQuery"
        :placeholder="
          t('pages.hall-of-fame.editor.character.search-bar.placeholder')
        "
      />

      <div :class="$style.filterButton" @click="toggleFilterSettingsActive()">
        <transition :name="$style.icon" @enter="fadeIn" @leave="fadeOut">
          <template v-if="!isFilterSettingsActive">
            <icon-ion-filter :class="$style.icon" />
          </template>
          <template v-else-if="isFilterSettingsActive">
            <icon-ion-close :class="$style.icon" />
          </template>
        </transition>
      </div>
    </div>

    <div :class="$style.content">
      <div :class="$style.filterSettings" v-if="isFilterSettingsActive">
        <div :class="$style.main">
          <div :class="$style.header">
            {{ t("pages.hall-of-fame.editor.character.filter.description") }}
          </div>

          <div :class="$style.main">
            <div :class="$style.selectors">
              <template
                v-for="item in allFilterItems"
                :key="hashCode(item.characterID, item.monikerID)"
              >
                <div :class="$style.selector" @click="toggleFilterActive(item)">
                  <div
                    :class="[
                      $style.checkbox,
                      { [$style.checked]: isFilterActive(item) },
                    ]"
                  >
                    <icon-fa-solid-check :class="$style.icon" />
                  </div>
                  <span :class="$style.label">
                    {{ filterItemName(item) }}
                  </span>
                </div>
              </template>
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

      <div :class="$style.editors" v-else>
        <div :class="$style.character">
          <div :class="$style.container">
            <div :class="$style.selectors">
              <template
                v-for="identify in characters"
                :key="identify.characterID"
              >
                <div
                  :class="[
                    $style.selector,
                    { [$style.selected]: isCharacterSelected(identify) },
                  ]"
                  @click="setCharacter(identify)"
                >
                  <span>{{ t(getCharacterNameKey(identify)) }}</span>
                </div>
              </template>
            </div>
          </div>
        </div>

        <div :class="$style.moniker">
          <div :class="$style.container">
            <div :class="$style.selectors">
              <template v-for="identify in monikers" :key="identify.monikerID">
                <div
                  :class="[
                    $style.selector,
                    { [$style.selected]: isMonikerSelected(identify) },
                  ]"
                  @click="setMonikerID(identify)"
                >
                  {{ t(getMonikerNameKey(identify)) }}
                </div>
              </template>
            </div>
          </div>
        </div>

        <div :class="$style.level">
          <div :class="$style.label">
            {{
              t(
                "pages.hall-of-fame.editor.character.level-selector.label.talent-level"
              )
            }}
          </div>
          <div :class="$style.selectors">
            <div
              :class="$style.selector"
              v-for="level in AllTalentLevel"
              :key="level"
              @click="setTalentLevel(level)"
            >
              <img
                :class="$style.icon"
                :src="getTalentLevelIcon(level)"
                alt=""
              />
            </div>
          </div>

          <div :class="$style.label">
            {{
              t(
                "pages.hall-of-fame.editor.character.level-selector.label.awakening-level"
              )
            }}
          </div>
          <div :class="$style.selectors">
            <div
              :class="$style.selector"
              v-for="level in AllAwakeningLevel"
              :key="level"
              @click="setAwakeningLevel(level)"
            >
              <img
                :class="$style.icon"
                :src="getAwakeningLevelIcon(level)"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref, watch } from "vue";
import { useStorage, useToggle } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import {
  AwakeningLevel,
  Character,
  CharacterIdentify,
  MonikerIdentify,
  Skill,
  TalentLevel,
} from "@/data";
import { numbers, objects } from "@/util";
import _ from "@/util/lodash";
import { selectInputValueOnFocus } from "@/views/_common/logic/dom";
import { fadeIn, fadeOut } from "@/views/_common/logic/dom/animation";
import { CharacterDto, SkillDto } from "@/views/hall-of-fame/logic/db";
import { State } from "@/views/hall-of-fame/logic/dependency";
import SearchBar from "@/views/_common/components/widget/SearchBar.vue";
import starFill from "#/images/level/star-fill.svg";
import starEmpty from "#/images/level/star-empty.svg";

type FilterRaw = [number, number, boolean];
type FilterStore = Array<FilterRaw>;
type Filter = MonikerIdentify & {
  active: boolean;
};

function rawToFilter(value: FilterRaw): Filter {
  return {
    characterID: value[0],
    monikerID: value[1],
    get active(): boolean {
      return value[2];
    },
    set active(v: boolean) {
      value[2] = v;
    },
  };
}

const filterStore = useStorage<FilterStore>(
  "prettydb/hall-of-fame/character-filter",
  []
);

const allFilter = () => filterStore.value.map(rawToFilter);

export default defineComponent({
  components: {
    SearchBar,
  },
  data() {
    const { hashCode } = numbers;

    return {
      AllAwakeningLevel: Character.allAwakeningLevel,
      AllTalentLevel: Character.allTalentLevel,
      getCharacterNameKey: Character.getNameKey,
      getMonikerNameKey: Character.getMonikerNameKey,
      hashCode,
      selectInputValueOnFocus,
      fadeIn: fadeIn({
        duration: 250,
      }),
      fadeOut: fadeOut({
        duration: 250,
      }),
    };
  },
  setup() {
    const { t } = useI18n();

    const { editData } = State(inject);
    const { character, skills } = editData.value;

    const searchQuery = ref("");
    const allFilterItems = computed(() => {
      return Character.allMoniker.filter((x) => {
        const query = searchQuery.value;
        return (
          t(Character.getNameKey(x)).includes(query) ||
          t(Character.getMonikerNameKey(x)).includes(query)
        );
      });
    });

    const filterItemName = (identify: MonikerIdentify): string => {
      const characterName = t(Character.getNameKey(identify));
      const monikerName = t(Character.getMonikerNameKey(identify));
      return `${characterName} [${monikerName}]`;
    };

    const [isFilterSettingsActive, toggleFilterSettingsActive] = useToggle();

    const isFilterActive = (identify: MonikerIdentify) => {
      return _.some(allFilter(), {
        active: true,
        characterID: identify.characterID,
        monikerID: identify.monikerID,
      });
    };
    const toggleFilterActive = (identify: MonikerIdentify) => {
      const filter = objects.orDefault(
        _.find(allFilter(), {
          characterID: identify.characterID,
          monikerID: identify.monikerID,
        }),
        () => ({
          characterID: -1,
          monikerID: -1,
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

    const characters = computed(() => {
      const filters = allFilter().filter((x) => x.active);
      const characterIDs = _.uniq(filters.map((x) => x.characterID));
      const query = searchQuery.value;

      return Character.all.filter((x) => {
        if (!characterIDs.includes(x.characterID)) {
          return false;
        }
        if (!t(Character.getNameKey(x)).includes(query)) {
          return _.some(filters, (y) => {
            return (
              y.characterID === x.characterID &&
              t(Character.getMonikerNameKey(y)).includes(query)
            );
          });
        }
        return true;
      });
    });
    const isCharacterSelected = (identify: CharacterIdentify) => {
      return character.characterID === identify.characterID;
    };
    const setCharacter = (identify: CharacterIdentify) => {
      if (character.characterID !== identify.characterID) {
        character.characterID = identify.characterID;
      }
    };

    const monikers = computed(() => {
      const query = searchQuery.value;
      const filters = allFilter().filter((x) => x.active);
      return Character.getAvailableMoniker(character).filter(
        (x) =>
          _.some(filters, {
            characterID: x.characterID,
            monikerID: x.monikerID,
          }) &&
          (t(Character.getNameKey(x)).includes(query) ||
            t(Character.getMonikerNameKey(x)).includes(query))
      );
    });
    const isMonikerSelected = (identify: MonikerIdentify): boolean =>
      _.isMatch(character, {
        characterID: identify.characterID,
        monikerID: identify.monikerID,
      });
    const setMonikerID = (identify: MonikerIdentify) => {
      if (character.characterID === identify.characterID) {
        character.monikerID = identify.monikerID;
      }
    };

    const setTalentLevel = (level: TalentLevel) => {
      const moniker = Character.getMoniker(character);
      let newLevel: TalentLevel = level;
      if (level < moniker.initialTalentLevel) {
        newLevel = moniker.initialTalentLevel;
      }
      if (character.talentLevel !== newLevel) {
        character.talentLevel = newLevel;
      }
    };
    const getTalentLevelIcon = (level: TalentLevel) => {
      return level <= character.talentLevel ? starFill : starEmpty;
    };

    const setAwakeningLevel = (level: AwakeningLevel) => {
      if (character.awakeningLevel !== level) {
        character.awakeningLevel = level;
      }
    };
    const getAwakeningLevelIcon = (level: AwakeningLevel) => {
      return level <= character.awakeningLevel ? starFill : starEmpty;
    };

    const adjustMoniker = (newData: CharacterDto, oldData: CharacterDto) => {
      if (newData.characterID !== oldData.characterID) {
        const _monikers = monikers.value;
        if (!_.some(_monikers, { monikerID: newData.monikerID })) {
          character.monikerID = _monikers[0].monikerID;
        }
      }
    };
    const adjustTalentLevel = (
      newData: CharacterDto,
      oldData: CharacterDto
    ) => {
      if (
        !_.isMatch(newData, {
          characterID: oldData.characterID,
          monikerID: oldData.monikerID,
        })
      ) {
        const moniker = Character.getMoniker(newData);
        if (newData.talentLevel < moniker.initialTalentLevel) {
          character.talentLevel = moniker.initialTalentLevel;
        }
      }
    };
    const adjustUniqueSkill = (
      newData: CharacterDto,
      oldData: CharacterDto
    ) => {
      if (
        !_.isMatch(newData, {
          characterID: oldData.characterID,
          monikerID: oldData.monikerID,
          talentLevel: oldData.talentLevel,
        })
      ) {
        const oldUniqueSkill = Skill.getUnique(oldData);
        _.remove(skills, { skillID: oldUniqueSkill.skillID });

        const uniqueSkill = Skill.getUnique(newData);
        if (!_.some(skills, { skillID: uniqueSkill.skillID })) {
          skills.push(SkillDto(uniqueSkill));
        }
      }
    };

    watch(
      () => _.cloneDeep(editData.value.character),
      (newData, oldData) => {
        adjustMoniker(newData, oldData);
        adjustTalentLevel(newData, oldData);
        adjustUniqueSkill(newData, oldData);
      }
    );

    onMounted(() => {
      Character.allMoniker.forEach((x) => {
        const { characterID, monikerID } = x;
        if (!_.some(allFilter(), { characterID, monikerID })) {
          filterStore.value.push([characterID, monikerID, true]);
        }
      });
      _.remove(
        filterStore.value,
        (x) =>
          !_.some(Character.allMoniker, { characterID: x[0], monikerID: x[1] })
      );
    });

    return {
      t,
      searchQuery,
      allFilterItems,
      filterItemName,
      isFilterSettingsActive,
      toggleFilterSettingsActive,
      isFilterActive,
      toggleFilterActive,
      setAllFilter,
      characters,
      isCharacterSelected,
      setCharacter,
      monikers,
      isMonikerSelected,
      setMonikerID,
      setTalentLevel,
      getTalentLevelIcon,
      setAwakeningLevel,
      getAwakeningLevelIcon,
    };
  },
});
</script>

<style lang="scss" module>
.characterEditor {
  @apply h-full;

  > .tools {
    @apply flex gap-x-[0.5rem] overflow-hidden h-[1.75rem];
    @apply sm:(h-[2rem]);
    @apply md:(h-[2.5rem]);

    > .searchBar {
      @apply flex-grow h-[1.75rem];
      @apply sm:(h-[2rem]);
      @apply md:(h-[2.5rem]);
    }

    > .filterButton {
      @apply flex-shrink-0 rounded-md border bg-[#fefefe] cursor-pointer;

      > .icon {
        @apply w-[1.75rem] h-[1.75rem] p-[0.25rem];
        @apply sm:(w-[2rem] h-[2rem]);
        @apply md:(w-[2.5rem] h-[2.5rem]);

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
      @apply h-full;

      > .main {
        @apply h-[calc(100%-0.5rem-1.5rem)] p-[0.5rem] rounded-md bg-[#f2f2f2];
        @apply sm:(h-[calc(100%-0.75rem-2rem)] p-[0.75rem]);
        @apply md:(h-[calc(100%-1rem-2.5rem)] p-[1rem]);

        > .header {
          @apply text-xxs text-[#8fd54a] h-[0.875rem] border-b-1 border-[#8fd54a];
          @apply sm:(text-xs h-[1rem]);
          @apply md:(text-base h-[1.5rem]);
        }

        > .main {
          @apply overflow-hidden h-[calc(100%-0.875rem-0.25rem)] mt-[0.25rem];
          @apply sm:(h-[calc(100%-1rem-0.5rem)] mt-[0.5rem]);
          @apply md:(h-[calc(100%-1.5rem-1rem)] mt-[1rem]);

          > .selectors {
            @apply flex flex-col gap-y-[0.5rem] h-full pt-[0.25rem] overflow-y-scroll;
            @apply sm:(gap-y-[0.75rem]);
            @apply md:(gap-y-[1rem]);

            > .selector {
              @apply text-xxs flex gap-x-[0.25rem] h-[1rem] cursor-pointer;
              @apply sm:(text-sm h-[1.25rem]);
              @apply md:(text-lg h-[1.75rem]);

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

      > .controllers {
        @apply flex justify-around gap-x-[1rem] mt-[0.5rem];
        @apply sm:(mt-[0.75rem]);
        @apply md:(mt-[1rem]);

        > .controller {
          @apply font-bold text-xxs h-[1.5rem] px-[0.5rem] rounded-full border bg-[#fefefe];
          @apply sm:(text-sm h-[2rem] px-[1rem]);
          @apply md:(text-lg h-[2.5rem] px-[1.5rem]);
        }
      }
    }

    > .editors {
      @apply flex flex-col gap-y-[0.5rem] h-full;
      @apply sm:(gap-y-[0.75rem]);
      @apply md:(gap-y-[1rem]);

      > .character {
        @apply h-[calc(100%-0.5rem-8rem-0.5rem-4.75rem)] rounded-md bg-[#f2f2f2] overflow-hidden;
        @apply sm:(h-[calc(100%-0.75rem-10rem-0.75rem-5.75rem)]);
        @apply md:(h-[calc(100%-1rem-10rem-1rem-7rem)]);

        > .container {
          @apply h-full overflow-y-scroll;

          > .selectors {
            @apply grid grid-cols-2 gap-[0.5rem] p-[0.5rem];
            @apply sm:(gap-[0.75rem] p-[0.75rem]);
            @apply md:(gap-[1rem] p-[1rem]);

            > .selector {
              @apply truncate text-xs text-center py-[0.25rem] rounded-md bg-[#fefefe] border cursor-pointer;
              @apply sm:(text-sm);
              @apply md:(text-base);

              &.selected {
                @apply text-[#f2f2f2] bg-[#8fd54a];
              }

              &:not(.selected):hover {
                @apply border border-[#8fd54a];
              }
            }
          }
        }
      }

      > .moniker {
        @apply h-[8rem] rounded-md bg-[#f2f2f2] overflow-hidden;
        @apply sm:(h-[10rem]);

        > .container {
          @apply h-full overflow-y-scroll;

          > .selectors {
            @apply grid grid-cols-1 gap-[0.5rem] p-[0.5rem];
            @apply sm:(gap-[0.75rem] p-[0.75rem]);
            @apply md:(grid-cols-2 gap-[1rem] p-[1rem]);

            > .selector {
              @apply truncate text-xs text-center py-[0.25rem] rounded-md bg-[#fefefe] border cursor-pointer;
              @apply sm:(text-sm);
              @apply md:(py-[0.5rem]);

              &.selected {
                @apply text-[#f2f2f2] bg-[#8fd54a];
              }

              &:not(.selected):hover {
                @apply border border-[#8fd54a];
              }
            }
          }
        }
      }

      > .level {
        @apply grid grid-cols-[max-content,1fr] gap-[0.75rem] h-[calc(0.5rem+1.5rem+0.75rem+1.5rem+0.5rem)] p-[0.5rem] overflow-hidden bg-[#f2f2f2] rounded-md;
        @apply sm:(h-[calc(0.75rem+1.75rem+0.75rem+1.75rem+0.75rem)] p-[0.75rem]);
        @apply md:(gap-[1rem] h-[calc(1rem+2rem+1rem+2rem+1rem)] p-[1rem]);

        > .label {
          @apply text-xxs flex justify-center items-center h-[1.5rem] px-[0.375rem] rounded-md border bg-[#fafafa];
          @apply sm:(text-base h-[1.75rem] px-[0.5rem]);
          @apply md:(text-lg h-[2rem] px-[0.75rem]);
        }

        > .selectors {
          @apply flex-grow flex items-center gap-x-[0.5rem] h-[1.5rem];
          @apply sm:(h-[1.75rem] gap-x-[0.75rem]);
          @apply md:(h-[2rem]);

          > .selector {
            @apply cursor-pointer;

            > .icon {
              @apply w-[1.25rem] h-[1.25rem];
              @apply sm:(w-[1.5rem] h-[1.5rem]);
              @apply md:(w-[1.75rem] h-[1.75rem]);
            }
          }
        }
      }
    }
  }
}
</style>
