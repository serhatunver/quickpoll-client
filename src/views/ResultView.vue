<script>
import { io } from "socket.io-client";
import { usePollStore } from "../stores/poll";
import { Share2, ArrowLeft } from "lucide-vue-next";

export default {
  components: {
    Share2,
    ArrowLeft,
  },
  data() {
    return {
      store: usePollStore(),
      loading: true,
    };
  },
  async created() {
    await this.store.fetchPoll(this.$route.params.id);
    this.loading = false;
    const socket = io(import.meta.env.VITE_API_URL);
    socket.on("result", async (updatedPoll) => {
      this.store.poll.options = updatedPoll.options;
    });
  },
};
</script>

<template>
  <q-page
    class="column full-width q-pa-md align-center"
    style="max-width: 1000px"
  >
    <div v-if="loading" style="width: 100%">
      <div class="q-mb-lg">
        <q-skeleton bordered type="text" height="30px" width="100%" />
        <q-skeleton
          bordered
          class="q-mb-sm"
          type="text"
          height="30px"
          width="70%"
        />
        <q-skeleton bordered type="text" height="20px" width="50%" />
      </div>
      <div class="q-mb-md">
        <q-list>
          <div class="column" v-for="n in 5" :key="n" clickable>
            <div class="row justify-between">
              <q-skeleton type="text" height="25px" width="60%" />
              <q-skeleton type="text" height="25px" width="15%" />
            </div>
            <q-skeleton
              class="q-mb-md"
              type="text"
              bordered
              height="25px"
              width="100%"
            />
          </div>
        </q-list>
      </div>
      <div class="full-width">
        <div class="row full-width justify-between">
          <q-skeleton
            bordered
            type="QChip"
            class="q-mb-md"
            height="40px"
            width="45%"
          />
          <q-skeleton
            bordered
            type="QChip"
            class="q-mb-md"
            height="40px"
            width="30%"
          />
        </div>
      </div>
    </div>
    <div v-else class="container">
      <div class="poll-title column q-mb-lg full-width">
        <div class="text-h5 text-bold q-mb-sm">
          {{ store.poll.question }}
        </div>
        <div class="text-subtitle2">
          by Anonymous user • {{ store.timeAgo }}
        </div>
      </div>
      <div class="charts">
        <div class="progress full-width">
          <progress-bar class="q-mb-lg" />
          <div class="flex justify-between">
            <q-btn
              class=""
              :to="`/poll/${this.$route.params.id}`"
              color="primary"
              rounded
            >
              <ArrowLeft size="16" class="q-mr-sm" />
              <div class="text-capitalize text-subtitle2">Back to Vote</div>
            </q-btn>
            <share-button />
          </div>
        </div>
        <e-charts class="pie" />
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.q-page {
  padding: 40px 16px;
}
.progress {
  width: calc(100% - 400px);
  & .q-btn {
    width: 40%;
  }
}

.charts {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

@media (max-width: $breakpoint-sm-max) {
  .pie {
    display: none;
  }
  .charts {
    width: clamp(300px, 100%, 800px);
  }
  .container {
    max-width: 700px;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
