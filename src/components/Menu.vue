<template>
  <div id="menu">
    <div class="titlebar">
      <TitlebarButtons @update-focus="updateFocus" />
    </div>
    <div id="menu-content" v-on:click="updateFocus('menu')">
      <Folder
        title="Startseite"
        top="15"
        left="17"
        textColor="black"
        fontWeight="400"
        v-on:click="updateFocus('', true)"
      />
      <Folder
        title="Gremien"
        top="13"
        left="48"
        textColor="black"
        fontWeight="400"
        v-on:click="updateFocus('bodies', true)"
      />
      <Folder
        title="Beratung"
        top="47"
        left="13"
        textColor="black"
        fontWeight="400"
        v-on:click="updateFocus('consulting', true)"
      />
      <Folder
        title="Angebote"
        top="87"
        left="16"
        textColor="black"
        fontWeight="400"
        v-on:click="updateFocus('proposals', true)"
      />
      <Folder
        title="Kalender"
        top="74"
        left="44"
        textColor="black"
        fontWeight="400"
        v-on:click="updateFocus('calendar', true)"
      />
      <Folder
        title="Kontakte"
        top="63"
        left="55"
        textColor="black"
        fontWeight="400"
        v-on:click="updateFocus('contact', true)"
      />
      <Folder
        title="Tutoren"
        top="25"
        left="61"
        textColor="black"
        fontWeight="400"
        v-on:click="updateFocus('tutors', true)"
      />
      <Folder
        title="Informationen"
        top="21"
        left="87"
        textColor="black"
        fontWeight="400"
        v-on:click="updateFocus('info', true)"
      />
      <Folder
        title="Räume"
        top="78"
        left="72"
        textColor="black"
        fontWeight="400"
        v-on:click="updateFocus('rooms', true)"
      />
      <Folder
        title="Suche"
        top="44"
        left="26"
        textColor="black"
        fontWeight="400"
        v-on:click="updateFocus('search', true)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Folder from "@/components/shared/Folder.vue"; // @ is an alias to /src
import TitlebarButtons from "@/components/shared/TitlebarButtons.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Menu",
  components: {
    TitlebarButtons,
    Folder
  },
  emits: ["update-focus"],
  methods: {
    updateFocus(focusValue: string, exitMenu?: boolean) {
      if (exitMenu) {
        this.$emit("update-focus", focusValue);
      } else if (focusValue === "") {
        this.$emit("update-focus", "");
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#menu {
  background-color: #cecece;
  border: solid 1pt rgba(0, 0, 0, 10%);
  border-radius: 7pt;
  width: 875px;
  height: 580px;
  #menu-content {
    position: relative;
    width: calc(100% - 16px);
    height: calc(100% - 40pt);
    // display: flex;
    // flex-direction: column;
    // #content {
    background-color: var(--white-bg-color);
    // height: 100%;
    padding: 8px;
    // }
  }
  .folder .title {
    color: black;
  }
}
</style>
