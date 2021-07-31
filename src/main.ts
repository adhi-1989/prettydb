import _ from "@/util/lodash";
import { ViteSSG } from "vite-ssg";
import generatedRoutes from "virtual:generated-pages";
import { setupLayouts } from "virtual:generated-layouts";
import App from "./App.vue";

import "virtual:windi.css";
import "./assets/styles/main.scss";
// インストールしたのをそのまま使うとエラーがでるので、問題箇所を削除したものをローカルからロードする
// https://github.com/animate-css/animate.css/issues/641
import "./assets/styles/animate.css";

const routes = setupLayouts(generatedRoutes);

export const createApp = ViteSSG(App, { routes }, (context) => {
  _.values(import.meta.globEager("./modules/*.ts")).forEach(({ install }) => {
    if (_.isFunction(install)) {
      install(context);
    }
  });
});
