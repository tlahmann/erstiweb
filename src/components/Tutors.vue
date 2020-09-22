<template>
  <div id="tutors">
    <img
      v-for="(tutor, idx) in tutors"
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
  name: "Tutors",
  data: () => ({
    primeAngle: 137,
    primeRadiusX: 43,
    primeRadiusY: 37,
    tutors: [
      require("@/assets/Tutoren/Anna_sw.jpg"),
      require("@/assets/Tutoren/dilara_sw.jpg"),
      require("@/assets/Tutoren/Emma_sw.jpg"),
      require("@/assets/Tutoren/Fabian_sw.jpg"),
      require("@/assets/Tutoren/greta_sw.jpg"),
      require("@/assets/Tutoren/Isabell_sw.jpg"),
      require("@/assets/Tutoren/janika_sw.jpg"),
      require("@/assets/Tutoren/lorenz_sw.jpg"),
      require("@/assets/Tutoren/Luisa.jpg"),
      require("@/assets/Tutoren/Marie_sw.jpg"),
      require("@/assets/Tutoren/Olga_sw.jpg"),
      require("@/assets/Tutoren/Tim1_sw.jpg"),
      require("@/assets/Tutoren/tim2_sw.jpg"),
      require("@/assets/Tutoren/Tim3_sw.jpg")
    ]
  }),
  created: function() {
    this.tutors.sort(() => Math.random() - 0.5);
  },
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
        "z-index": Math.floor(Math.random() * this.tutors.length),
        transform: `translate(${x}px, ${y}px)`
      };
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
img {
  max-width: 8vw;
  min-width: 120px;
  height: auto;
  position: absolute;

  -webkit-box-shadow: 0px 10pt 20pt 0px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0px 10pt 20pt 0px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 10pt 20pt 0px rgba(0, 0, 0, 0.16);
}
</style>
