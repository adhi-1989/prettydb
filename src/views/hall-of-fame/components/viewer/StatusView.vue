<template>
  <section class="status-view-root">
    <div class="status-view-wrapper">
      <div class="status-item-group">
        <template v-for="identify in AllStatus" :key="identify">
          <div class="status-container" :class="identify">
            <div class="status-label">{{ t(getNameKey(identify)) }}</div>

            <div class="status-score">
              <img
                class="grade"
                :src="getStatusGradeIcon(status[identify])"
                alt=""
              />
              <div class="value">{{ status[identify] }}</div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { useI18n } from "vue-i18n";
import { Status } from "@/data";
import { getStatusGradeIcon } from "@/views/logic/resources/images";
import {
  fallbackStateFactory,
  stateInjectionKey,
} from "@/views/hall-of-fame/logic/dependency";

export default defineComponent({
  data() {
    return {
      AllStatus: Status.all,
      getNameKey: Status.getNameKey,
      getStatusGradeIcon,
    };
  },
  setup() {
    const { t } = useI18n();

    const { viewData } = inject(stateInjectionKey, fallbackStateFactory, true);
    const { status } = viewData.value;

    return {
      t,
      status,
    };
  },
});
</script>

<style lang="scss">
@mixin status-separator {
  background-image: linear-gradient(
    to bottom,
    #70bd3c,
    #70bd3c 2px,
    transparent 1px,
    transparent 4px
  );
  background-size: 1.625px 5px;
  background-position: left;
  background-repeat: repeat-y;
}

.status-view-root {
  @apply font-bold text-center px-[0.5rem];
  @apply sm:(px-[0.75rem]);

  > .status-view-wrapper {
    @apply rounded-md overflow-hidden bg-gradient-to-t from-[#91ce50] to-[#80c53f];

    > .status-item-group {
      @apply flex rounded-md overflow-hidden bg-[#8fd54a] border-[1px] border-transparent bg-clip-padding;

      > .status-container {
        @apply w-full;

        &:not(:first-child) {
          > .status-label,
          > .status-score {
            @include status-separator;
          }
        }

        > .status-label {
          @apply text-[0.75rem] text-[#fefefe] py-[0.25rem] tracking-wider;
          @apply sm:(text-[0.875rem]);
          @apply md:(text-[1rem]);
        }

        > .status-score {
          @apply flex items-center bg-[#fefefe] py-[0.25rem];

          > .grade {
            @apply object-scale-down w-[1rem] ml-[0.375rem];
            @apply sm:(w-[1.5rem]);
            @apply md:(w-[2rem]);
          }

          > .value {
            @apply flex-grow text-[0.75rem];
            @apply sm:(text-[1rem]);
            @apply md:(text-[1.25rem]);
          }
        }
      }
    }
  }
}
</style>
