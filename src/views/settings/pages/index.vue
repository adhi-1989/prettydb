<template>
  <article class="settings-root">
    <section class="content export-import">
      <h1 class="label">
        {{ t("pages.settings.content.export-import.label") }}
      </h1>
      <div class="items">
        <div class="item hall-of-fame">
          <span class="label">{{ t("pages.hall-of-fame.name") }}</span>
          <div class="button export" @click="exportData('hall-of-fame/data')">
            {{ t("pages.settings.content.export-import.button.export") }}
          </div>
          <div
            class="button import"
            @click="openFileChooser('hall-of-fame/data')"
          >
            {{ t("pages.settings.content.export-import.button.import") }}
          </div>
        </div>
      </div>
    </section>
    <transition name="toast">
      <section class="toast" v-if="showToast">
        {{ t("pages.settings.content.toast.import") }}
      </section>
    </transition>
    <section class="invisible">
      <input ref="importRef" type="file" @change="importData" />
      <a ref="downloadRef" href="#" :download="fileName"></a>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "~/vue-i18n";
import { useHead } from "~/@vueuse/head";
import { db } from "@/views/hall-of-fame/logic/db";

export default defineComponent({
  setup() {
    const { t } = useI18n();
    useHead({
      title: t("pages.settings.title"),
      meta: [{ name: "description", content: t("pages.settings.description") }],
    });

    const showToast = ref(false);
    const importRef = ref<Element>();
    const downloadRef = ref<Element>();
    const fileName = ref("dummy.dat");
    const dataType = ref("hall-of-fame/data");
    const openFileChooser = (type: string) => {
      dataType.value = type;
      if (importRef.value) {
        const input = importRef.value as HTMLElement;
        input.click();
      }
    };
    const exportData = async (type: string) => {
      const { exportDB } = await import("dexie-export-import");
      if (downloadRef.value) {
        if (type === "hall-of-fame/data") {
          const baseName = t(
            "pages.settings.content.export-import.file-name.hall-of-fame.data"
          );
          const now = new Date();
          const timestamp = `${now.getFullYear()}-${
            now.getMonth() + 1
          }-${now.getDate()}`;
          const blob = await exportDB(db);
          const link = downloadRef.value as HTMLAnchorElement;
          link.href = window.URL.createObjectURL(blob);
          link.download = `${baseName}-${timestamp}.dat`;
          link.click();
        }
      }
    };
    const importData = async () => {
      const { importInto } = await import("dexie-export-import");
      if (importRef.value) {
        const input = importRef.value as HTMLInputElement;
        if (input.files) {
          const file = input.files[0];

          if (dataType.value === "hall-of-fame/data") {
            importInto(db, file, { clearTablesBeforeImport: true }).then(() => {
              toast();
            });
          }
        }
      }
    };
    const toast = () => {
      showToast.value = true;
      window.setTimeout(() => {
        showToast.value = false;
      }, 3000);
    };
    return {
      t,
      showToast,
      importRef,
      downloadRef,
      fileName,
      openFileChooser,
      exportData,
      importData,
    };
  },
});
</script>

<style lang="scss">
.settings-root {
  @apply relative w-[20rem] h-full mx-auto py-[1rem];
  @apply sm:(w-[26.25rem] py-[1.5rem]);
  @apply md:(w-[32rem] py-[2rem]);
  > .content {
    @apply flex flex-col gap-y-[0.75rem];
    @apply sm:(gap-y-[1.25rem]);
    @apply md:(gap-y-[1.5rem]);
    > .label {
      @apply ml-[1rem] text-[1rem];
      @apply sm:(text-[1.25rem]);
      @apply md:(text-[1.5rem]);
    }

    > .items {
      @apply flex flex-col gap-y-[1rem] mx-[2rem] text-[0.875rem];
      @apply sm:(text-[1rem]);
      @apply md:(text-[1.25rem]);
      > .item {
        @apply flex gap-x-[0.75rem] items-center;
        @apply sm:(gap-x-[1rem]);
        @apply md:(gap-x-[1.25rem]);
        > .label {
          @apply flex-grow;
        }

        > .button {
          @include button-gradient;
          @apply px-[0.25rem] py-[0.125rem] rounded-sm border-1 cursor-pointer;
          @apply sm:(px-[0.5rem] py-[0.25rem]);
          @apply md:(px-[0.75rem] py-[0.375rem]);
        }
      }
    }
  }

  > .toast {
    @apply absolute bottom-0 inset-x-0 w-[fit-content] mx-auto mb-[1rem] px-[1.25rem] py-[0.75rem] rounded-sm font-bold text-[0.75rem] text-[#fefefe] bg-gradient-to-t from-[#7fbf3cff] via-[#90ca3fff] to-[#a2d543ff];
    @apply sm:(mb-[1.5rem] px-[1.5rem] py-[1rem] text-[1rem]);
    @apply md:(mb-[2rem] px-[1.75rem] py-[1.25rem] text-[1.25rem]);
    &-enter-active {
      animation: fadeInUp;
      animation-duration: 0.5s;
    }

    &-leave-active {
      animation: fadeOut;
      animation-duration: 0.75s;
    }
  }
}
</style>
