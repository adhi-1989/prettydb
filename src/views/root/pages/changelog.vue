<template>
  <article :class="$style.changelog">
    <section
      :class="$style.content"
      v-for="item in changelog"
      :key="item.version"
    >
      <h1 :class="$style.version">v{{ item.version }}</h1>
      <div :class="$style.update">公開日: {{ item.releaseDate }}</div>
      <ul :class="$style.logs">
        <li :class="$style.log" v-for="log in item.logs" :key="log">
          {{ log }}
        </li>
      </ul>
    </section>
  </article>

  <client-only>
    <teleport to="#background">
      <horseshoe-particles :class="$style.background" />
    </teleport>
  </client-only>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from "vue";
import { useHead } from "@vueuse/head";
import { useI18n } from "vue-i18n";
import { changelog } from "@/views/root/logic/changelog";

const HorseshoeParticles = defineAsyncComponent(
  () => import("@/views/_common/components/screen/HorseshoeParticles.vue")
);

const { t } = useI18n();

useHead({
  title: t("head.changelog.title"),
  meta: [{ name: "description", content: t("head.changelog.description") }],
});
</script>

<style lang="scss" module>
.background {
  @apply w-full h-full;
}

.changelog {
  @apply flex flex-col gap-y-[2rem] py-[1rem];

  > .content {
    @apply border-2 rounded-lg w-[18rem] mx-auto p-[0.75rem] shadow-sm bg-[#fefefe];
    @apply sm:(w-[24.25rem] p-[1rem]);
    @apply md:(w-[32rem] p-[1.5rem]);
    @apply lg:(w-[40rem]);

    > .version {
      @apply text-lg;
      @apply sm:(text-xl);
      @apply md:(text-2xl);
    }

    > .update {
      @apply text-sm;
      @apply sm:(text-base);
      @apply md:(text-lg);
    }

    > .logs {
      @apply flex flex-col gap-y-[0.5rem] mt-[1rem] p-[0.75rem] rounded-md bg-[#f2f2f2];
      @apply sm:(gap-y-[0.75rem]);
      @apply md:(gap-y-[1rem]);

      > .log {
        @apply list-disc list-inside text-xs;
        @apply sm:(text-sm);
        @apply md:(text-base);
      }
    }
  }
}
</style>
