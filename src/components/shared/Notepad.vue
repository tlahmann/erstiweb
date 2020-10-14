<template>
  <div
    class="notepad"
    v-bind:style="{
      'border-color': highlightColor,
      width: width + 'px',
      height: height + 'px'
    }"
  >
    <div
      class="content"
      v-bind:style="{
        'background-color': color,
        color: color
      }"
    >
      <h4 lang="de">{{ content }}</h4>
      <a :href="link" target="_blank">Hier weiterlesen&nbsp;&rarr;</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

declare global {
  interface Window {
    fitText: any;
  }
}

window.fitText = window.fitText || {};

export default defineComponent({
  name: "Notepad",
  props: {
    color: {
      type: String,
      required: true
    },
    highlightColor: {
      type: String,
      required: true
    },
    width: [Number, String],
    height: [Number, String],
    content: String,
    link: String
  },
  data: () => ({
    observer: {} as MutationObserver
  }),
  // mounted() {
  //   this.observer = new MutationObserver((mutations) => {
  //     for (const m of mutations) {
  //       // console.log((m.target as HTMLElement).clientWidth);
  //       this.$nextTick().then(() => {
  //         window.fitText();
  //       });
  //     }
  //   });

  //   this.observer.observe(this.$el, {
  //     attributes: true,
  //     attributeOldValue: true,
  //     attributeFilter: ["style"]
  //   });
  // }
  mounted: function() {
    window.fitText(
      (this.$el as HTMLElement).childNodes[0]?.childNodes[0],
      this.width,
      1.3
    );
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$positionDuration: 0.55s;
$sizeDuration: 0.65s;

.expanded .notepad {
  border-width: 7px;
}
.notepad {
  border-top: 3px solid;
  position: absolute;
  overflow: hidden;

  -webkit-transition: z-index 3s, transform $sizeDuration, width $sizeDuration,
    height $sizeDuration, top $positionDuration,
    left $positionDuration ease-in-out;
  transition: z-index 3s, transform $sizeDuration, width $sizeDuration,
    height $sizeDuration, top $positionDuration,
    left $positionDuration ease-in-out;
  transition-delay: 0s, 0s, 0s, 0s, $positionDuration, $positionDuration;

  -webkit-box-shadow: 0px 25px 30px 0px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0px 25px 30px 0px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 25px 30px 0px rgba(0, 0, 0, 0.16);
}
.content {
  width: calc(100% - 2em);
  height: calc(100% - 2em);
  padding: 1em;
  transition: color $sizeDuration 0s;
  display: flex;
  flex-direction: column;
  h4 {
    // display: flex;
    font-size: 1.8rem;
    margin: 0;
    // word-wrap: break-word;
    hyphens: auto;
  }
  a {
    // display: flex;
    font-size: 0.875rem;
    text-decoration: none;
    color: #242424;
    // align-self: flex-end;
    margin-top: auto;
  }
}
</style>
