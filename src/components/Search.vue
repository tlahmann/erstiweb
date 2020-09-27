<template>
  <div id="search" v-bind:class="{ focused: focused }">
    <Titlebar focused="focused" @update-focus="update" />
    <div id="search-content" v-on:click="this.focused = true">
      <div id="side">
        <p>FH Dortmund</p>
        <ul>
          <li>Bachelor</li>
          <li>Master</li>
        </ul>
      </div>
      <div id="searchs">
        <div id="titles">
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
        <div id="content">
          <h3>BA Fotografie</h3>
          <br />
          Wenn Du das hier liest, hast Du Dich erfolgreich für den Studiengang
          Fotografie eingeschrieben. Dazu erst einmal herzlichen Glück-wunsch!
          Aber was erwartet Dich nun? Das Studium bereitet Dich in erster Linie
          auf den professionellen Umgang mit einer Fotokamera vor, um
          individuell gewünschte Projekte und Konzepte umzusetzen. Diese in Form
          von Ausstellungen, Installationen oder in Buch- und Magazsearchrmen zu
          sehen, wird Dich unfassbar stolz machen. Nichts steht Dir und Deiner
          Kamera im Wege, abgesehen vielleicht von der deutschen Bürokratie,
          aber selbst wenn diese Dich in bestimmten Bereichen einschränkt, wird
          sie Dir auch in puncto Selbstständigkeit und Datenschutz sehr helfen.
          Vieles wird Dir dazu während Deines Studiums erklärt, aber auch die
          Förderung und Forderung Deiner Kreativität wird nicht zu kurz kommen!
          Denn natürlich ist das Stu-dium, neben den theoretischen und
          technischen Lehrveranstaltun-gen, darauf ausgelegt, dass Du ganz viel
          praktisch arbeitest, um aus Dir eine*n professionelle*n Fotograf*in zu
          machen und Deinen ganz persönlichen Stil zu entwickeln. Damit Dir das
          gelingt, bietet Dir die FH die Möglichkeit, mit entsprechendem
          Equipment zu arbeiten, wie zum Beispiel das hauseigene Studio
          mitzubenutzen oder professionelle Kameras auszuleihen. scrollen ...
        </div>
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
  data: () => ({
    focused: false
  }),
  methods: {
    update(focused: boolean) {
      this.focused = focused;
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
  width: 1465px;
  height: 869px;
  min-width: 1465px;
  min-height: 869px;
  #search-content {
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
    #searchs {
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
            .date {
              flex: 1 1 50%;
            }
            .teaser {
              flex: 1 1 50%;
            }
          }
        }
      }
      #content {
        h3 {
          font-size: 1.75rem;
          line-height: 2.125rem;
          margin: 0;
        }
        padding: 2em;
        background-color: white;
        flex: 1 1 61.9%;
        height: calc(100% - 5rem);
        font-size: 1.125rem;
        line-height: 2.125rem;
      }
    }
  }
}
</style>
