<template>
  <section :class="$style.searchBar" v-bind="$attrs">
    <label :class="$style.content">
      <icon-ion-search :class="$style.icon" />
      <input
        :class="$style.input"
        type="text"
        :placeholder="placeholder"
        v-model="value"
        @focus="selectInputValueOnFocus"
      />
    </label>
  </section>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, withDefaults, computed } from "vue";
import { selectInputValueOnFocus } from "@/views/logic/dom";

const props = withDefaults(
  defineProps<{ modelValue: string; placeholder?: string }>(),
  {
    placeholder: "",
  }
);
const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();

const value = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});
</script>

<style lang="scss" module>
.searchBar {
  > .content {
    @apply text-sm flex gap-x-[0.25rem] items-center w-full h-[1.75rem] px-[0.25rem] rounded-md bg-[#fefefe] border;
    @apply sm:(gap-x-[0.375rem] h-[2rem]);
    @apply md:(text-base gap-x-[0.5rem] h-[2.5rem] px-[0.375rem]);

    > .icon {
      // 横幅 = バーの高さ - (X軸のパディングサイズ * 2)
      @apply w-[1.25rem] h-[1.25rem];
      @apply sm:(w-[1.5rem] h-[1.5rem]);
      @apply md:(w-[1.75rem] h-[1.75rem]);
    }

    > .input {
      @apply w-[calc(100%-0.25rem-1.25rem)] bg-transparent;
      @apply sm:(w-[calc(100%-0.375rem-2rem)]);
      @apply md:(w-[calc(100%-0.5rem-1.75rem)]);
    }
  }
}
</style>
