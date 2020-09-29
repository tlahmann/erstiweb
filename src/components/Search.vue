<template>
  <div id="search">
    <Titlebar focused="focused" @update-focus="updateFocus" />
    <div id="search-content" v-on:click="updateFocus('search')">
      <div id="side">
        <p>FH Dortmund</p>
        <ul>
          <li>Bachelor</li>
          <li>Master</li>
        </ul>
      </div>
      <div id="searches">
        <input id="search-text" type="text" />
        <input id="search-button" type="button" value="Suchen" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Titlebar from "@/components/shared/Titlebar.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Search",
  components: {
    Titlebar
  },
  emits: ["update-focus"],
  methods: {
    updateFocus(focusValue: string) {
      this.$emit("update-focus", focusValue);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#search {
  background-color: #e8e8e8;
  border: solid 1pt rgba(0, 0, 0, 10%);
  border-radius: 7pt;
  width: 1374px;
  height: 869px;
  min-width: 1374px;
  min-height: 869px;
  #search-content {
    width: 100%;
    height: calc(100% - 25pt);
    display: flex;
    #side {
      background-color: #e8e8e8;
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

      #search-text {
        width: 740px;
        height: 56px;
        border: 1px solid #e5e5e5;
        border-radius: 28px;
        margin-bottom: 28px;
      }
      #search-button {
        width: 130px;
        height: 35px;
        background-color: #f5f5f5;
        border: none;
        border-radius: 6px;
        font-size: 1.125rem;
      }
    }
  }
}
</style>
