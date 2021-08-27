<template>
  <section :class="$style.status">
    <div :class="$style.container">
      <div :class="$style.items">
        <template v-for="identify in AllStatus" :key="identify">
          <div :class="$style.item">
            <div :class="$style.label">{{ t(getNameKey(identify)) }}</div>
            <div :class="$style.score">
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
  </section>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { useI18n } from "vue-i18n";
import { Status } from "@/data";
import { getStatusGradeIcon } from "@/views/_common/logic/resources/images";
import { State } from "@/views/hall-of-fame/logic/dependency";

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

    const { viewData } = State(inject);
    const { status } = viewData.value;

    return {
      t,
      status,
    };
  },
});
</script>

<style lang="scss" module>
.status {
  @apply text-center px-[0.5rem];
  @apply sm:(px-[0.75rem]);

  > .container {
    @apply rounded-md bg-gradient-to-t from-[#91ce50] to-[#80c53f] overflow-hidden;

    > .items {
      @apply flex rounded-md bg-[#8fd54a] bg-clip-padding border-1 border-transparent overflow-hidden;

      > .item {
        @apply w-full;

        &:not(:first-child) {
          > .label,
          > .score {
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
        }

        > .label {
          @apply text-xxs text-[#fefefe] py-[0.125rem] tracking-wider;
          @apply sm:(text-xs);
          @apply md:(text-base);
        }

        > .score {
          @apply font-bold text-xs flex justify-around items-center w-full py-[0.25rem] bg-[#fefefe];
          @apply sm:(text-sm);
          @apply md:(text-lg);

          > .grade {
            @apply w-[1rem] h-[1rem];
            @apply sm:(w-[1.5rem] h-[1.5rem]);
            @apply md:(w-[2rem] h-[2rem]);
          }
        }
      }
    }
  }
}
</style>
