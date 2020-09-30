<template>
  <div id="tutors">
    <div id="tutor-images">
      <img
        v-for="(tutor, idx) in tutors"
        v-bind:key="idx"
        v-bind:src="tutor.image"
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
import axios from "axios";
import { reposition } from "@/utils/reposition.function";

export default defineComponent({
  name: "Tutors",
  data: () => ({
    init: true,
    primeAngle: 137,
    primeRadiusX: 37,
    primeRadiusY: 23,
    tutorBanner: require("@/assets/tutors.svg"),
    tutors: [] as {
      image: string;
      bounds: { x: string; y: string; left: string; top: string };
    }[]
  }),
  created: function() {
    axios
      .get("./_content/tutors.json")
      .then((response) => {
        return response.data?.tutors.map((elem: {}) => {
          const w = Math.floor(Math.random() * 100) + 230;
          const h = Math.floor(Math.random() * 100) + 120;
          return {
            ...elem,
            // pos: this.generatePosition(),
            bounds: {
              ...this.generatePosition(),
              width: w,
              height: h,
              hw: w >> 1, // half-width
              hh: h >> 1 // half-height
            }
          };
        });
      })
      .then((tutors) => {
        this.tutors = reposition(
          {
            x: 100,
            y: 100,
            w: window.innerWidth - 200,
            h: 820 - 50,
            hw: (window.innerWidth - 200) >> 1,
            hh: (820 - 50) >> 1
          },
          tutors,
          20,
          30
        );
      })
      .catch((error) => console.error(error));
  },
  methods: {
    updateFocus(focusValue: string) {
      this.$emit("update-focus", focusValue);
    },
    generatePosition(): { x: number; y: number } {
      const x = Math.floor(Math.random() * 30) + 20;
      const y = Math.floor(Math.random() * 30) + 20;
      return { x, y };
    },
    offset(
      index: number
    ): {
      "z-index": number;
      transform: string;
      width?: string;
      height?: string;
    } {
      let x = "";
      let y = "";
      if (this.$el.classList.contains("focused") || this.init) {
        x =
          Math.cos(this.primeAngle * index * (Math.PI / 180)) *
            this.primeRadiusX *
            (Math.floor((this.primeAngle * (index + 1)) / 360) + 1) +
          "%";
        y =
          Math.sin(this.primeAngle * index * (Math.PI / 180)) *
            this.primeRadiusY *
            (Math.floor((this.primeAngle * (index + 1)) / 360) + 1) +
          "%";
        this.init = !(this.init && index + 1 === this.tutors.length);
        return {
          "z-index": Math.floor(Math.random() * this.tutors.length),
          transform: `translate(${x}, ${y})`
          // width: "100px",
          // height: "100px"
        };
      } else {
        x = this.tutors[index].bounds.x + "px";
        y = this.tutors[index].bounds.y + "px";
        return {
          "z-index": Math.floor(Math.random() * this.tutors.length),
          transform: `translate(${x}, ${y})`
        };
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$positionDuration: 0.85s;
$sizeDuration: 0.95s;

img.tutor-image {
  max-width: 6vw;
  min-width: 110px;
  height: auto;
  position: absolute;

  -webkit-box-shadow: 0px 10pt 20pt 0px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0px 10pt 20pt 0px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 10pt 20pt 0px rgba(0, 0, 0, 0.16);

  -webkit-transition: transform $positionDuration
    cubic-bezier(0.65, 0.05, 0.36, 1);
  transition: transform $positionDuration cubic-bezier(0.65, 0.05, 0.36, 1);
  transition-delay: 0s;
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
#tutor.focused {
  transition: top 0.85s, left 0.85s,
    transform 0.95s cubic-bezier(0.65, 0.05, 0.36, 1);
  transition-delay: 0s, 0s, 0s;
}
.focused {
  overflow-x: hidden;
  overflow-y: scroll;
  #tutor-images {
    width: 100%;
    height: 400px;
    transform: translateY(40%);
    margin-bottom: 420px;
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
