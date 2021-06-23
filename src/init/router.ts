import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "/views/Home.vue";
import HallOfFame from "/views/HallOfFame.vue";
import NotFound from "/views/NotFound.vue";
import i18n from "./i18n";
import _ from "lodash";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/changelog",
    name: "Changelog",
    component: () =>
      import(/* webpackChunkName: "changelog" */ "/views/Changelog.vue"),
    meta: {
      title: "document-title.changelog"
    }
  },
  {
    path: "/hall-of-fame",
    name: "HallOfFame",
    component: HallOfFame,
    meta: {
      title: "document-title.hall-of-fame"
    }
  },
  {
    path: "/:pathMatch(.*)",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "document-title.notfound"
    }
  }
];

const router = createRouter({
  //history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
});

router.afterEach((to, from) => {
  const html = document.querySelector("html");
  if (html) {
    html.setAttribute("lang", i18n.global.locale.value);
  }

  if (_.isString(to?.meta.title)) {
    document.title = i18n.global.t(to.meta.title);
  } else {
    document.title = i18n.global.t("document-title.base");
  }
})

export default router;
