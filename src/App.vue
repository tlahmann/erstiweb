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
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"
    /></transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export const SECOND = 1000;

export default defineComponent({
  name: "App",
  data() {
    return {
      transitionName: "slide-left",
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
  beforeRouteUpdate(to, from, next) {
    console.log("bla");
    const toDepth = to.path.split("/").length;
    const fromDepth = from.path.split("/").length;
    this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    next();
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
      return (parseInt((n as unknown) as string, 10) >= 10 ? "" : "0") + n;
    }
  }
});
</script>

<style lang="scss">
@font-face {
  font-family: "muli";
  src: local("muli"), url(./assets/Muli-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "muli-black";
  src: local("muli-black"), url(./assets/Muli-Black.ttf) format("truetype");
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

body {
  background-color: #0033ff;
}

#app {
  font-family: muli, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  background-color: #9b9b9b;
  // mix-blend-mode: screen !important;

  // filter: greyscale(100%) hue-rotate(180deg) brightness(100%) contrast(90%)
  //   saturate(200%);
  // filter: sepia(100%) hue-rotate(185deg) brightness(73%) saturate(390%);
  // filter: grayscale(50%) hue-rotate(185deg) brightness(73%) saturate(390%);

  // mix-blend-mode: screen;
  // -webkit-filter: grayscale(100%) contrast(200%);
  // filter: grayscale(100%) contrast(200%);
  // opacity: 1;
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

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
