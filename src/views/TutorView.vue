<template>
  <div>
    <Tutors />
    <div>
      <p>01010100011101010111010001101111011100100110010101101110</p>

      <p>
        Aufgepasst Erstis! Mit Beginn eures Studiums an der FH Dortmund seid ihr
        eurem Ziel ein erfolgreicher Designer zu werden schon einen Schritt
        näher - woher wir das wissen? Wir sind die Ersti-tutoren aus der Zukunft
        und wurden ins Jahr 2020 entsandt, um euch während eures ersten
        Semesters zur Seite zu stehen.
      </p>

      <p>
        Auf euch wartet eine spannende Reise voller neuer Aufgaben,
        unvergesslicher Teamarbeiten, innovativen Designs, legendären
        Kneipentouren, sagenumwobenen Feten und immerwährenden Freundschaften.
        Coronabedingt saßen wir alle lang genug alleine rum, deshalb wird es
        Zeit in Zukunft wieder gemeinsam den Dancefloor unsicher zu
        machen.Solange das analog nicht möglich ist, könnt ihr euch digital mit
        uns die Zeit vertreiben: mit Podcasts rund ums Studium, Onlinespielen
        und Livestreams von euren Future Tuts.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Tutors from "@/components/Tutors.vue"; // @ is an alias to /src

export default defineComponent({
  name: "TutorView",
  components: {
    Tutors
  }
});
</script>

<style lang="scss"></style>
