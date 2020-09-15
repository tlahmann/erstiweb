<template>
  <div class="folder" v-bind:style="positionString()">
    <div class="front"></div>
    <div class="back"></div>
    <p class="title">{{ title }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Folder",
  props: {
    title: String,
    positionX: {
      type: [Number, String], // { x: Number, y: Number },
      required: true
    },
    positionY: {
      type: [Number, String], // { x: Number, y: Number },
      required: true
    }
  },
  methods: {
    positionString() {
      return {
        transform: `translate(${+this.positionX}vw, ${+this.positionY}vh)`
      };
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.folder {
  width: 80pt;
  height: 62pt;
  position: absolute;
  transform: translate(-50%, -50%);
}
.front {
  position: absolute;
  top: 20%;
  width: calc(100% - 2pt);
  height: calc(80% - 2pt);
  z-index: 20;
  border: 1pt solid grey;
  border-radius: 7pt;
  background-color: #75cdf9;
}
.back {
  position: absolute;
  width: calc(100% - 2pt);
  height: calc(100% - 2pt);
  z-index: 10;
  border: 1pt solid grey;
  border-radius: 7pt;
  background-color: #75cdf9;
}
.title {
  font-weight: 600;
  position: absolute;
  top: 90%;
  color: white;
}
</style>
