import { defineStore } from "pinia";
import { useTimeAgo, useLocalStorage } from "@vueuse/core";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.baseURL = "http://localhost:3000";

export const usePollStore = defineStore("poll", {
  state: () => {
    return {
      poll: null,
      error: null,
      timeAgo: null,
      loading: false,
    };
  },
  actions: {
    async fetchPoll(pollId) {
      try {
        const { data } = await axios.get(`/polls/${pollId}`);
        this.poll = data;
        this.timeAgo = useTimeAgo(data.createdAt);
      } catch (error) {
        this.error = error;
      }
    },

    async createPoll(poll) {
      try {
        const { data } = await axios.post("/polls", poll);
        this.poll = data;
        return data;
      } catch (error) {
        this.error = error;
      }
    },

    async vote(pollId, optionId) {
      try {
        const { data } = await axios.post(`/polls/${pollId}/vote`, {
          optionId,
        });
        this.poll = data;
        useLocalStorage("polls", []).value.push(pollId);
      } catch (error) {
        this.error = error;
      }
    },

    setOptionColors() {
      const colors = [
        "#e60049",
        "#0bb4ff",
        "#ffcf00",
        "#00bfa0",
        "#9b19f5",
        "#f52394",
        "#fa8c16",
        "#dc0ab4",
        "#b3d4ff",
        "#50e991",
      ];
      this.poll.options.forEach((option, index) => {
        option.color = colors[index];
      });
    },
  },
  getters: {
    VotesArray() {
      return this.poll.options.map((o) => o.votes);
    },
    totalVotes() {
      return this.poll.options.reduce(
        (total, option) => total + option.votes,
        0
      );
    },
    sortedOptions() {
      const sortedOptions = [...this.poll.options];
      sortedOptions.sort((a, b) => b.votes - a.votes);
      return sortedOptions;
    },
    sortedPoll() {
      return {
        ...this.poll,
        options: this.sortedOptions,
      };
    },
  },
});
