<template>
  <article class="home-root text-[0.75rem] xs:text-[1rem]">
    <header
      class="
        w-full
        max-w-[32rem]
        mx-auto
        my-[1.5rem]
        xs:my-[2rem]
        px-[1rem]
        relative
      "
    >
      <logo />
      <span
        class="
          absolute
          right-[1rem]
          xs:right-0
          bottom-[-0.875rem]
          xs:bottom-[-0.6125rem]
          font-bold
          text-[1rem]
          xs:text-[1.25rem]
        "
        >v0.7.1</span
      >
    </header>

    <section
      class="
        border-2
        rounded-lg
        w-[90%]
        xs:w-[70%]
        max-w-[40rem]
        mx-auto
        p-[0.75rem]
        xs:p-[1.25rem]
        shadow-sm
      "
    >
      <h1
        class="
          font-bold
          text-[1rem]
          xs:text-[1.5rem]
          sm:text-[2rem]
          text-center
        "
      >
        「プリティーデービー」とは？
      </h1>
      <p class="mt-[0.75rem] xs:mt-[1rem]">
        「株式会社Cygames」様より提供・運営されているアプリケーション 「ウマ娘
        プリティーダービー」に関するデータを参照したり登録したりできるデータベースアプリです。
      </p>
      <div class="mt-[0.75rem] xs:mt-[1rem]">
        <h2
          class="
            text-red-500
            font-bold
            text-[0.875rem]
            xs:text-[1.25rem]
            sm:text-[1.75rem]
          "
        >
          注意！！
        </h2>
        <p class="text-red-400">
          このアプリはブラウザにデータを保存します。
          そのため、プライベートウィンドウでこのアプリを利用するとデータが正常に保存されない恐れがあります。
          このアプリを利用する際はプライベートウィンドウをつかわないようにお願いします。
        </p>
      </div>
      <div class="mt-[0.75rem] xs:mt-[1rem]">
        <span>現在、公開されている機能は以下のとおりです</span>
        <ul class="px-[0.5rem] py-[1rem]">
          <li class="list-disc list-inside cursor-pointer">
            <router-link to="/hall-of-fame">
              <span class="text-blue-400">殿堂入りデータ管理</span>
            </router-link>
          </li>
        </ul>
      </div>
    </section>

    <section
      class="
        border-2
        rounded-lg
        w-[90%]
        xs:w-[70%]
        max-w-[40rem]
        mx-auto
        p-[0.75rem]
        xs:p-[1.25rem]
        shadow-sm
        mt-[2rem]
      "
    >
      <h1
        class="
          font-bold
          text-[1rem]
          xs:text-[1.5rem]
          sm:text-[2rem]
          text-center
        "
      >
        開発について
      </h1>

      <h2
        class="
          font-bold
          text-[0.875rem]
          xs:text-[1.25rem]
          sm:text-[1.75rem]
          mt-[0.75rem]
          xs:mt-[1rem]
        "
      >
        変更履歴
      </h2>
      <div>
        <router-link to="/changelog">
          <span class="text-blue-400">変更履歴（別ページ）へ移動します</span>
        </router-link>
      </div>

      <h2
        class="
          font-bold
          text-[0.875rem]
          xs:text-[1.25rem]
          sm:text-[1.75rem]
          mt-[0.75rem]
          xs:mt-[1rem]
        "
      >
        やることリスト
      </h2>
      <section class="mt-[0.25rem]">
        <span class="font-bold">[ 殿堂入りデータ管理 ]</span>
        <ul>
          <li class="ml-[0.25rem] list-disc list-inside">
            スキル、因子の編集画面が重いので改善する
          </li>
          <li class="ml-[0.25rem] list-disc list-inside">
            登録したデータの検索・ソート機能を追加する
          </li>
          <li class="ml-[0.25rem] list-disc list-inside">
            データ入力時、キーボードで操作できるようにする
          </li>
          <li class="ml-[0.25rem] list-disc list-inside">
            スキルや因子などをクリックしたとき、詳細を見られるようにする
          </li>
          <li class="ml-[0.25rem] list-disc list-inside">
            グラフィック・デザインの改善
          </li>
        </ul>
      </section>
    </section>

    <section
      class="
        border-2
        rounded-lg
        w-[90%]
        xs:w-[70%]
        max-w-[40rem]
        mx-auto
        p-[0.75rem]
        xs:p-[1.25rem]
        shadow-sm
        mt-[2rem]
      "
    >
      <h1
        class="
          font-bold
          text-[1rem]
          xs:text-[1.5rem]
          sm:text-[2rem]
          text-center
        "
      >
        要望・バグについて
      </h1>
      <p class="mt-[0.75rem] xs:mt-[1rem]">
        要望やバグ報告はつねに歓迎しております。 Twitter( @Adhi_1989
        )までメンションかDMを送っていただくか、Issuesから新規にissueを作成していただけると助かります。
      </p>
      <ul class="mt-[1.25rem] xs:mt-[1.5rem] flex flex-col gap-y-[0.75rem]">
        <li class="ml-[0.25rem] list-disc list-inside">
          <a href="https://twitter.com/Adhi_1989" target="_blank">
            <span class="text-blue-400">Twitterを別タブで開きます</span>
          </a>
        </li>
        <li class="ml-[0.25rem] list-disc list-inside">
          <a
            href="https://github.com/adhi-1989/prettydb/issues"
            target="_blank"
          >
            <span class="text-blue-400">Issuesを別タブで開きます</span>
          </a>
        </li>
      </ul>
    </section>

    <section
      class="
        border-2
        rounded-lg
        w-[90%]
        xs:w-[70%]
        max-w-[40rem]
        mx-auto
        p-[0.75rem]
        xs:p-[1.25rem]
        shadow-sm
        mt-[2rem]
      "
    >
      <h1
        class="
          font-bold
          text-[1rem]
          xs:text-[1.5rem]
          sm:text-[2rem]
          text-center
        "
      >
        ライセンス
      </h1>
      <p class="mt-[0.75rem] xs:mt-[1rem]">
        プリティーデービーはMITライセンスのもと、開発・公開されています。
        あなたはプリティーデービーを（MITライセンスの認める限り）自由に利用できますが、そこに一切の保証はありません。
      </p>
      <div
        class="mt-[1.25rem] xs:mt-[1.5rem] bg-[#f2f2f2] p-[0.5rem]"
        @click="ja = !ja"
      >
        <span>＊ クリック（タップ）で表示切り替え ＊</span>
        <transition name="license">
          <p class="license" v-if="!ja">
            The MIT License<br />
            Copyright 2021 adhi-1989<br />
            <br />
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:<br />
            <br />
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.<br />
            <br />
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
          </p>
          <p class="license" v-else>
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
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Logo from "/components/common/widget/Logo.vue";

export default defineComponent({
  name: "Home",
  components: {
    Logo,
  },
  setup() {
    const ja = ref(false);
    return {
      ja,
    };
  },
});
</script>

<style lang="scss" scoped>
.license-enter-active {
  animation: fadeIn;
  animation-duration: 0.5s;
}
.license-leave-active {
  animation: fadeOut;
  animation-duration: 0.5s;
  position: absolute;
}
</style>
