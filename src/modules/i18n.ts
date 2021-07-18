import { createI18n } from "~/vue-i18n";
import { ViteSSGContext } from "~/vite-ssg";

const messages = Object.fromEntries(
  Object.entries(import.meta.globEager("../assets/locales/*.yaml")).map(
    ([key, value]) => {
      const results = key.match(/\/([a-z-]+)\.yaml$/);
      if (results == null) {
        throw Error(`Illegal i18n filename: ${key}`);
      }
      return [results[1], value.default];
    }
  )
);

export const install = ({ app }: ViteSSGContext): void => {
  const i18n = createI18n({
    legacy: false,
    locale: "ja",
    fallbackLocale: "ja",
    messages,
  });
  app.use(i18n);
};
