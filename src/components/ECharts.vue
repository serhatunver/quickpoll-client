<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import { TooltipComponent } from "echarts/components";

use([CanvasRenderer, PieChart, TooltipComponent]);

import { usePollStore } from "../stores/poll";
import VChart, { THEME_KEY, INIT_OPTIONS_KEY } from "vue-echarts";
export default {
  name: "PieChart",
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "light",
    [INIT_OPTIONS_KEY]: {
      // renderer: "svg",
      // devicePixelRatio: 0,
      width: 400,
      height: 300,
    },
  },
  data() {
    return {
      option: {
        // animation: false,
        animationDuration: 3000,
        animationDelayUpdate: -100,
        animationDurationUpdate: 1000,
        animationEasing: "elasticOut",
        animationEasingUpdate: "elasticOut",
        color: [
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
        ],
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} votes ({d}%)",
        },
        series: [
          {
            name: "Poll",
            type: "pie",
            radius: [0, 125],
            center: ["50%", "50%"],
            data: [],
            label: {
              fontSize: 12,
              fontWeight: "bold",
              fontFamily: "cursive",
              color: "inherit",
            },
            labelLine: {
              length: 15,
              length2: 10,
              maxSurfaceAngle: 360,
            },
            itemStyle: {
              borderRadius: 2,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
              label: {
                fontSize: "14",
                color: "inherit",
                fontWeight: "bold",
              },
            },
          },
        ],
      },
      store: usePollStore(),
      poll: {},
    };
  },
  async created() {
    this.setPoll();
    this.store.$subscribe(() => {
      this.setPoll();
    });
  },
  methods: {
    setPoll() {
      this.option.series[0].data = this.store.poll.options.map((option) => {
        return {
          value: option.votes,
          name: option.value,
        };
      });
    },
  },
  computed: {
    titles() {
      return this.store.poll.options.map((option) => option.question);
    },
    votes() {
      return this.store.poll.options.map((option) => option.votes);
    },
  },
};
</script>

<template>
  <div>
    <v-chart :option="option" />
  </div>
</template>

<style lang="scss" scoped></style>
