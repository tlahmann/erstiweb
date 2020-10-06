<template>
  <div id="rooms">
    <div id="room-images">
      <img
        v-for="(room, idx) in rooms"
        v-bind:key="idx"
        v-bind:src="room.image"
        v-on:click="updateFocus('rooms')"
        width="780"
        height="521"
        alt="Bilder je nach Breite des Viewports"
        v-bind:style="offset(idx)"
        class="room-image"
      />
    </div>
    <div id="content" v-on:click="updateFocus('')">
      <p>
        Ob Fleisch, Fisch, vegetarisch, vegan oder glutenfrei: In der Mensa hat
        jede*r Student*in die Möglichkeit zwischen verschiedenen warmen Speisen
        auszuwählen. Alle Gerichte kannst Du individuell zusammen-stellen und
        ein Nachtisch ist auch immer dabei. Das Angebot wechselt von Woche zu
        Woche. Snacks, sowie belegte Brötchen, Süßkram, Kaffee und Tee kannst Du
        entweder in der Mensa oder an den Automaten erwerben.
        <br /><br />
        Der Preis einer Mahlzeit beträgt für Studierende ca. 2,50€. Jede weitere
        Beilage kostet 0,50€. Gäste haben ebenfalls die Möglichkeit in der Mensa
        zu essen und zahlen meist für eine Mahlzeit zwischen 3,20€ und 4,30€.
        Die Mensa kann auch als Räumlichkeit zum Arbeiten bis 22.00 Uhr genutzt
        werden. Ein WLAN-Zugang und Steckdosen sind vorhanden.
        <br /><br />
        Im Foyer befindet sich ein Wasserspender. Hier kannst Du Dir kostenlos
        Deine Flasche mit stillem oder kohlensäurehaltigem Wasser auffüllen.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "Rooms",
  emits: ["update-focus"],
  data: () => ({
    observer: {} as MutationObserver,
    expanded: false,
    primeAngle: -137,
    primeRadiusX: 127,
    primeRadiusY: 53,
    rooms: []
  }),
  created: function() {
    axios
      .get("./_content/rooms.json")
      .then((response) => {
        // return response.data?.tutors.map((elem: {}) => {
        this.rooms = response.data?.rooms.map((elem: {}) => {
          // const w = Math.floor(Math.random() * 100) + 230;
          // const h = Math.floor(Math.random() * 100) + 120;
          return {
            ...elem
            // pos: this.generatePosition(),
            // bounds: {
            //   // ...this.generatePosition(),
            //   width: w,
            //   height: h,
            //   hw: w >> 1, // half-width
            //   hh: h >> 1 // half-height
            // }
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
    updateFocus(focusValue: string) {
      this.$emit("update-focus", focusValue);
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
          "px";
        y =
          Math.sin(this.primeAngle * index * (Math.PI / 180)) *
            this.primeRadiusY *
            (Math.floor((this.primeAngle * (index + 1)) / 360) + 1) +
          "px";
        return {
          "z-index": Math.floor(Math.random() * this.rooms.length),
          transform: `translate(${x}, ${y})`
        };
      } else {
        const x = "0px";
        const y = "0px";
        return {
          "z-index": Math.floor(Math.random() * this.rooms.length),
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

img.room-image {
  max-width: 16vw;
  min-width: 110px;
  height: auto;
  position: absolute;
  .focused & {
    position: relative;
    margin: 2rem;
  }

  -webkit-box-shadow: 0px 10pt 20pt 0px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0px 10pt 20pt 0px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 10pt 20pt 0px rgba(0, 0, 0, 0.16);

  -webkit-transition: transform $positionDuration
    cubic-bezier(0.65, 0.05, 0.36, 1);
  transition: transform $positionDuration cubic-bezier(0.65, 0.05, 0.36, 1);
  transition-delay: 0s;
}
.room-banner {
  display: block;
  width: 322px;
  height: 140px;
  transform: translate(-270px, -40px);
}
#content {
  display: none;
}
#room.focused {
  transition: top $positionDuration, left $positionDuration,
    transform $sizeDuration cubic-bezier(0.65, 0.05, 0.36, 1);
  transition-delay: 0s, 0s, 0s;
}
.focused {
  overflow-x: hidden;
  overflow-y: scroll;
  #room-images {
    width: 80%;
    height: 600px;
    transform: translateY(10%);
    margin: 0 auto 220px auto;
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
      margin-bottom: 10rem;
    }
  }
}
</style>
