import path from "path";
import { defineConfig } from "vite";
import "vite-ssg";
import vue from "@vitejs/plugin-vue";
import i18n from "@intlify/vite-plugin-vue-i18n";
import windiCss from "vite-plugin-windicss";
import icons, { ViteIconsResolver } from "vite-plugin-icons";
import components from "vite-plugin-components";
import pages from "vite-plugin-pages";
import layouts from "vite-plugin-vue-layouts";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProductionMode = mode === "production";
  return {
    base: isProductionMode ? "/prettydb/" : "/",
    resolve: {
      alias: {
        "~/": `${path.resolve(__dirname, "node_modules")}/`,
        "@/": `${path.resolve(__dirname, "src")}/`,
        "#/assets/": `${path.resolve(__dirname, "src/assets")}/`,
        "#/images/": `${path.resolve(__dirname, "src/assets/images")}/`,
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
        globalComponentsDeclaration: path.resolve(
          __dirname,
          "src/components.d.ts"
        ),
        customComponentResolvers: ViteIconsResolver({
          componentPrefix: "icon",
        }),
      }),
      pages({
        pagesDir: [
          { dir: "src/views/pages", baseRoute: "" },
          { dir: "src/views/settings/pages", baseRoute: "settings" },
          { dir: "src/views/hall-of-fame/pages", baseRoute: "hall-of-fame" },
        ],
        exclude: ["**/components/*.vue"],
      }),
      layouts({
        layoutsDir: "src/views/_layouts",
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
          navigationPreload: true,
          runtimeCaching: [
            {
              urlPattern: /https:\/\/adhi-1989\.github\.io\/.+\.(svg|png)$/,
              handler: "CacheFirst",
              options: {
                cacheName: "assets",
                expiration: {
                  maxEntries: 128,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
              },
            },
          ],
        },
      }),
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
