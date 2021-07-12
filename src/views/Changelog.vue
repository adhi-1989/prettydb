<template>
  <article class="changelog-root">
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
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Changelog",
});
</script>

<style lang="scss">
.changelog-root {
  @apply flex flex-col gap-y-[1rem] py-[2rem];
  > .content {
    @apply border-2 rounded-lg w-[90%] max-w-[40rem] mx-auto p-[0.75rem] shadow-sm bg-[color:var(--app-bg-color-primary-default)];
    @apply xs:w-[70%] xs:p-[1.25rem];
    > .version {
      @apply text-[1rem];
      @apply xs:text-[1.125rem];
    }
    > .release-date {
      @apply text-[0.75rem];
      @apply xs:text-[0.875rem];
    }
    > .changelogs {
      @apply mt-[0.75rem];
      @apply xs:mt-[1rem];
      > .log-item {
        @apply list-disc list-inside text-[0.875rem];
        @apply xs:text-[1rem];
      }
    }
  }
}
</style>
