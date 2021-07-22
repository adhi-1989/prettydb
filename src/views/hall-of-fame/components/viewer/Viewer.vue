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
import {
  defineComponent,
  inject,
  toRaw,
  isReactive,
  markRaw,
  ref,
  readonly,
} from "vue";
import ProfileView from "@/views/hall-of-fame/components/viewer/ProfileView.vue";
import StatusView from "@/views/hall-of-fame/components/viewer/StatusView.vue";
import AbilityView from "@/views/hall-of-fame/components/viewer/AbilityView.vue";
import MultiContentView from "@/views/hall-of-fame/components/viewer/MultiContentView.vue";
import { useI18n } from "vue-i18n";
import {
  actionInjectionKey,
  fallbackActionFactory,
  fallbackStateFactory,
  stateInjectionKey,
} from "@/views/hall-of-fame/logic/dependency";
import { Dto } from "@/views/hall-of-fame/logic/db";
import _ from "lodash";

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
    @apply flex gap-x-[2rem] justify-center my-[0.375rem];
    @apply xs:(text-[1.25rem] rounded-lg my-[0.5rem] px-[1rem] py-[0.25rem]);
    > .controller {
      @include button-gradient;
      @apply font-bold text-[0.875rem] rounded-md px-[0.5rem] py-[0.25rem] border cursor-pointer;
      @apply xs:(text-[1.125rem] px-[1rem] py-[0.5rem]);
    }
  }
}
</style>
