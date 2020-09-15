<template>
  <div id="exibitions" v-bind:class="{ expanded: focused }">
    <Notepad
      color="#A6FF9A"
      highlightColor="#40D608"
      v-for="(note, idx) in notes"
      v-bind:key="note"
      v-bind:style="offset(idx)"
      v-on:click="this.focused = !this.focused"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Notepad from "@/components/shared/Notepad.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Exibitions",
  components: {
    Notepad
  },
  props: {
    msg: String
  },
  data: () => ({
    focused: false,
    primeAngle: 137,
    primeRadiusX: 127,
    primeRadiusY: 17,
    notes: ["bla", "bla", "bla", "bla"]
  }),
  methods: {
    offset(index: number): { "z-index": number; transform: string } {
      let x = "";
      let y = "";
      if (!this.focused) {
        x =
          Math.cos((this.primeAngle * index) / 180) *
            this.primeRadiusX *
            (Math.floor((this.primeAngle * (index + 1)) / 360) + 1) +
          "%";
        y =
          Math.sin((this.primeAngle * index) / 180) *
            this.primeRadiusY *
            (Math.floor((this.primeAngle * (index + 1)) / 360) + 1) +
          "%";
      } else {
        x = Math.floor(Math.random() * 80) + "vw"; // (index / this.notes.length) * (100 / 4);
        y = Math.floor(Math.random() * 80) + "vh";
      }

      return {
        "z-index": Math.floor(Math.random() * this.notes.length),
        transform: `translate(${x}, ${y})`
      };
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
