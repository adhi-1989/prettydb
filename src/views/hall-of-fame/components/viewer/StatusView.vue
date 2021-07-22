<template>
  <!-- status -->
  <section class="status-view-root">
    <div class="status-view-wrapper">
      <div class="status-element-group">
        <template v-for="key in StatusKeys" :key="key">
          <!-- status-element -->
          <div class="status-element" :class="key">
            <div class="element-label">
              {{ t(`game-system.status.${key}`) }}
            </div>
            <div class="element-value">
              <img
                class="image"
                :src="getStatusGradeIcon(status[key])"
                alt=""
              />
              <div class="text">{{ status[key] }}</div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, readonly } from "vue";
import { getStatusGradeIcon } from "@/views/logic/resources/images";
import { Dto } from "@/views/hall-of-fame/logic/db";
import { useI18n } from "vue-i18n";
import { StatusKeys } from "@/data";

export default defineComponent({
  props: {
    viewData: {
      type: Object as PropType<Dto>,
      required: true,
    },
  },
  data() {
    const { t } = useI18n();
    return {
      getStatusGradeIcon,
      StatusKeys,
      t,
    };
  },
  setup(props) {
    return {
      status: readonly(props.viewData.status),
    };
  },
});
</script>

<style lang="scss" scoped>
@mixin separator {
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
  > .status-view-wrapper {
    @apply rounded-md overflow-hidden bg-gradient-to-t from-[#91ce50] to-[#80c53f];
    > .status-element-group {
      @apply flex rounded-md overflow-hidden bg-[#8fd54a] border-[1px] border-transparent bg-clip-padding;
      > .status-element {
        @apply w-full;
        &:not(:first-child) {
          > .element-label,
          > .element-value {
            @include separator;
          }
        }

        > .element-label {
          @apply text-[0.75rem] text-[#fefefe] py-[0.25rem] tracking-wider;
        }

        > .element-value {
          @apply flex gap-x-[0.125rem] items-center px-[0.25rem] bg-[#fefefe];
          > .image {
            @apply w-[35%] object-scale-down;
          }

          > .text {
            @apply flex-grow text-[0.95rem] py-[0.25rem] text-right;
          }
        }
      }
    }
  }
}

@screen xs {
  .status-view-root {
    @apply px-[0.75rem];
    > .status-view-wrapper {
      > .status-element-group {
        > .status-element {
          > .element-label {
            @apply text-[0.875rem] py-[0.375rem];
          }

          > .element-value {
            @apply px-[0.5rem];
            > .image {
              @apply w-[2rem] my-[0.125rem];
            }

            > .text {
              @apply text-[1.25rem] py-[0.375rem] mr-[0.25rem];
            }
          }
        }
      }
    }
  }
}
</style>
