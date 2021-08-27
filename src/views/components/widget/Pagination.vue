<template>
  <section :class="$style.pagination">
    <button :class="$style.button" @click="movePrev">
      <icon-ion-caret-back :class="$style.icon" />
    </button>
    <div :class="$style.pages">
      <template v-for="page in pages" :key="page">
        <div :class="getPageClasses(page)" @click="setPage(page)">
          {{ page }}
        </div>
      </template>
    </div>
    <button :class="$style.button" @click="moveNext">
      <icon-ion-caret-forward :class="$style.icon" />
    </button>
  </section>
</template>

<script lang="ts">
import { defineComponent, useCssModule, computed } from "vue";
import _ from "@/util/lodash";

type Page = number | string;

export default defineComponent({
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    sphere: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const _style = useCssModule();

    const _page = computed({
      get: () => props.modelValue,
      set: (page: number) => emit("update:modelValue", page),
    });
    const setPage = (page: Page) => {
      if (_.isNumber(page)) {
        const newPage = _.clamp(page, 1, props.max);
        if (newPage !== _page.value) {
          _page.value = newPage;
        }
      }
    };
    const moveNext = () => {
      setPage(_page.value + 1);
    };
    const movePrev = () => {
      setPage(_page.value - 1);
    };
    const pages = computed<Array<Page>>(() => {
      const max = props.max;
      if (max <= 1) {
        return max === 1 ? [1] : [];
      } else if (max < 6 || props.sphere) {
        return _.range(1, max + 1);
      }
      const page = _page.value;
      if (page <= 4) {
        return [1, 2, 3, 4, 5, "...", max];
      } else if (page > 4 && page <= max - 4) {
        return [1, "...", page - 1, page, page + 1, "...", max];
      } else {
        return [1, "...", max - 4, max - 3, max - 2, max - 1, max];
      }
    });
    const getPageClasses = (arg: Page) => {
      const { page, sphere, button, selected } = _style;
      const result = [page];
      if (props.sphere) {
        result.push(sphere);
      } else if (_.isNumber(arg)) {
        result.push(button);
      }
      if (_page.value === arg) {
        result.push(selected);
      }
      return result;
    };

    return {
      setPage,
      moveNext,
      movePrev,
      pages,
      getPageClasses,
    };
  },
});
</script>

<style lang="scss" module>
.pagination {
  @apply flex items-center h-[2rem];
  @apply sm:(h-[2.5rem]);
  @apply md:(h-[3rem]);

  > .button {
    @apply flex justify-center items-center;

    > .icon {
      @apply w-[1.5rem] h-[1.5rem];
      @apply sm:(w-[2rem] h-[2rem]);
      @apply md:(w-[2.5rem] h-[2.5rem]);
    }
  }

  > .pages {
    @apply flex-1 flex justify-evenly text-xxs;
    @apply sm:(text-xs);
    @apply md:(text-sm);

    > .page {
      @apply flex justify-center items-center w-[1.25rem] h-[1.25rem] rounded-md;
      @apply sm:(w-[1.5rem] h-[1.5rem]);
      @apply md:(w-[1.75rem] h-[1.75rem]);

      &.sphere {
        @apply relative text-transparent cursor-pointer;

        @variants after {
          @apply absolute w-[0.375rem] h-[0.375rem] inset-0 m-auto rounded-full bg-[#d0d0d0];
          content: "";

          &.selected {
            @apply w-[0.5rem] h-[0.5rem] bg-[#8fd54a];
            @apply md:(w-[0.625rem] h-[0.625rem]);
          }
        }
      }

      &.button {
        @apply cursor-pointer;

        &.selected {
          @apply bg-[#734065] text-[#fafafa];
        }

        &:not(.selected):hover {
          @apply border border-[#734065];
        }
      }
    }
  }
}
</style>
