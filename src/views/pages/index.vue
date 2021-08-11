<template>
  <article class="home-root">
    <header class="header">
      <img class="logo" :src="logo" alt="" />
      <span class="version">v0.7.9</span>
    </header>

    <main class="main">
      <section class="outline content">
        <span class="heading level-1">「プリティーデービー」とは？</span>
        <p class="text-block">
          「株式会社Cygames」様より提供・運営されているアプリケーション 「ウマ娘
          プリティーダービー」に関するデータを参照したり登録したりできるデータベースアプリです。
        </p>
        <section class="section warning">
          <span class="heading level-4">＊＊ 注意 ＊＊</span>
          <p class="text-block">
            このアプリはブラウザにデータを保存します。
            そのため、プライベートウィンドウでこのアプリを利用するとデータが正常に保存されない恐れがあります。
            このアプリを利用する際はプライベートウィンドウをつかわないようにお願いします。
          </p>
        </section>
        <section class="section features">
          <span class="heading level-4">公開中の機能一覧</span>
          <ul class="list block">
            <li class="list-item">
              <router-link class="link" to="/hall-of-fame">
                殿堂入りウマ娘
              </router-link>
            </li>
            <li class="list-item no-disc">
              <p>
                殿堂入りしたウマ娘のデータを手動で入力することで、アプリにデータを保存・閲覧することができます。
              </p>
            </li>
            <li class="list-item">
              <router-link class="link" to="/settings">
                <icon-ion-settings class="icon" />
                (設定)
              </router-link>
            </li>
            <li class="list-item no-disc">
              <p>
                入力した殿堂入りウマ娘のデータをバックアップ・インポートすることができます。
              </p>
            </li>
          </ul>
        </section>
      </section>

      <section class="content development">
        <span class="heading level-1">開発について</span>
        <section class="section changelog">
          <span class="heading level-4">変更履歴</span>
          <div class="block">
            <router-link class="link" to="/changelog">
              変更履歴（別ページ）へ移動します
            </router-link>
          </div>
        </section>
        <section class="section todo-list">
          <span class="heading level-4">やることリスト</span>
          <div class="block">
            <span class="heading level-6">[ 殿堂入りデータ管理 ]</span>
            <ul class="list">
              <li class="list-item">
                登録したデータの検索・ソート機能を追加する
              </li>
              <li class="list-item">登録したデータを削除できるようにする</li>
              <li class="list-item">
                登録したデータをダウンロード・インポートできるようにする
              </li>
              <li class="list-item">
                スキル・因子一覧の絞り込み機能を強化する
              </li>
              <li class="list-item">
                データ入力時、キーボードで操作できるようにする
              </li>
              <li class="list-item">
                スキルや因子などをクリックしたとき、詳細を見られるようにする
              </li>
              <li class="list-item">
                スキル、因子の編集画面が重いので改善する
              </li>
              <li class="list-item">
                データ登録画面のユーザビリティ向上。
                <!-- キャラクターを選択したときに各種適性やユニークスキルを自動でセットするなど -->
              </li>
            </ul>
          </div>
        </section>
      </section>

      <section class="content issues">
        <span class="heading level-1">要望・バグについて</span>
        <p class="text-block">
          要望やバグ報告はつねに歓迎しております。 Twitter( @Adhi_1989
          )までメンションかDMを送っていただくか、
          Issuesから新規にissueを作成していただけると助かります。
        </p>
        <ul class="list block">
          <li class="list-item">
            <a
              class="link"
              href="https://twitter.com/Adhi_1989"
              target="_blank"
            >
              Twitterを別タブで開きます
            </a>
          </li>
          <li class="list-item">
            <a
              class="link"
              href="https://github.com/adhi-1989/prettydb/issues"
              target="_blank"
            >
              Issuesを別タブで開きます
            </a>
          </li>
        </ul>
      </section>

      <section class="content license">
        <span class="heading level-1">ライセンス</span>
        <p class="text-block">
          プリティーデービーはMITライセンスのもと、開発・公開されています。
          あなたはプリティーデービーを（MITライセンスの認める限り）自由に利用できますが、そこに一切の保証はありません。
        </p>
        <section class="section license-article" @click="ja = !ja">
          <span class="heading level-6"
            >＊ クリック（タップ）で表示切り替え ＊</span
          >
          <transition name="license" mode="out-in">
            <p class="text-block" v-if="!ja">
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
            <p class="text-block" v-else>
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
  <teleport to="#background">
    <horseshoe-particles class="h-full w-full" />
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HorseshoeParticles from "@/views/components/HorseshoeParticles.vue";
import logo from "#/images/app/logo.svg";

export default defineComponent({
  components: { HorseshoeParticles },
  data() {
    return {
      logo,
    };
  },
  setup() {
    const ja = ref(false);
    return {
      ja,
    };
  },
});
</script>

<style lang="scss">
.home-root {
  @apply text-[0.75rem] leading-tight;
  @apply xs:(text-[0.875rem] leading-snug);
  @apply sm:(text-[1rem] leading-normal);
  > .header {
    @apply relative w-full max-w-[32rem] mx-auto px-[2rem] py-[1rem];
    @apply xs:py-[2rem];
    > .logo {
      @apply w-[28rem] mx-auto;
    }

    > .version {
      @include text-stroke(#fefefe);
      @apply absolute font-bold text-[1rem] right-[2rem] bottom-0;
      @apply xs:text-[1.25rem] xs:bottom-[1rem];
    }
  }

  > .main {
    @apply flex flex-col gap-y-[2rem] items-center mt-[1rem] mb-[1rem];
    @apply xs:mb-[2rem];
    @apply sm:mb-[3rem];
    > .content {
      @apply border-2 rounded-lg w-[90%] max-w-[40rem] mx-auto p-[0.75rem] shadow-sm bg-[#fefefe];
      @apply xs:w-[70%] xs:p-[1.25rem];
      .heading {
        @apply font-bold;
      }

      .heading.level-1 {
        @apply text-[1.25rem] text-center block;
        @apply xs:text-[1.5rem];
        @apply sm:text-[1.75rem];
      }

      .heading.level-2 {
        @apply text-[1.125rem];
        @apply xs:text-[1.375rem];
        @apply sm:text-[1.625rem];
      }

      .heading.level-3 {
        @apply text-[1rem];
        @apply xs:text-[1.25rem];
        @apply sm:text-[1.5rem];
      }

      .heading.level-4 {
        @apply text-[0.875rem];
        @apply xs:text-[1.125rem];
        @apply sm:text-[1.375rem];
      }

      .heading.level-5 {
        @apply text-[0.75rem];
        @apply xs:text-[1rem];
        @apply sm:text-[1.25rem];
      }

      .section,
      .block,
      .text-block {
        @apply mt-[0.75rem];
        @apply xs:mt-[1rem];
      }

      .list {
        @apply flex flex-col gap-y-[0.375rem];
        > .list-item {
          @apply list-disc list-inside;
          &.no-disc {
            list-style: none;
          }
        }
      }

      .link {
        @apply text-blue-400;
      }

      &.outline {
        > .warning {
          > .heading {
            @apply text-red-500;
          }

          > .text-block {
            @apply text-red-400;
          }
        }

        > .features {
          > .list {
            > .list-item > .link {
              @apply inline-flex items-center;
            }
          }
        }
      }

      &.issues {
        > .list > .list-item {
          @apply mt-[1rem];
        }
      }

      &.license {
        > .license-article {
          @apply bg-[#f2f2f2] p-[0.5rem] leading-normal rounded-md cursor-pointer;
          > .license-enter-active {
            animation: fadeIn;
            animation-duration: 0.25s;
          }

          > .license-leave-active {
            animation: fadeOut;
            animation-duration: 0.25s;
          }
        }
      }
    }
  }
}
</style>
