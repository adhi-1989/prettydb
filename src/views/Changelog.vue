<template>
  <article class="changelog-root text-[0.75rem] xs:text-[1rem] py-[2rem]">
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
      <h1 class="text-[1rem]">v0.7.1</h1>
      <div class="text-[0.875rem]">リリース: 2021-06-25</div>
      <ul class="mt-[0.75rem] xs:mt-[1rem]">
        <li class="list-disc list-inside">
          スキルにアイコンが表示されるようになった
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
        mt-[1.5rem]
      "
    >
      <h1 class="text-[1rem]">v0.7.0</h1>
      <div class="text-[0.875rem]">リリース: 2021-06-23</div>
      <ul class="mt-[0.75rem] xs:mt-[1rem]">
        <li class="list-disc list-inside">新規公開</li>
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

<style lang="scss" scoped></style>
