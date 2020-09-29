<template>
  <nav>
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
  <!-- <div id="blue"></div> -->
  <div>
    <!-- window-style components -->
    <Calendar
      v-bind:class="{ focused: focused === 'calendar' }"
      @update-focus="updateFocus"
    />
    <Contact
      v-bind:class="{ focused: focused === 'contact' }"
      @update-focus="updateFocus"
    />
    <Info
      v-bind:class="{ focused: focused === 'info' }"
      @update-focus="updateFocus"
    />
    <Notes
      v-bind:class="{ focused: focused === 'notes' }"
      @update-focus="updateFocus"
    />
    <Search
      v-bind:class="{ focused: focused === 'search' }"
      @update-focus="updateFocus"
    />

    <!-- Post-It style components -->
    <Equipment
      v-bind:class="{ expanded: focused === 'equipment' }"
      @update-focus="updateFocus"
    />
    <Exibitions
      v-bind:class="{ expanded: focused === 'exibitions' }"
      @update-focus="updateFocus"
    />
    <Inspirations
      v-bind:class="{ expanded: focused === 'inspirations' }"
      @update-focus="updateFocus"
    />

    <!-- image-style components -->
    <Rooms
      v-bind:class="{ focused: focused === 'rooms' }"
      @update-focus="updateFocus"
    />
    <Tutors
      v-bind:class="{ focused: focused === 'tutors' }"
      @update-focus="updateFocus"
    />
    <div>
      <Folder title="Ordner" top="89" left="35" />
      <Folder title="Ordner" top="86" left="31" />

      <Folder title="Ordner" top="18" left="38" />
      <Folder title="tmp" top="27" left="34" />
      <Folder title="Final" top="30" left="28" />
      <Folder title="Final_new" top="34" left="31" />

      <Folder title="Downloads" top="50" left="81" />
      <Folder title="Ordner" top="53" left="86" />
      <Folder title="Musik" top="58" left="72" />
      <Folder title="Test" top="60" left="74" />
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
import Equipment from "@/components/Equipment.vue"; // @ is an alias to /src
import Exibitions from "@/components/Exibitions.vue"; // @ is an alias to /src
import Info from "@/components/Info.vue"; // @ is an alias to /src
import Inspirations from "@/components/Inspirations.vue"; // @ is an alias to /src
import Menu from "@/components/Menu.vue"; // @ is an alias to /src
import Notes from "@/components/Notes.vue"; // @ is an alias to /src
import Rooms from "@/components/Rooms.vue"; // @ is an alias to /src
import Search from "@/components/Search.vue"; // @ is an alias to /src
import Tutors from "@/components/Tutors.vue"; // @ is an alias to /src
import Folder from "@/components/shared/Folder.vue"; // @ is an alias to /src
import router from "@/router";

export const SECOND = 1000;

export default defineComponent({
  name: "App",
  components: {
    Calendar,
    Contact,
    Equipment,
    Exibitions,
    Info,
    Inspirations,
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
      }
      this.focused = componentName;
    },
    getRoute(): string {
      const idx = this.focused.toString();
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
  // mix-blend-mode: screen;
  // filter: sepia(1) hue-rotate(180deg);

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
  #menu-button {
    margin: 0 45pt 0 0;
    cursor: pointer;
  }
}

$positionDuration: 0.85s;
$sizeDuration: 0.95s;

#calendar,
#contact,
#equipment,
#exibitions,
#menu,
#info,
#inspirations,
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

    -webkit-transition: top $positionDuration, left $positionDuration,
      transform $sizeDuration cubic-bezier(0.65, 0.05, 0.36, 1);
    transition: top $positionDuration, left $positionDuration,
      transform $sizeDuration cubic-bezier(0.65, 0.05, 0.36, 1);
    transition-delay: 0s, 0s, $positionDuration;

    ~ .overlay {
      visibility: visible;
      opacity: 1;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 25;
      -webkit-transition: visibility 0s,
        opacity $positionDuration cubic-bezier(0.65, 0.05, 0.36, 1);
      transition: visibility 0s,
        opacity $positionDuration cubic-bezier(0.65, 0.05, 0.36, 1);
    }
  }
}
#tutors.focused {
  top: 40px;
  left: 0;
  transform: translate(0, 0) scale(1);
  width: 100vw;
  height: 100vh;
}
.overlay {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fefefe;
  z-index: initial;
  -webkit-transition: z-index 0.5s, visibility $positionDuration,
    opacity $positionDuration cubic-bezier(0.65, 0.05, 0.36, 1);
  transition: z-index 0.5s, visibility $positionDuration,
    opacity $positionDuration cubic-bezier(0.65, 0.05, 0.36, 1);
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

  -webkit-transition: z-index $positionDuration, transform $sizeDuration,
    top $positionDuration,
    left $positionDuration cubic-bezier(0.65, 0.05, 0.36, 1);
  transition: z-index $positionDuration, transform $sizeDuration,
    top $positionDuration,
    left $positionDuration cubic-bezier(0.65, 0.05, 0.36, 1);
  transition-delay: 0s, 0s, $positionDuration, $positionDuration;

  transform: translate(-50%, -50%) scale(0.5);
  overflow: hidden;
  cursor: pointer;
}
#equipment,
#exibitions,
#inspirations {
  // -webkit-transition: all 0.95s 0s;
  // transition: all 0.95s 0s;
  z-index: initial;

  .notepad {
    cursor: pointer;
  }

  &.expanded {
    top: 0;
    left: 0;
    transform: translate(0, 0);
    z-index: 999;

    // -webkit-transition: all 0.95s 0s;
    // transition: all 0.95s 0s;

    .notepad > .content {
      color: initial !important;
      -webkit-transition: color 0.95s 0s;
      transition: color 0.95s 0s;
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
      -webkit-transition: visibility 0s,
        opacity $positionDuration cubic-bezier(0.65, 0.05, 0.36, 1);
      transition: visibility 0s,
        opacity $positionDuration cubic-bezier(0.65, 0.05, 0.36, 1);
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
#equipment {
  top: 11vh;
  left: 58vw;
}
#info {
  top: 25vh;
  left: 93vw;
}
#exibitions {
  top: 95vh;
  left: 7vw;
}
#inspirations {
  top: 33vh;
  left: 6vw;
}
#menu {
  top: 50vh;
  left: 120vw;
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
</style>
