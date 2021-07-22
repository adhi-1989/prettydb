<template>
  <!-- history editor -->
  <section class="history-editor-root">
    <!-- result editor -->
    <div class="result-editor">
      <div class="result-label fans-number">
        {{ t("game-system.history.fans-number") }}
      </div>
      <div class="result-value fans-number">
        <input
          type="number"
          v-model="history.fansNumber"
          @focus="selectInputValueOnFocus"
        />
      </div>

      <div class="result-label score">{{ t("game-system.history.score") }}</div>
      <div class="result-value score">
        <input
          type="number"
          v-model="history.score"
          @focus="selectInputValueOnFocus"
        />
      </div>

      <div class="result-label register-date">
        {{ t("game-system.history.register-date") }}
      </div>
      <div class="result-value register-date">
        <input type="date" min="2021-02-24" v-model="history.registerDate" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import { Dto } from "@/views/hall-of-fame/logic/db";
import { useI18n } from "vue-i18n";
import { selectInputValueOnFocus } from "@/views/logic/dom";

export default defineComponent({
  props: {
    editData: {
      type: Object as PropType<Dto>,
      required: true,
    },
  },
  data() {
    const { t } = useI18n();
    return {
      selectInputValueOnFocus,
      t,
    };
  },
  setup(props) {
    return {
      history: reactive(props.editData.history),
    };
  },
});
</script>

<style lang="scss" scoped></style>
