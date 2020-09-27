<template>
  <div id="info" v-bind:class="{ focused: focused }">
    <Titlebar focused="focused" @update-focus="update" />
    <div id="info-content" v-on:click="this.focused = true">
      <div id="side">
        <p>FH Dortmund</p>
        <ul>
          <li>Bachelor</li>
          <li>Master</li>
        </ul>
      </div>
      <div id="infos">
        <div id="titles">
          Bla<br />
          Bla<br />
          Bla<br />
          Bla<br />
          Bla<br />
        </div>
        <div id="content">
          <h3>BA Fotografie</h3>
          <br />
          Wenn Du das hier liest, hast Du Dich erfolgreich für den Studiengang
          Fotografie eingeschrieben. Dazu erst einmal herzlichen Glück-wunsch!
          Aber was erwartet Dich nun? Das Studium bereitet Dich in erster Linie
          auf den professionellen Umgang mit einer Fotokamera vor, um
          individuell gewünschte Projekte und Konzepte umzusetzen. Diese in Form
          von Ausstellungen, Installationen oder in Buch- und Magazinformen zu
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
  name: "Info",
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
#info {
  background-color: #e8e8e8;
  border: solid 1pt rgba(0, 0, 0, 10%);
  border-radius: 7pt;
  width: 1280px;
  height: 815px;
  min-width: 1280px;
  min-height: 815px;
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
        padding: 1em;
        background-color: white;
        flex: 1 1 19.2%;
        height: 100%;
        border-right: 1px solid #c8c7c8;
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
