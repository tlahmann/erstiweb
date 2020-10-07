<template>
  <div id="search">
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
    <div id="search-content" v-on:click="updateFocus('search')">
      <div id="side">
        <p>FH Dortmund</p>
        <ul>
          <li>Bachelor</li>
          <li>Master</li>
        </ul>
      </div>
      <div id="searches">
        <div id="input-container">
          <i class="material-icons">search</i>
          <input id="search-text" type="text" />
        </div>
        <input id="search-button" type="button" value="Suchen" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TitlebarButtons from "@/components/shared/TitlebarButtons.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Search",
  components: {
    TitlebarButtons
  },
  data: () => ({
    title: "Suche"
  }),
  emits: ["update-focus", "update-maximization"],
  methods: {
    updateFocus(focusValue: string) {
      this.$emit("update-focus", focusValue);
    },
    updateMaximization() {
      this.$emit("update-maximization", "search");
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#search {
  background-color: #cecece;
  border: solid 1pt rgba(0, 0, 0, 10%);
  border-radius: 7pt;
  width: 1374px;
  height: 869px;
  #search-content {
    width: 100%;
    height: calc(100% - 25pt);
    display: flex;
    #side {
      background-color: #cecece;
      flex: 1 1 19.4%;
      height: calc(100% - 30pt);
      padding: 10pt 8pt;
      display: flex;
      flex-direction: column;
      font-size: 0.875rem;
      line-height: 1.125rem;
      input[type="checkbox"] {
        margin: 6.5px 3px;
      }
      p {
        margin: 0;
        color: rgba(36, 36, 36, 0.6);
        margin-bottom: 6px;
      }
      ul {
        margin: 0;
        list-style-type: none;
        padding-left: 1.5rem;
        li {
          margin-bottom: 6px;
        }
      }
    }
    #searches {
      flex: 1 1 80.6%;
      height: 100%;
      display: flex;
      flex-direction: column;
      background-color: white;
      align-items: center;
      justify-content: center;

      #input-container {
        width: 80%;
        height: 56px;
        border: 1px solid #ababab;
        border-radius: 28px;
        margin-bottom: 28px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        overflow: hidden;
        .material-icons {
          margin: 0 10px;
          color: #3d3d3d;
        }
        #search-text {
          width: 85%;
          border: none;
          line-height: 50px;
          font-size: 2rem;
          color: #3d3d3d;
        }
      }
      #search-button {
        width: 130px;
        height: 35px;
        background-color: #f5f5f5;
        border: none;
        border-radius: 6px;
        font-size: 1.125rem;
        color: #3d3d3d;
      }
    }
  }
}
</style>
