<template>
  <section class="status-editor-root">
    <div class="status-preview">
      <div class="status-item-group">
        <template v-for="identify in AllStatus" :key="identify">
          <div
            class="status-item"
            :class="{ editing: isEditing(identify) }"
            @click="setEditing(identify)"
          >
            <div class="label">{{ t(getNameKey(identify)) }}</div>
            <div class="value">{{ status[identify] }}</div>
          </div>
        </template>
      </div>
    </div>

    <div class="numpad-wrapper">
      <numpad
        v-model:value="status[editing]"
        :option="{ min: 0, max: 1200, hiddenNumberDisplay: true }"
        @enter-key-pressed="rotateEditing"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import { useI18n } from "vue-i18n";
import { Status, StatusIdentify } from "@/data";
import {
  fallbackStateFactory,
  stateInjectionKey,
} from "@/views/hall-of-fame/logic/dependency";
import Numpad from "@/views/components/Numpad.vue";

const StatusRotation: Record<StatusIdentify, StatusIdentify> = {
  speed: "stamina",
  stamina: "power",
  power: "tenacity",
  tenacity: "intelligence",
  intelligence: "speed",
};

export default defineComponent({
  components: {
    Numpad,
  },
  data() {
    return {
      AllStatus: Status.all,
      getNameKey: Status.getNameKey,
    };
  },
  setup() {
    const { t } = useI18n();

    const { editData } = inject(stateInjectionKey, fallbackStateFactory, true);
    const { status } = editData.value;

    const editing = ref<StatusIdentify>("speed");
    const setEditing = (key: StatusIdentify) => {
      editing.value = key;
    };
    const isEditing = (key: StatusIdentify) => {
      return editing.value === key;
    };
    const rotateEditing = () => {
      setEditing(StatusRotation[editing.value]);
    };

    return {
      t,
      status,
      editing,
      setEditing,
      isEditing,
      rotateEditing,
    };
  },
});
</script>

<style lang="scss">
.status-editor-root {
  @apply h-full;

  > .status-preview {
    > .status-item-group {
      @apply grid grid-cols-5 gap-[0.25rem];

      > .status-item {
        @apply cursor-pointer;

        &.editing {
          > .label {
            @apply text-[#fafafa] bg-[#8fd54a] border-[#8fd54a];
          }
        }

        > .label {
          @apply text-[0.875rem] text-center py-[0.125rem] rounded-t-md border;
          @apply sm:(text-[1.125rem] py-[0.25rem]);
        }

        > .value {
          @apply text-right px-[0.25rem] py-[0.125rem] rounded-b-md border border-t-0;
          @apply sm:(text-[1.25rem] px-[0.5rem] py-[0.25rem]);
        }
      }
    }
  }

  > .numpad-wrapper {
    @apply flex justify-center mt-[2rem];
  }
}
</style>
