<template>
  <div class="titlebar-buttons">
    <input
      type="button"
      class="titlebar-button"
      value=""
      v-on:click="updateFocus"
    />
    <input
      type="button"
      class="titlebar-button"
      value=""
      v-on:click="updateFocus"
    />
    <input
      type="button"
      class="titlebar-button"
      value=""
      v-on:click="updateMaximization"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TitlebarButtons",
  props: {
    focused: Boolean
  },
  emits: ["update-focus", "update-maximization"],
  methods: {
    updateFocus: function() {
      this.$emit("update-focus", "");
    },
    updateMaximization: function() {
      this.$emit("update-maximization", "");
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.titlebar-buttons {
  display: flex;
  flex-direction: row;
  input[type="button"] {
    margin: 2.4pt;
    padding: 0;
    width: 12px;
    height: 12px;
    border: solid 1pt rgba(0, 0, 0, 15%);
    border-radius: 5pt;
    &:nth-of-type(1) {
      background-color: #ff6157;
    }
    &:nth-of-type(2) {
      background-color: #ffc12f;
    }
    &:nth-of-type(3) {
      background-color: #2acb42;
    }
  }
}
</style>
