<template>
  <div id="contact">
    <div id="contact-content">
      <div id="side">
        <div>
          <TitlebarButtons @update-focus="updateFocus" />
        </div>
        <div class="list" v-on:click="updateFocus('contact')">
          <ul>
            <li>Alle Kontakte</li>
          </ul>
          <span>FH Dortmund</span>
          <ul>
            <li>Alle FH Dortmund Kontakte</li>
          </ul>
          <span>FH Dortmund</span>
          <ul>
            <li>Alle Fachbereich-Kontakte</li>
            <li>Kommunikationsdesign</li>
            <li>Fotografie</li>
            <li>Objekt- und Raumdesign</li>
            <li>Film & Sound</li>
          </ul>
        </div>
      </div>
      <div id="contacts" v-on:click="updateFocus('contact')">
        <div id="contact-list">
          <ul>
            <li>
              <h4>BA Fotografie</h4>
              <div class="subtitle">
                <span class="date">Mi., 13.09.2020</span>
                <span class="teaser">Wenn Du das hier...</span>
              </div>
            </li>
            <li>
              <h4>BA Kommunikationsdesign</h4>
              <div class="subtitle">
                <span class="date">Mo., 11.09.2020</span>
                <span class="teaser">Das Studium des...</span>
              </div>
            </li>
            <li>
              <h4>BA Objekt- und Raumdesign</h4>
              <div class="subtitle">
                <span class="date">Mi., 13.09.2020</span>
                <span class="teaser">Holz, Papier, Plexi...</span>
              </div>
            </li>
            <li>
              <h4>BA Film und Sound</h4>
              <div class="subtitle">
                <span class="date">Mi., 13.09.2020</span>
                <span class="teaser">Im Bachelorstudien...</span>
              </div>
            </li>
          </ul>
        </div>
        <div id="contact-info">
          This is the {{ false ? "focused" : "unfocused" }} contact
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TitlebarButtons from "@/components/shared/TitlebarButtons.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Contact",
  components: {
    TitlebarButtons
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
#contact {
  background-color: #e8e8e8;
  border: solid 1pt rgba(0, 0, 0, 10%);
  border-radius: 7pt;
  width: 1079px;
  height: 827px;
  min-width: 1079px;
  min-height: 827px;
  #contact-content {
    width: 100%;
    height: 100%;
    display: flex;
    #side {
      background-color: #e8e8e8;
      flex: 1 1 22.7%;
      height: calc(100% - 40pt);
      padding: 20pt 17pt;
      input[type="checkbox"] {
        margin: 6.5px 3px;
      }
      .list {
        height: 100%;
        display: flex;
        flex-direction: column;
        ul {
          margin: 0;
          padding: 0;
          list-style: none;
          li {
            border-bottom: 1px solid #e8e8e8;
            padding: 14px 18px;
          }
        }
      }
    }
    #contacts {
      background-color: #ffffff;
      flex: 1 1 77.3%;
      height: 100%;
      display: flex;
      flex-direction: row;
      #contact-list,
      #contact-info {
        padding: 1rem;
      }
      #contact-list {
        flex: 1 1 40.1%;
        border-right: 1px solid #e8e8e8;
        background-color: white;
        height: 100%;
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
            .date {
              flex: 1 1 50%;
            }
            .teaser {
              flex: 1 1 50%;
            }
          }
        }
      }
      #contact-info {
        flex: 1 1 69.9%;
      }
    }
  }
}
</style>
