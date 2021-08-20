<template>
  <section class="skill-view-root">
    <div class="skill-view">
      <div class="skill-item-group">
        <template v-for="skill in skills" :key="skill.skillID">
          <skill-card
            :skill="skill"
            :owner="character"
            :unique-skill-level="metadata.uniqueSkillLevel"
          />
        </template>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import { Skill } from "@/data";
import {
  fallbackStateFactory,
  stateInjectionKey,
} from "@/views/hall-of-fame/logic/dependency";
import SkillCard from "@/views/components/widget/SkillCard.vue";

export default defineComponent({
  components: {
    SkillCard,
  },
  setup() {
    const { viewData } = inject(stateInjectionKey, fallbackStateFactory, true);
    const { character, skills, metadata } = viewData.value;

    const uniqueSkill = Skill.getUnique(character);
    const _skills = computed(() => {
      return skills.map(Skill.get).sort((x, y) => {
        if (x === uniqueSkill) {
          return -1;
        } else if (y === uniqueSkill) {
          return 1;
        }
        return x.sortID - y.sortID;
      });
    });

    return {
      character,
      skills: _skills,
      metadata,
    };
  },
});
</script>

<style lang="scss">
.skill-view-root {
  @apply rounded overflow-hidden h-full bg-[#f2f2f2];

  > .skill-view {
    @apply overflow-y-scroll h-full p-[0.5rem];
    @apply sm:(p-[0.75rem]);

    > .skill-item-group {
      @apply grid grid-cols-2 auto-rows-min gap-[0.25rem];
      @apply sm:(gap-[0.375rem]);
      @apply md:(gap-x-[0.5rem] gap-y-[0.875rem]);
    }
  }
}
</style>
