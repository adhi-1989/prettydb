<template>
  <!-- status editor -->
  <section class="status-editor-root">
    <!-- status preview -->
    <div class="status-preview">
      <div class="status-item-group">
        <template v-for="key in AllStatus" :key="key">
          <div
            class="status-item"
            :data-editing="isEditing(key)"
            @click="setEditing(key)"
          >
            <div class="label">{{ t(`game-system.status.${key}`) }}</div>
            <div class="value">{{ status[key] }}</div>
          </div>
        </template>
      </div>
    </div>

    <div class="numpad-wrapper">
      <numpad
        v-model:value="status[editing]"
        :min-value="0"
        :max-value="1200"
        @enter-key-pressed="rotateEditing"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from "vue";
import { Dto } from "@/views/hall-of-fame/logic/db";
import Numpad from "@/views/components/Numpad.vue";
import { useI18n } from "vue-i18n";
import { Status, AllStatus } from "@/data";

const StatusRotation: Record<Status, Status> = {
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
  props: {
    editData: {
      type: Object as PropType<Dto>,
      required: true,
    },
  },
  data() {
    const { t } = useI18n();
    return {
      AllStatus,
      t,
    };
  },
  setup(props) {
    const status = reactive(props.editData.status);

    const editing = ref<Status>("speed");
    const setEditing = (key: Status) => {
      editing.value = key;
    };
    const isEditing = (key: Status) => {
      return editing.value == key;
    };
    const rotateEditing = () => {
      setEditing(StatusRotation[editing.value]);
    };
    return {
      status,
      editing,
      setEditing,
      isEditing,
      rotateEditing,
    };
  },
});
</script>

<style lang="scss" scoped>
.status-editor-root {
  > .status-preview {
    > .status-item-group {
      @apply grid grid-cols-5 gap-[0.25rem];
      > .status-item {
        @apply rounded border cursor-pointer;
        &[data-editing="true"] {
          @apply ring;
        }

        > .label {
          @apply text-center border-b;
        }

        > .value {
          @apply text-right mx-[0.25rem];
        }
      }
    }
  }

  > .numpad-wrapper {
    @apply flex justify-center mt-[2rem];
  }
}
</style>
