<template>
  <nav id="main-nav">
    <div id="route" v-on:click="updateFocus('')">
      {{ $route.name }} {{ getRoute() }}
    </div>
    <div
      id="menu-button"
      style="margin-left: auto;"
      v-on:click="updateFocus('menu')"
    >
      Menü
    </div>
    <div id="imprint">Impressum</div>
    <div id="time">{{ day }}, {{ hours }}:{{ minutes }}</div>
  </nav>
  <div>
    <!-- window-style components -->
    <Calendar
      v-bind:class="{
        focused: focused === 'calendar',
        maximized: maximized === 'calendar',
        unfocused: !!focused && focused !== 'calendar'
      }"
      @update-focus="updateFocus"
      @update-maximization="updateMaximization"
    />
    <Contact
      v-bind:class="{
        focused: focused === 'contact',
        maximized: maximized === 'contact',
        unfocused: !!focused && focused !== 'contact'
      }"
      @update-focus="updateFocus"
      @update-maximization="updateMaximization"
    />
    <Info
      v-bind:class="{
        focused: focused === 'info',
        maximized: maximized === 'info',
        unfocused: !!focused && focused !== 'info'
      }"
      @update-focus="updateFocus"
      @update-maximization="updateMaximization"
    />
    <Notes
      v-bind:class="{
        focused: focused === 'notes',
        maximized: maximized === 'notes',
        unfocused: !!focused && focused !== 'notes'
      }"
      @update-focus="updateFocus"
      @update-maximization="updateMaximization"
    />
    <Search
      v-bind:class="{
        focused: focused === 'search',
        maximized: maximized === 'search',
        unfocused: !!focused && focused !== 'search'
      }"
      @update-focus="updateFocus"
      @update-maximization="updateMaximization"
    />

    <!-- Post-It style components -->
    <bodies
      v-bind:class="{
        focused: focused === 'bodies',
        unfocused: !!focused && focused !== 'bodies',
        expanded: !!focused && focused !== 'bodies'
      }"
      @update-focus="updateFocus"
    />
    <Proposals
      v-bind:class="{
        focused: focused === 'proposals',
        unfocused: !!focused && focused !== 'proposals',
        expanded: !!focused && focused !== 'proposals'
      }"
      @update-focus="updateFocus"
    />
    <Consulting
      v-bind:class="{
        focused: focused === 'consulting',
        unfocused: !!focused && focused !== 'consulting',
        expanded: !!focused && focused !== 'consulting'
      }"
      @update-focus="updateFocus"
    />

    <!-- image-style components -->
    <Rooms
      v-bind:class="{
        focused: focused === 'rooms',
        unfocused: !!focused && focused !== 'rooms'
      }"
      @update-focus="updateFocus"
    />
    <Tutors
      v-bind:class="{
        focused: focused === 'tutors',
        unfocused: !!focused && focused !== 'tutors'
      }"
      @update-focus="updateFocus"
    />
    <div>
      <Folder
        title="Ordner"
        top="89"
        left="35"
        v-bind:class="{
          unfocused: !!focused
        }"
      />
      <Folder
        title="Ordner"
        top="86"
        left="31"
        v-bind:class="{
          unfocused: !!focused
        }"
      />

      <Folder
        title="Ordner"
        top="18"
        left="38"
        v-bind:class="{
          unfocused: !!focused
        }"
      />
      <Folder
        title="tmp"
        top="27"
        left="34"
        v-bind:class="{
          unfocused: !!focused
        }"
      />
      <Folder
        title="Final"
        top="30"
        left="28"
        v-bind:class="{
          unfocused: !!focused
        }"
      />
      <Folder
        title="Final_new"
        top="34"
        left="31"
        v-bind:class="{
          unfocused: !!focused
        }"
      />

      <Folder
        title="Downloads"
        top="50"
        left="81"
        v-bind:class="{
          unfocused: !!focused
        }"
      />
      <Folder
        title="Ordner"
        top="53"
        left="86"
        v-bind:class="{
          unfocused: !!focused
        }"
      />
      <Folder
        title="Musik"
        top="58"
        left="72"
        v-bind:class="{
          unfocused: !!focused
        }"
      />
      <Folder
        title="Test"
        top="60"
        left="74"
        v-bind:class="{
          unfocused: !!focused
        }"
      />
    </div>

    <Menu
      v-bind:class="{ focused: focused === 'menu' }"
      @update-focus="updateFocus"
    />

    <div class="overlay" v-on:click="updateFocus('')"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Calendar from "@/components/Calendar.vue"; // @ is an alias to /src
import Contact from "@/components/Contact.vue"; // @ is an alias to /src
import Bodies from "@/components/Bodies.vue"; // @ is an alias to /src
import Proposals from "@/components/Proposals.vue"; // @ is an alias to /src
import Info from "@/components/Info.vue"; // @ is an alias to /src
import Consulting from "@/components/Consulting.vue"; // @ is an alias to /src
import Menu from "@/components/Menu.vue"; // @ is an alias to /src
import Notes from "@/components/Notes.vue"; // @ is an alias to /src
import Rooms from "@/components/Rooms.vue"; // @ is an alias to /src
import Search from "@/components/Search.vue"; // @ is an alias to /src
import Tutors from "@/components/Tutors.vue"; // @ is an alias to /src
import Folder from "@/components/shared/Folder.vue"; // @ is an alias to /src
import router from "@/router";

export const SECOND = 1000;

export default defineComponent({
  name: "Home",
  components: {
    Calendar,
    Contact,
    Bodies,
    Proposals,
    Info,
    Consulting,
    Menu,
    Notes,
    Rooms,
    Search,
    Tutors,
    Folder
  },
  data: () => ({
    day: "",
    hours: "",
    minutes: "",
    focused: "",
    maximized: "",
    routeNames: {
      calendar: " / Kalender",
      contact: " / Kontakte",
      info: " / Informationen",
      search: " / Suche",
      rooms: " / Räume",
      tutors: " / Tutoren"
    } as { [k: string]: string }
  }),
  mounted() {
    this.$options.timer = window.setTimeout(this.updateDateTime, SECOND);
    setTimeout(() => (this.focused = this.$route.query["c"] as string), 1);
  },
  beforeUnmount() {
    window.clearTimeout(this.$options.timer);
  },
  // FIXME: the routing is not called in app.vue, only in (routed) components
  beforeRouteUpdate(to, from, next) {
    this.focused = to.query["c"] as string;
    next();
  },
  methods: {
    updateFocus(componentName: string): void {
      if (this.focused !== componentName) {
        router.push({ path: "", query: { c: componentName } });
        this.maximized = "";
      }
      this.focused = componentName;
    },
    updateMaximization(componentName: string): void {
      this.maximized = this.maximized ? "" : componentName;
    },
    getRoute(): string {
      const idx = this.focused?.toString();
      return this.routeNames[idx];
    },
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
  src: local("muli"), url(../assets/Muli-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "muli-black";
  src: local("muli-black"), url(../assets/Muli-Black.ttf) format("truetype");
}

$titlebarColor: hsl(0, 0%, 75%);
$background-color: rgb(240, 240, 243);
$background-color-darker: rgb(235, 235, 239);
:root {
  --white-bg-color: rgb(240, 240, 243);
  --white-bg-color-darker: rgb(235, 235, 239);
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
  color: #10171e;
  background-color: #3b3b3b;
  mix-blend-mode: screen;
  filter: sepia(1) hue-rotate(184deg);

  // filter: greyscale(100%) hue-rotate(180deg) brightness(100%) contrast(90%)
  //   saturate(200%);
  // filter: sepia(100%) hue-rotate(185deg) brightness(73%) saturate(390%);
  // filter: grayscale(50%) hue-rotate(185deg) brightness(73%) saturate(390%);

  // mix-blend-mode: screen;
  // -webkit-filter: grayscale(100%) contrast(200%);
  // filter: grayscale(100%) contrast(200%);
  // opacity: 1;
}

#main-nav {
  // background-color: $titlebarColor;
  background-image: linear-gradient(
    180deg,
    $titlebarColor,
    darken($titlebarColor, 9%)
  );
  z-index: 1200;
  position: relative;
  display: flex;
  padding: 0.7em 2em;
  font-size: 1.125em;
  font-weight: 400;

  -webkit-box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.28);
  -moz-box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.28);
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.28);

  #imprint,
  #menu-button {
    margin: 0 45pt 0 0;
    cursor: pointer;
  }

  #route {
    cursor: pointer;
  }
}

$positionDuration: 0.55s;
$sizeDuration: 0.65s;

#calendar,
#contact,
#bodies,
#proposals,
#menu,
#info,
#consulting,
#notes,
#rooms,
#search,
#tutors {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 1px;
  height: 1px;

  &.focused {
    top: 50vh;
    left: 50vw;
    z-index: 999;
    transform: translate(-50%, -50%) scale(1);
    cursor: default;

    transition-property: width, height, top, left, transform;
    transition-duration: $sizeDuration/2, $sizeDuration/2, $positionDuration,
      $positionDuration, $sizeDuration;
    transition-timing-function: ease-in-out, ease-in-out, ease-in-out,
      ease-in-out, ease-in-out;
    transition-delay: 0s, 0s, 0s, 0s, $positionDuration;

    ~ .overlay {
      visibility: visible;
      opacity: 1;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 25;
      -webkit-transition: visibility 0s, opacity $positionDuration/2 ease-in-out;
      transition: visibility 0s, opacity $positionDuration/2 ease-in-out;
    }
  }

  &.unfocused {
    transform: translate(-50%, -50%) scale(0.35);
    opacity: 0.35;
  }
}
.folder {
  transition-property: z-index, transform, opacity;
  transition-duration: $positionDuration, $sizeDuration, $positionDuration;
  transition-timing-function: ease-in-out, ease-in-out, ease-in-out;
  transition-delay: 0s, 0s, 0s;
  &.unfocused {
    transform: translate(-50%, -50%) scale(0.35);
    opacity: 0.35;
    transition-property: z-index, transform, opacity;
    transition-duration: $positionDuration, $sizeDuration, $positionDuration;
    transition-timing-function: ease-in-out, ease-in-out, ease-in-out;
    transition-delay: 0s, 0s, 0s;
  }
}
#calendar,
#contact,
#menu,
#info,
#notes,
#search {
  max-width: 90vw;
  max-height: 83vh;

  &.maximized {
    width: 100vw;
    height: calc(100vh - 45px);
    max-width: 100vw;
    max-height: calc(100vh - 45px);
    top: calc(50vh + 20px);
    z-index: 1300;

    transition-property: width, height, top, left;
    transition-duration: $sizeDuration/2, $sizeDuration/2, $positionDuration,
      $positionDuration;
    transition-timing-function: ease-in-out, ease-in-out, ease-in-out,
      ease-in-out;
    transition-delay: 0s, 0s, 0s, 0s;
  }
}
#tutors.focused,
#rooms.focused {
  width: 100vw;
  height: 100vh;
  animation-name: focusable;
  animation-timing-function: linear;
  animation-duration: $sizeDuration/2;

  transition-property: width, height, top, left, transform;
  transition-duration: $sizeDuration/2, $sizeDuration/2, $sizeDuration/2,
    $sizeDuration/2, $sizeDuration/2;
  transition-timing-function: ease-in-out, ease-in-out, ease-in-out, ease-in-out,
    ease-in-out;
  transition-delay: 0s, 0s, 0s, 0s, 0s;
}
@keyframes focusable {
  0% {
    width: 100vw;
    height: 1px;
    overflow: visible;
  }
  100% {
    width: 100vw;
    height: calc(100vh - 40px);
    overflow: hidden;
  }
}
.overlay {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: transparent;
  z-index: initial;
  -webkit-transition: z-index 0.5s, visibility $positionDuration,
    opacity $positionDuration ease-in-out;
  transition: z-index 0.5s, visibility $positionDuration,
    opacity $positionDuration ease-in-out;
}
#calendar,
#contact,
#menu,
#info,
#notes,
#search {
  z-index: 5;
  -webkit-box-shadow: 0px 25px 30px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 25px 30px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 25px 30px 0px rgba(0, 0, 0, 0.3);

  transition-property: z-index, transform, opacity, width, height, top, left;
  transition-duration: $positionDuration, $sizeDuration, $positionDuration,
    $sizeDuration, $sizeDuration, $positionDuration, $positionDuration;
  transition-timing-function: ease-in-out, ease-in-out, ease-in-out, ease-in-out,
    ease-in-out, ease-in-out, ease-in-out;
  transition-delay: 0s, 0s, 0s, 0s, 0s, $positionDuration, $positionDuration;

  transform: translate(-50%, -50%) scale(0.5);
  overflow: hidden;
  cursor: pointer;
}
#bodies,
#proposals,
#consulting {
  -webkit-transition: all $sizeDuration 0s;
  transition: all $sizeDuration 0s;
  z-index: initial;

  .notepad {
    cursor: pointer;
    > .content {
      h4,
      a {
        display: none;
      }
    }
  }

  &.focused {
    top: 30vh;
    left: 30vw;
    transform: translate(0, 0);
    z-index: 555;

    -webkit-transition: all $sizeDuration 0s;
    transition: all $sizeDuration 0s;

    .notepad > .content {
      color: initial !important;
      -webkit-transition: color $sizeDuration 0s;
      transition: color $sizeDuration 0s;
      h4,
      a {
        display: flex;
      }
    }

    ~ .overlay {
      visibility: visible;
      opacity: 0.25;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 99;
      -webkit-transition: visibility 0s, opacity $positionDuration ease-in-out;
      transition: visibility 0s, opacity $positionDuration ease-in-out;
    }
  }
}
#tutors,
#rooms {
  text-align: center;
}
#calendar {
  top: 8vh;
  left: 11vw;
}
#contact {
  top: 86vh;
  left: 100vw;
}
#bodies {
  top: 11vh;
  left: 58vw;
}
#info {
  top: 25vh;
  left: 93vw;
}
#proposals {
  top: 95vh;
  left: 7vw;
}
#consulting {
  top: 33vh;
  left: 6vw;
}
#menu {
  top: 50vh;
  left: -120vw;
}
#notes {
  top: 58vh;
  left: 31vw;
}
#rooms {
  top: 77vh;
  left: 55vw;
}
#search {
  top: 69vh;
  left: 5vw;
}
#tutors {
  top: 31vh;
  left: 52vw;
}

// Titlebar
$titlebarHeight: 2.5em;
.titlebar {
  height: $titlebarHeight;
  width: calc(100% - 8pt);
  display: flex;
  padding: 4pt 5pt 4pt 5pt;
  transform: translate(-1pt, -1pt);
  background-image: linear-gradient(
    180deg,
    $titlebarColor,
    darken($titlebarColor, 9%)
  );
  border-bottom: 1px solid rgba(0, 0, 0, 10%);
  border-top-left-radius: 7pt;
  border-top-right-radius: 7pt;
  align-items: center;
  font-size: 0.8125em;
  .dead-button {
    padding: 0.125em 0.5em;
    margin: 0;
    border-radius: 0.125em;
    border: 1px solid #ababab;
    font-size: 0.9em;
  }
  .titlebar-button {
    margin: 2.4em;
    padding: 0;
    width: 10pt;
    height: 10pt;
    border: solid 1pt rgba(0, 0, 0, 15%);
    border-radius: 5pt;
    &:nth-of-type(1) {
      background-color: #ff6157;
    }
    &:nth-of-type(2) {
      background-color: #ffc12f;
    }
    &:nth-of-type(3) {
      background-color: #2acb42;
    }
  }
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-= Mobile Breakpoints =-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

body {
  font-size: 9px;
}

// Small devices (landscape phones, 576px and up)
// @media (min-width: 576px) { body{font-size: 9px;} }

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
  body {
    font-size: 11px;
  }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
  body {
    font-size: 13px;
  }
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
  body {
    font-size: 16px;
  }
}
</style>
