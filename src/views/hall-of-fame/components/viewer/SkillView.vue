<template>
  <section :class="$style.skill">
    <div :class="$style.view">
      <div :class="$style.items">
        <template v-for="skill in skills" :key="skill.skillID">
          <skill-card
            :skill="skill"
            :unique="{ owner: character, level: metadata.uniqueSkillLevel }"
          />
        </template>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import { Skill } from "@/data";
import { State } from "@/views/hall-of-fame/logic/dependency";
import SkillCard from "@/views/components/widget/SkillCard.vue";

export default defineComponent({
  components: {
    SkillCard,
  },
  setup() {
    const { viewData } = State(inject);
    const { character, skills, metadata } = viewData.value;

    const _unique = Skill.getUnique(character);
    const getSkills = computed(() => {
      return skills.map(Skill.get).sort((x, y) => {
        if (x === _unique) {
          return -1;
        } else if (y === _unique) {
          return 1;
        }
        return x.sortID - y.sortID;
      });
    });

    return {
      character,
      skills: getSkills,
      metadata,
    };
  },
});
</script>

<style lang="scss" module>
.skill {
  @apply h-full rounded bg-[#f2f2f2] overflow-hidden;

  > .view {
    @apply h-full p-[0.5rem] overflow-y-scroll;
    @apply sm:(p-[0.75rem]);

    > .items {
      @apply grid grid-cols-2 auto-rows-min gap-[0.5rem];
      @apply md:(gap-y-[0.875rem]);
    }
  }
}
</style>
