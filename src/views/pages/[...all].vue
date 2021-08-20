<template>
  <article class="notfound-root">
    <main class="notfound">
      <div class="my-container">
        <img class="image" :src="notfound" alt="" />
      </div>
      <div class="caption">そんなページはありません！！</div>
    </main>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useHead } from "@vueuse/head";
import { useI18n } from "vue-i18n";
import notfound from "#/images/app/notfound.svg";

export default defineComponent({
  data() {
    return {
      notfound,
    };
  },
  setup() {
    const { t } = useI18n();
    useHead({
      title: t("head.404.title"),
      meta: [{ name: "description", content: t("head.404.description") }],
    });
    return {};
  },
});
</script>

<style lang="scss">
.notfound-root {
  @apply select-none h-full;

  > .notfound {
    @apply h-full flex flex-col;

    > .my-container {
      @apply bg-[#1b164e];
      @apply portrait:max-h-[calc(100%-6vh)];
      @apply landscape:max-h-[calc(100%-6vw)];

      > .image {
        @apply w-full h-full object-contain object-left-top;
      }
    }

    > .caption {
      @apply bg-[#000] text-center text-[#fefefe];
      @apply portrait:(text-[4vh] py-[1.1vh]);
      @apply landscape:(text-[4vw] py-[1.1vw]);
    }
  }
}
</style>
