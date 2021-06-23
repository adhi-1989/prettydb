<template>
  <section class="character-editor-root">
    <character-selector :edit-data="editData" />
    <moniker-selector :edit-data="editData" />
    <talent-level-selector :edit-data="editData" />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { HallOfFameDTO } from "/@/db/hall-of-fame";
import CharacterSelector from "/@/components/hall-of-fame/content/editor/CharacterSelector.vue";
import MonikerSelector from "/@/components/hall-of-fame/content/editor/MonikerSelector.vue";
import TalentLevelSelector from "/@/components/hall-of-fame/content/editor/TalentLevelSelector.vue";

export default defineComponent({
  name: "CharacterEditor",
  components: {
    CharacterSelector,
    MonikerSelector,
    TalentLevelSelector,
  },
  props: {
    editData: {
      type: Object as PropType<HallOfFameDTO>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.character-editor-root {
  @apply flex flex-col gap-y-[0.75rem] h-full;
  > :first-child {
    @apply h-[66%];
  }
}
</style>
