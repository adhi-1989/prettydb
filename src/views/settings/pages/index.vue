<template>
  <article :class="$style.settings">
    <section :class="$style.content">
      <h1 :class="$style.label">
        {{ t("pages.settings.export-import.label") }}
      </h1>

      <div :class="$style.items">
        <div :class="$style.item">
          <div :class="$style.label">
            <span :class="$style.text">{{ t("head.hall-of-fame.name") }}</span>
            <hr :class="$style.separator" />
          </div>

          <div :class="$style.buttons">
            <div
              :class="$style.button"
              @click="exportData('hall-of-fame/data')"
            >
              <div :class="$style.content">
                <icon-mdi-download :class="$style.icon" />
                <span :class="$style.text">
                  {{ t("pages.settings.export-import.button.export") }}
                </span>
              </div>
            </div>
            <div
              :class="$style.button"
              @click="importFile('hall-of-fame/data')"
            >
              <div :class="$style.content">
                <icon-mdi-database-import :class="$style.icon" />
                <span :class="$style.text">
                  {{ t("pages.settings.export-import.button.import") }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section :class="$style.hidden">
        <input ref="importRef" type="file" @change="importData" />
        <a ref="downloadRef" href="#" download="dummy.dat"></a>
      </section>
    </section>

    <transition name="toast" @enter="fadeInUp" @leave="fadeOut">
      <section :class="$style.toast" v-if="isToastDisplay">
        {{ t("pages.settings.toast.import") }}
      </section>
    </transition>
  </article>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useHead } from "@vueuse/head";
import { useToggle } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import dayjs from "dayjs";
import { animations } from "@/views/_common/logic/dom/animation";
import { db } from "@/views/hall-of-fame/logic/db";

type DataType = "hall-of-fame/data";

const fadeInUp = animations.fadeInUp({
  duration: 250,
});
const fadeOut = animations.fadeOut({
  duration: 500,
});

const { t } = useI18n();

useHead({
  title: t("head.settings.title"),
  meta: [{ name: "description", content: t("head.settings.description") }],
});

const [isToastDisplay, toggleToast] = useToggle();

const importRef = ref<Element>();
const downloadRef = ref<Element>();

const dataType = ref<DataType>("hall-of-fame/data");

const importFile = (type: DataType) => {
  if (importRef.value !== undefined) {
    dataType.value = type;
    const input = importRef.value as HTMLElement;
    input.click();
  }
};

const exportData = async (type: DataType) => {
  if (downloadRef.value !== undefined) {
    const { exportDB } = await import("dexie-export-import");

    if (type === "hall-of-fame/data") {
      const baseName = t(
        "pages.settings.export-import.file-name.hall-of-fame.data"
      );
      const timestamp = dayjs().format("YYYY-MM-DD_HH-mm-ss");
      exportDB(db)
        .then((blob) => {
          const link = downloadRef.value as HTMLAnchorElement;
          link.href = window.URL.createObjectURL(blob);
          link.download = `${baseName} ${timestamp}.dat`;
          link.click();
          //TODO: 成功時のトーストを表示する
        })
        .catch(() => {
          //TODO: エラー時のトーストを表示する
        });
    }
  }
};
const importData = async () => {
  if (importRef.value !== undefined) {
    const input = importRef.value as HTMLInputElement;
    if (input.files) {
      const { importInto } = await import("dexie-export-import");

      const file = input.files[0];

      if (dataType.value === "hall-of-fame/data") {
        importInto(db, file, {
          acceptVersionDiff: true,
          clearTablesBeforeImport: true,
        })
          .then(() => {
            toast();
          })
          .catch(() => {
            //TODO: エラー時のトーストを表示する
          });
      }
    }
  }
};

const toast = () => {
  toggleToast(true);
  window.setTimeout(() => {
    toggleToast(false);
  }, 3000);
};
</script>

<style lang="scss" module>
.settings {
  @apply relative w-[18rem] h-full mx-auto py-[1rem] overflow-hidden;
  @apply sm:(w-[24.25rem] py-[1.5rem]);
  @apply md:(w-[32rem] py-[2rem]);

  > .content {
    @apply flex flex-col gap-y-[0.75rem];
    @apply sm:(gap-y-[1.25rem]);
    @apply md:(gap-y-[1.5rem]);

    > .label {
      @apply text-center text-base;
      @apply sm:(text-lg);
      @apply md:(text-xl);
    }

    > .items {
      @apply text-xs flex flex-col gap-y-[1rem] p-[0.5rem] rounded-md border-2;
      @apply sm:(text-sm p-[0.75rem]);
      @apply md:(text-base p-[1rem]);

      > .item {
        @apply flex flex-col gap-y-[0.25rem];
        @apply sm:(gap-y-[0.375rem]);
        @apply md:(gap-y-[0.5rem]);

        > .label {
          @apply flex gap-x-[0.5rem] items-center px-[0.5rem] py-[0.25rem];

          > .separator {
            @apply flex-grow border-[#d2d2d2];
          }
        }

        > .buttons {
          @apply flex justify-around;

          > .button {
            @include button-border;
            @apply rounded-lg cursor-pointer;

            > .content {
              @include button-content;
              @apply flex gap-x-[0.25rem] items-center w-full h-full px-[0.5rem] py-[0.25rem] rounded-lg;
              @apply sm:(gap-x-[0.75rem] px-[0.75rem] py-[0.375rem]);
              @apply md:(gap-x-[1rem] px-[1rem] border-2);

              > .icon {
                @apply w-[1rem] h-[1rem];
                @apply sm:(w-[1.5rem] h-[1.5rem]);
                @apply md:(w-[2rem] h-[2rem]);
              }
            }
          }
        }
      }
    }

    > .hidden {
      @apply invisible absolute left-0 top-0 w-0 h-0;
    }
  }

  > .toast {
    @apply absolute bottom-0 inset-x-0 w-[fit-content] mx-auto mb-[1rem] px-[1.25rem] py-[0.75rem] rounded-md font-bold text-[0.75rem] text-[#fefefe] bg-gradient-to-t from-[#7fbf3cff] via-[#90ca3fff] to-[#a2d543ff];
    @apply sm:(mb-[1.5rem] px-[1.5rem] py-[1rem] text-base);
    @apply md:(mb-[2rem] px-[1.75rem] py-[1.25rem] text-lg);
  }
}
</style>
