import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./init/i18n";
import router from "./init/router";

import "animate.css";
import "tailwindcss/tailwind.css";
import "/assets/style/concrete.scss";

createApp(App).use(i18n).use(router).mount("#app");
