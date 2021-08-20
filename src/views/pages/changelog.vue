<template>
  <article class="changelog-root">
    <section class="content" v-for="log in logs" :key="log.version">
      <h1 class="version">v{{ log.version }}</h1>
      <div class="release-date">公開日: {{ log.releaseDate }}</div>
      <ul class="changelogs">
        <li class="log-item" v-for="change in log.changes" :key="change">
          {{ change }}
        </li>
      </ul>
    </section>
  </article>
  <teleport to="#background">
    <horseshoe-particles class="h-full w-full" />
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useHead } from "@vueuse/head";
import { useI18n } from "vue-i18n";
import HorseshoeParticles from "@/views/components/HorseshoeParticles.vue";
import logo from "#/images/app/logo.svg";

type Changelog = {
  version: string;
  releaseDate: string;
  changes: Array<string>;
};

export default defineComponent({
  components: { HorseshoeParticles },
  data() {
    //TODO: jsonにして外部から読み込むようにする
    //TODO: 余裕があれば国際化する
    const logs: Array<Changelog> = [
      {
        version: "0.7.9",
        releaseDate: "2021-08-11",
        changes: [
          "メイショウドトウ[ブルー/レイジング] のデータを追加",
          "ライトニングステップ のスキルデータが抜けていたので追加",
          "決意の直滑降 のスキルデータが抜けていたので追加",
          "切り開く者 のスキルデータが抜けていたので追加",
          "評価点のランク閾値を修正",
          "殿堂入りウマ娘のデータ編集画面で、ユニークスキルが正常に表示されない問題を修正",
        ],
      },
      {
        version: "0.7.8",
        releaseDate: "2021-07-31",
        changes: [
          "殿堂入りウマ娘のデータをバックアップ・インポートする機能を追加",
        ],
      },
      {
        version: "0.7.7",
        releaseDate: "2021-07-29",
        changes: [
          "スペシャルウィーク[ほっぴん♪ビタミンハート] のデータを追加",
          "マルゼンスキー[ぶっとび☆さまーナイト] のデータを追加",
          "天命士 のスキルデータを追加",
          "弱点系スキルのデータを4種類追加",
        ],
      },
      {
        version: "0.7.6",
        releaseDate: "2021-07-20",
        changes: [
          "ゴールドシチー[オーセンティック/1928] のデータを追加",
          "くじけぬ精神 のスキルデータを追加",
          "プランX のスキルデータが抜けていたので追加",
        ],
      },
      {
        version: "0.7.5",
        releaseDate: "2021-07-18",
        changes: [
          "PWAに対応、アプリを端末にインストールすることが可能になった",
          "仕掛け準備 のスキルデータが抜けていたので追加",
          "殿堂入りウマ娘 データ管理の画面にて一部レイアウトを変更",
        ],
      },
      {
        version: "0.7.4",
        releaseDate: "2021-07-12",
        changes: [
          "フジキセキ[シューティンスタァ・ルヴュ] のデータを追加",
          "勝利への執念 のスキルデータを追加",
        ],
      },
      {
        version: "0.7.3",
        releaseDate: "2021-07-08",
        changes: [
          "内的体験 のスキルデータを追加",
          "ホーム画面と変更履歴画面のバックグラウンドにパーティクルアニメーションを追加",
          "一部グラフィックの改善",
        ],
      },
      {
        version: "0.7.2",
        releaseDate: "2021-06-29",
        changes: [
          "エルコンドルパサー[クルルカン・モンク] のデータを追加",
          "グラスワンダー[セイントジェード・ヒーラー] のデータを追加",
        ],
      },
      {
        version: "0.7.1",
        releaseDate: "2021-06-25",
        changes: ["スキルにアイコンが表示されるようになった"],
      },
      {
        version: "0.7.0",
        releaseDate: "2021-06-23",
        changes: ["新規公開"],
      },
    ];
    return {
      logo,
      logs,
    };
  },
  setup() {
    const { t } = useI18n();
    useHead({
      title: t("head.changelog.title"),
      meta: [{ name: "description", content: t("head.changelog.description") }],
    });
    return {};
  },
});
</script>

<style lang="scss">
.changelog-root {
  @apply flex flex-col gap-y-[1rem] py-[2rem];

  > .content {
    @apply border-2 rounded-lg w-[18rem] mx-auto p-[0.75rem] shadow-sm bg-[#fefefe];
    @apply sm:(w-[24.25rem] p-[1rem]);
    @apply md:(w-[32rem] p-[1.5rem]);
    @apply lg:(w-[40rem]);

    > .version {
      @apply text-[1rem] leading-tight;
      @apply sm:(text-[1.125rem] leading-snug);
    }

    > .release-date {
      @apply text-[0.75rem] leading-tight;
      @apply sm:(text-[0.875rem] leading-snug);
    }

    > .changelogs {
      @apply flex flex-col gap-y-[0.375rem] mt-[0.75rem];
      @apply sm:mt-[1rem];

      > .log-item {
        @apply list-disc list-inside text-[0.875rem] leading-tight;
        @apply sm:(text-[1rem] leading-snug);
      }
    }
  }
}
</style>
