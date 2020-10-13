<template>
  <div id="rooms">
    <div id="room-images" v-on:click="updateFocus('', $event)">
      <div id="room-teasers">
        <img
          v-for="(room, idx) in getTeasers()"
          v-bind:key="idx"
          v-bind:src="room"
          v-on:click="updateFocus('rooms', $event, idx)"
          width="780"
          height="521"
          alt="Bilder je nach Breite des Viewports"
          v-bind:style="offset(idx)"
          class="room-image"
        />
      </div>
      <div id="room-image-large">
        <img
          v-bind:src="rooms[current]?.images?.[0]"
          width="780"
          height="521"
          alt="Bilder je nach Breite des Viewports"
          class="room-image"
        />
      </div>
    </div>
    <div id="content" v-on:click="updateFocus('', $event)">
      <img :src="rooms[current]?.banner" class="room-banner" />
      <div v-html="rooms[current]?.text"></div>
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
    current: 0,
    primeAngle: -137,
    primeRadiusX: 37,
    primeRadiusY: 23,
    rooms: [] as { images: string[] }[]
  }),
  created: function() {
    axios
      .get("./_content/rooms.json")
      .then((response) => {
        this.rooms = response.data?.map((elem: {}) => {
          return {
            ...elem
          };
        });
      })
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
    updateFocus(focusValue: string, event: any, index?: number) {
      if ((this.expanded && focusValue !== "rooms") || !this.expanded) {
        this.$emit("update-focus", focusValue);
      } else {
        this.current = index || 0;
      }
      event.stopPropagation();
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
    },
    getTeasers(): string[] {
      return this.rooms.map((room) => room.images?.[0]);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$positionDuration: 0.55s;
$sizeDuration: 0.25s;

img.room-image {
  max-width: 26vmin;
  min-width: 15vmax;
  height: auto;
  position: absolute;
  .focused & {
    position: relative;
    margin: 1.5em;
    // max-width: 8vw;
    display: flex;
    flex: 0 0 4vh;
    width: 4vh;
    height: 4vh;
    max-width: initial;
    min-width: initial;

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
#room.focused {
  transition: top $positionDuration, left $positionDuration,
    transform $sizeDuration ease-in-out;
  transition-delay: 0s, 0s, 0s;
}
.focused {
  overflow-x: hidden;
  overflow-y: scroll;
  #room-images {
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 65vmin;
    margin: 40px auto;
    #room-teasers {
      display: flex;
      flex-direction: row;
    }
    #room-image-large {
      img.room-image {
        width: 100vmin;
        height: auto;
        margin: 0 auto;
      }
    }
  }
  #content {
    max-width: 1088px;
    margin: 140px auto 200px auto;
    padding: 20px;
    text-align: left;
    display: block;
    position: relative;
    div {
      line-height: 1.9em;
      font-size: 1.8em;
      strong {
        font-family: muli-black, Helvetica, Arial, sans-serif;
        font-weight: 700;
        // line-height: 2.1em;
        // font-size: 2em;
        margin-bottom: 100px;
        display: block;
      }
      p {
        // line-height: 1.9em;
        // font-size: 1.8em;
        margin-bottom: 10em;
      }
    }
  }
}
</style>
