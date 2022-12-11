<script>
import { usePollStore } from "../stores/poll";
import { useQuasar } from "quasar";
import { Share2, PieChart, Send } from "lucide-vue-next";

export default {
  name: "VoteComp",
  components: {
    Share2,
    PieChart,
    Send,
  },
  data() {
    return {
      store: usePollStore(),
      picked: null,
      loading: true,
      submitting: false,
      $q: useQuasar(),
    };
  },
  async created() {
    await this.store.fetchPoll(this.$route.params.id);
    this.loading = false;
    if (this.store.error || this.store.poll === null) {
      this.$q.notify({
        message: this.store.error.response.data,
        color: "negative",
        position: "top",
        timeout: 2000,
      });
      this.$router.push("/");
      this.store.error = null;
    }
  },
  methods: {
    async vote() {
      if (this.picked === null) {
        this.$q.notify({
          message: "Please select an option",
          color: "negative",
          position: "top",
          timeout: 1000,
        });
      } else if (this.alreadyVoted) {
        this.$q.notify({
          message: "You have already voted",
          color: "negative",
          position: "top",
          timeout: 1000,
        });
      } else {
        this.submitting = true;
        await this.store.vote(
          this.$route.params.id,
          this.store.poll.options[this.picked]._id
        );
        if (this.store.error) {
          this.$q.notify({
            message: this.store.error.response.data,
            color: "negative",
            position: "top",
            timeout: 1000,
          });
          this.submitting = false;
        } else {
          this.$q.notify({
            message: "Vote submitted",
            color: "positive",
            position: "top",
            timeout: 1000,
          });
          this.submitting = false;
          this.$router.push(`/result/${this.$route.params.id}`);
        }
      }
    },
  },
  computed: {
    alreadyVoted() {
      if (localStorage.getItem("polls")) {
        const polls = JSON.parse(localStorage.getItem("polls"));
        if (polls.includes(this.$route.params.id)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  },
};
</script>

<template>
  <q-page style="max-width: 800px">
    <div v-if="loading" style="width: 100%">
      <div class="title-wrapper">
        <q-skeleton type="text" width="100%" />
        <q-skeleton type="text" width="70%" />
        <q-skeleton type="text" height="20px" width="50%" />
      </div>
      <div class="rad-wrapper">
        <q-list>
          <q-item v-for="n in 5" :key="n" clickable>
            <q-item-section>
              <label class="rad-label">
                <q-skeleton
                  class="q-mr-md"
                  type="QRadio"
                  height="25px"
                  width="25px"
                />
                <q-skeleton type="text" height="30px" width="70%" />
              </label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="full-width">
        <q-skeleton type="QChip" class="full-width q-mb-md" height="40px" />
        <div class="button-wrapper row full-width">
          <q-skeleton type="QChip" class="q-mb-md" height="40px" width="40%" />
          <q-skeleton type="QChip" class="q-mb-md" height="40px" width="40%" />
        </div>
      </div>
    </div>

    <div v-else style="width: 100%">
      <div class="title-wrapper">
        <div class="text-h5 q-mb-sm" style="letter-spacing: 1px">
          {{ store.poll.question }}
        </div>
        <div class="text-subtitle2">
          by Anonymous user • {{ store.timeAgo }}
        </div>
      </div>
      <div class="rad-wrapper">
        <q-list>
          <q-item
            v-for="(option, index) in store.poll.options"
            :key="option._id"
            clickable
          >
            <q-item-section>
              <label class="rad-label">
                <input
                  type="radio"
                  class="rad-input"
                  name="rad"
                  :value="index"
                  v-model="picked"
                />
                <div class="rad-design"></div>
                <div class="rad-text">{{ option.value }}</div>
              </label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="full-width">
        <q-btn
          @click="vote()"
          class="full-width q-mb-md"
          color="primary"
          size="lg"
          push
          rounded
          :loading="submitting"
        >
          <Send :size="16" class="q-mr-sm" />
          <div class="text-capitalize text-body1">Vote</div>
          <template v-slot:loading>
            <q-spinner-tail size="24" class="on-left" />
            <div class="text-capitalize text-body1">Voting...</div>
          </template>
        </q-btn>
        <div class="button-wrapper row full-width">
          <q-btn
            :to="`/result/${this.$route.params.id}`"
            size="md"
            color="primary"
            outline
            rounded
          >
            <PieChart :size="12" stroke-width="3" class="q-mr-sm" />
            <div class="text-capitalize text-body1">Results</div>
          </q-btn>
          <share-button />
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.q-page {
  width: 100%;
  height: 100%;
  padding: 40px 16px;
}
.button-wrapper {
  display: flex;
  justify-content: space-between;
  & > * {
    width: calc(40%);
  }
}
.q-item {
  padding: 0;
  &.q-item--clickable {
    cursor: pointer;
    border-radius: 100px;
  }
  &.q-item--clickable:focus-within {
    background-color: $primary;
    color: white;
  }
}
.rad-wrapper {
  margin-bottom: 20px;
}
.rad-label {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
}

.rad-input {
  position: absolute;
  width: 20px;
  height: 20px;
  opacity: 0;
  z-index: -1;
}

.rad-design {
  width: 20px;
  height: 20px;
  border-radius: 100px;

  background: linear-gradient(
    to right bottom,
    hsl(280, 100%, 73%),
    hsl(286, 100%, 50%)
  );
}

.rad-design::before {
  content: "";

  display: inline-block;
  width: inherit;
  height: inherit;
  border-radius: inherit;

  background: hsl(0, 0%, 80%);
  transform: scale(1.1);
  transition: 0.3s;
}

.rad-input:checked + .rad-design::before {
  transform: scale(0);
}

.rad-text {
  margin-left: 14px;
  letter-spacing: 3px;
  font-size: 16px;
  font-weight: 500;
  transition: 0.3s;
}

.rad-input:checked ~ .rad-text {
  font-weight: 700;
  font-size: 18px;
  transition: 0.3s;
}

.title-wrapper {
  font-size: clamp(20px, 3vw, 32px);
  text-align: start;
  margin-bottom: 20px;
}
</style>
