<template>
  <!-- talent level -->
  <section class="talent-level-selector-root">
    <!-- stars -->
    <div class="star-item-group">
      <div
        class="star-item"
        v-for="level in AllTalentLevel"
        :key="level"
        @click="setTalentLevel(level)"
      >
        <template v-if="level <= character.talentLevel">
          <img :src="starFill" alt="" />
        </template>
        <template v-else>
          <img :src="starEmpty" alt="" />
        </template>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, readonly } from "vue";
import { Dto } from "@/views/hall-of-fame/logic/db";
import { getMoniker, AllTalentLevel, TalentLevel } from "@/data";
import starFill from "#/images/level/star-fill.svg";
import starEmpty from "#/images/level/star-empty.svg";

export default defineComponent({
  props: {
    editData: {
      type: Object as PropType<Dto>,
      required: true,
    },
  },
  data() {
    return {
      AllTalentLevel,
      starFill,
      starEmpty,
    };
  },
  setup(props) {
    const character = reactive(props.editData.character);

    const setTalentLevel = (level: TalentLevel) => {
      const moniker = getMoniker(character.characterID, character.monikerID);
      if (moniker.initialTalentLevel <= level) {
        character.talentLevel = level;
      } else {
        character.talentLevel = moniker.initialTalentLevel;
      }
    };

    return {
      character: readonly(character),
      setTalentLevel,
    };
  },
});
</script>

<style lang="scss" scoped>
.talent-level-selector-root {
  > .star-item-group {
    @apply flex gap-x-[0.5rem] rounded px-[1rem] py-[0.5rem] bg-[#f2f2f2];
    > .star-item {
      @apply w-[1.75rem] h-[1.75rem] cursor-pointer;
    }
  }
}
</style>
