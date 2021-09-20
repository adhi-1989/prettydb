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
        version: "0.8.4",
        releaseDate: "2021-09-20",
        logs: [
          "ウマ娘「アグネスデジタル: 超特急！フルカラー特殊PP」のデータを追加",
          "スキル「前列狙い」のデータを追加",
          "スキル「ウママニア」のデータを追加",
          "スキル「狙うは最前列！」のデータを追加",
          "サポートカード「ファインモーション: GRMAラーメン♪」のデータを追加",
          "サポートカード「イクノディクタス: 心と足元は温かく」のデータを追加",
        ],
      },
      {
        version: "0.8.3",
        releaseDate: "2021-09-10",
        logs: [
          "ウマ娘「ヒシアケボノ: ボーノ☆アラモーダ」のデータを追加",
          "スキル「準備万全！」のデータを追加",
        ],
      },
      {
        version: "0.8.2",
        releaseDate: "2021-09-01",
        logs: ["スキル「アオハル点火（燃焼）」のデータ（根・賢）を追加"],
      },
      {
        version: "0.8.1",
        releaseDate: "2021-08-30",
        logs: [
          "ウマ娘「マチカネフクキタル: 吉兆・初あらし」のデータを追加",
          "スキル「怒涛の追い上げ」のデータを追加",
          "スキル「アオハル点火（燃焼）」のデータ（速・体・力）を追加",
        ],
      },
      {
        version: "0.8.0",
        releaseDate: "2021-08-28",
        logs: [
          "画面デザインの改善",
          "スキル「チャート急上昇！」のデータが抜けていたので追加",
          "スキル「アクセル全開！」のデータが抜けていたので追加",
          "スキル「疾風怒濤」のデータが抜けていたので追加",
          "スキル「悩殺術」のデータが抜けていたので追加",
          "スキル「眠れる獅子」のデータが抜けていたので追加",
          "スキル「迫る影」のデータが抜けていたので追加",
          "スキル「姉御肌」のデータが抜けていたので追加",
          "スキル「神業ステップ」のデータが抜けていたので追加",
          "スキル「シックスセンス」のデータが抜けていたので追加",
        ],
      },
      {
        version: "0.7.10",
        releaseDate: "2021-08-20",
        logs: [
          "殿堂入りウマ娘 データ管理画面をメインにレイアウト・機能の改修",
          "ウマ娘「エイシンフラッシュ: Meisterschaft」のデータを追加",
        ],
      },
      {
        version: "0.7.9",
        releaseDate: "2021-08-11",
        logs: [
          "ウマ娘「メイショウドトウ: ブルー/レイジング」のデータを追加",
          "スキル「ライトニングステップ」のデータが抜けていたので追加",
          "スキル「決意の直滑降」のデータが抜けていたので追加",
          "スキル「切り開く者」のデータが抜けていたので追加",
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
          "ウマ娘「スペシャルウィーク: ほっぴん♪ビタミンハート」のデータを追加",
          "ウマ娘「マルゼンスキー: ぶっとび☆さまーナイト」のデータを追加",
          "スキル「天命士」のデータを追加",
          "弱点系スキルのデータを4種類追加",
        ],
      },
      {
        version: "0.7.6",
        releaseDate: "2021-07-20",
        logs: [
          "ウマ娘「ゴールドシチー: オーセンティック/1928」のデータを追加",
          "スキル「くじけぬ精神」のデータを追加",
          "スキル「プランX」のデータが抜けていたので追加",
        ],
      },
      {
        version: "0.7.5",
        releaseDate: "2021-07-18",
        logs: [
          "PWAに対応、アプリを端末にインストールすることが可能になった",
          "殿堂入りウマ娘 データ管理の画面にて一部レイアウトを変更",
          "スキル「仕掛け準備」のデータが抜けていたので追加",
        ],
      },
      {
        version: "0.7.4",
        releaseDate: "2021-07-12",
        logs: [
          "ウマ娘「フジキセキ: シューティンスタァ・ルヴュ」のデータを追加",
          "スキル「勝利への執念」のデータを追加",
        ],
      },
      {
        version: "0.7.3",
        releaseDate: "2021-07-08",
        logs: [
          "ホーム画面と変更履歴画面のバックグラウンドにパーティクルアニメーションを追加",
          "一部グラフィックの改善",
          "スキル「内的体験」のデータを追加",
        ],
      },
      {
        version: "0.7.2",
        releaseDate: "2021-06-29",
        logs: [
          "ウマ娘「エルコンドルパサー: クルルカン・モンク」のデータを追加",
          "ウマ娘「グラスワンダー: セイントジェード・ヒーラー」のデータを追加",
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
