import { createApp } from "vue";
import { createPinia } from "pinia";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
const app = createApp(App);
const pinia = createPinia();
import { Quasar, Notify } from "quasar";

import KProgress from "k-progress-v3";

import App from "./App.vue";
import router from "./router";

app.component("k-progress", KProgress);

import "./assets/base.scss";
import "./assets/quasar.sass";

app.use(Quasar, {
  plugins: {
    Notify,
  },
  config: {
    notify: {
      position: "top",
    },
  },
});

app.use(pinia);
app.use(router);
app.use(autoAnimatePlugin);

app.mount("#app");
