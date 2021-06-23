import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import { extendDefaultPlugins } from "svgo";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isDevelopment = mode === "development";
  const base: string = isDevelopment ? "./" : "/prettydb/";
  return {
    base,
    build: {
      outDir: "./docs",
    },
    resolve: {
      alias: {
        "/~": path.resolve(__dirname, "node_modules"),
        "/icon": path.resolve(__dirname, "node_modules/ionicons/dist/svg"),
        "/@": path.resolve(__dirname, "src"),
        "/assets": path.resolve(__dirname, "src/assets"),
        "/components": path.resolve(__dirname, "src/components"),
        "/views": path.resolve(__dirname, "src/views"),
        "/locales": path.resolve(__dirname, "src/assets/locales"),
      },
    },
    plugins: [
      vue(),
      svgLoader({
        svgoConfig: {
          plugins: extendDefaultPlugins([
            {
              name: "cleanupIDs",
              active: false,
            },
          ]),
        },
      }),
      vueI18n({
        include: path.resolve(__dirname, "src/assets/locales/**/global/**"),
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "src/assets/style/abstract.scss";',
        },
      },
    },
  };
});
