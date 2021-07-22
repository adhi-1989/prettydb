<template>
  <!-- skill editor -->
  <section class="skill-editor-root">
    <div class="skill-filter-container">
      <skill-filter @updateFilter="updateFilter" />
    </div>

    <div class="skill-editor">
      <div class="skill-list">
        <div class="skill-item-group">
          <transition-group name="skill-item">
            <template v-for="skill in filteredSkillList" :key="skill.skillID">
              <div
                class="skill-item"
                @click="toggleMarkForUpper(skill)"
                :data-marked="isMarkedAtUpper(skill)"
              >
                <skill-card :skill="skill" :character="character" />
              </div>
            </template>
          </transition-group>
        </div>
      </div>

      <div class="skill-transfer-controller">
        <div class="transfer-button" @click="transferMarkedItemsToUpper()">
          <icon-ion-caret-up />
        </div>
        <div class="transfer-button" @click="transferMarkedItemsToLower()">
          <icon-ion-caret-down />
        </div>
      </div>

      <div class="skill-list">
        <div class="skill-item-group">
          <transition-group name="skill-item">
            <template v-for="skill in skills" :key="skill.skillID">
              <div
                class="skill-item"
                @click="toggleMarkForLower(skill)"
                :data-marked="isMarkedAtLower(skill)"
              >
                <skill-card :skill="skill" :character="character" />
              </div>
            </template>
          </transition-group>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  reactive,
  readonly,
} from "vue";
import _ from "@/util/lodash";
import { HallOfFameDTO, SkillDTO } from "@/views/hall-of-fame/logic/db";
import {
  SkillTypes,
  isUniqueSkill,
  Skills,
  isUniqueSkillOwner,
  getSkill,
} from "@/data";
import SkillFilter from "@/views/hall-of-fame/components/editor/SkillFilter.vue";
import SkillCard from "@/views/hall-of-fame/components/widget/SkillCard.vue";

type Filter = (skill: SkillDTO) => boolean;
type FilterHolder = {
  filter: Filter;
};

export default defineComponent({
  components: {
    SkillFilter,
    SkillCard,
  },
  props: {
    editData: {
      type: Object as PropType<HallOfFameDTO>,
      required: true,
    },
  },
  data() {
    return {
      SkillTypes,
    };
  },
  setup(props) {
    const character = readonly(props.editData.character);
    const skills = reactive(props.editData.skills);

    const skillList = reactive<Array<SkillDTO>>([]);
    const filterHolder = reactive<FilterHolder>({ filter: () => true });
    const updateFilter = (filter: Filter) => {
      filterHolder.filter = filter;
    };
    const filteredSkillList = computed(() => {
      return skillList.filter(filterHolder.filter);
    });

    const markedItemsUpper = reactive<Array<SkillDTO>>([]);
    const toggleMarkForUpper = (skill: SkillDTO) => {
      const index = markedItemsUpper.indexOf(skill);
      if (index == -1) {
        _.remove(markedItemsUpper, (x) => {
          const conflictID1 = getSkill(x.skillID).CONFLICT_ID;
          const conflictID2 = getSkill(skill.skillID).CONFLICT_ID;
          if (!_.isNumber(conflictID1) || !_.isNumber(conflictID2)) {
            return false;
          }
          return conflictID1 === conflictID2;
        });
        markedItemsUpper.push(skill);
      } else {
        markedItemsUpper.splice(index, 1);
      }
    };
    const isMarkedAtUpper = (skill: SkillDTO) => {
      return markedItemsUpper.includes(skill);
    };

    const markedItemsLower = reactive<Array<SkillDTO>>([]);
    const toggleMarkForLower = (skill: SkillDTO) => {
      const index = markedItemsLower.indexOf(skill);
      if (index == -1) {
        markedItemsLower.push(skill);
      } else {
        markedItemsLower.splice(index, 1);
      }
    };
    const isMarkedAtLower = (skill: SkillDTO) => {
      return markedItemsLower.includes(skill);
    };

    const transferMarkedItemsToUpper = () => {
      let skill: SkillDTO | undefined;
      while ((skill = markedItemsLower.pop()) != undefined) {
        skillList.push(skill);
        skills.splice(skills.indexOf(skill), 1);
      }
    };
    const transferMarkedItemsToLower = () => {
      let skill: SkillDTO | undefined;
      while ((skill = markedItemsUpper.pop()) != undefined) {
        skills.push(skill);
        skillList.splice(skillList.indexOf(skill), 1);
      }
    };

    const acquiredSkillIDs = skills.map((x) => x.skillID);
    const setupSkillList = (offset: number, limit: number) => {
      const list: Array<SkillDTO> = [];
      let count = 0;
      Skills.forEach((skill, index) => {
        if (index < offset) {
          return;
        }
        if (count++ >= limit) {
          return;
        }
        if (isUniqueSkill(skill) && !isUniqueSkillOwner(character, skill)) {
          if (
            skill.CHARACTER_ID == character.characterID ||
            !skill.INHERITABLE
          ) {
            return;
          }
        }
        const skillID = skill.SKILL_ID;
        if (acquiredSkillIDs.indexOf(skillID) == -1) {
          list.push(SkillDTO({ skillID }));
        }
      });
      skillList.push(...list);
    };

    let timerID = -1;
    onMounted(() => {
      const limit = 30;
      let offset = 0;

      setupSkillList(offset, limit);
      offset += limit;

      timerID = window.setInterval(() => {
        if (offset < Skills.length) {
          setupSkillList(offset, limit);
          offset += limit;
        } else {
          clearInterval(timerID);
        }
      }, 750);
    });

    onBeforeUnmount(() => {
      if (timerID != -1) {
        clearInterval(timerID);
      }
    });

    return {
      character,
      skills,
      updateFilter,
      filteredSkillList,
      toggleMarkForUpper,
      isMarkedAtUpper,
      toggleMarkForLower,
      isMarkedAtLower,
      transferMarkedItemsToUpper,
      transferMarkedItemsToLower,
    };
  },
});
</script>

<style lang="scss" scoped>
.skill-editor-root {
  @apply h-full p-[0.5rem];
  > .skill-filter-container {
    @apply h-[2rem];
  }
  > .skill-editor {
    @apply h-[calc(100%-2.5rem)] flex flex-col overflow-hidden mt-[0.5rem];
    > .skill-list {
      @apply rounded overflow-hidden h-[calc((100%-2.5rem)/2)] bg-[#f2f2f2];
      > .skill-item-group {
        @apply grid grid-cols-2 auto-rows-min gap-[0.5rem] h-full overflow-auto p-[0.5rem];
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
            /* FIXME: グリッドアイテムの座標を保持できるようになったらアニメーションを追加 */
            /* NOTE: grid-area を直で指定してやれば absolute でも座標を固定することが可能 */
            @apply absolute;
            opacity: 0;
          }
          &[data-marked="true"] {
            @apply ring;
          }
        }
      }
    }
    > .skill-transfer-controller {
      @apply flex gap-x-[4rem] justify-center h-[3rem] py-[0.25rem];
      > .transfer-button {
        @apply w-[2.5rem] cursor-pointer;
      }
    }
  }
}
</style>
