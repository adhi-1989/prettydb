<template>
  <article :class="$style.list">
    <section :class="$style.toolbar">
      <button :class="$style.button" @click="openEditor()">
        <icon-ion-add :class="$style.icon" />
      </button>
    </section>

    <section :class="$style.content">
      <div :class="$style.empty" v-if="isDataEmpty">
        <p :class="$style.header">まだデータが登録されていません</p>
        <div :class="$style.description">
          <button :class="$style.button" @click="openEditor()">
            <icon-ion-add :class="$style.icon" />
          </button>
          <span :class="$style.text">
            ボタンから新規にデータを追加することができます
          </span>
        </div>
      </div>
      <div :class="$style.data" v-else>
        <template v-for="(data, index) in dataList" :key="data.id">
          <div :class="$style.item" @click="selectItem(index)">
            <div :class="$style.score">
              <img
                :class="$style.icon"
                :src="getRankGradeIcon(data.history.score)"
                alt=""
              />
              <div :class="$style.text">{{ data.history.score }}</div>
            </div>
            <div :class="$style.identify">
              <div :class="$style.moniker">
                [{{ getMonikerName(data.character) }}]
              </div>
              <div :class="$style.character">
                {{ getCharacterName(data.character) }}
              </div>
            </div>
            <div :class="$style.info">
              {{ getInfo({ ...data }) }}
            </div>
          </div>
        </template>
      </div>
    </section>

    <pagination v-model="page" :max="maxPage" />
  </article>
</template>

<script lang="ts" setup>
import { computed, inject, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import dayjs from "dayjs";
import type { CharacterIdentify, MonikerIdentify } from "@/data";
import { Character, Moniker } from "@/data";
import { getRankGradeIcon } from "@/views/_common/logic/resources/images";
import { Dto } from "@/views/hall-of-fame/logic/db";
import { Action, State } from "@/views/hall-of-fame/logic/dependency";
import Pagination from "@/views/_common/components/widget/Pagination.vue";

const { t } = useI18n();

function getCharacterName(identify: CharacterIdentify): string {
  return t(Character.getNameKey(identify));
}

function getMonikerName(identify: MonikerIdentify): string {
  return t(Moniker.getNameKey(identify));
}

function getInfo(data: Dto): string {
  return dayjs(data.history.registerDate).format("YYYY / MM / DD");
}

const { openView, setViewDataIndex, setDataListOffset } = Action(inject);
const { isDataEmpty, dataCount, dataList } = State(inject);

function selectItem(index: number): void {
  setViewDataIndex(index);
  openView("viewer");
}

function openEditor(): void {
  openView("editor");
}

const page = ref(1);
const maxPage = computed(() => {
  return dataCount.value === 0 ? 0 : Math.ceil(dataCount.value / 32);
});

watch(
  () => page.value,
  (value) => {
    setDataListOffset((value - 1) * dataList.value.length);
  }
);
</script>

<style lang="scss" module>
.list {
  @apply flex gap-y-[0.5rem] flex-col h-full;

  > .toolbar {
    @apply flex flex-row-reverse h-[2rem];

    > .button {
      @include button-border;
      @apply w-[2rem] h-[2rem] rounded;

      > .icon {
        @include button-content;
        @apply rounded;
      }
    }
  }

  > .content {
    @apply h-[calc(100%-2rem-(0.5rem*2)-2rem)] p-[0.5rem] mt-[1rem] overflow-y-scroll rounded bg-[#f2f2f2];
    @apply md:(p-[0.75rem]);
    @apply lg:(p-[1rem]);

    > .empty {
      @apply max-w-[32rem] mx-auto p-[0.5rem] rounded-md border bg-[#fafafa];
      @apply sm:(p-[0.75rem]);

      > .header {
        @apply font-bold text-center text-sm;
        @apply sm:(text-base);
        @apply md:(text-lg);
      }

      > .description {
        @apply mt-[0.25rem];

        > .button {
          @include button-border;
          @apply flex-shrink-0 float-left w-[1.5rem] h-[1.5rem] rounded cursor-pointer;

          > .icon {
            @include button-content;
            @apply rounded;
          }
        }

        > .text {
          @apply text-sm ml-[0.25rem];
          @apply sm:(text-base);
          @apply md:(text-lg);
        }
      }
    }

    > .data {
      @apply grid grid-cols-1 gap-[0.5rem];
      @apply sm:(grid-cols-2);
      @apply md:(gap-[0.75rem]);
      @apply lg:(gap-[1rem]);

      > .item {
        @apply font-bold text-center grid grid-cols-[max-content,1fr] px-[0.75rem] py-[0.375rem] rounded-md bg-[#fafafa] border cursor-pointer;
        @apply sm:(grid-cols-none flex flex-col gap-y-[0.25rem]);

        > .score {
          @apply row-span-2;
          @apply sm:(flex justify-center items-center);

          > .icon {
            @apply w-[2.5rem] h-[2.5rem];
            @apply md:(w-[3.5rem] h-[3.5rem]);
          }

          > .text {
            @apply text-sm;
            @apply sm:(w-[4rem]);
            @apply md:(text-base w-[5rem]);
            @apply lg:(text-lg);
          }
        }

        > .identify {
          @apply text-xxs flex flex-col justify-center;
          @apply md:(text-xs);
          @apply lg:(text-sm);
        }

        > .info {
          @apply text-xs;
          @apply md:(text-sm);
          @apply lg:(text-base);
        }
      }
    }
  }
}
</style>
