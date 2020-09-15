<template>
  <div class="folder" v-bind:style="positionString()">
    <div class="front"></div>
    <div class="back">
      <div class="left"></div>
      <div class="right"></div>
    </div>
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
  top: 10pt;
  width: calc(100% - 0pt);
  height: calc(100% - 12pt);
  z-index: 20;
  border-top: 1pt solid #a9e8fc;
  border-radius: 7pt;
  background-color: #75cdf9;
}
.back {
  position: absolute;
  width: 100%;
  height: calc(100% - 2pt);
  z-index: 10;
  border-radius: 7pt;

  -webkit-box-shadow: 0px 7pt 7pt 0px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0px 7pt 7pt 0px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 7pt 7pt 0px rgba(0, 0, 0, 0.16);

  .left,
  .right {
    // border-radius: 7pt;
    background-color: #96ddfe;
  }
  .left {
    position: absolute;
    width: 40%;
    height: calc(100% - 2pt);
    border-radius: 7pt 7pt 0 7pt;
    border-top-right-radius: 10pt 15pt;
  }
  .right {
    position: absolute;
    width: 80%;
    height: calc(100% - 8pt);
    left: 20%;
    top: 6pt;
    border-radius: 0 7pt 7pt 0;
  }
}
.title {
  font-weight: 600;
  position: absolute;
  top: 90%;
  width: 100%;
  color: white;
}
</style>
