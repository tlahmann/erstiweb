<template>
  <div id="calendar" v-bind:class="{ focused: focused }">
    <Titlebar focused="focused" @update-focus="update" />
    <div id="calendar-content" v-on:click="this.focused = true">
      This is the {{ focused ? "focused" : "unfocused" }} calendar,
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Titlebar from "@/components/shared/Titlebar.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Calendar",
  components: {
    Titlebar
  },
  data: () => ({
    message: "jo",
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
#calendar {
  background-color: #ffffff;
  border: solid 1pt rgba(0, 0, 0, 10%);
  border-radius: 7pt;
  width: 1280px;
  height: 815px;
  min-width: 1280px;
  min-height: 815px;
  #calendar-content {
    width: 100%;
    height: calc(100% - 25pt);
    cursor: pointer;
  }
}
</style>
