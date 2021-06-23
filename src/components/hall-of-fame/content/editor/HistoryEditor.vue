<template>
  <!-- history editor -->
  <section class="history-editor-root">
    <!-- result editor -->
    <div class="result-editor">
      <div
        class="result-label fans-number"
        v-t="'glossary.history.fans-number'"
      />
      <div class="result-value fans-number">
        <input type="number" v-model="history.fansNumber" @focus="selectInputValueOnFocus" />
      </div>

      <div class="result-label score" v-t="'glossary.history.score'" />
      <div class="result-value score">
        <input type="number" v-model="history.score" @focus="selectInputValueOnFocus" />
      </div>

      <div
        class="result-label register-date"
        v-t="'glossary.history.register-date'"
      />
      <div class="result-value register-date">
        <input type="date" min="2021-02-24" v-model="history.registerDate" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import { HallOfFameDTO } from "/@/db/hall-of-fame";
import { useI18n } from "vue-i18n";
import { selectInputValueOnFocus } from "/@/util/ui";

export default defineComponent({
  name: "HistoryEditor",
  props: {
    editData: {
      type: Object as PropType<HallOfFameDTO>,
      required: true,
    },
  },
  data() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
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

<i18n locale="ja" src="/locales/ja/game/glossary.json" />
