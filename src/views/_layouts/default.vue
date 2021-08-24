<template>
  <article :class="$style.root">
    <header :class="$style.header">
      <section :class="$style.logo">
        <router-link :class="$style.link" to="/" @click="isMenuActive = false">
          <img :class="$style.image" :src="logo" alt="" />
        </router-link>
      </section>

      <section :class="$style.button" @click="toggleMenu()">
        <transition :name="$style.icon" @enter="fadeIn" @leave="fadeOut">
          <template v-if="!isMenuActive">
            <icon-ion-menu :class="$style.icon" />
          </template>
          <template v-else>
            <icon-ion-close :class="$style.icon" />
          </template>
        </transition>
      </section>
    </header>

    <transition @enter="slideInRight" @leave="slideOutLeft">
      <nav :class="$style.menu" v-if="isMenuActive || isXlScreen">
        <section :class="$style.items">
          <div :class="$style.item">
            <router-link
              :class="$style.link"
              to="/changelog"
              @click="isMenuActive = false"
            >
              <icon-ion-newspaper :class="$style.icon" />
              <span :class="$style.text">
                {{ t("app.navigation.changelog") }}
              </span>
            </router-link>
          </div>

          <div :class="$style.item">
            <router-link
              :class="$style.link"
              to="/hall-of-fame"
              @click="isMenuActive = false"
            >
              <icon-fa-solid-carrot :class="$style.icon" />
              <span :class="$style.text">
                {{ t("app.navigation.hall-of-fame") }}
              </span>
            </router-link>
          </div>

          <div :class="$style.item">
            <router-link
              :class="$style.link"
              to="/settings"
              @click="isMenuActive = false"
            >
              <icon-ion-settings :class="$style.icon" />
              <span :class="$style.text">
                {{ t("app.navigation.settings") }}
              </span>
            </router-link>
          </div>
        </section>

        <section :class="$style.toolbar">
          <a
            :class="$style.item"
            href="https://github.com/adhi-1989/prettydb"
            target="_blank"
            rel="noreferrer"
          >
            <icon-ion-logo-github :class="$style.icon" />
          </a>
        </section>
      </nav>
    </transition>

    <main :class="$style.main">
      <router-view />
    </main>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useToggle, useMediaQuery } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import {
  fadeIn,
  fadeOut,
  slideInRight,
  slideOutLeft,
} from "@/views/logic/dom/animation";
import logo from "#/images/app/logo.svg";

export default defineComponent({
  data() {
    return {
      fadeIn: fadeIn({
        duration: 250,
        easing: "ease",
      }),
      fadeOut: fadeOut({
        duration: 250,
        easing: "ease",
      }),
      slideInRight: slideInRight({
        duration: 500,
        easing: "ease",
      }),
      slideOutLeft: slideOutLeft({
        duration: 500,
        easing: "ease",
      }),
      logo,
    };
  },
  setup() {
    const { t } = useI18n();

    const [isMenuActive, toggleMenu] = useToggle();
    const isXlScreen = useMediaQuery("(min-width: 1366px)");

    return {
      t,
      isMenuActive,
      toggleMenu,
      isXlScreen,
    };
  },
});
</script>

<style lang="scss" module>
.root {
  @apply h-full overflow-hidden;

  > .header {
    @apply fixed flex justify-between w-full h-[2.5rem] shadow z-50;
    @apply md:(h-[3rem]);
    @apply xl:(h-[4rem]);

    > .logo {
      @apply w-[13rem] h-full;
      @apply md:(w-[18rem]);

      > .link {
        @apply flex items-center h-full;

        > .image {
          @apply w-[12rem] h-[1.5rem] mx-auto;
          @apply md:(w-[16rem] h-[2rem]);
        }
      }
    }

    > .button {
      @apply cursor-pointer mr-[0.5rem];
      @apply xl:(hidden);

      > .icon {
        @apply w-[2.5rem] h-[2.5rem];
        @apply md:(w-[3rem] h-[3rem]);

        &:global(-leave-active) {
          @apply absolute;
        }
      }
    }
  }

  > .menu {
    @apply fixed top-[2.5rem] left-0 flex flex-col w-[13rem] h-[calc(100%-2.5rem)] shadow z-30 bg-[#fefefe];
    @apply md:(top-[3rem] w-[18rem] h-[calc(100%-3rem)]);
    @apply xl:(top-[4rem] h-[calc(100%-4rem)]);

    > .items {
      @apply flex flex-col gap-y-[1.5rem] h-[calc(100%-2.5rem)] p-[1rem];
      @apply md:(gap-y-[2rem] p-[2rem]);

      > .item {
        > .link {
          @apply flex gap-x-[1.5rem] items-center;
          @apply md:(gap-x-[2rem]);

          &:global(.router-link-active) {
            @apply text-[#8fd54a];
          }

          > .icon {
            @apply w-[1.5rem] h-[1.5rem];
            @apply md:(w-[2rem] h-[2rem]);
          }

          > .text {
            @apply text-base;
            @apply md:(text-xl);
          }
        }
      }
    }

    > .toolbar {
      @apply flex justify-between h-[2.5rem] px-[0.5rem];
      @apply md:(h-[3.5rem] py-[0.5rem]);

      > .item {
        @apply flex items-center cursor-pointer;

        > .icon {
          @apply w-[2rem] h-[2rem];
          @apply md:(w-[3rem] h-[3rem]);
        }
      }
    }
  }

  > .main {
    @apply overflow-auto w-full h-[calc(100%-2.5rem)] mt-[2.5rem];
    @apply md:(h-[calc(100%-3rem)] mt-[3rem]);
    @apply xl:(w-[calc(100%-18rem)] ml-[18rem] h-[calc(100%-4rem)] mt-[4rem]);
  }
}
</style>

<style lang="scss">
#background {
  @apply fixed bottom-0 w-full h-[calc(100%-2.5rem)] mt-[2.5rem] -z-1;
  @apply md:(h-[calc(100%-3rem)] mt-[3rem]);
  @apply xl:(w-[calc(100%-18rem)] ml-[18rem] h-[calc(100%-4rem)] mt-[4rem]);
}
</style>
