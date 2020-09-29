<template>
  <div id="exibitions">
    <Notepad
      color="#A6FF9A"
      highlightColor="#40D608"
      v-for="(note, idx) in notes"
      v-bind:key="idx"
      v-on:click="updateFocus('exibitions')"
      v-bind:style="offset(idx)"
      :width="note.bounds.width"
      :height="note.bounds.height"
      :content="note.content"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Notepad from "@/components/shared/Notepad.vue"; // @ is an alias to /src
import axios from "axios";
import { reposition } from "@/utils/reposition.function";

export default defineComponent({
  name: "Exibitions",
  components: {
    Notepad
  },
  props: {
    msg: String
  },
  data: () => ({
    init: true,
    primeAngle: 137,
    primeRadiusX: 67,
    primeRadiusY: 31,
    notes: [] as {
      bounds: { x: string; y: string; left: string; top: string };
    }[]
  }),
  created: function() {
    axios
      .get("./_content/exibitions.json")
      .then((response: any) => {
        return response.data?.map((elem: {}, idx: number) => {
          const w = Math.floor(Math.random() * 150) + 150;
          const h = Math.floor(Math.random() * 150) + 150;
          return {
            ...elem,
            pos: this.generateInitialPosition(idx),
            bounds: {
              ...this.generatePosition(),
              width: w,
              height: h,
              hw: w >> 1, // half-width
              hh: h >> 1 // half-height
            }
          };
        });
      })
      .then((notes) => {
        this.notes = reposition(
          {
            x: 100,
            y: 100,
            w: window.innerWidth - 200,
            h: window.innerHeight - 200,
            hw: (window.innerWidth - 200) >> 1,
            hh: (window.innerHeight - 200) >> 1
          },
          notes,
          50,
          100
        );
      })
      .catch((error) => console.error(error));
  },
  methods: {
    updateFocus(focusValue: string) {
      this.$emit("update-focus", focusValue);
    },
    generatePosition(): { x: number; y: number } {
      const x = Math.floor(Math.random() * 60) + 20;
      const y = Math.floor(Math.random() * 60) + 20;
      return { x, y };
    },
    generateInitialPosition(index: number): { transform: string } {
      const x =
        Math.cos(this.primeAngle * index * (Math.PI / 180)) *
          this.primeRadiusX *
          (Math.floor((this.primeAngle * (index + 1)) / 360) + 1) +
        "%";
      const y =
        Math.sin(this.primeAngle * index * (Math.PI / 180)) *
          this.primeRadiusY *
          (Math.floor((this.primeAngle * (index + 1)) / 360) + 1) +
        "%";
      return { transform: `translate(${x}, ${y})` };
    },
    offset(
      index: number
    ): {
      "z-index": number;
      transform: string;
      width?: string;
      height?: string;
    } {
      let x = "";
      let y = "";
      // console.log(this.$el.classList.contains("expanded") || this.init);
      // this.init = !(this.init || index + 1 === this.notes.length);
      // console.log(
      //   `at index ${index} the length is equal: ${index + 1 ===
      //     this.notes.length} and we'll set the init value to ${this.init}`
      // );
      if (this.$el.classList.contains("expanded") || this.init) {
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
        this.init = !(this.init && index + 1 === this.notes.length);
        return {
          "z-index": Math.floor(Math.random() * this.notes.length),
          transform: `translate(${x}, ${y})`,
          width: "100px",
          height: "100px"
        };
      } else {
        x = this.notes[index].bounds.x + "px";
        y = this.notes[index].bounds.y + "px";
        return {
          "z-index": Math.floor(Math.random() * this.notes.length),
          transform: `translate(${x}, ${y})`
        };
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
