<template>
  <div id="rooms">
    <img
      v-for="(tutor, idx) in rooms"
      v-bind:key="tutor"
      v-bind:src="tutor"
      v-on:click="updateFocus('rooms')"
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
  emits: ["update-focus"],
  data: () => ({
    primeAngle: -137,
    primeRadiusX: 127,
    primeRadiusY: 53,
    rooms: [
      require("@/assets/Räume/Aula/nikonf65tmax20032_bearbeitet.jpg"),
      require("@/assets/Räume/Bibliothek/nikonf65tmax20067_bearbeitet.jpg"),
      require("@/assets/Räume/Computerpools/nikonf65tmax20052.jpg"),
      require("@/assets/Räume/Druckwerkstatt/img0025_bearbeitet.jpg"),
      require("@/assets/Räume/FH Dortmund/img0076_bearbeitet.jpg"),
      require("@/assets/Räume/Filmstudio/nikonf65tmax20022.jpg"),
      require("@/assets/Räume/Fotostudio/nikonf65tmax20087_bearbeitet.jpg"),
      require("@/assets/Räume/Mensa/DSC_0311-positive.jpg")
    ]
  }),
  methods: {
    updateFocus(focusValue: string) {
      this.$emit("update-focus", focusValue);
    },
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
img {
  max-width: 17vw;
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
