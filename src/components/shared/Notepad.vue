<template>
  <div
    class="notepad"
    v-bind:style="{
      'border-color': highlightColor,
      width: width + 'px',
      height: height + 'px'
    }"
  >
    <div
      class="content"
      v-bind:style="{
        'background-color': color,
        color: color
      }"
    >
      <h3>{{ content }}</h3>
      <small>Hier weiterlesen&nbsp;&rarr;</small>
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
    width: [Number, String],
    height: [Number, String],
    content: String
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$positionDuration: 0.85s;
$sizeDuration: 0.95s;

.notepad {
  border-top: 3pt solid;
  position: absolute;
  overflow: hidden;

  -webkit-transition: z-index 3s, transform $sizeDuration, width $sizeDuration,
    height $sizeDuration, top $positionDuration,
    left $positionDuration cubic-bezier(0.65, 0.05, 0.36, 1);
  transition: z-index 3s, transform $sizeDuration, width $sizeDuration,
    height $sizeDuration, top $positionDuration,
    left $positionDuration cubic-bezier(0.65, 0.05, 0.36, 1);
  transition-delay: 0s, 0s, 0s, 0s, $positionDuration, $positionDuration;
}
.content {
  width: calc(100% - 2em);
  height: calc(100% - 3pt - 2em);
  padding: 1em;
  transition: color 0.95s 0s;

  -webkit-box-shadow: 0px 25pt 30pt 0px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0px 25pt 30pt 0px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 25pt 30pt 0px rgba(0, 0, 0, 0.16);
}
</style>
