<template>
  <nav>
    <div id="route">
      {{ $route.name }}
    </div>
    <div id="menu" style="margin-left: auto;">Menü</div>
    <div id="imprint">Impressum</div>
    <div id="time">{{ day }}, {{ hours }}:{{ minutes }}</div>
  </nav>
  <!-- <div id="blue"></div> -->
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export const SECOND = 1000;

export default defineComponent({
  name: "App",
  data() {
    return {
      day: "",
      hours: "",
      minutes: ""
    };
  },
  mounted() {
    this.$options.timer = window.setTimeout(this.updateDateTime, SECOND);
  },
  beforeUnmount() {
    window.clearTimeout(this.$options.timer);
  },
  methods: {
    updateDateTime() {
      const now = new Date();
      this.day = ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."][
        now.getDay()
      ];
      this.hours = this.getZeroPad(now.getHours());
      this.minutes = this.getZeroPad(now.getMinutes());
      this.$options.timer = window.setTimeout(this.updateDateTime, SECOND);
    },
    getZeroPad(n: number): string {
      return (parseInt(n, 10) >= 10 ? "" : "0") + n;
    }
  }
});
</script>

<style lang="scss">
@font-face {
  font-family: "muli";
  src: local("muli"), url(./assets/Muli-Regular.ttf) format("truetype");
}

body,
#app {
  margin: 0;
  height: 100vh;
  width: 100vw;
  top: 0;
  position: absolute;
  overflow: hidden;
}

#app {
  font-family: muli, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  background-color: #9b9b9b;
  // filter: greyscale(100%) hue-rotate(180deg) brightness(100%) contrast(90%)
  //   saturate(200%);
  // filter: sepia(100%) hue-rotate(185deg) brightness(73%) saturate(390%);
}

nav {
  background-color: #f2f2f2;
  z-index: 1200;
  position: relative;
  display: flex;
  padding: 7pt 56pt;
  font-size: 18px;
  font-weight: 400;

  -webkit-box-shadow: 0px 4pt 28pt 0px rgba(0, 0, 0, 0.28);
  -moz-box-shadow: 0px 4pt 28pt 0px rgba(0, 0, 0, 0.28);
  box-shadow: 0px 4pt 28pt 0px rgba(0, 0, 0, 0.28);

  #imprint,
  #menu {
    margin: 0 45pt 0 0;
    cursor: pointer;
  }
}
</style>
