<template>
  <input type="button" value="" v-on:click="updateFocus" />
  <input type="button" value="" v-on:click="updateFocus" />
  <input type="button" value="" v-on:click="updateFocus" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TitlebarButtons",
  props: {
    focused: Boolean
  },
  emits: ["update-focus"],
  methods: {
    updateFocus: function() {
      this.$emit("update-focus", "");
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
input[type="button"] {
  margin: 2.4pt;
  padding: 0;
  width: 10pt;
  height: 10pt;
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
</style>
