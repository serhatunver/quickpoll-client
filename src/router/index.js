import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainView,
    },
    {
      path: "/poll/:id",
      name: "vote",
      component: () => import("../views/VoteView.vue"),
    },
    {
      path: "/result/:id",
      name: "result",
      component: () => import("../views/ResultView.vue"),
    },
    {
      path: "/create",
      name: "create",
      component: () => import("../views/CreatePollView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;
