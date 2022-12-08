import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
// import VoteView from "../views/VoteView.vue";
// import ResultsView from "../views/ResultView.vue";
// import NewForm from "../views/NewForm.vue";
import NotFoundView from "../views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      // component: () => import("../views/MainView.vue"),
      component: MainView,
    },
    {
      path: "/poll/:id",
      name: "vote",
      component: () => import("../views/VoteView.vue"),
      // component: VoteView,
    },
    {
      path: "/result/:id",
      name: "result",
      component: () => import("../views/ResultView.vue"),
      // component: ResultsView,
    },
    {
      path: "/create",
      name: "create",
      component: () => import("../views/NewForm.vue"),
      // component: NewForm,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;
