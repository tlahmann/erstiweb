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
              <h4>Marita Altermann-Köster</h4>
            </li>
            <li class="active">
              <h4>Ulrike Brückner</h4>
            </li>
            <li>
              <h4>Lars Harmsen</h4>
            </li>
            <li>
              <h4>Roger Walk</h4>
            </li>
          </ul>
        </div>
        <div id="contact-info">
          <span id="first-name">Prof. Ulrike</span>&nbsp;
          <span id="last-name">Brückner</span>
          <ul>
            <li>
              <span class="title">Arbeitsgebiet</span>
              <span class="value">K + E Grundlagen</span>
            </li>
            <li>
              <span class="title">Org.-Einheit</span>
              <span class="value">Fachbereich Design</span>
            </li>
            <li>
              <span class="title">Raum</span>
              <span class="value">MOP 2 131</span>
            </li>
            <li>
              <span class="title">Telefon</span>
              <span class="value">+49 (0231) 9112 - 9439 </span>
            </li>
            <li>
              <span class="title">Mail</span>
              <span class="value">ulrike.brueckner@fh-dortmund.de</span>
            </li>
          </ul>
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
      #contact-list,
      #contact-info {
        flex: 1 1 40.1%;
        border-right: 1px solid #e8e8e8;
        background-color: white;
        height: 100%;
        padding: 1rem 0;
        ul {
          margin: 0;
          padding: 0;
          list-style: none;
          li {
            border-bottom: 1px solid #e8e8e8;
            padding: 14px 18px;
            &.active {
              background-color: #707070;
              color: white;
            }
          }
          h4 {
            font-size: 0.875rem;
            margin: 0;
          }
          span {
            font-size: 0.625rem;
          }
        }
      }
      #contact-info {
        flex: 1 1 69.9%;
        padding: 3rem 1.375em;
        height: calc(100% - 6rem);
        #first-name,
        #last-name {
          color: #7c7c7c;
          font-size: 2.125rem;
          margin-bottom: 1rem;
          display: inline-block;
        }
        #first-name {
          font-weight: 400;
        }
        #last-name {
          font-weight: 600;
        }
        ul li {
          display: flex;
          flex-direction: row;
          padding: 20px 5px;
          border-top: 1px solid #e8e8e8;
          border-bottom: none;
          .value {
            flex: 1 1 78%;
            font-size: 0.875rem;
          }
          .title {
            flex: 1 1 22%;
            font-weight: 600;
            font-size: 0.785rem;
          }
        }
      }
    }
  }
}
</style>
