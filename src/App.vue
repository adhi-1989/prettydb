<template>
  <!-- application root -->
  <div class="application-root">
    <!-- header -->
    <header class="header">
      <!-- logo -->
      <div class="logo">
        <router-link class="router-link" to="/" @click="deactivateMenu()">
          <img class="image" :src="Logo" alt="" />
        </router-link>
      </div>

      <!-- toggle menu -->
      <div class="toggle-menu" @click="isMenuActive = !isMenuActive">
        <transition name="icon">
          <div v-if="!isMenuActive">
            <menu-icon />
          </div>
          <div v-else-if="isMenuActive">
            <close-icon />
          </div>
        </transition>
      </div>
    </header>

    <!-- menu -->
    <section class="menu" :data-active="isMenuActive">
      <div class="menu-item-group">
        <div class="menu-item">
          <router-link
            class="router-link"
            to="/changelog"
            @click="deactivateMenu()"
          >
            <span class="text" v-t="'index.changelog'" />
          </router-link>
        </div>
        <div class="menu-item">
          <router-link
            class="router-link"
            to="/hall-of-fame"
            @click="deactivateMenu()"
          >
            <span class="text" v-t="'index.hall-of-fame'" />
          </router-link>
        </div>
      </div>

      <!-- tools -->
      <div class="tools">
        <!-- settings -->
        <div class="icon settings invisible">
          <settings-icon />
        </div>

        <!-- github link -->
        <div class="icon github">
          <a href="https://github.com/adhi-1989/prettydb" target="_blank">
            <github-icon />
          </a>
        </div>
      </div>
    </section>

    <!-- main content -->
    <main class="main">
      <!-- TODO: ページ遷移時にもアニメーションつける -->
      <router-view />
    </main>
  </div>

  <!-- root level modal -->
  <div id="modal-root"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import Logo from "/assets/image/common/logo.svg?url";
import MenuIcon from "/icon/menu-sharp.svg?component";
import CloseIcon from "/icon/close-sharp.svg?component";
import GithubIcon from "/icon/logo-github.svg?component";
import SettingsIcon from "/icon/settings-sharp.svg?component";

export default defineComponent({
  name: "App",
  components: {
    MenuIcon,
    CloseIcon,
    GithubIcon,
    SettingsIcon,
  },
  data() {
    const { t } = useI18n({
      useScope: "global",
    });
    return {
      Logo,
      t,
    };
  },
  setup() {
    const isMenuActive = ref(false);
    const deactivateMenu = () => (isMenuActive.value = false);
    return {
      isMenuActive,
      deactivateMenu,
    };
  },
});
</script>

<style lang="scss">
html {
  @apply h-full;
}
body {
  @apply h-full overflow-hidden font-sans antialiased text-[color:var(--app-text-color-primary-default)] bg-[color:var(--app-bg-color-primary-default)];
}
#app {
  @apply h-full;
}
#modal-root {
  @apply absolute z-[50];
}
#modal-view {
  @apply absolute z-[10];
}
.application-root {
  @apply h-full overflow-hidden;
  > .header {
    @apply fixed flex justify-between w-full h-[2.5rem] shadow z-[40];
    @apply xs:h-[3rem];
    user-select: none;
    > .logo {
      @apply flex items-center w-[50%] px-[0.5rem];
      @apply xs:w-[16rem] xs:px-[1rem];
      > .router-link > .image {
        @apply w-full;
      }
    }
    > .toggle-menu {
      @apply w-[2.5rem] mr-[0.5rem] cursor-pointer;
      @apply xs:w-[3rem] xs:mr-[1rem];
      @apply lg:hidden;
      > .icon {
        &-enter-active {
          animation: fadeIn;
          animation-duration: 0.5s;
        }
        &-leave-active {
          animation: fadeOut;
          animation-duration: 0.5s;
          position: absolute;
        }
      }
    }
  }
  > .menu {
    @apply fixed top-[2.5rem] left-0 flex flex-col w-[50%] h-[calc(100%-2.5rem)] shadow z-[30];
    @apply xs:top-[3rem] xs:w-[16rem] xs:h-[calc(100%-3rem)];
    background-color: var(--app-bg-color-primary-default);
    transition: left 0.5s ease;
    user-select: none;
    &[data-active="false"] {
      @apply left-[-50%];
      @apply xs:left-[-16rem];
      @apply lg:left-0;
    }
    > .menu-item-group {
      @apply flex-grow ml-[10%];
      @apply xs:ml-[2rem];
      > .menu-item {
        @apply mt-[1rem];
      }
    }
    > .tools {
      @apply flex justify-between items-center h-[2.5rem] px-[0.5rem];
      @apply xs:h-[3.5rem] xs:py-[0.5rem];
      > .icon {
        @apply w-[2rem] cursor-pointer;
        @apply xs:w-[2.5rem];
      }
    }
  }
  > .main {
    @apply overflow-auto w-full h-[calc(100%-2.5rem)] mt-[2.5rem];
    @apply xs:h-[calc(100%-3rem)] xs:mt-[3rem];
    @apply lg:w-[calc(100%-16rem)] lg:ml-[16rem];
    transition: width 0.5s ease, margin-left 0.5s ease;
  }
}
</style>
