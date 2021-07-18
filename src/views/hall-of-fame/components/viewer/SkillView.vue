<template>
  <!-- skill -->
  <section class="skill-view-root">
    <div class="skill-view">
      <div class="skill-item-group">
        <template v-for="skill in skills.values()" :key="skill.skillID">
          <skill-card :skill="skill" :character="character" />
        </template>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, readonly } from "vue";
import SkillCard from "#/views/hall-of-fame/components/widget/SkillCard.vue";
import { HallOfFameDTO } from "#/views/hall-of-fame/logic/db";

export default defineComponent({
  components: {
    SkillCard,
  },
  props: {
    viewData: {
      type: Object as PropType<HallOfFameDTO>,
      required: true,
    },
  },
  setup(props) {
    return {
      character: readonly(props.viewData.character),
      skills: readonly(props.viewData.skills),
    };
  },
});
</script>

<style lang="scss" scoped>
.skill-view-root {
  @apply rounded overflow-hidden h-full bg-[#f2f2f2] p-[0.5rem];
  > .skill-view {
    @apply overflow-y-scroll h-full;
    > .skill-item-group {
      @apply grid grid-cols-2 auto-rows-min gap-[0.25rem] h-full;
    }
  }
}
@screen xs {
  .skill-view-root {
    @apply p-[0.75rem];
    > .skill-view {
      > .skill-item-group {
        @apply gap-[0.5rem];
      }
    }
  }
}
</style>
