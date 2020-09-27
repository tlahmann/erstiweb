<template>
  <Calendar />
  <Contact />
  <Equipment />
  <Exibitions />
  <Info />
  <Inspirations />
  <Notes />
  <Rooms />
  <Search />
  <Tutors />
  <div>
    <Folder title="Ordner" positionX="79" positionY="52" />
    <Folder title="Ordner" positionX="73" positionY="46" />
    <Folder title="Ordner" positionX="70" positionY="57" />

    <Folder title="tmp" positionX="66" positionY="25" />
    <Folder title="Final" positionX="60" positionY="28" />
    <Folder title="Final_new" positionX="64" positionY="31" />

    <Folder title="Downloads" positionX="40" positionY="83" />
    <Folder title="Ordner" positionX="43" positionY="88" />

    <Folder title="Musik" positionX="20" positionY="68" />
    <Folder title="Test" positionX="12" positionY="70" />
  </div>
  <div class="overlay"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Calendar from "@/components/Calendar.vue"; // @ is an alias to /src
import Contact from "@/components/Contact.vue"; // @ is an alias to /src
import Equipment from "@/components/Equipment.vue"; // @ is an alias to /src
import Exibitions from "@/components/Exibitions.vue"; // @ is an alias to /src
import Info from "@/components/Info.vue"; // @ is an alias to /src
import Inspirations from "@/components/Inspirations.vue"; // @ is an alias to /src
import Notes from "@/components/Notes.vue"; // @ is an alias to /src
import Rooms from "@/components/Rooms.vue"; // @ is an alias to /src
import Search from "@/components/Search.vue"; // @ is an alias to /src
import Tutors from "@/components/Tutors.vue"; // @ is an alias to /src
import Folder from "@/components/shared/Folder.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    Calendar,
    Contact,
    Equipment,
    Exibitions,
    Info,
    Inspirations,
    Notes,
    Rooms,
    Search,
    Tutors,
    Folder
  }
});
</script>

<style lang="scss">
$positionDuration: 0.85s;
$sizeDuration: 0.95s;

#calendar,
#contact,
#equipment,
#exibitions,
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
  -webkit-transition: all 0.95s 0s;
  transition: all 0.95s 0s;
  z-index: initial;

  .notepad {
    cursor: pointer;
  }

  &.expanded {
    top: 0;
    left: 0;
    transform: translate(0, 0);
    z-index: 999;

    -webkit-transition: all 0.95s 0s;
    transition: all 0.95s 0s;

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
  top: 12vh;
  left: 11vw;
}
#contact {
  top: 86vh;
  left: 100vw;
}
#equipment {
  top: 13vh;
  left: 45vw;
}
#info {
  top: 25vh;
  left: 90vw;
}
#exibitions {
  top: 89vh;
  left: 17vw;
}
#inspirations {
  top: 38vh;
  left: 8vw;
}
#notes {
  top: 64vh;
  left: 32vw;
}
#rooms {
  top: 77vh;
  left: 55vw;
}
#search {
  top: 71vh;
  left: 5vw;
}
#tutors {
  top: 32vh;
  left: 47vw;
}
</style>
