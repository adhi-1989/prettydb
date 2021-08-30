<template>
  <transition @enter="fadeInUp" @leave="fadeOut">
    <section :class="$style.prompt" v-if="needRefresh">
      <div :class="$style.message">{{ t("app.pwa.needRefresh") }}</div>
      <div :class="$style.buttons">
        <button :class="$style.button" @click="updateServiceWorker()">
          {{ t("ui.reload") }}
        </button>
        <button :class="$style.button" @click="closeToast">
          {{ t("ui.close") }}
        </button>
      </div>
    </section>
  </transition>
</template>

<script lang="ts" setup>
import { useRegisterSW } from "virtual:pwa-register/vue";
import { animations } from "@/views/_common/logic/dom/animation";

const fadeInUp = animations.fadeInUp({
  duration: 250,
});
const fadeOut = animations.fadeOut({
  duration: 250,
  easing: "ease",
});

const { needRefresh, updateServiceWorker } = useRegisterSW();
const closeToast = async () => {
  needRefresh.value = false;
};
</script>

<style lang="scss" module>
.prompt {
  @apply absolute right-[0.75rem] bottom-[0.75rem] w-[18rem] p-[0.5rem] rounded bg-[#fefefe] border shadow;
  @apply sm:(w-[22rem]);
  @apply md:(w-[24rem]);

  > .message {
    @apply text-xs;
    @apply sm:(text-sm);
    @apply md:(text-base);
  }

  > .buttons {
    @apply flex justify-around mt-[0.75rem];

    > .button {
      @apply text-sm px-[0.5rem] rounded border border-[#d0d0d0];
      @apply sm:(text-base px-[1rem]);
      @apply md:(text-lg);

      &:before {
        content: "";
        @apply inline-block h-[1.25rem] align-middle;
        @apply sm:(h-[1.5rem]);
        @apply md:(h-[1.75rem]);
      }
    }
  }
}
</style>
