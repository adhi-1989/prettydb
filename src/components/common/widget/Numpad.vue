<template>
  <!-- numpad -->
  <article class="numpad-root">
    <input
      ref="inputRef"
      class="display"
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
      :data-key="key"
      @click="keyClicked(key)"
    >
      <template v-if="key === Numpad.BACK_SPACE">
        <div class="icon">
          <backspace-icon />
        </div>
      </template>
      <template v-else-if="key === Numpad.ENTER">
        <div class="icon">
          <enter-icon />
        </div>
      </template>
      <template v-else-if="key === Numpad.ZERO">
        <div class="value">{{ key }}</div>
        <div class="padding" />
      </template>
      <template v-else>
        <div class="value">{{ key }}</div>
      </template>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { selectInputValueOnFocus } from "/@/util/ui";
import BackspaceIcon from "/icon/backspace-outline.svg?component";
import EnterIcon from "/icon/return-down-back.svg?component";

const Numpad = {
  ZERO: "0",
  ONE: "1",
  TWO: "2",
  THREE: "3",
  FOUR: "4",
  FIVE: "5",
  SIX: "6",
  SEVEN: "7",
  EIGHT: "8",
  NINE: "9",
  BACK_SPACE: "back-space",
  ENTER: "enter",
} as const;

const OrderedKeys = [
  Numpad.SEVEN,
  Numpad.EIGHT,
  Numpad.NINE,
  Numpad.BACK_SPACE,
  Numpad.FOUR,
  Numpad.FIVE,
  Numpad.SIX,
  Numpad.ONE,
  Numpad.TWO,
  Numpad.THREE,
  Numpad.ENTER,
  Numpad.ZERO,
] as const;

type NumpadKey = typeof Numpad[keyof typeof Numpad];

export default defineComponent({
  name: "Numpad",
  components: {
    BackspaceIcon,
    EnterIcon,
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
    minValue: {
      type: Number,
      default: Number.MIN_SAFE_INTEGER,
    },
    maxValue: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER,
    },
  },
  emits: ["update:value", "enterKeyPressed"],
  data() {
    return {
      Numpad,
      OrderedKeys,
      selectInputValueOnFocus,
    };
  },
  setup(props, { emit }) {
    const inputRef = ref<HTMLInputElement>();
    const inputEventHook = (event: Event) => {
      if (event.target != null) {
        valueChanged(event.target as HTMLInputElement);
      }
    };
    const valueChanged = (input: HTMLInputElement) => {
      let num = Number(input.value);
      if (num < props.minValue) {
        num = props.minValue;
      } else if (num > props.maxValue) {
        num = props.maxValue;
      }
      emit("update:value", num);
      input.value = num.toString();
    };
    const keyClicked = (key: NumpadKey) => {
      if (inputRef.value == undefined || inputRef.value?.value == undefined) {
        return;
      }
      const input = inputRef.value;
      switch (key) {
        case "enter":
          emit("enterKeyPressed");
          return;
        case "back-space":
          input.value = input?.value.slice(0, -1);
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
    };
    return {
      inputRef,
      inputEventHook,
      valueChanged,
      keyClicked,
    };
  },
});
</script>

<style lang="scss" scoped>
.numpad-root {
  @apply inline-grid grid-cols-4 border;
  grid-template-columns: repeat(4, 3rem);
  grid-template-rows: 2.5rem repeat(4, 3rem);
  > .display {
    @apply col-span-4 text-right border px-[0.5rem];
  }
  > .key {
    @apply flex justify-center items-center border bg-[#fefefe] cursor-pointer;
    &[data-key="back-space"],
    &[data-key="enter"] {
      @apply row-span-2;
    }
    &[data-key="0"] {
      @apply col-span-3 grid grid-cols-3;
      > .value {
        @apply text-center;
      }
      > .padding {
        @apply col-span-2 h-full;
      }
    }
    > .icon {
      @apply w-[1.75rem] h-[1.75rem];
    }
  }
}
</style>
