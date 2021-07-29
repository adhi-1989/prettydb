<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useHead } from "~/@vueuse/head";
import { useI18n } from "~/vue-i18n";
import ogImage from "#/images/app/og-image.png";
import twitterImage from "#/images/app/twitter-image.png";

export default defineComponent({
  setup() {
    const { t } = useI18n();
    const title = t("app.title");
    const description = t("app.description");
    useHead({
      title,
      meta: [
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://prettydb.adhi.jp" },
        {
          property: "og:image",
          content: `https://prettydb.adhi.jp${ogImage}`,
        },
        { name: "twitter:site", content: "@Adhi_1989" },
        { name: "twitter:card", content: "summary" },
        {
          name: "twitter:image:src",
          content: `https://prettydb.adhi.jp${twitterImage}`,
        },
        {
          name: "google-site-verification",
          content: "A1a4Lg8VOWuKDKM-oGfnqlBM51X1BbqfaMHrl0KB0PY",
        },
      ],
    });
    return {};
  },
});
</script>
