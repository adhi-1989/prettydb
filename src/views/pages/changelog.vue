<template>
  <article class="changelog-root">
    <section class="content">
      <h1 class="version">v0.7.8</h1>
      <div class="release-date">公開日: 2021-07-31</div>
      <ul class="changelogs">
        <li class="log-item">
          殿堂入りウマ娘のデータをバックアップ・インポートする機能を追加
        </li>
      </ul>
    </section>
    <section class="content">
      <h1 class="version">v0.7.7</h1>
      <div class="release-date">公開日: 2021-07-29</div>
      <ul class="changelogs">
        <li class="log-item">
          スペシャルウィーク[ほっぴん♪ビタミンハート] のデータを追加
        </li>
        <li class="log-item">
          マルゼンスキー[ぶっとび☆さまーナイト] のデータを追加
        </li>
        <li class="log-item">天命士 のスキルデータを追加</li>
        <li class="log-item">弱点系スキルのデータを4種類追加</li>
      </ul>
    </section>
    <section class="content">
      <h1 class="version">v0.7.6</h1>
      <div class="release-date">公開日: 2021-07-20</div>
      <ul class="changelogs">
        <li class="log-item">
          ゴールドシチー[オーセンティック/1928] のデータを追加
        </li>
        <li class="log-item">くじけぬ精神 のスキルデータを追加</li>
        <li class="log-item">プランX のスキルデータが抜けていたので追加</li>
      </ul>
    </section>
    <section class="content">
      <h1 class="version">v0.7.5</h1>
      <div class="release-date">公開日: 2021-07-18</div>
      <ul class="changelogs">
        <li class="log-item">
          PWAに対応、アプリを端末にインストールすることが可能になった
        </li>
        <li class="log-item">仕掛け準備 のスキルデータが抜けていたので追加</li>
        <li class="log-item">
          殿堂入りウマ娘 データ管理の画面にて一部レイアウトを変更
        </li>
      </ul>
    </section>
    <section class="content">
      <h1 class="version">v0.7.4</h1>
      <div class="release-date">公開日: 2021-07-12</div>
      <ul class="changelogs">
        <li class="log-item">
          フジキセキ[シューティンスタァ・ルヴュ] のデータを追加
        </li>
        <li class="log-item">勝利への執念 のスキルデータを追加</li>
      </ul>
    </section>
    <section class="content">
      <h1 class="version">v0.7.3</h1>
      <div class="release-date">公開日: 2021-07-08</div>
      <ul class="changelogs">
        <li class="log-item">内的体験 のスキルデータを追加</li>
        <li class="log-item">
          ホーム画面と変更履歴画面のバックグラウンドにパーティクルアニメーションを追加
        </li>
        <li class="log-item">一部グラフィックの改善</li>
      </ul>
    </section>
    <section class="content">
      <h1 class="version">v0.7.2</h1>
      <div class="release-date">公開日: 2021-06-29</div>
      <ul class="changelogs">
        <li class="log-item">
          エルコンドルパサー[クルルカン・モンク] のデータを追加
        </li>
        <li class="log-item">
          グラスワンダー[セイントジェード・ヒーラー] のデータを追加
        </li>
      </ul>
    </section>
    <section class="content">
      <h1 class="version">v0.7.1</h1>
      <div class="release-date">公開日: 2021-06-25</div>
      <ul class="changelogs">
        <li class="log-item">スキルにアイコンが表示されるようになった</li>
      </ul>
    </section>
    <section class="content">
      <h1 class="version">v0.7.0</h1>
      <div class="release-date">公開日: 2021-06-23</div>
      <ul class="changelogs">
        <li class="log-item">新規公開</li>
      </ul>
    </section>
  </article>
  <teleport to="#background">
    <horseshoe-particles class="h-full w-full" />
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useHead } from "~/@vueuse/head";
import { useI18n } from "~/vue-i18n";
import logo from "#/images/app/logo.svg";
import HorseshoeParticles from "@/views/components/HorseshoeParticles.vue";

export default defineComponent({
  components: { HorseshoeParticles },
  data() {
    return {
      logo,
    };
  },
  setup() {
    const { t } = useI18n();
    useHead({
      title: t("pages.changelog.title"),
      meta: [
        { name: "description", content: t("pages.changelog.description") },
      ],
    });
    const ja = ref(false);
    return {
      ja,
    };
  },
});
</script>

<style lang="scss">
.changelog-root {
  @apply flex flex-col gap-y-[1rem] py-[2rem];
  > .content {
    @apply border-2 rounded-lg w-[90%] max-w-[40rem] mx-auto p-[0.75rem] shadow-sm bg-[#fefefe];
    @apply xs:(w-[70%] p-[1.25rem]);
    > .version {
      @apply text-[1rem] leading-tight;
      @apply xs:(text-[1.125rem] leading-snug);
    }
    > .release-date {
      @apply text-[0.75rem] leading-tight;
      @apply xs:(text-[0.875rem] leading-snug);
    }
    > .changelogs {
      @apply flex flex-col gap-y-[0.375rem] mt-[0.75rem];
      @apply xs:mt-[1rem];
      > .log-item {
        @apply list-disc list-inside text-[0.875rem] leading-tight;
        @apply xs:(text-[1rem] leading-snug);
      }
    }
  }
}
</style>
