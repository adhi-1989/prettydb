<template>
  <!-- factor editor -->
  <section class="factor-editor-root">
    <div class="factor-filter-container">
      <factor-filter @updateFilter="updateFilter" />
    </div>

    <div class="factor-editor">
      <div class="factor-list">
        <div class="factor-item-group">
          <transition-group name="factor-item">
            <template
              v-for="factor in displayFactorList"
              :key="hashCode(factor.factorID, factor.factorLevel)"
            >
              <div
                class="factor-item"
                @click="toggleMarkForUpper(factor)"
                :data-marked="isMarkedAtUpper(factor)"
              >
                <factor-card :factor="factor" :character="character" />
              </div>
            </template>
          </transition-group>
          <div ref="observeRef" class="observe-item" />
        </div>
      </div>

      <div class="factor-transfer-controller">
        <div class="transfer-button" @click="transferMarkedItemsToUpper()">
          <up-icon />
        </div>
        <div class="transfer-button" @click="transferMarkedItemsToLower()">
          <down-icon />
        </div>
      </div>

      <div class="factor-list">
        <div class="factor-item-group">
          <transition-group name="factor-item">
            <template
              v-for="factor in factors"
              :key="hashCode(factor.factorID, factor.factorLevel)"
            >
              <div
                class="factor-item"
                @click="toggleMarkForLower(factor)"
                :data-marked="isMarkedAtLower(factor)"
              >
                <factor-card :factor="factor" :character="character" />
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
  defineComponent,
  PropType,
  reactive,
  readonly,
  onMounted,
  onBeforeUnmount,
  ref,
} from "vue";
import { HallOfFameDTO, FactorDTO } from "/@/db/hall-of-fame";
import FactorCard from "/@/components/hall-of-fame/widget/FactorCard.vue";
import FactorFilter from "/@/components/hall-of-fame/content/editor/FactorFilter.vue";
import {
  FactorLevels,
  AllFactor,
  isUniqueSkillFactor,
  getUniqueSkill, getFactor, FactorTypes
} from "/@/data";
import { hashCode } from "/@/util/common";
import _ from "lodash";
import UpIcon from "/icon/caret-up-outline.svg?component";
import DownIcon from "/icon/caret-down-outline.svg?component";

type Filter = (factor: FactorDTO) => boolean;
type FilterHolder = {
  filter: Filter;
};

export default defineComponent({
  name: "FactorEditor",
  components: {
    UpIcon,
    DownIcon,
    FactorFilter,
    FactorCard,
  },
  props: {
    editData: {
      type: Object as PropType<HallOfFameDTO>,
      required: true,
    },
  },
  data() {
    return {
      hashCode,
    };
  },
  setup(props) {
    const character = readonly(props.editData.character);
    const factors = reactive(props.editData.factors);

    const factorList = reactive(
      (() => {
        const acquiredFactors = [...factors];
        const list: Array<FactorDTO> = [];
        const uniqueSkill = getUniqueSkill(character);
        AllFactor.forEach((factor) => {
          if (
            isUniqueSkillFactor(factor) &&
            factor.UNIQUE_SKILL_ID !== uniqueSkill.SKILL_ID
          ) {
            return;
          }
          const factorID = factor.FACTOR_ID;
          let omitLevel = -1;
          const i = acquiredFactors.findIndex((x) => x.factorID == factorID);
          if (i != -1) {
            omitLevel = acquiredFactors[i].factorLevel;
          }
          FactorLevels.forEach((factorLevel) => {
            if (omitLevel != factorLevel) {
              list.push(FactorDTO({ factorID, factorLevel }));
            }
          });
        });
        return list;
      })()
    );
    const displayFactorList = reactive<Array<FactorDTO>>([]);
    const filterHolder = reactive<FilterHolder>({ filter: () => true });
    let fetchOffset = 0;
    const fetchDisplayFactors = (size: number) => {
      let list: Array<FactorDTO> = [];
      let count = size;
      while (count > 0) {
        list = factorList.slice(fetchOffset, fetchOffset + count).filter(filterHolder.filter);
        fetchOffset += count;
        count -= list.length;
        displayFactorList.push(...list);
        if (fetchOffset >= factorList.length) {
          break;
        }
      }
    };
    //TODO: 結局リストの最後の方でフィルターを切り替えるとラグる。フィルターの結果を分割して反映させるほうがいい？
    const updateFilter = (filter: Filter) => {
      filterHolder.filter = filter;
      displayFactorList.splice(0);
      fetchOffset = 0;
      fetchDisplayFactors(50);
    };

    const markedItemsUpper = reactive<Array<FactorDTO>>([]);
    const toggleMarkForUpper = (factor: FactorDTO) => {
      const index = markedItemsUpper.indexOf(factor);
      if (index == -1) {
        const factorObj = getFactor(factor.factorID);
        _.remove(markedItemsUpper, (x) => {
          if (
            factorObj.TYPE == FactorTypes.STATUS ||
            factorObj.TYPE == FactorTypes.ABILITY ||
            factorObj.TYPE == FactorTypes.UNIQUE_SKILL
          ) {
            if (factorObj.TYPE == getFactor(x.factorID).TYPE) {
              return true;
            }
          }
          return x.factorID == factor.factorID;
        });
        markedItemsUpper.push(factor);
      } else {
        markedItemsUpper.splice(index, 1);
      }
    };
    const isMarkedAtUpper = (factor: FactorDTO) => {
      return markedItemsUpper.includes(factor);
    };

    const markedItemsLower = reactive<Array<FactorDTO>>([]);
    const toggleMarkForLower = (factor: FactorDTO) => {
      const index = markedItemsLower.indexOf(factor);
      if (index == -1) {
        markedItemsLower.push(factor);
      } else {
        markedItemsLower.splice(index, 1);
      }
    };
    const isMarkedAtLower = (factor: FactorDTO) => {
      return markedItemsLower.includes(factor);
    };

    const transferMarkedItemsToUpper = () => {
      let factor: FactorDTO | undefined;
      while ((factor = markedItemsLower.pop()) != undefined) {
        factorList.push(factor);
        displayFactorList.push(factor);
        factors.splice(factors.indexOf(factor), 1);
      }
    };
    const transferMarkedItemsToLower = () => {
      let factor: FactorDTO | undefined;
      while ((factor = markedItemsUpper.pop()) != undefined) {
        factors.push(factor);
        displayFactorList.splice(displayFactorList.indexOf(factor), 1);
        factorList.splice(factorList.indexOf(factor), 1);
      }
    };

    let observer: IntersectionObserver;
    const observeRef = ref<Element>();
    onMounted(() => {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target === observeRef.value) {
            fetchDisplayFactors(50);
          }
        });
      });
      if (observeRef.value) {
        observer.observe(observeRef.value);
      }
    });

    onBeforeUnmount(() => {
      if (observeRef.value) {
        observer.unobserve(observeRef.value);
      }
    });

    return {
      character,
      factors,
      updateFilter,
      displayFactorList,
      toggleMarkForUpper,
      isMarkedAtUpper,
      toggleMarkForLower,
      isMarkedAtLower,
      transferMarkedItemsToUpper,
      transferMarkedItemsToLower,
      observeRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.factor-editor-root {
  @apply flex flex-col h-full p-[0.5rem];
  > .factor-filter {
    @apply h-[2rem];
  }
  > .factor-editor {
    @apply flex-grow flex flex-col overflow-hidden  h-[calc(100%-2.5rem)] mt-[0.5rem];
    > .factor-list {
      @apply rounded overflow-hidden h-[calc((100%-2.5rem)/2)] bg-[#f2f2f2];
      > .factor-item-group {
        @apply grid grid-cols-2 auto-rows-min gap-[0.5rem] h-full overflow-auto p-[0.5rem];
        > .factor-item {
          &-move {
            transition: transform 0.5s;
          }
          &-enter-active {
            animation: zoomIn;
            animation-duration: 0.5s;
          }
          &-leave-active {
            /* FIXME: グリッドアイテムの座標を保持する方法を思いついたらアニメーションを追加 */
            @apply absolute;
            opacity: 0;
          }
          &[data-marked="true"] {
            @apply ring;
          }
          &[data-marked="true"] {
            @apply ring;
          }
        }
        > .observe-item {
          @apply w-[1px] h-[1px];
        }
      }
    }
    > .factor-transfer-controller {
      @apply flex gap-x-[4rem] justify-center h-[3rem] py-[0.25rem];
      > .transfer-button {
        @apply w-[2.5rem] cursor-pointer;
      }
    }
  }
}
</style>
