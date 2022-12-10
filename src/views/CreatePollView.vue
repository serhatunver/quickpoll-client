<script>
import { usePollStore } from "../stores/poll";

import { useQuasar } from "quasar";

import { nextTick } from "vue";
import { Send, Plus, X } from "lucide-vue-next";

export default {
  components: {
    Send,
    Plus,
    X,
  },
  data() {
    return {
      store: usePollStore(),
      pollState: {
        question: "",
        options: [
          {
            value: "",
          },
          {
            value: "",
          },
        ],
      },
      $q: useQuasar(),
    };
  },
  methods: {
    async submitPoll() {
      this.store.loading = true;
      await this.store.createPoll(this.pollState);
      this.store.loading = false;
      if (this.store.error) {
        this.$q.notify({
          message: this.store.error.response.data,
          color: "negative",
          position: "top",
          timeout: 2000,
        });
        this.store.error = null;
      } else {
        this.$q.notify({
          message: "Poll created successfully",
          color: "positive",
          position: "top",
          timeout: 2000,
        });
        this.$router.push(`/poll/${this.store.poll._id}`);
      }
    },
    focusLastOption() {
      const inputs = Array.from(
        document.getElementsByClassName("q-field__native")
      );

      nextTick(() => {
        inputs[this.pollState.options.length].focus();
      });
    },
    focusNext(e) {
      const inputs = Array.from(
        document.getElementsByClassName("q-field__native")
      );
      const index = inputs.indexOf(e.target);
      if (index < inputs.length - 1 && e.target.value !== "") {
        inputs[index + 1].focus();
      }
    },
    async addDomain(e, index) {
      if (
        e.key === "Enter" &&
        index === this.pollState.options.length - 1 &&
        this.pollState.options.length < 10
      ) {
        this.pollState.options.push({
          value: "",
        });
        await nextTick();
        this.focusNext(e);
      } else if (e.type === "click" && this.pollState.options.length < 10) {
        this.pollState.options.push({
          value: "",
        });
        await nextTick();
        this.focusLastOption(e);
      } else if (
        (e.type === "click" || e.key === "Enter") &&
        this.pollState.options.length >= 10
      ) {
        this.$q.notify({
          title: "Error",
          message: "You can only have up to 10 options",
          color: "negative",
          ok: true,
        });
      }
      if (e.key === "Enter") {
        this.focusNext(e);
      }
    },
    removeDomain(item) {
      let index = this.pollState.options.indexOf(item);
      if (index !== -1) {
        this.pollState.options.splice(index, 1);
      }
    },
  },
};
</script>

<template>
  <q-page class="full-width row justify-center">
    <div class="q-pa-md" style="width: 600px">
      <q-form
        @submit.prevent="submitPoll"
        class="q-gutter-md"
        v-auto-animate="{ duration: 100 }"
      >
        <p class="text-center text-h4">Create Poll</p>
        <p class="text-center text-subtitle2">
          Complete the below fields to create your poll.
        </p>
        <p class="text-body1">Question</p>
        <q-input
          class="text-body1"
          v-model="pollState.question"
          filled
          autogrow
          :rules="[
            (val) =>
              val.length >= 6 || 'Question must be at least 6 characters',
          ]"
          lazy-rules
          no-error-icon
          placeholder="Type your question here"
        />

        <p class="text-body1">Options</p>

        <div
          class="row"
          v-for="(option, index) in pollState.options"
          :key="index"
        >
          <q-input
            class="option fit text-body1 text-bold"
            filled
            :rules="[
              (val) =>
                val.length >= 2 || 'Option must be at least 2 characters',
            ]"
            lazy-rules
            no-error-icon
            type="text"
            v-model="option.value"
            :placeholder="`Option ${index + 1}`"
            @keypress.enter.prevent="addDomain($event, index)"
          />
          <q-btn
            v-if="pollState.options.length > 2"
            @click="removeDomain(option)"
            class="remove-btn"
            flat
          >
            <X size="30" />
          </q-btn>
        </div>

        <q-btn
          @click="addDomain($event)"
          class="text-body1"
          color="primary"
          rounded
        >
          <Plus size="20" class="q-mr-sm" />
          <div class="text-capitalize text-body1">Add Option</div>
        </q-btn>

        <div>
          <q-btn
            type="submit"
            class="q-mt-md full-width text-body1"
            color="primary"
            rounded
            :loading="store.loading"
          >
            <template v-slot:loading>
              <q-spinner-tail size="24" class="on-left" />
              <div class="text-capitalize text-body1">Creating Poll...</div>
            </template>
            <Send size="16" class="q-mr-sm" />
            <div class="text-capitalize text-body1">Create Poll</div>
          </q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.q-page {
  padding: 16px 0;
}

.remove-btn {
  position: absolute;
  right: 0;
  padding: 13px;
  cursor: pointer;
  border-radius: 0 5px 0 0;
  color: $red-6;
}
.remove-btn:hover {
  background-color: $red-6;
  color: #fff;
}
</style>
