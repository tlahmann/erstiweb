<template>
  <div id="info" v-bind:class="{ focused: focused }">
    <Titlebar focused="focused" @update-focus="update" />
    <div id="info-content" v-on:click="this.focused = true">
      This is the {{ focused ? "focused" : "unfocused" }} info,
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
  background-color: #ffffff;
  border: solid 1pt rgba(0, 0, 0, 10%);
  border-radius: 7pt;
  width: 1280px;
  height: 815px;
  min-width: 1280px;
  min-height: 815px;
  #info-content {
    width: 100%;
    height: calc(100% - 25pt);
    cursor: pointer;
  }
}
</style>
