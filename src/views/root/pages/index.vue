<template>
  <article :class="$style.home">
    <header :class="$style.header">
      <img :class="$style.logo" :src="logo" alt="" />
      <span :class="$style.version">v0.8.5</span>
    </header>

    <main :class="$style.main">
      <section :class="[$style.content, $style.outline]">
        <h1 :class="[$style.heading, $style.level1, $style.centering]">
          「プリティーデービー」とは？
        </h1>
        <p :class="$style.paragraph">
          「株式会社Cygames」様より提供・運営されているアプリケーション 「ウマ娘
          プリティーダービー」に関するデータを参照したり登録したりできるデータベースアプリです。
        </p>

        <section :class="[$style.section, $style.warning]">
          <h2 :class="[$style.heading, $style.level2]">＊＊ 注意 ＊＊</h2>
          <p :class="$style.paragraph">
            このアプリはブラウザにデータを保存します。
            そのため、プライベートウィンドウでこのアプリを利用するとデータが正常に保存されない恐れがあります。
            このアプリを利用する際はプライベートウィンドウをつかわないようにお願いします。
          </p>
        </section>

        <section :class="$style.section">
          <h2 :class="[$style.heading, $style.level2]">公開中の機能一覧</h2>
          <ul :class="[$style.block, $style.list]">
            <li :class="$style.item">
              <router-link :class="$style.link" to="/hall-of-fame">
                殿堂入りウマ娘
              </router-link>
              <p :class="$style.paragraph">
                殿堂入りしたウマ娘のデータを手動で入力することで、アプリにデータを保存・閲覧することができます。
                <br />
                ＊
                <a
                  :class="$style.link"
                  href="https://youtu.be/m5GLTsTuD-Y"
                  target="_blank"
                  rel="noreferrer"
                  >YouTube</a
                >でデータを登録するまでの一連の流れを確認できます。 ＊
              </p>
            </li>

            <li :class="$style.item">
              <router-link :class="$style.link" to="/settings">
                設定
              </router-link>
              <p :class="$style.paragraph">
                入力した殿堂入りウマ娘のデータをバックアップ・インポートすることができます。
              </p>
            </li>
          </ul>
        </section>
      </section>

      <section :class="$style.content">
        <h1 :class="[$style.heading, $style.level1, $style.centering]">
          開発について
        </h1>

        <section :class="[$style.section, $style.changelog]">
          <h2 :class="[$style.heading, $style.level2]">変更履歴</h2>
          <div :class="$style.block">
            <router-link :class="$style.link" to="/changelog">
              変更履歴（別ページ）へ移動します
            </router-link>
          </div>
        </section>

        <section :class="[$style.section]">
          <h2 :class="[$style.heading, $style.level2]">やることリスト</h2>
          <div :class="$style.block">
            <h3 :class="[$style.heading, $style.level3]">
              [ 殿堂入りウマ娘 データ管理 ]
            </h3>
            <ul :class="[$style.list, $style.block]">
              <li :class="$style.item">
                登録したデータの検索・ソート機能を追加する
              </li>
              <li :class="$style.item">登録したデータを削除できるようにする</li>
              <li :class="$style.item">
                データ入力時、キーボードで操作できるようにする
              </li>
              <li :class="$style.item">
                スキルや因子などをクリックしたとき、詳細を見られるようにする
              </li>
              <li :class="$style.item">
                データ登録画面のユーザビリティ向上。
                <!-- キャラクターを選択したときに各種適性やユニークスキルを自動でセットするなど -->
              </li>
            </ul>
          </div>
        </section>
      </section>

      <section :class="$style.content">
        <h1 :class="[$style.heading, $style.level1, $style.centering]">
          要望・バグについて
        </h1>
        <p :class="$style.paragraph">
          要望やバグ報告はつねに歓迎しております。
          TwitterまでメンションかDMを送っていただくか、
          Issuesから新規にissueを作成していただけると助かります。
        </p>

        <ul :class="[$style.section, $style.list]">
          <li :class="$style.item">
            <a
              :class="$style.link"
              href="https://twitter.com/Adhi_1989"
              target="_blank"
              rel="noreferrer"
            >
              Twitterを別タブで開きます
            </a>
          </li>

          <li :class="$style.item">
            <a
              :class="$style.link"
              href="https://github.com/adhi-1989/prettydb/issues"
              target="_blank"
              rel="noreferrer"
            >
              Issuesを別タブで開きます
            </a>
          </li>
        </ul>
      </section>

      <section :class="[$style.content, $style.license]">
        <h1 :class="[$style.heading, $style.level1, $style.centering]">
          ライセンス
        </h1>
        <p :class="$style.paragraph">
          プリティーデービーはMITライセンスのもと、開発・公開されています。
          あなたはプリティーデービーを（MITライセンスの認める限り）自由に利用できますが、そこに一切の保証はありません。
        </p>

        <section
          :class="[$style.section, $style.article]"
          @click="toggleLocalized()"
        >
          <h2 :class="[$style.heading, $style.level4, $style.centering]">
            ＊ クリック（タップ）で表示切り替え ＊
          </h2>
          <transition
            name="license"
            mode="out-in"
            @enter="fadeIn"
            @leave="fadeOut"
          >
            <p :class="$style.paragraph" v-if="!isLocalized">
              The MIT License<br />
              Copyright 2021 adhi-1989<br />
              <br />
              Permission is hereby granted, free of charge, to any person
              obtaining a copy of this software and associated documentation
              files (the "Software"), to deal in the Software without
              restriction, including without limitation the rights to use, copy,
              modify, merge, publish, distribute, sublicense, and/or sell copies
              of the Software, and to permit persons to whom the Software is
              furnished to do so, subject to the following conditions:<br />
              <br />
              The above copyright notice and this permission notice shall be
              included in all copies or substantial portions of the Software.<br />
              <br />
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
              NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
              HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
              WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
              DEALINGS IN THE SOFTWARE.
            </p>
            <p :class="$style.paragraph" v-else>
              The MIT License<br />
              Copyright (c) 2021 adhi-1989<br />
              <br />
              以下に定める条件に従い、本ソフトウェアおよび関連文書のファイル（以下「ソフトウェア」）の複製を取得するすべての人に対し、ソフトウェアを無制限に扱うことを無償で許可します。これには、ソフトウェアの複製を使用、複写、変更、結合、掲載、頒布、サブライセンス、および/または販売する権利、およびソフトウェアを提供する相手に同じことを許可する権利も無制限に含まれます。<br />
              <br />
              上記の著作権表示および本許諾表示を、ソフトウェアのすべての複製または重要な部分に記載するものとします。<br />
              <br />
              ソフトウェアは「現状のまま」で、明示であるか暗黙であるかを問わず、何らの保証もなく提供されます。ここでいう保証とは、商品性、特定の目的への適合性、および権利非侵害についての保証も含みますが、それに限定されるものではありません。
              作者または著作権者は、契約行為、不法行為、またはそれ以外であろうと、ソフトウェアに起因または関連し、あるいはソフトウェアの使用またはその他の扱いによって生じる一切の請求、損害、その他の義務について何らの責任も負わないものとします。
            </p>
          </transition>
        </section>
      </section>
    </main>
  </article>

  <client-only>
    <teleport to="#background">
      <horseshoe-particles :class="$style.background" />
    </teleport>
  </client-only>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import { useToggle } from "@vueuse/core";
import { fadeIn, fadeOut } from "@/views/_common/logic/dom/animation";
import logo from "#/images/app/logo.svg";

export default defineComponent({
  components: {
    HorseshoeParticles: defineAsyncComponent(
      () => import("@/views/_common/components/screen/HorseshoeParticles.vue")
    ),
  },
  data() {
    return {
      fadeIn: fadeIn({
        duration: 125,
        easing: "ease",
      }),
      fadeOut: fadeOut({
        duration: 125,
        easing: "ease",
      }),
      logo,
    };
  },
  setup() {
    const [isLocalized, toggleLocalized] = useToggle();

    return {
      isLocalized,
      toggleLocalized,
    };
  },
});
</script>

<style lang="scss" module>
.background {
  @apply w-full h-full;
}

.home {
  @apply text-xs leading-tight;
  @apply sm:(text-sm leading-snug);
  @apply xl:(text-base leading-normal);

  > .header {
    @apply relative w-[18rem] mx-auto my-[1.5rem];
    @apply sm:(w-[24.25rem] my-[2rem]);
    @apply xl:(w-[32rem] my-[3rem]);

    > .logo {
      @apply w-[18rem] h-[2.25rem];
      @apply sm:(w-[24.25rem] h-[3rem]);
      @apply xl:(w-[32rem] h-[4rem]);
    }

    > .version {
      @include text-stroke(#fefefe);
      @apply absolute font-bold text-xs right-0 bottom-[-0.5rem];
      @apply sm:(text-base bottom-[-0.75rem]);
      @apply xl:(text-xl bottom-[-0.875rem]);
    }
  }

  > .main {
    @apply flex flex-col gap-y-[2rem] my-[1rem];
    @apply sm:(mb-[2rem]);
    @apply xl:(mb-[3rem]);

    > .content {
      @apply border-2 rounded-lg w-[18rem] mx-auto p-[0.75rem] shadow-sm bg-[#fefefe];
      @apply sm:(w-[24.25rem] p-[1rem]);
      @apply md:(w-[32rem] p-[1.5rem]);
      @apply lg:(w-[40rem]);

      .centering {
        @apply text-center;
      }

      .heading {
        @apply font-bold;
      }

      .heading.level1 {
        @apply text-lg;
        @apply sm:(text-xl);
        @apply md:(text-2xl);
      }

      .heading.level2 {
        @apply text-base;
        @apply sm:(text-lg);
        @apply md:(text-xl);
      }

      .heading.level3 {
        @apply text-sm;
        @apply sm:(text-base);
        @apply md:(text-lg);
      }

      .heading.level4 {
        @apply text-xs;
        @apply sm:(text-sm);
        @apply md:(text-base);
      }

      .section {
        @apply mt-[1rem];
        @apply sm:(mt-[1.25rem]);
      }

      .block {
        @apply mt-[0.5rem];
        @apply sm:(mt-[0.75rem]);
      }

      .paragraph {
        @apply mt-[0.25rem];
        @apply sm:(mt-[0.5rem]);
      }

      .list {
        @apply flex flex-col gap-y-[1rem];

        > .item {
          @apply list-disc list-inside;
        }
      }

      .link {
        @apply text-[#01579b];
      }

      &.outline {
        > .warning {
          > .heading {
            @apply text-[#b71c1c];
          }

          > .paragraph {
            @apply text-[#f05545];
          }
        }
      }

      &.license {
        > .article {
          @apply bg-[#f2f2f2] p-[0.5rem] rounded-md cursor-pointer;
        }
      }
    }
  }
}
</style>
