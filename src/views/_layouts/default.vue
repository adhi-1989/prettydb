<template>
  <!-- application root -->
  <article class="application-root-default">
    <!-- header -->
    <header class="header">
      <!-- logo -->
      <section class="logo">
        <router-link class="router-link" to="/" @click="closeMenu()">
          <img class="image" :src="logo" alt="" />
        </router-link>
      </section>

      <!-- toggle menu -->
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

    <!-- menu -->
    <nav class="menu" :data-active="isMenuActive">
      <section class="menu-item-group">
        <div class="menu-item">
          <router-link class="router-link" to="/changelog" @click="closeMenu()">
            <span class="text">{{ t("app.navigation.changelog") }}</span>
          </router-link>
        </div>
        <div class="menu-item">
          <router-link
            class="router-link"
            to="/hall-of-fame"
            @click="closeMenu()"
          >
            <span class="text">{{ t("app.navigation.hall-of-fame") }}</span>
          </router-link>
        </div>
      </section>

      <!-- tools -->
      <section class="tools">
        <!-- settings -->
        <div class="tool-item invisible">
          <icon-ion-settings class="icon" />
        </div>

        <!-- github link -->
        <a
          class="tool-item"
          href="https://github.com/adhi-1989/prettydb"
          target="_blank"
        >
          <icon-ion-logo-github class="icon" />
        </a>
      </section>
    </nav>

    <!-- main content -->
    <main class="main">
      <router-view />
    </main>
  </article>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useI18n } from "~/vue-i18n";
import logo from "#/images/app/logo.svg";

export default defineComponent({
  data() {
    return {
      logo,
    };
  },
  setup() {
    const { t } = useI18n();

    const activeFlag = ref(false);
    const isMenuActive = computed(() => activeFlag.value);
    const toggleMenu = () => (activeFlag.value = !activeFlag.value);
    const closeMenu = () => (activeFlag.value = false);

    return {
      t,
      isMenuActive,
      toggleMenu,
      closeMenu,
    };
  },
});
</script>

<style lang="scss">
.application-root-default {
  @apply h-full overflow-hidden;
  > .header {
    @apply select-none fixed flex justify-between w-full h-[2.5rem] shadow z-4;
    @apply xs:h-[3.25rem];
    @apply sm:h-[4rem];
    transition: all 0.5s ease;

    > .logo {
      @apply h-full ml-[0.5rem];
      @apply sm:ml-[1rem];
      > .router-link {
        @apply flex items-center w-[calc(75%-0.5rem-0.5rem)] max-w-[16rem] h-full;
        @apply xs:w-[calc(100%-0.5rem-0.5rem)];
        @apply sm:w-[calc(100%-1rem-1rem)];
        > .image {
          @apply object-contain;
        }
      }
    }

    > .toggle-menu {
      @apply cursor-pointer w-[2.5rem] h-[2.5rem];
      @apply xs:(w-[3.25rem] h-[3.25rem]);
      @apply sm:(w-[4rem] h-[4rem]);
      @apply lg:hidden;
      > .icon {
        @apply w-full h-full;

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
    @apply select-none fixed top-[2.5rem] left-0 flex flex-col w-[65%] max-w-[16rem] h-[calc(100%-2.5rem)] shadow z-3 bg-[#fefefe];
    @apply xs:(top-[3.25rem] h-[calc(100%-3.25rem)]);
    @apply sm:(top-[4rem] h-[calc(100%-4rem)]);
    transition: all 0.5s ease;

    &[data-active="false"] {
      @apply left-[-65%];
      @apply xs:left-[-16rem];
      @apply lg:left-0;
    }

    > .menu-item-group {
      @apply flex-grow flex flex-col gap-y-[1.75rem] mt-[1.75rem];
      @apply xs:(mt-[2.75rem] gap-y-[2.75rem]);
      > .menu-item {
        @apply ml-[1.75rem];
        @apply xs:(ml-[2rem] text-[1.25rem]);
      }
    }

    > .tools {
      @apply flex justify-between items-center h-[2.5rem] px-[0.5rem];
      @apply xs:(h-[3.5rem] py-[0.5rem]);
      > .tool-item {
        @apply w-[2rem] h-[2rem] cursor-pointer;
        @apply xs:(w-[3rem] h-[3rem]);
        > .icon {
          @apply w-full h-full;
        }
      }
    }
  }

  > .main {
    @apply overflow-auto w-full h-[calc(100%-2.5rem)] mt-[2.5rem];
    @apply xs:(h-[calc(100%-3.25rem)] mt-[3.25rem]);
    @apply sm:(h-[calc(100%-4rem)] mt-[4rem]);
    @apply lg:(w-[calc(100%-16rem)] ml-[16rem]);
    transition: all 0.5s ease;
  }
}

#background {
  @apply fixed bottom-0 w-full h-[calc(100%-2.5rem)] mt-[2.5rem] -z-1;
  @apply xs:(h-[calc(100%-3.25rem)] mt-[3.25rem]);
  @apply sm:(h-[calc(100%-4rem)] mt-[4rem]);
  @apply lg:(w-[calc(100%-16rem)] ml-[16rem]);
}
</style>
