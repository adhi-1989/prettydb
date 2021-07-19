<template>
  <!-- status editor -->
  <section class="status-editor-root">
    <!-- status preview -->
    <div class="status-preview">
      <div class="status-item-group">
        <template v-for="key in StatusKeys" :key="key">
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
import { HallOfFameDTO } from "@/views/hall-of-fame/logic/db";
import Numpad from "@/views/components/Numpad.vue";
import { useI18n } from "vue-i18n";
import { StatusKeys, StatusKey } from "@/data";

export default defineComponent({
  components: {
    Numpad,
  },
  props: {
    editData: {
      type: Object as PropType<HallOfFameDTO>,
      required: true,
    },
  },
  data() {
    const { t } = useI18n();
    return {
      StatusKeys,
      t,
    };
  },
  setup(props) {
    const status = reactive(props.editData.status);

    const editing = ref<StatusKey>(StatusKeys.SPEED);
    const setEditing = (key: StatusKey) => {
      editing.value = key;
    };
    const isEditing = (key: StatusKey) => {
      return editing.value == key;
    };
    const rotateEditing = () => {
      if (isEditing(StatusKeys.SPEED)) {
        setEditing(StatusKeys.STAMINA);
      } else if (isEditing(StatusKeys.STAMINA)) {
        setEditing(StatusKeys.POWER);
      } else if (isEditing(StatusKeys.POWER)) {
        setEditing(StatusKeys.TENACITY);
      } else if (isEditing(StatusKeys.TENACITY)) {
        setEditing(StatusKeys.INTELLIGENCE);
      } else {
        setEditing(StatusKeys.SPEED);
      }
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
