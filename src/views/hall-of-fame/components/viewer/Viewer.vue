<template>
  <!-- viewer -->
  <article class="data-viewer-root">
    <!-- header -->
    <header class="header">
      <span class="text">{{ t("pages.hall-of-fame.viewer.header") }}</span>
    </header>

    <!-- main content -->
    <div class="main-content">
      <profile-view :view-data="viewData" />
      <status-view :view-data="viewData" />
      <ability-view :view-data="viewData" />
      <div class="multi-content-view-container">
        <multi-content-view :view-data="viewData" />
      </div>
    </div>

    <!-- injected controller -->
    <footer class="controller-container">
      <slot />
    </footer>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { HallOfFameDTO } from "@/views/hall-of-fame/logic/db";
import ProfileView from "@/views/hall-of-fame/components/viewer/ProfileView.vue";
import StatusView from "@/views/hall-of-fame/components/viewer/StatusView.vue";
import AbilityView from "@/views/hall-of-fame/components/viewer/AbilityView.vue";
import MultiContentView from "@/views/hall-of-fame/components/viewer/MultiContentView.vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  components: {
    ProfileView,
    StatusView,
    AbilityView,
    MultiContentView,
  },
  props: {
    viewData: {
      type: Object as PropType<HallOfFameDTO>,
      required: true,
    },
  },
  data() {
    const { t } = useI18n();
    return {
      t,
    };
  },
});
</script>

<style lang="scss" scoped>
.data-viewer-root {
  @apply flex flex-col rounded-md overflow-hidden h-full bg-[#fafafa];
  @apply xs:(max-w-[32rem] mx-auto);
  user-select: none;

  > .header {
    @apply text-center bg-gradient-to-t from-[#7fbf3cff] via-[#90ca3fff] to-[#a2d543ff] py-[0.25rem];
    > .text {
      @apply font-bold text-[1.125rem] text-[#fefefe];
      @apply xs:(text-[1.375rem]);
    }
  }

  > .main-content {
    @apply flex-grow flex flex-col gap-y-[0.375rem];
    @apply xs:(gap-y-[0.75rem]);
    > .multi-content-view-container {
      @apply flex-grow h-0;
    }
  }

  > .controller-container {
    &:not(:empty) {
      @apply my-[0.375rem];
      @apply xs:(my-[0.5rem]);
    }
  }
}
</style>
