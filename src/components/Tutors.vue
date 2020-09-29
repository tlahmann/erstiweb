<template>
  <div id="tutors">
    <div id="tutor-images">
      <img
        v-for="(tutor, idx) in tutors"
        v-bind:key="tutor"
        v-bind:src="tutor"
        v-on:click="updateFocus('tutors')"
        width="780"
        height="521"
        alt="Bilder je nach Breite des Viewports"
        v-bind:style="offset(idx)"
        class="tutor-image"
      />
    </div>
    <div id="content" v-on:click="updateFocus('')">
      <img :src="tutorBanner" class="tutor-banner" />
      <strong>
        Die Tutor*innen sind Studierende, die euch beim Einstieg ins Studium
        begleiten und euch zur Seite stehen, eine Menge zeigen und die Kneipen
        um die FH mit euch unsicher machen.
        <br /><br />
        Aus den Untiefen des Heimstudiums erreichte uns folgende Übertragung.
      </strong>
      <p>
        01010100011101010111010001101111011100100110010101101110
        <br /><br />
        Aufgepasst Erstis! Mit Beginn eures Studiums an der FH Dortmund seid ihr
        eurem Ziel ein erfolgreicher Designer zu werden schon einen Schritt
        näher - woher wir das wissen? Wir sind die Ersti-tutoren aus der Zukunft
        und wurden ins Jahr 2020 entsandt, um euch während eures ersten
        Semesters zur Seite zu stehen.
        <br /><br />
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

export default defineComponent({
  name: "Tutors",
  data: () => ({
    primeAngle: 137,
    primeRadiusX: 43,
    primeRadiusY: 37,
    tutorBanner: require("@/assets/tutors.svg"),
    tutors: [
      require("@/assets/Tutoren/Anna_sw.jpg"),
      require("@/assets/Tutoren/dilara_sw.jpg"),
      require("@/assets/Tutoren/Emma_sw.jpg"),
      require("@/assets/Tutoren/Fabian_sw.jpg"),
      require("@/assets/Tutoren/greta_sw.jpg"),
      require("@/assets/Tutoren/Isabell_sw.jpg"),
      require("@/assets/Tutoren/janika_sw.jpg"),
      require("@/assets/Tutoren/lorenz_sw.jpg"),
      require("@/assets/Tutoren/Luisa.jpg"),
      require("@/assets/Tutoren/Marie_sw.jpg"),
      require("@/assets/Tutoren/Olga_sw.jpg"),
      require("@/assets/Tutoren/Tim1_sw.jpg"),
      require("@/assets/Tutoren/tim2_sw.jpg"),
      require("@/assets/Tutoren/Tim3_sw.jpg")
    ]
  }),
  created: function() {
    this.tutors.sort(() => Math.random() - 0.5);
  },
  methods: {
    updateFocus(focusValue: string) {
      this.$emit("update-focus", focusValue);
    },
    offset(index: number) {
      const x =
        Math.cos((this.primeAngle * index) / 180) *
        this.primeRadiusX *
        (Math.floor((this.primeAngle * (index + 1)) / 360) + 1);
      const y =
        Math.sin((this.primeAngle * index) / 180) *
        this.primeRadiusY *
        (Math.floor((this.primeAngle * (index + 1)) / 360) + 1);
      return {
        "z-index": Math.floor(Math.random() * this.tutors.length),
        transform: `translate(${x}px, ${y}px)`
      };
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
img.tutor-image {
  max-width: 6vw;
  min-width: 110px;
  height: auto;
  position: absolute;

  -webkit-box-shadow: 0px 10pt 20pt 0px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0px 10pt 20pt 0px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 10pt 20pt 0px rgba(0, 0, 0, 0.16);
}
.tutor-banner {
  display: block;
  width: 322px;
  height: 140px;
  transform: translate(-270px, -40px);
}
#content {
  display: none;
}
.focused {
  overflow-y: scroll;
  #tutor-images {
    width: 100%;
    height: 820px;
  }
  #content {
    max-width: 1088px;
    margin: 0 auto 200px auto;
    text-align: left;
    display: block;
    strong {
      font-family: muli-black, Helvetica, Arial, sans-serif;
      font-weight: 700;
      line-height: 48px;
      font-size: 42px;
      margin-bottom: 100px;
      display: block;
    }
    p {
      line-height: 48px;
      font-size: 32px;
    }
  }
}
</style>
