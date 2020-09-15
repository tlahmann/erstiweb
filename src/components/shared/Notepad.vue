<template>
  <div
    class="notepad"
    v-bind:style="{
      'border-color': highlightColor
    }"
  >
    <div
      class="content"
      v-bind:style="{
        'background-color': color
      }"
    >
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Notepad",
  props: {
    color: {
      type: String,
      required: true
    },
    highlightColor: {
      type: String,
      required: true
    },
    title: String
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.notepad {
  width: 125pt;
  height: 125pt;
  border-top: 3pt solid;
  position: absolute;
}
.content {
  width: 125pt;
  height: calc(100% - 3pt);
}
</style>
