<template>
  <article class="bg-[#1b164e]">
    <img :src="NotFoundImage" alt="">
    <div class="bg-[#000] w-full text-center text-[#fefefe] text-[1rem] xs:text-[2rem] sm:text-[3rem] md:text-[4rem] xl:text-[5rem]">そんなページはありません！！</div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NotFoundImage from "/assets/image/common/notfound.svg?url";

export default defineComponent({
  name: "NotFound",
  data() {
    return {
      NotFoundImage,
    };
  }
});
</script>

<style lang="scss" scoped></style>
