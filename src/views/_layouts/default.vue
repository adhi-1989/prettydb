<template>
  <article class="application-root-default">
    <header class="header">
      <section class="logo">
        <router-link class="router-link" to="/" @click="isMenuActive = false">
          <img class="image" :src="logo" alt="" />
        </router-link>
      </section>

      <section class="toggle-menu" @click="toggleMenu()">
        <transition name="icon">
          <template v-if="!isMenuActive">
            <icon-ion-menu class="icon" />
          </template>
          <template v-else-if="isMenuActive">
            <icon-ion-close class="icon" />
          </template>
        </transition>
      </section>
    </header>

    <nav class="menu" :data-active="isMenuActive">
      <section class="menu-item-group">
        <div class="menu-item">
          <router-link
            class="router-link"
            to="/changelog"
            @click="isMenuActive = false"
          >
            <span class="text">{{ t("app.navigation.changelog") }}</span>
          </router-link>
        </div>
        <div class="menu-item">
          <router-link
            class="router-link"
            to="/hall-of-fame"
            @click="isMenuActive = false"
          >
            <span class="text">{{ t("app.navigation.hall-of-fame") }}</span>
          </router-link>
        </div>
      </section>

      <section class="tools">
        <router-link
          class="tool-item"
          to="/settings"
          @click="isMenuActive = false"
        >
          <icon-ion-settings class="icon" />
        </router-link>

        <a
          class="tool-item"
          href="https://github.com/adhi-1989/prettydb"
          target="_blank"
        >
          <icon-ion-logo-github class="icon" />
        </a>
      </section>
    </nav>

    <main class="main">
      <router-view />
      <router-view name="bg" />
    </main>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useToggle } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import logo from "#/images/app/logo.svg";

export default defineComponent({
  data() {
    return {
      logo,
    };
  },
  setup() {
    const { t } = useI18n();
    const [isMenuActive, toggleMenu] = useToggle();

    return {
      t,
      isMenuActive,
      toggleMenu,
    };
  },
});
</script>

<style lang="scss">
.application-root-default {
  @apply h-full overflow-hidden;
  > .header {
    @apply transition-all duration-500 fixed flex justify-between w-full h-[2.5rem] shadow z-50;
    @apply sm:(h-[3rem]);
    @apply xl:(h-[4rem]);

    > .logo {
      @apply h-full;
      > .router-link {
        @apply flex items-center w-[13rem] px-[0.5rem] h-full;
        @apply sm:(w-[17rem] px-[1rem]);
        > .image {
          @apply w-[16rem] mx-auto;
        }
      }
    }

    > .toggle-menu {
      @apply cursor-pointer mr-[0.5rem];
      @apply xl:(hidden);

      > .icon {
        @apply w-[2.5rem] h-[2.5rem];
        @apply sm:(w-[3rem] h-[3rem]);

        &-enter-active {
          animation: fadeIn;
          animation-duration: 0.5s;
        }

        &-leave-active {
          @apply absolute;
          animation: fadeOut;
          animation-duration: 0.5s;
        }
      }
    }
  }

  > .menu {
    @apply transition-all duration-500 fixed top-[2.5rem] left-0 flex flex-col w-[13rem] h-[calc(100%-2.5rem)] shadow z-30 bg-[#fefefe];
    @apply sm:(top-[3rem] w-[17rem] h-[calc(100%-3rem)]);
    @apply xl:(top-[4rem] h-[calc(100%-4rem)]);

    &[data-active="false"] {
      @apply left-[-13rem];
      @apply sm:(left-[-17rem])
      @apply xl:(left-0);
    }

    > .menu-item-group {
      @apply flex-grow flex flex-col gap-y-[1.75rem] mt-[1.75rem];
      @apply sm:(mt-[2.75rem] gap-y-[2.75rem]);
      > .menu-item {
        @apply ml-[1.75rem];
        @apply sm:(ml-[2rem] text-[1.25rem]);
      }
    }

    > .tools {
      @apply flex justify-between h-[2.5rem] px-[0.5rem];
      @apply sm:(h-[3.5rem] py-[0.5rem]);
      > .tool-item {
        @apply flex items-center cursor-pointer;
        > .icon {
          @apply w-[2rem] h-[2rem];
          @apply sm:(w-[3rem] h-[3rem]);
        }
      }
    }
  }

  > .main {
    @apply transition-all duration-500 overflow-auto w-full h-[calc(100%-2.5rem)] mt-[2.5rem];
    @apply sm:(h-[calc(100%-3rem)] mt-[3rem]);
    @apply xl:(w-[calc(100%-17rem)] ml-[17rem] h-[calc(100%-4rem)] mt-[4rem]);
  }
}

#background {
  @apply fixed bottom-0 w-full h-[calc(100%-2.5rem)] mt-[2.5rem] -z-1;
  @apply sm:(h-[calc(100%-3rem)] mt-[3rem]);
  @apply xl:(w-[calc(100%-17rem)] ml-[17rem] h-[calc(100%-4rem)] mt-[4rem]);
}
</style>
