<script>
export default {
  name: "ShareComp",
  data() {
    return {
      shareUrl: window.location.href,
    };
  },
  methods: {
    copyToClipBoard() {
      const textToCopy = this.shareUrl;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          this.$message.success("Share link copied to clipboard");
        })
        .catch(() => {
          this.$message.error("Failed to copy share link to clipboard");
        });
    },
  },
};
</script>

<template>
  <q-btn outline class="" size="lg" color="primary">
    <q-icon left size="1em" name="share" />
    <div class="text-capitalize">Share</div>
  </q-btn>
</template>

<style lang="scss" scoped></style>
