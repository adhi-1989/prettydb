<template>
  <!-- character -->
  <section class="character-selector-root">
    <!-- filter -->
    <div class="character-filter">
      <label class="input-wrapper">
        <icon-ion-search class="icon" />
        <input
          class="input"
          type="text"
          v-model="searchQuery"
          @focus="selectInputValueOnFocus"
        />
      </label>
    </div>

    <!-- selectors -->
    <div class="character-selector">
      <div class="selector-item-group">
        <template v-for="id in characterList" :key="id">
          <div
            class="selector-item"
            :data-selected="isCharacterSelected(id)"
            @click="setCharacterID(id)"
          >
            <span>{{ t(getCharacterNameKey(id)) }}</span>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, ref } from "vue";
import { Dto } from "@/views/hall-of-fame/logic/db";
import { AllCharacter } from "@/data";
import { selectInputValueOnFocus } from "@/views/logic/dom";
import { getCharacterNameKey } from "@/views/logic/i18n";
import { useI18n } from "vue-i18n";

export default defineComponent({
  props: {
    editData: {
      type: Object as PropType<Dto>,
      required: true,
    },
  },
  data() {
    return {
      getCharacterNameKey,
      selectInputValueOnFocus,
    };
  },
  setup(props) {
    const character = reactive(props.editData.character);

    const { t } = useI18n();

    const searchQuery = ref("");
    const characterList = computed(() => {
      return AllCharacter.filter((x) => {
        const name = t(getCharacterNameKey(x.characterID));
        return name.includes(searchQuery.value);
      }).map((x) => x.characterID);
    });
    const setCharacterID = (id: number) => {
      character.characterID = id;
    };
    const isCharacterSelected = (id: number) => {
      return character.characterID == id;
    };

    return {
      t,
      searchQuery,
      characterList,
      setCharacterID,
      isCharacterSelected,
    };
  },
});
</script>

<style lang="scss" scoped>
.character-selector-root {
  @apply h-full;
  > .character-filter {
    @apply rounded-full overflow-hidden h-[1.75rem] border shadow-sm;
    > .input-wrapper {
      @apply flex bg-[#fefefe] px-[0.25rem] py-[0.125rem];
      > .icon {
        @apply w-[1.5rem] h-[1.5rem];
      }
      > .input {
        @apply w-full bg-transparent;
      }
    }
  }

  > .character-selector {
    @apply rounded overflow-auto h-[calc(100%-1.75rem-0.5rem)] p-[0.75rem] mt-[0.5rem] bg-[#f2f2f2];
    > .selector-item-group {
      @apply grid gap-[0.75rem];
      grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));

      > .selector-item {
        @include text-overflow-omit;
        @apply text-center text-[0.875rem] py-[0.25rem] rounded-full bg-[#fefefe] cursor-pointer;
        &[data-selected="true"] {
          @apply ring;
        }
      }
    }
  }
}
</style>
