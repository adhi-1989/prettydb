<template>
  <section :class="$style.statusEditor">
    <div :class="$style.preview">
      <div :class="$style.statusContainer">
        <template v-for="identify in Status.all" :key="identify">
          <div
            :class="[$style.status, { [$style.editing]: isEditing(identify) }]"
            @click="setEditing(identify)"
          >
            <div :class="$style.label">
              {{ getStatusName(identify) }}
            </div>
            <div :class="$style.valueContainer">
              <img
                :class="$style.grade"
                :src="getStatusGradeIcon(status[identify])"
                alt=""
              />
              <div :class="$style.value">{{ status[identify] }}</div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div :class="$style.editor">
      <div :class="$style.display">
        <div :class="$style.label">
          {{ getStatusName(editing) }}
        </div>
        <div :class="$style.value">{{ status[editing] }}</div>
      </div>
      <numpad
        v-model="status[editing]"
        :option="{ min: 0, max: 1200, hiddenNumberDisplay: true }"
        @enter-key-pressed="rotateEditing"
      />
    </div>
  </section>
</template>

<script lang="ts">
import type { StatusIdentify } from "@/data";

const statusRotation = Object.freeze<Record<StatusIdentify, StatusIdentify>>({
  speed: "stamina",
  stamina: "power",
  power: "tenacity",
  tenacity: "intelligence",
  intelligence: "speed",
});

export default {
  statusRotation,
};
</script>

<script lang="ts" setup>
import { inject, ref } from "vue";
import { useI18n } from "vue-i18n";
import { Status } from "@/data";
import { State } from "@/views/hall-of-fame/logic/dependency";
import { getStatusGradeIcon } from "@/views/_common/logic/resources/images";
import Numpad from "@/views/_common/components/widget/Numpad.vue";

const { t } = useI18n();

const { editData } = State(inject);
const { status } = editData.value;

function getStatusName(identity: StatusIdentify): string {
  return t(Status.getNameKey(identity));
}

const editing = ref<StatusIdentify>("speed");

function setEditing(key: StatusIdentify): void {
  editing.value = key;
}

function isEditing(key: StatusIdentify): boolean {
  return editing.value === key;
}

function rotateEditing(): void {
  setEditing(statusRotation[editing.value]);
}
</script>

<style lang="scss" module>
.statusEditor {
  @apply h-full;

  > .preview {
    @apply p-[0.5rem] rounded-md bg-[#f2f2f2];
    @apply sm:(p-[0.75rem]);
    @apply md:(p-[1rem]);

    > .statusContainer {
      @apply grid grid-cols-3 gap-x-[1rem] gap-y-[1.5rem];
      @apply sm:(gap-x-[1.5rem] gap-y-[2rem]);
      @apply md:(gap-x-[2rem] gap-y-[2rem]);

      > .status {
        @apply cursor-pointer;

        &.editing {
          > .label {
            @apply text-[#8fd54a] border-[#8fd54a];
          }
        }

        > .label {
          @apply text-sm text-left border-b border-[#d0d0d0];
          @apply sm:(text-lg);
        }

        > .valueContainer {
          @apply flex justify-between items-center px-[0.125rem];
          @apply sm:(mt-[0.125rem]);

          > .grade {
            @apply w-[1.25rem] h-[1.25rem];
            @apply sm:(w-[1.75rem] h-[1.75rem]);
            @apply md:(w-[2rem] h-[2rem]);
          }

          > .value {
            @apply text-right px-[0.25rem];
            @apply sm:(text-xl px-[0.5rem]);
          }
        }
      }
    }
  }

  > .editor {
    @apply flex flex-col w-[max-content] mx-auto mt-[2rem] bg-[#fefefe];

    > .display {
      @apply flex justify-between items-center h-[2.5rem];
      @apply sm:(h-[3.5rem]);
      box-shadow: 0 0 0 1px #e0e0e0;

      > .label {
        @apply text-base text-left px-[0.375rem];
        @apply sm:(text-lg px-[0.5rem]);
      }

      > .value {
        @apply text-lg text-right flex-grow px-[0.25rem];
        @apply sm:(text-xl px-[0.5rem]);
      }
    }
  }
}
</style>
