<template>
  <div id="notes">
    <Titlebar focused="focused" @update-focus="updateFocus" />
    <div id="notes-content" v-on:click="updateFocus('notes')">
      <div id="ruler">
        <div class="horizontal"></div>
      </div>
      <div id="content"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Titlebar from "@/components/shared/Titlebar.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Notes",
  components: {
    Titlebar
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
#notes {
  background-color: #e8e8e8;
  border: solid 1pt rgba(0, 0, 0, 10%);
  border-radius: 7pt;
  width: 614px;
  height: 750px;
  min-width: 614px;
  min-height: 750px;
  #notes-content {
    width: 100%;
    height: calc(100% - 25pt);
    display: flex;
    flex-direction: column;
    #ruler {
      background-color: #f0f0f0;
      height: 54px;
      position: relative;
      .horizontal {
        position: absolute;
        width: 100%;
        top: 50%;
        left: 0;
        border-bottom: 1px solid #b5b5b5;
      }
    }
    #content {
      background-color: white;
      height: calc(100% - 54px);
      padding: 8px;
    }
  }
}
</style>
