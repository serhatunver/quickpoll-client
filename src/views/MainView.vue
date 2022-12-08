<script>
export default {};
</script>

<template>
  <q-page class="" style="max-width: 1000px">
    <div class="section row justify-between align-center">
      <div class="col-12 col-sm-5 title text-h4">
        Create your poll
        <br />
        <span class="text-bold text-primary"> in seconds.</span>
        <br />
        Get instant result.
      </div>
      <q-img
        class="col-11 col-sm-6"
        src="../assets/charts.svg"
        spinner-color="primary"
      />
    </div>
    <div class="button-wrapper row flex-center">
      <q-btn
        to="/create"
        class="col-sm-5 col-11"
        size="md"
        color="primary"
        rounded
      >
        <div class="text-capitalize text-body1">Create Poll</div></q-btn
      >
      <q-btn
        to="/poll/637d67527a1ea85c5a28bc8d"
        class="col-sm-5 col-11"
        size="md"
        outline
        color="primary"
        rounded
      >
        <div class="text-capitalize text-body1">View example</div>
      </q-btn>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.q-page {
  padding-inline: 16px;
  width: 100%;
  padding-top: 48px;
}

.section {
  align-items: center;
  margin-bottom: 64px;
  text-align: center;

  .title {
    font-size: calc(1.5rem + 1.5vw);
    line-height: 1.2;
  }
  padding: calc(1rem + 0.6vw);
}

.button-wrapper {
  justify-content: space-between;
}
@media (max-width: $breakpoint-xs-max) {
  .q-page {
    padding-top: 16px;
  }

  .section {
    margin-bottom: 0;
    // gap: 32px;
    justify-content: center;
    & > div {
      margin-bottom: 32px;
    }
  }
  .button-wrapper {
    gap: 16px;
    justify-content: center;
  }
}
</style>
