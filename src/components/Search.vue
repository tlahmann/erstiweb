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
        <div>
          <div id="input-container">
            <i class="material-icons">search</i>
            <input
              id="search-text"
              type="text"
              v-model="filter"
              placeholder="Suche"
            />
          </div>
          <div id="results-container">
            <ul v-if="filter !== '' && filteredSearchTerms().length">
              <li
                v-for="(term, termIndex) in filteredSearchTerms()"
                :key="termIndex"
              >
                <a :href="term.target">{{ term.term }}</a>
              </li>
            </ul>
          </div>
        </div>
        <input id="search-button" type="button" value="Suchen" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TitlebarButtons from "@/components/shared/TitlebarButtons.vue"; // @ is an alias to /src
import axios from "axios";

export default defineComponent({
  name: "Search",
  components: {
    TitlebarButtons
  },
  data: () => ({
    title: "Suche",
    filter: "",
    terms: [] as { term: string; target: string }[]
  }),
  emits: ["update-focus", "update-maximization"],
  created: function() {
    axios
      .get("./_content/search.json")
      .then((response) => {
        this.terms = response.data;
      })
      .catch((error) => console.error(error));
  },
  methods: {
    updateFocus(focusValue: string) {
      this.$emit("update-focus", focusValue);
    },
    updateMaximization() {
      this.$emit("update-maximization", "search");
    },
    filteredSearchTerms() {
      return this.terms
        ?.filter((t) => t.term?.toLowerCase().match(this.filter?.toLowerCase()))
        ?.splice(0, 10);
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
  width: 86em;
  height: 55em;
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
      font-size: 0.875em;
      line-height: 1.125em;
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
        padding-left: 1.5em;
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
      background-color: var(--white-bg-color);
      align-items: center;
      justify-content: center;

      > div {
        width: 80%;
        display: flex;
        flex-direction: column;
        border: 1px solid #ababab;
        border-radius: 28px;
        margin-bottom: 28px;
        justify-content: flex-start;
        overflow: hidden;
        #input-container {
          display: flex;
          align-items: center;
          height: 56px;
          display: flex;
          margin: 0 1.25em;
          .material-icons {
            margin: 0 10px 0 0;
            color: #3d3d3d;
          }
          #search-text {
            width: 85%;
            border: none;
            line-height: 50px;
            font-size: 2em;
            color: #3d3d3d;
            background-color: var(--white-bg-color);
            &:focus {
              outline: none;
            }
          }
        }
        #results-container {
          display: flex;
          flex-direction: column;
          ul {
            border-top: 1px solid #ababab;
            margin: 0 1.25em;
            list-style-type: none;
            padding-left: 0;
            padding-top: 1em;
            li {
              margin-bottom: 6px;
              cursor: pointer;
              line-height: 1.4em;
              font-size: 1.25em;
              a {
                text-decoration: none;
                color: #3d3d3d;
              }
            }
          }
        }
      }
      #search-button {
        width: 130px;
        height: 35px;
        background-color: #f5f5f5;
        border: 1px solid #ababab;
        border-radius: 6px;
        font-size: 1.125em;
        color: #3d3d3d;
        background-color: var(--white-bg-color);
      }
    }
  }
}
</style>
