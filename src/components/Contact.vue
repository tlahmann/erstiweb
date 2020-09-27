<template>
  <div id="contact" v-bind:class="{ focused: focused }">
    <!-- <Titlebar focused="focused" @update-focus="update" /> -->
    <div id="contact-content" v-on:click="this.focused = true">
      <div id="side">
        <input type="checkbox" name="fh-common" value="bla" />
        <label for="fh-common"> FH Dortmund Allgemein</label><br />
        <input type="checkbox" name="communicationDesign" value="foo" />
        <label for="communicationDesign"> Kommunikationsdesign</label><br />
        <input type="checkbox" name="film-sound" value="bar" />
        <label for="film-sound"> Film & Sound</label><br />
        <input type="checkbox" name="object-room" value="this" />
        <label for="object-room"> Objekt- & Raumdesign</label><br />
        <input type="checkbox" name="fimography" value="that" />
        <label for="fimography"> Filmografie</label><br />
      </div>
      <div id="contacts">
        <div id="contact-list">
          This is the {{ focused ? "focused" : "unfocused" }} contact
        </div>
        <div id="contact-info">
          This is the {{ focused ? "focused" : "unfocused" }} contact
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import Titlebar from "@/components/shared/Titlebar.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Contact",
  components: {
    // Titlebar
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
        flex: 1 1 30.1%;
        border-right: 1px solid #e8e8e8;
      }
      #contact-info {
        flex: 1 1 69.9%;
      }
    }
  }
}
</style>
