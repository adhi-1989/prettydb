<template>
  <section :class="$style.numpad" v-bind="$attrs">
    <div
      :class="[$style.layout, { [$style.hiddenDisplay]: hiddenNumberDisplay }]"
    >
      <input
        ref="inputRef"
        :class="$style.display"
        type="number"
        v-model="value"
        @focus="selectInputValueOnFocus"
        @keyup.enter="$emit('enterKeyPressed')"
      />
      <div
        v-for="key in OrderedKeys"
        :key="key"
        :class="getKeyClasses(key)"
        @click="keyClicked(key)"
      >
        <template v-if="key === 'backspace'">
          <icon-ion-backspace :class="$style.icon" />
        </template>
        <template v-else-if="key === 'enter'">
          <icon-ion-return-down-back :class="$style.icon" />
        </template>
        <template v-else-if="key === '0'">
          <span :class="$style.value">{{ key }}</span>
        </template>
        <template v-else>
          {{ key }}
        </template>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, useCssModule, PropType, ref, computed } from "vue";
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
    modelValue: {
      type: Number,
      required: true,
    },
    option: {
      type: Object as PropType<Option>,
    },
  },
  emits: ["update:modelValue", "enterKeyPressed"],
  data() {
    return {
      OrderedKeys,
      selectInputValueOnFocus,
    };
  },
  setup(props, { emit }) {
    const value = computed({
      get: () => props.modelValue,
      set: (value: number) => emit("update:modelValue", value),
    });
    const option = Object.assign(
      {
        min: Number.MIN_SAFE_INTEGER,
        max: Number.MAX_SAFE_INTEGER,
        hiddenNumberDisplay: false,
      },
      props.option
    );

    const _style = useCssModule();
    const inputRef = ref<HTMLInputElement>();

    const getKeyClasses = (arg: NumpadKey) => {
      const { key, backspace, enter, zero } = _style;
      const result = [key];
      if (arg === "backspace") {
        result.push(backspace);
      } else if (arg === "enter") {
        result.push(enter);
      } else if (arg === "0") {
        result.push(zero);
      }
      return result;
    };
    const keyClicked = (key: NumpadKey) => {
      const input = inputRef.value;
      if (input !== undefined) {
        let _value = value.value;
        switch (key) {
          case "enter":
            emit("enterKeyPressed");
            return;
          case "backspace":
            _value = Math.floor(_value / 10);
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
            _value = _value * 10 + Number(key);
            break;
        }
        value.value = _.clamp(Number(_value), option.min, option.max);
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
      value.value = 0;
    });

    return {
      value,
      hiddenNumberDisplay: option.hiddenNumberDisplay,
      inputRef,
      getKeyClasses,
      keyClicked,
    };
  },
});
</script>

<style lang="scss" module>
.numpad {
  @apply text-lg;
  @apply sm:(text-xl);

  > .layout {
    @apply grid grid-cols-[repeat(4,minmax(0,2.5rem))] grid-rows-[repeat(5,minmax(0,2.5rem))];
    @apply sm:(grid-cols-[repeat(4,minmax(0,3.5rem))] grid-rows-[repeat(5,minmax(0,3.5rem))]);

    &.hiddenDisplay {
      @apply grid-rows-[repeat(4,minmax(0,2.5rem))];
      @apply sm:(grid-rows-[repeat(4,minmax(0,3.5rem))]);

      > .display {
        @apply invisible absolute;
      }
    }

    > .display {
      @apply col-span-4 text-right px-[0.5rem] rounded-t-sm;
      box-shadow: 0 0 0 1px #e0e0e0;
    }

    > .key {
      @apply flex justify-center items-center bg-[#fefefe] cursor-pointer;
      box-shadow: 0 0 0 1px #e0e0e0;

      &:hover {
        @apply bg-[#f2f2f2];
      }

      &.backspace {
        @apply row-span-2 z-1;
      }

      &.enter {
        @apply row-span-2 z-1 rounded-br-sm;
      }

      &.zero {
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
