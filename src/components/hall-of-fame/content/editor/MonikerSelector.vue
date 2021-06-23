<template>
  <!-- moniker -->
  <section class="moniker-selector-root">
    <!-- filter -->
    <div class="moniker-filter" v-if="false">
      <label class="input-wrapper">
        <div class="icon">
          <search-icon />
        </div>
        <input
          class="input"
          type="text"
          v-model="searchQuery"
          @focus="selectInputValueOnFocus"
        />
      </label>
    </div>

    <!-- selectors -->
    <div class="moniker-selector">
      <div class="selector-item-group">
        <template v-for="id in monikerList" :key="id">
          <div
            class="selector-item"
            :data-selected="isMonikerSelected(id)"
            @click="setMonikerID(id)"
          >
            <span v-t="getMonikerKey(id)" />
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, ref } from "vue";
import { HallOfFameDTO } from "/@/db/hall-of-fame";
import { getMonikerKey } from "/@/util/i18n";
import { getAllMoniker } from "/@/data";
import { useI18n } from "vue-i18n";
import { selectInputValueOnFocus } from "/@/util/ui";
import SearchIcon from "/icon/search-sharp.svg?component";

export default defineComponent({
  name: "MonikerSelector",
  components: {
    SearchIcon,
  },
  props: {
    editData: {
      type: Object as PropType<HallOfFameDTO>,
      required: true,
    },
  },
  data() {
    return {
      selectInputValueOnFocus,
    };
  },
  setup(props) {
    const character = reactive(props.editData.character);

    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });

    const searchQuery = ref("");
    const monikerList = computed(() => {
      return getAllMoniker(character.characterID)
        .filter((x) => {
          const name = t(getMonikerKey(x.CHARACTER_ID, x.MONIKER_ID));
          return name.includes(searchQuery.value);
        })
        .map((x) => x.MONIKER_ID);
    });
    const setMonikerID = (id: number) => {
      character.monikerID = id;
    };
    const isMonikerSelected = (id: number) => {
      return character.monikerID == id;
    };
    return {
      getMonikerKey: (id: number) => getMonikerKey(character.characterID, id),
      t,
      searchQuery,
      monikerList,
      setMonikerID,
      isMonikerSelected,
    };
  },
});
</script>

<style lang="scss" scoped>
.moniker-selector-root {
  @apply h-full;
  > .moniker-filter {
    @apply rounded-full overflow-hidden h-[1.5rem] border shadow-sm;
    > .input-wrapper {
      @apply flex bg-[#fefefe];
      > .icon {
        @apply w-[1.75rem] h-[1.5rem] px-[0.25rem] py-[0.125rem];
      }
      > .input {
        @apply text-[0.75rem] w-full bg-transparent;
      }
    }
  }
  > .moniker-selector {
    @apply rounded overflow-auto h-full p-[0.75rem] bg-[#f2f2f2];
    > .selector-item-group {
      @apply grid gap-[0.75rem];
      grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
      > .selector-item {
        @include text-overflow-omit;
        @apply text-center text-[0.875rem] rounded-full bg-[#fefefe] cursor-pointer;
        &[data-selected="true"] {
          @apply ring;
        }
      }
    }
  }
}
</style>

<i18n locale="ja" src="/locales/ja/game/character.json" />
