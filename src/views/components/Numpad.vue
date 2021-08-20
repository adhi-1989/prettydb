<template>
  <article class="numpad-root">
    <div class="layout" :class="{ 'rows-4': hiddenNumberDisplay }">
      <input
        ref="inputRef"
        class="display"
        :class="{ hidden: hiddenNumberDisplay }"
        type="number"
        :value="value"
        @focus="selectInputValueOnFocus"
        @input="inputEventHook"
        @keyup.enter="$emit('enterKeyPressed')"
      />
      <div
        class="key"
        v-for="key in OrderedKeys"
        :key="key"
        :class="`numpad-${key}`"
        @click="keyClicked(key)"
      >
        <template v-if="key === 'backspace'">
          <icon-ion-backspace class="icon" />
        </template>
        <template v-else-if="key === 'enter'">
          <icon-ion-return-down-back class="icon" />
        </template>
        <template v-else-if="key === '0'">
          <span class="value">{{ key }}</span>
        </template>
        <template v-else>
          {{ key }}
        </template>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import { onStartTyping, onKeyStroke } from "@vueuse/core";
import _ from "@/util/lodash";
import { strings } from "@/util";
import { selectInputValueOnFocus } from "@/views/logic/dom";

type NumpadKey =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "backspace"
  | "enter";

const OrderedKeys = Object.freeze<NumpadKey>([
  "7",
  "8",
  "9",
  "backspace",
  "4",
  "5",
  "6",
  "1",
  "2",
  "3",
  "enter",
  "0",
]);

type Option = {
  min?: number;
  max?: number;
  hiddenNumberDisplay?: boolean;
};

export default defineComponent({
  props: {
    value: {
      type: Number,
      required: true,
    },
    option: {
      type: Object as PropType<Option>,
    },
  },
  emits: ["update:value", "enterKeyPressed"],
  data() {
    return {
      OrderedKeys,
      selectInputValueOnFocus,
    };
  },
  setup(props, { emit }) {
    const option = Object.assign(
      {
        min: Number.MIN_SAFE_INTEGER,
        max: Number.MAX_SAFE_INTEGER,
        hiddenNumberDisplay: false,
      },
      props.option
    );

    const inputRef = ref<HTMLInputElement>();

    const valueChanged = (input: HTMLInputElement) => {
      const value = _.clamp(Number(input.value), option.min, option.max);
      emit("update:value", value);
      input.value = value.toString();
    };

    const inputEventHook = (event: Event) => {
      if (event.target !== null) {
        valueChanged(event.target as HTMLInputElement);
      }
    };

    const keyClicked = (key: NumpadKey) => {
      const input = inputRef.value;
      if (input !== undefined) {
        switch (key) {
          case "enter":
            emit("enterKeyPressed");
            return;
          case "backspace":
            input.value = input.value.slice(0, -1);
            break;
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            input.value += key;
            break;
        }
        valueChanged(input);
      }
    };

    if (!option.hiddenNumberDisplay) {
      onStartTyping((event) => {
        const input = inputRef.value;
        if (input !== undefined && !isNaN(Number(event.key))) {
          input.focus();
        }
      });
    } else {
      onKeyStroke(
        (event: KeyboardEvent) =>
          _.some(OrderedKeys, (x) => strings.equalsIgnoreCase(event.key, x)),
        (event) => {
          const key = OrderedKeys.find((x) =>
            strings.equalsIgnoreCase(event.key, x)
          );
          if (key !== undefined) {
            keyClicked(key);
          }
        }
      );
    }

    onKeyStroke("Delete", () => {
      const input = inputRef.value;
      if (input !== undefined) {
        input.value = "0";
        valueChanged(input);
      }
    });

    return {
      hiddenNumberDisplay: option.hiddenNumberDisplay,
      inputRef,
      inputEventHook,
      valueChanged,
      keyClicked,
    };
  },
});
</script>

<style lang="scss">
.numpad-root {
  @apply text-[1.125rem];
  @apply sm:(text-[1.5rem]);

  > .layout {
    @apply grid grid-cols-[repeat(4,minmax(0,2.5rem))] grid-rows-[repeat(5,minmax(0,2.5rem))];
    @apply sm:(grid-cols-[repeat(4,minmax(0,3.5rem))] grid-rows-[repeat(5,minmax(0,3.5rem))]);

    &.rows-4 {
      @apply grid-rows-[repeat(4,minmax(0,2.5rem))];
      @apply sm:(grid-rows-[repeat(4,minmax(0,3.5rem))]);
    }

    > .display {
      @apply col-span-4 text-right px-[0.5rem] rounded-t-sm;
      box-shadow: 0 0 0 1px #e0e0e0;

      &.hidden {
        @apply invisible absolute;
      }
    }

    > .key {
      @apply flex justify-center items-center bg-[#fefefe] cursor-pointer;
      box-shadow: 0 0 0 1px #e0e0e0;

      &.numpad-backspace {
        @apply row-span-2 z-1;
      }

      &.numpad-enter {
        @apply row-span-2 z-1 rounded-br-sm;
      }

      &.numpad-0 {
        @apply col-span-3 grid grid-cols-3 rounded-bl-sm;

        > .value {
          @apply col-span-1 text-center;
        }
      }

      > .icon {
        @apply w-[1.25rem] h-[1.25rem];
        @apply sm:(w-[1.75rem] h-[1.75rem]);
      }
    }
  }
}
</style>
