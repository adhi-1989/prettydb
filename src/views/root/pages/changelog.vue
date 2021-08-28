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

  <teleport to="#background">
    <horseshoe-particles :class="$style.background" />
  </teleport>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import { useHead } from "@vueuse/head";
import { useI18n } from "vue-i18n";

type Changelog = {
  version: string;
  releaseDate: string;
  logs: Array<string>;
};

export default defineComponent({
  components: {
    HorseshoeParticles: defineAsyncComponent(
      () => import("@/views/_common/components/screen/HorseshoeParticles.vue")
    ),
  },
  data() {
    //TODO: 外部から読み込むようにする？
    //TODO: 余裕があれば国際化する
    const changelog: Array<Changelog> = [
      {
        version: "0.8.0",
        releaseDate: "2021-08-28",
        logs: [
          "画面デザインの改善",
          "チャート急上昇！ のスキルデータが抜けていたので追加",
          "アクセル全開！ のスキルデータが抜けていたので追加",
          "疾風怒濤 のスキルデータが抜けていたので追加",
          "悩殺術 のスキルデータが抜けていたので追加",
          "眠れる獅子 のスキルデータが抜けていたので追加",
          "迫る影 のスキルデータが抜けていたので追加",
          "姉御肌 のスキルデータが抜けていたので追加",
          "神業ステップ のスキルデータが抜けていたので追加",
          "シックスセンス のスキルデータが抜けていたので追加",
        ],
      },
      {
        version: "0.7.10",
        releaseDate: "2021-08-20",
        logs: [
          "エイシンフラッシュ[Meisterschaft] のデータを追加",
          "殿堂入りウマ娘 データ管理画面をメインにレイアウト・機能の改修",
        ],
      },
      {
        version: "0.7.9",
        releaseDate: "2021-08-11",
        logs: [
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
        logs: [
          "殿堂入りウマ娘のデータをバックアップ・インポートする機能を追加",
        ],
      },
      {
        version: "0.7.7",
        releaseDate: "2021-07-29",
        logs: [
          "スペシャルウィーク[ほっぴん♪ビタミンハート] のデータを追加",
          "マルゼンスキー[ぶっとび☆さまーナイト] のデータを追加",
          "天命士 のスキルデータを追加",
          "弱点系スキルのデータを4種類追加",
        ],
      },
      {
        version: "0.7.6",
        releaseDate: "2021-07-20",
        logs: [
          "ゴールドシチー[オーセンティック/1928] のデータを追加",
          "くじけぬ精神 のスキルデータを追加",
          "プランX のスキルデータが抜けていたので追加",
        ],
      },
      {
        version: "0.7.5",
        releaseDate: "2021-07-18",
        logs: [
          "PWAに対応、アプリを端末にインストールすることが可能になった",
          "仕掛け準備 のスキルデータが抜けていたので追加",
          "殿堂入りウマ娘 データ管理の画面にて一部レイアウトを変更",
        ],
      },
      {
        version: "0.7.4",
        releaseDate: "2021-07-12",
        logs: [
          "フジキセキ[シューティンスタァ・ルヴュ] のデータを追加",
          "勝利への執念 のスキルデータを追加",
        ],
      },
      {
        version: "0.7.3",
        releaseDate: "2021-07-08",
        logs: [
          "内的体験 のスキルデータを追加",
          "ホーム画面と変更履歴画面のバックグラウンドにパーティクルアニメーションを追加",
          "一部グラフィックの改善",
        ],
      },
      {
        version: "0.7.2",
        releaseDate: "2021-06-29",
        logs: [
          "エルコンドルパサー[クルルカン・モンク] のデータを追加",
          "グラスワンダー[セイントジェード・ヒーラー] のデータを追加",
        ],
      },
      {
        version: "0.7.1",
        releaseDate: "2021-06-25",
        logs: ["スキルにアイコンが表示されるようになった"],
      },
      {
        version: "0.7.0",
        releaseDate: "2021-06-23",
        logs: ["新規公開"],
      },
    ];
    return {
      changelog,
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
