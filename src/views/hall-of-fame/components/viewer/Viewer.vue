<template>
  <article class="data-viewer-root">
    <header class="header">
      <span class="text">{{ t("pages.hall-of-fame.viewer.header") }}</span>
    </header>

    <div class="main-content">
      <profile-view />
      <status-view />
      <ability-view />
      <div class="multi-content-view-container">
        <multi-content-view />
      </div>
    </div>

    <footer class="controller-container">
      <slot name="controllers">
        <div class="controller" @click="openView('editor')">
          {{ t("ui.edit") }}
        </div>
        <div class="controller" @click="closeView('viewer')">
          {{ t("ui.close") }}
        </div>
      </slot>
    </footer>
  </article>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { useI18n } from "vue-i18n";
import {
  actionInjectionKey,
  fallbackActionFactory,
  fallbackStateFactory,
  stateInjectionKey,
} from "@/views/hall-of-fame/logic/dependency";
import ProfileView from "@/views/hall-of-fame/components/viewer/ProfileView.vue";
import StatusView from "@/views/hall-of-fame/components/viewer/StatusView.vue";
import AbilityView from "@/views/hall-of-fame/components/viewer/AbilityView.vue";
import MultiContentView from "@/views/hall-of-fame/components/viewer/MultiContentView.vue";

export default defineComponent({
  components: {
    ProfileView,
    StatusView,
    AbilityView,
    MultiContentView,
  },
  setup() {
    const { t } = useI18n();
    const { openView, closeView } = inject(
      actionInjectionKey,
      fallbackActionFactory,
      true
    );
    const { viewData } = inject(stateInjectionKey, fallbackStateFactory, true);
    return {
      t,
      viewData,
      openView,
      closeView,
    };
  },
});
</script>

<style lang="scss">
.data-viewer-root {
  @apply flex flex-col rounded-md overflow-hidden w-[18rem] mx-auto h-full bg-[#fafafa] shadow;
  @apply sm:(w-[24.25rem]);
  @apply md:(w-[32rem]);

  > .header {
    @apply text-center bg-gradient-to-t from-[#7fbf3cff] via-[#90ca3fff] to-[#a2d543ff] py-[0.125rem];
    @apply sm:(py-[0.375rem]);
    > .text {
      @apply font-bold text-[#fefefe];
      @apply sm:(text-[1.25rem]);
      @apply md:(text-[1.5rem]);
    }
  }

  > .main-content {
    @apply flex-grow flex flex-col gap-y-[0.5rem];
    @apply sm:(gap-y-[0.75rem]);
    @apply md:(gap-y-[1rem]);
    > .multi-content-view-container {
      @apply flex-grow h-0;
    }
  }

  > .controller-container {
    @apply flex gap-x-[2rem] justify-center my-[0.375rem];
    @apply sm:(text-[1.25rem] rounded-lg my-[0.75rem]);
    > .controller {
      @include button-gradient;
      @apply font-bold text-[0.875rem] rounded-md px-[0.5rem] py-[0.25rem] border cursor-pointer;
      @apply sm:(text-[1.125rem] px-[1rem] py-[0.5rem]);
    }
  }
}
</style>
