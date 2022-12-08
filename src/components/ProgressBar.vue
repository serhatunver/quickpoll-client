<script>
import { usePollStore } from "../stores/poll";

export default {
  data() {
    return {
      store: usePollStore(),
      backgroundColor: [
        "#1f77b4",
        "#ff7f0e",
        "#2ca02c",
        "#ffd756",
        "#d62728",
        "#9467bd",
        "#17becf",
      ],
    };
  },
  async created() {
    this.store.setOptionColors();
    this.store.$subscribe(() => {
      this.store.setOptionColors();
    });
  },
  computed: {
    totalVotes() {
      return this.store.poll.options.reduce(
        (total, option) => total + option.votes,
        0
      );
    },
    getPercentage() {
      return (votes) => +((votes / this.totalVotes) * 100).toFixed(1);
    },
  },
};
</script>

<template>
  <div class="progress-container">
    <ol v-auto-animate="{ duration: 200 }">
      <li v-for="option in store.sortedPoll.options" :key="option._id">
        <div class="row justify-between text-body1">
          <div>{{ option.value }}</div>
          <div class="">{{ option.votes }} Votes</div>
        </div>
        <k-progress
          class="text-body1"
          :percent="getPercentage(option.votes) || 0"
          active
          :line-height="12"
          :color="option.color"
          :format="(percent) => `${percent}%`"
        ></k-progress>
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
.k-progress {
  width: 100%;
  color: currentColor;
  justify-content: space-between;
}

ol {
  list-style-type: none;
}

li {
  margin-bottom: 10px;
}
</style>
