<template>
  <article :class="$style.notfound">
    <div :class="$style.screen">
      <img :class="$style.image" :src="notfound" alt="" />
      <div :class="$style.caption">
        <span :class="$style.text">そんなページはありません！！</span>
      </div>
      <div :class="$style.padding"></div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { useHead } from "@vueuse/head";
import { useI18n } from "vue-i18n";
import notfound from "#/images/app/notfound.svg";

const { t } = useI18n();

useHead({
  title: t("head.404.title"),
  meta: [{ name: "description", content: t("head.404.description") }],
});
</script>

<style lang="scss" module>
.notfound {
  @apply select-none h-full;

  > .screen {
    @apply flex flex-col h-full;

    > .image {
      @apply object-contain object-left-top w-full pr-[10%] bg-[#1b164e];
      @apply landscape:(h-[calc(100%-4vw-3vw)]);
    }

    > .caption {
      @apply bg-[#000] text-center text-[#fefefe] py-[1rem];
      @apply portrait:(text-[2vh] py-[1.5vh]);
      @apply portrait:sm:(text-[3vh]);
      @apply landscape:(text-[4vw] py-[1.5vw]);
    }

    > .padding {
      @apply flex-grow h-full;
      @apply landscape:(bg-[#000]);
    }
  }
}
</style>
