<template>
  <!-- data list -->
  <article class="data-list-root">
    <!-- list items -->
    <section class="data-list">
      <div class="data-item-group">
        <template v-for="(data, index) in dataList" :key="data.id">
          <!-- item -->
          <div class="data-item" @click="$emit('openViewer', index)">
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
                [{{ t(getMonikerKey(data.character)) }}]
              </div>
              <div class="name">
                {{ t(getCharacterNameKey(data.character)) }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>

    <!-- toolbar -->
    <section class="toolbar">
      <icon-ion-add class="button add" @click="$emit('openEditor', true)" />
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { HallOfFameDTO } from "@/views/hall-of-fame/logic/db";
import { useI18n } from "vue-i18n";
import { getRankGradeIcon } from "@/views/logic/resources/images";
import { getCharacterNameKey, getMonikerKey } from "@/views/logic/i18n";

export default defineComponent({
  emits: ["openViewer", "openEditor"],
  props: {
    dataList: {
      type: Array as PropType<Array<HallOfFameDTO>>,
      required: true,
    },
  },
  data() {
    return {
      getRankGradeIcon,
      getCharacterNameKey,
      getMonikerKey,
    };
  },
  setup() {
    const { t } = useI18n();
    return {
      t,
    };
  },
});
</script>

<style lang="scss">
.data-list-root {
  @apply flex gap-x-[1rem] h-full p-[1rem] max-w-screen-md mx-auto;
  > .data-list {
    @apply flex-grow overflow-hidden rounded h-full bg-[#00000030];
    > .data-item-group {
      @apply grid gap-[0.5rem] auto-rows-max overflow-y-scroll h-full p-[0.5rem];
      grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
      @screen sm {
        @apply gap-[1rem] p-[1rem];
        grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
      }

      > .data-item {
        @apply select-none bg-[#fafafa] inline-flex flex-col rounded p-[0.375rem] cursor-pointer;
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

  > .toolbar {
    > .button {
      @include button-gradient;
      @apply w-[1.5rem] h-[1.5rem] rounded border cursor-pointer;
      @apply sm:(w-[2.5rem] h-[2.5rem]);
    }
  }
}
</style>
