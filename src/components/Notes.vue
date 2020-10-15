<template>
  <div id="notes">
    <div class="titlebar">
      <TitlebarButtons
        @update-focus="updateFocus"
        @update-maximization="updateMaximization"
      />
      <input
        type="button"
        class="dead-button"
        :value="title"
        style="margin: 0 20px;padding: 3px 28px;"
      />
      <input type="button" class="dead-button" value="+" />
    </div>
    <div id="notes-content" v-on:click="updateFocus('notes')">
      <div id="ruler">
        <div class="horizontal"></div>
        <div v-for="(v, idx) in Math.floor(getWidth() / 69)" :key="idx">
          <div class="vertical" :style="{ left: `${idx * 4 * 23 + 8 + 0}px` }">
            <div class="arrow"></div>
            <div class="number">{{ idx * 2 }}</div>
          </div>
          <div
            class="vertical shortest"
            :style="{ left: `${idx * 4 * 23 + 8 + 23}px` }"
          ></div>
          <div
            class="vertical short"
            :style="{ left: `${idx * 4 * 23 + 8 + 46}px` }"
          >
            <div class="arrow"></div>
          </div>
          <div
            class="vertical shortest"
            :style="{ left: `${idx * 4 * 23 + 8 + 69}px` }"
          ></div>
        </div>
      </div>
      <div id="content">
        <small style="font-size: small;"
          >psst: Rechtsklick -> Bild herunterladen ...</small
        >
        <img
          v-for="(note, noteIndex) in notes"
          :key="noteIndex"
          :src="note"
          :alt="'Notiz_' + noteIndex"
          :style="{
            'z-index': current === noteIndex ? 250 : 200,
            transform: `translate(${noteIndex *
              (16 / notes.length)}%, ${noteIndex * (12 / notes.length)}%)`
          }"
          v-on:click="current = noteIndex"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TitlebarButtons from "@/components/shared/TitlebarButtons.vue"; // @ is an alias to /src
import axios from "axios";

export default defineComponent({
  name: "Notes",
  components: {
    TitlebarButtons
  },
  data: () => ({
    title: "Notizen",
    current: 0,
    notes: [] as string[]
  }),
  emits: ["update-focus", "update-maximization"],
  created: function() {
    axios
      .get("./_content/notes.json")
      .then((response) => {
        this.notes = response.data;
        this.current = this.notes?.length - 1;
      })
      .catch((error) => console.error(error));
  },
  methods: {
    updateFocus(focusValue: string) {
      this.$emit("update-focus", focusValue);
    },
    updateMaximization() {
      this.$emit("update-maximization", "notes");
    },
    getWidth() {
      return window.innerWidth;
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$background-color-darker: rgb(235, 235, 239);
#notes {
  background-color: #cecece;
  border: solid 1pt rgba(0, 0, 0, 10%);
  border-radius: 7pt;
  width: 80em;
  height: 65em;
  #notes-content {
    width: 100%;
    height: calc(100% - 30pt);
    display: flex;
    flex-direction: column;
    #ruler {
      background-color: darken($background-color-darker, 10%);
      height: 54px;
      position: relative;
      .horizontal {
        position: absolute;
        width: 100%;
        top: 50%;
        left: 0;
        border-bottom: 1px solid #10171e;
      }
      .vertical {
        position: absolute;
        height: 40%;
        top: 48%;
        border-right: 1px solid #10171e;
        &.short {
          height: 20%;
        }
        &.shortest {
          top: 50%;
          height: 5%;
        }
        .arrow {
          position: absolute;
          top: -10px;
          left: 0.5px;
          width: 0;
          height: 0;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;

          border-left: 5px solid #10171e;
        }
        .number {
          position: absolute;
          bottom: -5px;
          left: 5px;
          font-size: 12px;
        }
      }
    }
    #content {
      background-color: var(--white-bg-color);
      height: calc(100% - 54px);
      padding: 8px;
      font-size: 1.125rem;
      line-height: 1.875em;
      position: relative;
      img {
        width: 80vmin;
        max-width: 75%;
        position: absolute;
        transition: z-index 0.25s ease-in-out;
        left: 5%;
        top: 7%;
        filter: saturate(20);
        box-shadow: 5px 10px 20px 0px rgba(0, 0, 0, 0.15);
      }
    }
  }
}
</style>
