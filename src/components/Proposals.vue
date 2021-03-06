<template>
  <div id="proposals">
    <Notepad
      color="#198C19"
      highlightColor="#116211"
      v-for="(note, idx) in notes"
      v-bind:key="idx"
      v-on:click="updateFocus('proposals')"
      v-bind:style="offset(idx)"
      :width="note.bounds.width"
      :height="note.bounds.height"
      :content="note.content"
      :link="note.link"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Notepad from "@/components/shared/Notepad.vue"; // @ is an alias to /src
import axios from "axios";
import { reposition } from "@/utils/reposition.function";

export default defineComponent({
  name: "Proposals",
  components: {
    Notepad
  },
  props: {
    msg: String
  },
  data: () => ({
    observer: {} as MutationObserver,
    expanded: false,
    primeAngle: 137,
    primeRadiusX: 67,
    primeRadiusY: 31,
    notes: [] as {
      bounds: { x: string; y: string; left: string; top: string };
    }[]
  }),
  created: function() {
    axios
      .get("./_content/proposals.json")
      .then((response: any) => {
        return response.data?.map((elem: {}, idx: number) => {
          const w = Math.floor(Math.random() * 150) + 190;
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
  mounted() {
    this.observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        const newValue = (m.target as HTMLElement).classList;
        this.$nextTick(() => {
          this.expanded =
            newValue.contains("expanded") || newValue.contains("focused");
        });
      }
    });

    this.observer.observe(this.$el, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ["class"]
    });
  },
  beforeUnmount() {
    this.observer.disconnect();
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
      if (!this.expanded) {
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
        return {
          "z-index": Math.floor(Math.random() * this.notes.length),
          transform: `translate(${x}, ${y})`,
          width: "6.25em",
          height: "6.25em"
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
