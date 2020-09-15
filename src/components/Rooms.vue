<template>
  <div id="rooms">
    <img
      v-for="(tutor, idx) in rooms"
      v-bind:key="tutor"
      v-bind:src="tutor"
      width="780"
      height="521"
      alt="Bilder je nach Breite des Viewports"
      v-bind:style="offset(idx)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Rooms",
  data: () => ({
    primeAngle: -137,
    primeRadiusX: 127,
    primeRadiusY: 53,
    rooms: [
      require("@/assets/Räume/Aula/nikonf65tmax20032_bearbeitet.jpg"),
      require("@/assets/Räume/Bibliothek/nikonf65tmax20067_bearbeitet.jpg"),
      require("@/assets/Räume/Computerpools/nikonf65tmax20052.jpg"),
      require("@/assets/Räume/Computerpools/nikonf65tmax20053.jpg")
    ]
  }),
  methods: {
    offset(index: number) {
      const x =
        Math.cos((this.primeAngle * index) / 180) *
        this.primeRadiusX *
        (Math.floor((this.primeAngle * (index + 1)) / 360) + 1);
      const y =
        Math.sin((this.primeAngle * index) / 180) *
        this.primeRadiusY *
        (Math.floor((this.primeAngle * (index + 1)) / 360) + 1);
      return {
        "z-index": Math.floor(Math.random() * this.rooms.length),
        transform: `translate(${x}px, ${y}px)`
      };
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#rooms {
  min-width: 550pt;
  min-height: 330pt;
}
img {
  max-width: 40%;
  height: auto;
  position: absolute;
  // &:nth-of-type(1) {
  //   transform: translate(20px, -30px);
  // }
  // &:nth-of-type(2) {
  //   transform: translate(20px, -30px);
  // }
  // &:nth-of-type(3) {
  //   transform: translate(20px, -30px);
  // }
}
</style>
