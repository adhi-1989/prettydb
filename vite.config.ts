import path from "path";
import { defineConfig } from "vite";
import "vite-ssg";
import vue from "@vitejs/plugin-vue";
import i18n from "@intlify/vite-plugin-vue-i18n";
import windiCss from "vite-plugin-windicss";
import icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import components from "unplugin-vue-components/vite";
import pages from "vite-plugin-pages";
import layouts from "vite-plugin-vue-layouts";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        "@/": `${path.resolve(__dirname, "src")}/`,
        "#/assets/": `${path.resolve(__dirname, "src/assets")}/`,
        "#/images/": `${path.resolve(__dirname, "src/assets/images")}/`,
      },
    },
    build: {
      rollupOptions: {
        output: {
          inlineDynamicImports: false,
          manualChunks(id) {
            //TODO: 余裕ができたらちゃんと設定する
            if (id.includes("node_modules")) {
              if (id.includes("pixi")) {
                return "pixi";
              }
              return "vendor";
            }
          },
        },
      },
    },
    plugins: [
      vue(),
      i18n({
        include: [path.resolve(__dirname, "src/assets/locales/**")],
      }),
      windiCss(),
      icons(),
      components({
        dts: path.resolve(__dirname, "src/components.d.ts"),
        resolvers: IconsResolver({
          componentPrefix: "icon",
        }),
      }),
      pages({
        pagesDir: [
          { dir: "src/views/root/pages", baseRoute: "" },
          { dir: "src/views/settings/pages", baseRoute: "settings" },
          { dir: "src/views/hall-of-fame/pages", baseRoute: "hall-of-fame" },
        ],
        exclude: ["**/components/*.vue"],
      }),
      layouts({
        layoutsDir: "src/views/_layouts",
        exclude: ["**/components/*.vue"],
      }),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.svg", "robots.txt", "sitemap.xml"],
        manifest: {
          name: "プリティーデービー",
          short_name: "PrettyDB",
          display: "standalone",
          theme_color: "#fefefe",
          background_color: "#fefefe",
          icons: [
            {
              src: "apple-icon.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "pwa-icon.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
        workbox: {
          skipWaiting: true,
          navigationPreload: true,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/prettydb\.adhi\.jp\/.+\.(svg|png)$/i,
              handler: "CacheFirst",
              options: {
                cacheName: "images",
                expiration: {
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                  maxEntries: 128,
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "google-fonts-stylesheets",
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "google-fonts-webfonts",
                cacheableResponse: {
                  statuses: [0, 200],
                },
                expiration: {
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                  maxEntries: 30,
                },
              },
            },
          ],
        },
      }),
      visualizer(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "src/assets/styles/abstract.scss";',
        },
      },
    },
    server: {
      fs: {
        strict: true,
      },
    },
    ssgOptions: {
      script: "async",
      formatting: "minify",
    },
  };
});
