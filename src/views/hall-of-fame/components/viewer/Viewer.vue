<template>
  <article :class="$style.viewer">
    <header :class="$style.header">
      <span :class="$style.text">
        {{ t("pages.hall-of-fame.viewer.header") }}
      </span>
    </header>

    <main :class="$style.main">
      <profile-view />
      <status-view />
      <ability-view />
      <div :class="$style.wrapper">
        <multi-content-view />
      </div>
    </main>

    <footer :class="$style.controllers">
      <slot name="controllers">
        <div :class="$style.controller" @click="openView('editor')">
          <div :class="$style.content">
            <icon-ion-pencil :class="$style.icon" />
            <span :class="$style.text">{{ t("ui.edit") }}</span>
          </div>
        </div>
        <div :class="$style.controller" @click="closeView('viewer')">
          <div :class="$style.content">
            <icon-ion-close :class="$style.icon" />
            <span :class="$style.text">{{ t("ui.close") }}</span>
          </div>
        </div>
      </slot>
    </footer>
  </article>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { useI18n } from "vue-i18n";
import { Action, State } from "@/views/hall-of-fame/logic/dependency";
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

    const { openView, closeView } = Action(inject);
    const { viewData } = State(inject);

    return {
      t,
      viewData,
      openView,
      closeView,
    };
  },
});
</script>

<style lang="scss" module>
.viewer {
  @apply flex flex-col max-w-[32rem] h-full mx-auto rounded border bg-[#fafafa] overflow-hidden;

  > .header {
    @apply text-[#fefefe] text-center py-[0.125rem] bg-gradient-to-t from-[#7fbf3cff] via-[#90ca3fff] to-[#a2d543ff];
    @apply sm:(py-[0.375rem]);

    > .text {
      @apply text-base;
      @apply sm:(text-lg);
      @apply md:(text-xl);
    }
  }

  > .main {
    @apply flex-grow flex flex-col gap-y-[0.5rem];
    @apply sm:(gap-y-[0.75rem]);
    @apply md:(gap-y-[1rem]);

    > .wrapper {
      @apply flex-grow h-0;
    }
  }

  > .controllers {
    @apply flex gap-x-[2rem] justify-center my-[0.375rem];
    @apply sm:(rounded-lg my-[0.75rem]);

    > .controller {
      @include button-border;
      @apply font-bold text-center rounded-lg cursor-pointer;

      > .content {
        @include button-content;
        @apply flex gap-x-[0.25rem] items-center w-full h-full px-[0.5rem] py-[0.25rem] rounded-lg;
        @apply sm:(gap-x-[0.75rem] px-[0.75rem] py-[0.375rem]);
        @apply md:(px-[1rem] border-2);

        > .icon {
          @apply w-[1rem] h-[1rem];
          @apply sm:(w-[1.5rem] h-[1.5rem]);
          @apply md:(w-[2rem] h-[2rem]);
        }

        > .text {
          @apply text-sm;
          @apply sm:(text-lg);
          @apply md:(text-xl);
        }
      }
    }
  }
}
</style>
