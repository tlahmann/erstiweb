<template>
  <div id="equipment" v-bind:class="{ expanded: focused }">
    <Notepad
      color="#D6809A"
      highlightColor="#ED1A5B"
      v-for="(note, idx) in notes"
      v-bind:key="idx"
      v-bind:style="offset(idx)"
      v-on:click="this.focused = !this.focused"
      :content="note.content"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Notepad from "@/components/shared/Notepad.vue"; // @ is an alias to /src
import axios from "axios";

export default defineComponent({
  name: "Equipment",
  components: {
    Notepad
  },
  props: {
    msg: String
  },
  data: () => ({
    focused: false,
    primeAngle: 137,
    primeRadiusX: 67,
    primeRadiusY: 31,
    notes: [{ pos: { x: "", y: "" } }]
  }),
  created: function() {
    axios
      .get("./_content/equipment.json")
      .then((response) => {
        this.notes = response.data?.notes.map((elem: {}) => ({
          ...elem,
          pos: this.generatePosition()
        }));
      })
      .catch((error) => console.error(error));
  },
  methods: {
    generatePosition(): { x: string; y: string } {
      const x = Math.floor(Math.random() * 60) + 20 + "vw";
      const y = Math.floor(Math.random() * 60) + 20 + "vh";
      return { x, y };
    },
    offset(index: number): { "z-index": number; transform: string } {
      let x = "";
      let y = "";
      if (!this.focused) {
        x =
          Math.cos(this.primeAngle * index * (Math.PI / 180)) *
            this.primeRadiusX *
            (Math.floor((this.primeAngle * (index + 1)) / 360) + 1) +
          "%";
        y =
          Math.sin(this.primeAngle * index * (Math.PI / 180)) *
            this.primeRadiusY *
            (Math.floor((this.primeAngle * (index + 1)) / 360) + 1) +
          "%";
      } else {
        x = this.notes[index].pos.x;
        y = this.notes[index].pos.y;
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
