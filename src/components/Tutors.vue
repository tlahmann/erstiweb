<template>
  <div id="tutors">
    <div id="tutor-images" v-on:click="updateFocus('', $event)">
      <img
        v-for="(tutor, idx) in tutors"
        v-bind:key="idx"
        v-bind:src="tutor.image"
        v-on:click="updateFocus('tutors', $event)"
        width="780"
        height="521"
        alt="Bilder je nach Breite des Viewports"
        v-bind:style="offset(idx)"
        class="tutor-image"
      />
    </div>
    <div id="content" v-on:click="updateFocus('', $event)">
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
        euem Ziel ein erfolgreicher Designer zu werden schon einen Schritt näher
        - woher wir das wissen? Wir sind die Ersti-tutoren aus der Zukunft und
        wurden ins Jahr 2020 entsandt, um euch während eures ersten Semesters
        zur Seite zu stehen.
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
      <Calendar />
      <p>
        Die Zukunft. Hier feiern die fetzigsten Dinge der Vergangenheit ihr
        Comeback: Neonlicht, Aluhüte und LED-Heelys dürfen auf keiner Future
        Party fehlen. Sounds like fun? Dann sucht euch ein grooviges Partyoutfit
        aus der Zukunft zusammen, schwingt euch aufs Hoverboard und lasst uns
        mit den Leuchtstoffröhren um die Wette strahlen!
        <br /><br />
        01010100011101010111010001101111011100100110010101101110
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Calendar from "@/components/Calendar.vue"; // @ is an alias to /src
import axios from "axios";
import { reposition } from "@/utils/reposition.function";
import randInt from "@/utils/randInt.function";

export default defineComponent({
  name: "Tutors",
  components: {
    Calendar
  },
  data: () => ({
    observer: {} as MutationObserver,
    expanded: false,
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
        // return response.data?.tutors.map((elem: {}) => {
        this.tutors = response.data?.tutors.map((elem: {}) => {
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
      // .then((tutors) => {
      //   this.tutors = reposition(
      //     {
      //       x: 100,
      //       y: 100,
      //       w: window.innerWidth - 200,
      //       h: 820 - 50,
      //       hw: (window.innerWidth - 200) >> 1,
      //       hh: (820 - 50) >> 1
      //     },
      //     tutors,
      //     20,
      //     30
      //   );
      // })
      .catch((error) => console.error(error));
  },
  mounted() {
    this.observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        const newValue = (m.target as HTMLElement).classList;
        this.$nextTick(() => {
          this.expanded =
            newValue.contains("expanded") || newValue.contains("focused");
        });
      }
    });

    this.observer.observe(this.$el, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ["class"]
    });
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
  methods: {
    updateFocus(focusValue: string, event: any) {
      this.$emit("update-focus", focusValue);
      event.stopPropagation();
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
      transform?: string;
      width?: string;
      height?: string;
    } {
      let x = "";
      let y = "";
      if (!this.expanded) {
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
        return {
          "z-index": Math.floor(Math.random() * this.tutors.length),
          transform: `translate(${x}, ${y})`
        };
      } else {
        // x = this.tutors[index].bounds.x + "px";
        // y = this.tutors[index].bounds.y + "px";
        const x = randInt(-50, 50) + "px";
        const y = randInt(-100, 100) + "px";
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
$positionDuration: 0.55s;
$sizeDuration: 0.25s;

img.tutor-image {
  max-width: 4vmin;
  min-width: 5vmax;
  height: auto;
  position: absolute;
  .focused & {
    position: relative;
    margin: 1.5em;
    max-width: 8vw;

    transition-property: transform;
    transition-duration: $sizeDuration * 3;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
  }

  -webkit-box-shadow: 0px 10pt 20pt 0px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0px 10pt 20pt 0px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 10pt 20pt 0px rgba(0, 0, 0, 0.16);

  -webkit-transition: transform $positionDuration ease-in-out;
  transition: transform $positionDuration ease-in-out;
  transition-delay: 0s;
}
.tutor-banner {
  display: block;
  width: 20em;
  height: 10em;
  top: -10em;
  left: -3em;
  position: absolute;
  z-index: 1500;
}
#content {
  display: none;
}
#tutor.focused {
  transition: top $positionDuration, left $positionDuration,
    transform $sizeDuration ease-in-out;
  transition-delay: 0s, 0s, 0s;
}
.focused {
  overflow-x: hidden;
  overflow-y: scroll;
  #tutor-images {
    width: 90%;
    height: 65vmin;
    margin: 40px auto;
  }
  #content {
    max-width: 1088px;
    margin: 140px auto 200px auto;
    padding: 20px;
    text-align: left;
    display: block;
    position: relative;
    strong {
      font-family: muli-black, Helvetica, Arial, sans-serif;
      font-weight: 700;
      line-height: 2.1em;
      font-size: 2em;
      margin-bottom: 100px;
      display: block;
    }
    p {
      line-height: 1.9em;
      font-size: 1.8em;
      margin-bottom: 10em;
    }
  }
}

#calendar {
  position: relative;
  display: block;
  transform: none;
  width: 100%;
  top: 0;
  left: 0;
  margin-bottom: 10em;
}
</style>
