<script>
import { useQuasar } from "quasar";
import { Share2 } from "lucide-vue-next";
export default {
  name: "ShareComp",
  components: {
    Share2,
  },
  data() {
    return {
      shareUrl: window.location.href,
      $q: useQuasar(),
    };
  },
  methods: {
    copyToClipBoard() {
      const textToCopy = this.shareUrl.replace("result", "poll");
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          this.$q.notify({
            message: "Share link copied to clipboard",
            color: "positive",
            position: "top",
            timeout: 1000,
          });
        })
        .catch(() => {
          this.$q.notify({
            message: "Failed to copy share link to clipboard",
            color: "negative",
            position: "top",
            timeout: 1000,
          });
        });
    },
  },
};
</script>

<template>
  <q-btn @click="copyToClipBoard()" class="" outline rounded color="primary">
    <Share2 size="12" stroke-width="3" class="q-mr-sm" />
    <div class="text-capitalize text-body1">Share</div>
  </q-btn>
</template>

<style lang="scss" scoped></style>
