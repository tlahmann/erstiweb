<template>
  <Calendar />
  <Contact />
  <Equipment />
  <Exibitions />
  <Info />
  <Inspirations />
  <Rooms />
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
import Rooms from "@/components/Rooms.vue"; // @ is an alias to /src
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
    Rooms,
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
#rooms,
#tutors {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  z-index: auto;

  -webkit-transition: z-index 3s, transform $sizeDuration, top $positionDuration,
    left $positionDuration cubic-bezier(0.65, 0.05, 0.36, 1);
  transition: z-index 3s, transform $sizeDuration, top $positionDuration,
    left $positionDuration cubic-bezier(0.65, 0.05, 0.36, 1);
  transition-delay: 0s, 0s, $positionDuration, $positionDuration;

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
      z-index: 99;
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
  -webkit-transition: visibility $positionDuration,
    opacity $positionDuration cubic-bezier(0.65, 0.05, 0.36, 1);
  transition: visibility $positionDuration,
    opacity $positionDuration cubic-bezier(0.65, 0.05, 0.36, 1);
}
#calendar,
#contact,
#info {
  -webkit-box-shadow: 0px 25px 30px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 25px 30px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 25px 30px 0px rgba(0, 0, 0, 0.3);

  transform: translate(-50%, -50%) scale(0.5);
  overflow: hidden;
  cursor: pointer;
}
#tutors,
#rooms {
  text-align: center;
}
#calendar {
  top: 22vh;
  left: 10vw;
}
#contact {
  top: 90vh;
  left: 95vw;
}
#equipment {
  top: 13vh;
  left: 50vw;
}
#info {
  top: 25vh;
  left: 90vw;
}
#exibitions {
  top: 85vh;
  left: 20vw;
}
#inspirations {
  top: 50vh;
  left: 10vw;
}
#rooms {
  top: 95vh;
  left: 55vw;
}
#tutors {
  top: 60vh;
  left: 45vw;
}
</style>
