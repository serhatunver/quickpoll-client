<script>
import { useQuasar } from "quasar";
import { useDark } from "@vueuse/core";
import { Moon, Sun } from "lucide-vue-next";

const isDark = useDark();

export default {
  components: {
    Moon,
    Sun,
  },
  data() {
    return {
      $q: useQuasar(),
      isDark: isDark,
    };
  },
  created() {
    localStorage.getItem("theme") === "dark"
      ? this.$q.dark.set(true)
      : localStorage.getItem("theme") === "light"
      ? this.$q.dark.set(false)
      : this.$q.dark.set(this.isDark);
  },
  methods: {
    toggleDarkMode() {
      this.$q.dark.toggle();
      localStorage.setItem("theme", this.$q.dark.isActive ? "dark" : "light");
    },
  },
};
</script>
<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      class="row justify-center text-black"
      :style="{
        backgroundColor: $q.dark.isActive ? '#13111C' : '#fff',
        color: $q.dark.isActive ? '#fff' : '#000',
      }"
      elevated
    >
      <q-toolbar class="row justify-between q-px-md" style="max-width: 1000px">
        <router-link to="/">
          <q-btn flat class="q-pa-none text-h5 text-bold text-capitalize">
            <div
              class="text-h5 text-bold"
              :style="{
                color: $q.dark.isActive ? '#fff' : '#000',
              }"
            >
              <span class="text-primary">Quick</span>Poll
            </div>
          </q-btn>
        </router-link>

        <q-btn
          @click="toggleDarkMode"
          padding="sm"
          flat
          round
          :class="{
            'text-white': $q.dark.isActive,
            'text-black': !$q.dark.isActive,
          }"
        >
          <template v-if="$q.dark.isActive">
            <Sun fill="white" />
          </template>
          <template v-else>
            <Moon :size="24" fill="black" />
          </template>
        </q-btn>

        <q-btn color="primary" size="sm" to="/create" rounded>
          <div class="text-capitalize text-subtitle2">Create Poll</div>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container
      class="full-width row justify-center items-center"
      :style="{
        backgroundColor: $q.dark.isActive ? '#13111C' : '#fff',
        color: $q.dark.isActive ? '#fff' : '#000',
      }"
    >
      <router-view />
    </q-page-container>

    <q-footer
      class=""
      :style="{
        backgroundColor: $q.dark.isActive ? '#13111C' : '#fff',
        color: $q.dark.isActive ? '#fff' : '#000',
        textShadow: $q.dark.isActive
          ? `0px 0px 5px rebeccapurple, 0 0 5px rebeccapurple`
          : 'none',
      }"
      elevated
    >
      <q-toolbar>
        <q-toolbar-title class="text-center text-caption">
          QuickPoll Beta ©2022 Serhat Ünver</q-toolbar-title
        >
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style lang="scss" scoped></style>
