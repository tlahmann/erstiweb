<template>
  <div class="folder" v-bind:style="positionString()">
    <div class="front"></div>
    <div class="back">
      <div class="left"></div>
      <div class="right"></div>
    </div>
    <p
      class="title"
      v-bind:style="{
        color: textColor,
        'font-weight': fontWeight
      }"
    >
      {{ title }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Folder",
  props: {
    title: String,
    positionX: [Number, String],
    positionY: [Number, String],
    top: [Number, String],
    left: [Number, String],
    textColor: String,
    fontWeight: String
  },
  methods: {
    positionString() {
      const style = {
        ...(this.positionX &&
          this.positionY && {
            transform: `translate(${+this.positionX}%, ${+this.positionY}%)`
          }),
        ...(this.top && { top: `${this.top}%` }),
        ...(this.left && { left: `${this.left}%` })
      };
      return style;
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.folder {
  width: 5em;
  height: 4.375em;
  max-width: 10em;
  max-height: 8em;
  position: absolute;
  transform: translate(-50%, -50%);
  text-align: center;
}
.front {
  position: absolute;
  top: 0.5em;
  width: calc(100% - 0pt);
  height: calc(100% - 0.9em);
  z-index: 20;
  border-top: 1px solid #a9e8fc;
  border-radius: 0.25em;
  background-color: hsl(200, 92%, 62%);
}
.back {
  position: absolute;
  width: 100%;
  height: calc(100% - 0.3em);
  z-index: 10;

  -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.16);

  .left,
  .right {
    // border-radius: 5px;
    background-color: hsl(200, 92%, 69%);
  }
  .left {
    position: absolute;
    width: 40%;
    height: calc(100% - 0.15em);
    border-radius: 0.25em 0.25em 0 0.25em;
    border-top-right-radius: 0.5em 0.85em;
  }
  .right {
    position: absolute;
    width: 80%;
    height: calc(100% - 0.5em);
    left: 20%;
    top: 0.35em;
    border-radius: 0 0.25em 0.25em 0;
  }
}
.title {
  font-weight: 600;
  position: absolute;
  top: 90%;
  width: 100%;
  color: white;
  font-size: 0.8em;
  margin-top: 0.5em;
}
</style>
