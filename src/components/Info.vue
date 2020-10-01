<template>
  <div id="info">
    <Titlebar focused="focused" @update-focus="updateFocus" />
    <div id="info-content" v-on:click="updateFocus('info')">
      <div id="side">
        <p>FH Dortmund</p>
        <ul>
          <li
            v-for="(category, categoryIndex) in getCategories()"
            :key="categoryIndex"
            v-on:click="
              () => {
                current = filter !== category ? 0 : current;
                filter = category;
              }
            "
          >
            {{ category }}
          </li>
        </ul>
      </div>
      <div id="infos">
        <div id="titles">
          <ul>
            <li
              v-for="(info, infoIndex) in getInfos()"
              :key="infoIndex"
              :class="{ active: infoIndex === current }"
              v-on:click="current = infoIndex"
            >
              <h4>{{ info.title }}</h4>
              <div class="subtitle">
                <span class="date">{{ info.date }}</span>
                <span class="teaser">{{ info.content }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div id="content">
          <h3>{{ getInfos()[current]?.title }}</h3>
          <div v-html="getInfos()[current]?.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Titlebar from "@/components/shared/Titlebar.vue"; // @ is an alias to /src
import axios from "axios";

export default defineComponent({
  name: "Info",
  components: {
    Titlebar
  },
  data: () => ({
    current: 0,
    filter: "",
    infos: [] as {
      category: string;
      title: string;
      date: string;
      content: string;
    }[]
  }),
  emits: ["update-focus"],
  created: function() {
    axios
      .get("./_content/infos.json")
      .then((response) => {
        this.infos = response.data;
        this.filter = this.infos[0]?.category;
      })
      .catch((error) => console.error(error));
  },
  methods: {
    updateFocus(focusValue: string) {
      this.$emit("update-focus", focusValue);
    },
    getCategories() {
      return this.infos
        ?.map((i) => i.category)
        ?.filter((value, index, self) => self.indexOf(value) === index);
    },
    getInfos() {
      return this.infos?.filter((i) => i.category === this.filter);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#info {
  background-color: #e8e8e8;
  border: solid 1pt rgba(0, 0, 0, 10%);
  border-radius: 7pt;
  width: 1280px;
  height: 815px;
  #info-content {
    width: 100%;
    height: calc(100% - 25pt);
    display: flex;
    #side {
      background-color: #e8e8e8;
      flex: 1 1 18.9%;
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
    #infos {
      flex: 1 1 80%;
      height: 100%;
      display: flex;
      flex-direction: row;
      #titles {
        // padding: 1em;
        background-color: white;
        flex: 1 1 19.2%;
        height: 100%;
        border-right: 1px solid #c8c7c8;
        ul {
          margin: 0;
          padding: 0;
          list-style: none;
          li {
            border-bottom: 1px solid #e8e8e8;
            padding: 14px 18px;
          }
          h4 {
            font-size: 0.875rem;
            margin: 0;
          }
          span {
            font-size: 0.625rem;
          }
          .subtitle {
            display: flex;
            flex-direction: row;
            margin: 12px 0 0 0;
            .date,
            .teaser {
              flex: 0 1 45%;
              max-width: 110px;
              text-overflow: ellipsis;

              /* Required for text-overflow to do anything */
              white-space: nowrap;
              overflow: hidden;
            }
            .teaser {
              margin-left: auto;
            }
          }
        }
      }
      #content {
        h3 {
          font-size: 1.75rem;
          line-height: 2.125rem;
          margin: 0 0 1.375rem 0;
        }
        padding: 2em;
        background-color: white;
        flex: 1 1 61.9%;
        height: calc(100% - 5rem);
        font-size: 1.125rem;
        line-height: 2.125rem;

        overflow-x: hidden;
        overflow-y: scroll;
      }
    }
  }
}
</style>
