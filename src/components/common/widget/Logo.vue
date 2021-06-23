<template>
  <div class="app-logo">
    <svg class="gradient" aria-hidden="true" focusable="false">
      <linearGradient id="outline-gradient" x2="0" y2="1">
        <stop offset="0%" stop-color="#9d79b2" />
        <stop offset="100%" stop-color="#d98bb5" />
      </linearGradient>
    </svg>
    <svg class="gradient" aria-hidden="true" focusable="false">
      <linearGradient id="text-gradient" x2="0" y2="1">
        <stop offset="0%" stop-color="#fefcfd" />
        <stop offset="100%" stop-color="#f9e6f2" />
      </linearGradient>
    </svg>
    <svg-logo />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SvgLogo from "/assets/image/common/logo.svg?component";

export default defineComponent({
  name: "Logo",
  components: {
    SvgLogo,
  }
});
</script>

<style lang="scss">
.app-logo {
  > .gradient {
    @apply absolute w-0 h-0;
  }
  > #app-logo {
    @apply w-full h-full object-scale-down;
    > #app-logo-outline {
      fill: url(#outline-gradient) #b480b3;
      filter: blur(1px);
    }
    > #app-logo-text {
      fill: url(#text-gradient) #fef6fe;
      filter: blur(0.75px);
    }
  }
}
</style>
