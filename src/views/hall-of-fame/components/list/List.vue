<template>
  <article class="data-list-root">
    <section class="toolbar">
      <icon-ion-add class="button add" @click="openEditor()" />
    </section>

    <section class="data-list">
      <div class="data-item-group">
        <template v-for="(data, index) in dataList" :key="data.id">
          <div class="data-item" @click="selectItem(index)">
            <div class="score">
              <img
                class="image"
                :src="getRankGradeIcon(data.history.score)"
                alt=""
              />
              <div class="text">{{ data.history.score }}</div>
            </div>
            <div class="name-card">
              <div class="moniker">
                [{{ t(getMonikerNameKey(data.character)) }}]
              </div>
              <div class="name">
                {{ t(getCharacterNameKey(data.character)) }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { useI18n } from "vue-i18n";
import { Character } from "@/data";
import { getRankGradeIcon } from "@/views/logic/resources/images";
import {
  actionInjectionKey,
  stateInjectionKey,
  fallbackActionFactory,
  fallbackStateFactory,
} from "@/views/hall-of-fame/logic/dependency";

export default defineComponent({
  data() {
    return {
      getCharacterNameKey: Character.getNameKey,
      getMonikerNameKey: Character.getMonikerNameKey,
      getRankGradeIcon,
    };
  },
  setup() {
    const { t } = useI18n();
    const { openView, setViewDataIndex } = inject(
      actionInjectionKey,
      fallbackActionFactory,
      true
    );
    const { dataList } = inject(stateInjectionKey, fallbackStateFactory, true);
    const selectItem = (index: number) => {
      setViewDataIndex(index);
      openView("viewer");
    };
    const openEditor = () => {
      openView("editor");
    };
    return {
      t,
      dataList,
      selectItem,
      openEditor,
    };
  },
});
</script>

<style lang="scss">
.data-list-root {
  @apply h-full w-[18rem] mx-auto my-[1rem];
  @apply sm:(w-[24.25rem]);
  @apply md:(w-[32rem]);
  @apply lg:(w-[40rem]);
  @apply xl:(w-[64rem]);

  > .toolbar {
    @apply flex flex-row-reverse;

    > .button {
      @include button-gradient;
      @apply w-[1.5rem] h-[1.5rem] rounded border cursor-pointer;
      @apply sm:(w-[2.5rem] h-[2.5rem]);
    }
  }

  > .data-list {
    @apply overflow-hidden rounded h-[calc(100%-2rem-1.5rem-1rem)] mt-[1rem] bg-gray-300 p-[0.5rem] overflow-y-scroll;
    @apply sm:(h-[calc(100%-2rem-2.5rem-1rem)]);

    > .data-item-group {
      @apply grid gap-[0.5rem] auto-rows-max grid-cols-2;
      @apply lg:(grid-cols-3);
      @apply xl:(grid-cols-5);

      > .data-item {
        @apply bg-[#fafafa] inline-flex flex-col rounded p-[0.375rem] cursor-pointer;
        @apply sm:(p-[0.75rem]);

        > .score {
          @apply flex gap-x-[0.25rem] items-center;

          > .image {
            @apply w-[2.5rem];
            @apply sm:(w-[3.5rem]);
          }

          > .text {
            @apply flex-grow text-[1rem] text-center;
            @apply sm:(text-[1.5rem]);
          }
        }

        > .name-card {
          @apply font-bold text-[0.5rem] text-center leading-tight mt-[0.25rem];
          @apply sm:(text-[0.875rem] leading-normal);
        }
      }
    }
  }
}
</style>
