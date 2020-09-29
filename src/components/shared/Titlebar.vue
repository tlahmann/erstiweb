<template>
  <div class="titlebar">
    <TitlebarButtons @update-focus="updateFocus" />
    <p>{{ title }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TitlebarButtons from "@/components/shared/TitlebarButtons.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Titlebar",
  components: {
    TitlebarButtons
  },
  props: {
    title: String,
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
$titlebarHeight: 28px;
.titlebar {
  height: $titlebarHeight;
  width: calc(100% - 8pt);
  display: flex;
  padding: 4pt 5pt 4pt 5pt;
  transform: translate(-1pt, -1pt);
  background-image: linear-gradient(180deg, #ecebec, #d4d3d4);
  border-bottom: 1pt solid rgba(0, 0, 0, 6%);
  border-top-left-radius: 7pt;
  border-top-right-radius: 7pt;
  align-items: center;
  input[type="button"] {
    align-self: flex-start;
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
}
</style>
