<template>
  <section class="character-editor-root">
    <div class="tools">
      <label class="search-bar">
        <icon-ion-search class="icon" />
        <input
          class="input"
          type="text"
          :placeholder="
            t('pages.hall-of-fame.editor.character.search-bar.placeholder')
          "
          v-model="searchQuery"
          @focus="selectInputValueOnFocus"
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
              t("pages.hall-of-fame.editor.character.filter.description")
            }}</span>
            <hr class="horizontal" />
          </div>

          <div class="filter-selector">
            <div class="selector-item-group">
              <template
                v-for="item in allFilterItems"
                :key="hashCode(item.characterID, item.monikerID)"
              >
                <div class="selector-item" @click="toggleFilterActive(item)">
                  <div
                    class="checkbox"
                    :class="{ checked: isFilterActive(item) }"
                  >
                    <icon-ion-checkmark class="icon" />
                  </div>
                  <span class="label">{{
                    `${t(getCharacterNameKey(item))} [${t(
                      getMonikerNameKey(item)
                    )}]`
                  }}</span>
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
        <div class="character-selector-container">
          <div class="character-selector">
            <div class="selector-item-group">
              <template
                v-for="identify in characters"
                :key="identify.characterID"
              >
                <div
                  class="selector-item"
                  :class="{ selected: isCharacterSelected(identify) }"
                  @click="setCharacter(identify)"
                >
                  <span>{{ t(getCharacterNameKey(identify)) }}</span>
                </div>
              </template>
            </div>
          </div>
        </div>

        <div class="moniker-selector-container">
          <div class="moniker-selector">
            <div class="selector-item-group">
              <template v-for="identify in monikers" :key="identify.monikerID">
                <div
                  class="selector-item"
                  :class="{ selected: isMonikerSelected(identify) }"
                  @click="setMonikerID(identify)"
                >
                  {{ t(getMonikerNameKey(identify)) }}
                </div>
              </template>
            </div>
          </div>
        </div>

        <div class="level-selector-container">
          <div class="label">
            {{
              t(
                "pages.hall-of-fame.editor.character.level-selector.label.talent-level"
              )
            }}
          </div>
          <div class="level-item-group">
            <div
              class="level-item"
              v-for="level in AllTalentLevel"
              :key="level"
              @click="setTalentLevel(level)"
            >
              <img class="icon" :src="getTalentLevelIcon(level)" alt="" />
            </div>
          </div>

          <div class="label">
            {{
              t(
                "pages.hall-of-fame.editor.character.level-selector.label.awakening-level"
              )
            }}
          </div>
          <div class="level-item-group">
            <div
              class="level-item"
              v-for="level in AllAwakeningLevel"
              :key="level"
              @click="setAwakeningLevel(level)"
            >
              <img class="icon" :src="getAwakeningLevelIcon(level)" alt="" />
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
  Character,
  Skill,
  AwakeningLevel,
  CharacterIdentify,
  MonikerIdentify,
  TalentLevel,
} from "@/data";
import { numbers, objects } from "@/util";
import _ from "@/util/lodash";
import { selectInputValueOnFocus } from "@/views/logic/dom";
import { CharacterDto, SkillDto } from "@/views/hall-of-fame/logic/db";
import {
  fallbackStateFactory,
  stateInjectionKey,
} from "@/views/hall-of-fame/logic/dependency";
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
  data() {
    const { hashCode } = numbers;

    return {
      AllAwakeningLevel: Character.allAwakeningLevel,
      AllTalentLevel: Character.allTalentLevel,
      getCharacterNameKey: Character.getNameKey,
      getMonikerNameKey: Character.getMonikerNameKey,
      hashCode,
      selectInputValueOnFocus,
    };
  },
  setup() {
    const { t } = useI18n();

    const { editData } = inject(stateInjectionKey, fallbackStateFactory, true);
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

<style lang="scss">
.character-editor-root {
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
          @apply overflow-hidden h-[calc(100%-1rem-0.25rem)] mt-[0.25rem];
          @apply sm:(h-[calc(100%-1rem-0.5rem)] mt-[0.5rem]);
          @apply md:(h-[calc(100%-1rem-1rem)] mt-[1rem]);

          > .selector-item-group {
            @apply flex flex-col gap-y-[0.5rem] overflow-y-scroll h-full pt-[0.25rem];
            @apply sm:(gap-y-[0.75rem]);
            @apply md:(gap-y-[1rem]);

            > .selector-item {
              @apply flex gap-x-[0.25rem] h-[1rem];
              @apply md:(h-[1.5rem]);

              > .checkbox {
                @apply border rounded-md w-[1rem] h-[1rem] text-[#f2f2f2] bg-[#8fd54a];
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

              > .label {
                @apply text-[0.75rem] leading-[1rem];
                @apply md:(text-[1rem] leading-[1.5rem]);
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

      > .character-selector-container {
        @apply h-[calc(100%-0.5rem-8rem-0.5rem-4.75rem)] rounded-md bg-[#f2f2f2] overflow-hidden;
        @apply sm:(h-[calc(100%-0.75rem-10rem-0.75rem-5.75rem)]);
        @apply md:(h-[calc(100%-1rem-10rem-1rem-7rem)]);

        > .character-selector {
          @apply h-full overflow-y-scroll;

          > .selector-item-group {
            @apply grid grid-cols-2 gap-[0.5rem] p-[0.5rem];
            @apply sm:(gap-[0.75rem] p-[0.75rem]);
            @apply md:(gap-[1rem] p-[1rem]);

            > .selector-item {
              @include text-overflow-omit;
              @apply py-[0.25rem] text-[0.875rem] text-center rounded-md bg-[#fefefe] border cursor-pointer;
              @apply sm:(py-[0.5rem]);
              @apply md:(text-[1rem]);

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

      > .moniker-selector-container {
        @apply rounded-md bg-[#f2f2f2] h-[8rem] overflow-hidden;
        @apply sm:(h-[10rem]);

        > .moniker-selector {
          @apply h-full overflow-y-scroll;

          > .selector-item-group {
            @apply grid grid-cols-1 gap-[0.5rem] p-[0.5rem];
            @apply sm:(gap-[0.75rem] p-[0.75rem]);
            @apply md:(grid-cols-2 gap-[1rem] p-[1rem]);

            > .selector-item {
              @include text-overflow-omit;
              @apply py-[0.25rem] text-[0.875rem] text-center rounded-md bg-[#fefefe] border cursor-pointer;
              @apply sm:(py-[0.5rem]);
              @apply md:(text-[1rem]);

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

      > .level-selector-container {
        @apply grid grid-cols-[max-content,1fr] gap-[0.75rem] h-[calc(0.5rem+1.5rem+0.75rem+1.5rem+0.5rem)] p-[0.5rem] overflow-hidden bg-[#f2f2f2] rounded-md;
        @apply sm:(h-[calc(0.75rem+1.75rem+0.75rem+1.75rem+0.75rem)] p-[0.75rem]);
        @apply md:(gap-[1rem] h-[calc(1rem+2rem+1rem+2rem+1rem)] p-[1rem]);

        > .label {
          @apply flex justify-center items-center text-[0.75rem] h-[1.5rem] px-[0.375rem] border bg-[#fafafa] rounded-md;
          @apply sm:(text-[1rem] h-[1.75rem] px-[0.5rem]);
          @apply md:(text-[1.125rem] h-[2rem] px-[0.75rem]);
        }

        > .level-item-group {
          @apply flex-grow flex items-center gap-x-[0.5rem] h-[1.5rem];
          @apply sm:(h-[1.75rem] gap-x-[0.75rem]);
          @apply md:(h-[2rem]);

          > .level-item {
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
