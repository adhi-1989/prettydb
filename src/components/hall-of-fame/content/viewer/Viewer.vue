<template>
  <!-- viewer -->
  <article class="data-viewer-root">
    <!-- header -->
    <header class="header">
      <span class="text" v-t="'viewer.header'" />
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
import { HallOfFameDTO } from "/@/db/hall-of-fame";
import ProfileView from "/@/components/hall-of-fame/content/viewer/ProfileView.vue";
import StatusView from "/@/components/hall-of-fame/content/viewer/StatusView.vue";
import AbilityView from "/@/components/hall-of-fame/content/viewer/AbilityView.vue";
import MultiContentView from "/@/components/hall-of-fame/content/viewer/MultiContentView.vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "Viewer",
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
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    return {
      t,
    };
  },
});
</script>

<style lang="scss" scoped>
.data-viewer-root {
  @apply flex flex-col rounded-md overflow-hidden h-full bg-[#fafafa];
  user-select: none;
  > .header {
    @apply text-center bg-gradient-to-t from-[#7fbf3cff] via-[#90ca3fff] to-[#a2d543ff] py-[0.25rem];
    > .text {
      @apply font-bold text-[1.125rem] text-[#fefefe];
    }
  }
  > .main-content {
    @apply flex-grow flex flex-col gap-y-[0.375rem];
    > .multi-content-view-container {
      @apply flex-grow h-0;
    }
  }
  > .controller-container {
    &:not(:empty) {
      @apply py-[0.375rem];
    }
  }
}
@screen xs {
  .data-viewer-root {
    @apply max-w-[32rem] mx-auto;
    > .header {
      > .text {
        @apply text-[1.375rem];
      }
    }
    > .main-content {
      @apply gap-y-[0.75rem];
    }
    > .controller-container {
      &:not(:empty) {
        @apply my-[0.5rem];
      }
    }
  }
}
</style>

<i18n locale="ja" src="/locales/ja/app/hall-of-fame.json" />
