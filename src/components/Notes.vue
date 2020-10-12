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
          src="../assets/Einleger-Leben.png"
          alt="Einleger Leben"
          :style="{ 'z-index': current === 0 ? 250 : 200 }"
          v-on:click="current = 0"
        />
        <img
          src="../assets/Einleger-Leben2.png"
          alt="Einleger Leben"
          :style="{ 'z-index': current === 1 ? 250 : 200 }"
          v-on:click="current = 1"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TitlebarButtons from "@/components/shared/TitlebarButtons.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Notes",
  components: {
    TitlebarButtons
  },
  data: () => ({
    title: "Notizen",
    current: 0
  }),
  emits: ["update-focus", "update-maximization"],
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
      background-color: var(--white-bg-color);
      height: 54px;
      position: relative;
      .horizontal {
        position: absolute;
        width: 100%;
        top: 50%;
        left: 0;
        border-bottom: 2px solid #ababab;
      }
      .vertical {
        position: absolute;
        height: 40%;
        top: 48%;
        border-right: 2px solid #ababab;
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
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;

          border-left: 6px solid #ababab;
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
      line-height: 2.125rem;
      position: relative;
      img {
        width: 95vmin;
        position: absolute;
        transition: z-index 0.25s ease-in-out;
        left: 5%;
        top: 7%;

        &:nth-of-type(2) {
          transform: translate(4em, 1.5em);
        }
      }
    }
  }
}
</style>
