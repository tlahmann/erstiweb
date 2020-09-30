<template>
  <div id="notes">
    <Titlebar focused="focused" @update-focus="updateFocus" />
    <div id="notes-content" v-on:click="updateFocus('notes')">
      <nav>
        <span
          v-for="(note, noteIndex) in notes"
          :key="noteIndex"
          :class="{ active: noteIndex === current }"
          v-on:click="current = noteIndex"
        >
          Notiz {{ noteIndex + 1 }}
        </span>
      </nav>
      <div id="ruler">
        <div class="horizontal"></div>
        <div class="vertical" style="left: 8px">
          <div class="arrow"></div>
          <div class="number">0</div>
        </div>
        <div class="vertical shortest" style="left: 31px"></div>
        <div class="vertical short" style="left: 54px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 77px"></div>
        <div class="vertical" style="left: 100px">
          <div class="arrow"></div>
          <div class="number">2</div>
        </div>
        <div class="vertical shortest" style="left: 123px"></div>
        <div class="vertical short" style="left: 146px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 169px"></div>
        <div class="vertical" style="left: 192px">
          <div class="arrow"></div>
          <div class="number">4</div>
        </div>
        <div class="vertical shortest" style="left: 215px"></div>
        <div class="vertical short" style="left: 238px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 261px"></div>
        <div class="vertical" style="left: 284px">
          <div class="arrow"></div>
          <div class="number">6</div>
        </div>
        <div class="vertical shortest" style="left: 307px"></div>
        <div class="vertical short" style="left: 330px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 353px"></div>
        <div class="vertical" style="left: 376px">
          <div class="arrow"></div>
          <div class="number">8</div>
        </div>
        <div class="vertical shortest" style="left: 399px"></div>
        <div class="vertical short" style="left: 422px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 445px"></div>
        <div class="vertical" style="left: 468px">
          <div class="arrow"></div>
          <div class="number">10</div>
        </div>
        <div class="vertical shortest" style="left: 491px"></div>
        <div class="vertical short" style="left: 514px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 537px"></div>
        <div class="vertical" style="left: 560px">
          <div class="arrow"></div>
          <div class="number">12</div>
        </div>
        <div class="vertical shortest" style="left: 583px"></div>
        <div class="vertical short" style="left: 606px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 629px"></div>
        <div class="vertical" style="left: 652px">
          <div class="arrow"></div>
          <div class="number">14</div>
        </div>
        <div class="vertical shortest" style="left: 675px"></div>
        <div class="vertical short" style="left: 698px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 721px"></div>
        <div class="vertical" style="left: 744px">
          <div class="arrow"></div>
          <div class="number">16</div>
        </div>
        <div class="vertical shortest" style="left: 767px"></div>
        <div class="vertical short" style="left: 790px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 813px"></div>
        <div class="vertical" style="left: 836px">
          <div class="arrow"></div>
          <div class="number">18</div>
        </div>
        <div class="vertical shortest" style="left: 859px"></div>
        <div class="vertical short" style="left: 882px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 905px"></div>
        <div class="vertical" style="left: 928px">
          <div class="arrow"></div>
          <div class="number">20</div>
        </div>
        <div class="vertical shortest" style="left: 951px"></div>
        <div class="vertical short" style="left: 974px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 997px"></div>
        <div class="vertical" style="left: 1020px">
          <div class="arrow"></div>
          <div class="number">22</div>
        </div>
        <div class="vertical shortest" style="left: 1043px"></div>
        <div class="vertical short" style="left: 1066px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 1089px"></div>
        <div class="vertical" style="left: 1112px">
          <div class="arrow"></div>
          <div class="number">24</div>
        </div>
      </div>
      <div id="content" v-html="notes[current]?.text"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Titlebar from "@/components/shared/Titlebar.vue"; // @ is an alias to /src
import axios from "axios";

export default defineComponent({
  name: "Notes",
  components: {
    Titlebar
  },
  data: () => ({
    current: 0,
    notes: [] as { text: string }[]
  }),
  emits: ["update-focus"],
  created: function() {
    axios
      .get("./_content/notes.json")
      .then((response) => {
        this.notes = response.data;
      })
      .catch((error) => console.error(error));
  },
  methods: {
    updateFocus(focusValue: string) {
      this.$emit("update-focus", focusValue);
    },
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#notes {
  background-color: #e8e8e8;
  border: solid 1pt rgba(0, 0, 0, 10%);
  border-radius: 7pt;
  width: 614px;
  height: 750px;
  #notes-content {
    width: 100%;
    height: calc(100% - 25pt);
    display: flex;
    flex-direction: column;
    #ruler {
      background-color: #f0f0f0;
      height: 54px;
      position: relative;
      .horizontal {
        position: absolute;
        width: 100%;
        top: 50%;
        left: 0;
        border-bottom: 2px solid #b5b5b5;
      }
      .vertical {
        position: absolute;
        height: 40%;
        top: 48%;
        border-right: 2px solid #707070;
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

          border-left: 6px solid #787878;
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
      background-color: white;
      height: calc(100% - 54px);
      padding: 8px;
      font-size: 1rem;
      line-height: 1.25rem;
      overflow-x: hidden;
      overflow-y: scroll;
    }
  }
}

nav {
  padding: 6px 0;
  span {
    padding: 5px;
    border-right: 1px solid #787878;
    border-radius: 0 0 6px 6px;
    &.active {
      background-color: white;
    }
  }
}
</style>
