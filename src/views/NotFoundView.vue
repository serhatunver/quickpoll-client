<script>
export default {
  name: "NotFound",
};
</script>

<template>
  <q-page class="full-width column flex-center text-center">
    <q-img
      class="q-my-lg"
      src="../assets/not_found.svg"
      alt="404_not_found"
      spinner-color="primary"
    />
    <div class="text-h5 q-mb-sm">Page not found</div>
    <div class="text-caption q-mb-lg">
      The page you are looking for does not exist
    </div>

    <router-link to="/">
      <q-btn class="test" size="md" color="primary">
        <div class="text-capitalize text-body1">Go back to home</div>
      </q-btn>
    </router-link>
  </q-page>
</template>

<style lang="scss" scoped>
.q-img {
  width: clamp(200px, 100%, 500px);
}
</style>
