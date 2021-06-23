<template>
  <!-- data list -->
  <article class="data-list-root">
    <!-- toolbar -->
    <section class="toolbar">
      <div class="button add" @click="$emit('openEditor', true)">
        <add-icon />
      </div>
    </section>

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
              <div class="name" v-t="getCharacterNameKey(data.character)" />
            </div>
          </div>
        </template>
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { HallOfFameDTO } from "/@/db/hall-of-fame";
import { useI18n } from "vue-i18n";
import { getRankGradeIcon } from "/@/util/resources/image";
import { getCharacterNameKey, getMonikerKey } from "/@/util/i18n";
import AddIcon from "/icon/add-sharp.svg?component";

export default defineComponent({
  name: "List",
  components: {
    AddIcon,
  },
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
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    return {
      t,
    };
  },
});
</script>

<style lang="scss" scoped>
/* TODO: レイアウトもう少し考える */
.data-list-root {
  @apply flex flex-col gap-y-[1rem] h-full p-[1rem];
  > .toolbar {
    > .button.add {
      @apply w-[2rem] rounded border;
    }
  }
  > .data-list {
    @apply rounded overflow-hidden h-full bg-[#00000030];
    > .data-item-group {
      @apply grid gap-[0.5rem] auto-rows-min h-full overflow-y-scroll p-[0.5rem];
      grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
      > .data-item {
        @apply flex flex-col items-center text-center cursor-pointer p-[0.25rem] rounded-lg bg-[#fafafa];
        > .score {
          @apply relative w-[4rem];
          > .image {
            @apply object-scale-down;
          }
          > .text {
            @apply absolute bottom-0 text-[1rem] rounded-sm w-full bg-[#fefefe] shadow;
            line-height: 1rem;
          }
        }
        > .name-card {
          @apply font-bold text-[0.5rem] mt-[0.25rem];
        }
      }
    }
  }
}
@screen xs {
  .data-list-root {
    > .data-list {
      > .data-item-group {
        > .data-item {
          > .score {
            @apply w-[5rem];
            > .text {
              @apply bottom-[0.25rem] text-[1rem] rounded-md;
              line-height: 1.125rem;
            }
          }
          > .name-card {
            @apply text-[0.75rem];
          }
        }
      }
    }
  }
}
@screen md {
  .data-list-root {
    @apply gap-x-[1rem];
    flex-direction: row-reverse;
    > .toolbar {
      > .button.add {
        @apply w-[3rem] rounded-lg border;
      }
    }
    > .data-list {
      @apply flex-grow;
      > .data-item-group {
        > .data-item {
          > .score {
            @apply w-[6.5rem];
            > .text {
              @apply bottom-[0.25rem] text-[1.25rem] rounded-lg;
              line-height: 1.5rem;
            }
          }
          > .name-card {
            @apply text-[0.875rem];
          }
        }
      }
    }
  }
}
</style>

<i18n locale="ja" src="/locales/ja/game/character.json" />
