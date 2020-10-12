<template>
  <div id="notes">
    <div class="titlebar">
      <TitlebarButtons
        @update-focus="updateFocus"
        @update-maximization="updateMaximization"
      />
      <input
        type="button"
        class="dead-button"
        :value="title"
        style="margin: 0 20px;padding: 3px 28px;"
      />
      <input type="button" class="dead-button" value="+" />
    </div>
    <div id="notes-content" v-on:click="updateFocus('notes')">
      <div id="ruler">
        <div class="horizontal"></div>
        <div class="vertical" style="left: 8px">
          <div class="arrow"></div>
          <div class="number">0</div>
        </div>
        <div class="vertical shortest" style="left: 31px"></div>
        <div class="vertical short" style="left: 54px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 77px"></div>
        <div class="vertical" style="left: 100px">
          <div class="arrow"></div>
          <div class="number">2</div>
        </div>
        <div class="vertical shortest" style="left: 123px"></div>
        <div class="vertical short" style="left: 146px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 169px"></div>
        <div class="vertical" style="left: 192px">
          <div class="arrow"></div>
          <div class="number">4</div>
        </div>
        <div class="vertical shortest" style="left: 215px"></div>
        <div class="vertical short" style="left: 238px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 261px"></div>
        <div class="vertical" style="left: 284px">
          <div class="arrow"></div>
          <div class="number">6</div>
        </div>
        <div class="vertical shortest" style="left: 307px"></div>
        <div class="vertical short" style="left: 330px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 353px"></div>
        <div class="vertical" style="left: 376px">
          <div class="arrow"></div>
          <div class="number">8</div>
        </div>
        <div class="vertical shortest" style="left: 399px"></div>
        <div class="vertical short" style="left: 422px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 445px"></div>
        <div class="vertical" style="left: 468px">
          <div class="arrow"></div>
          <div class="number">10</div>
        </div>
        <div class="vertical shortest" style="left: 491px"></div>
        <div class="vertical short" style="left: 514px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 537px"></div>
        <div class="vertical" style="left: 560px">
          <div class="arrow"></div>
          <div class="number">12</div>
        </div>
        <div class="vertical shortest" style="left: 583px"></div>
        <div class="vertical short" style="left: 606px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 629px"></div>
        <div class="vertical" style="left: 652px">
          <div class="arrow"></div>
          <div class="number">14</div>
        </div>
        <div class="vertical shortest" style="left: 675px"></div>
        <div class="vertical short" style="left: 698px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 721px"></div>
        <div class="vertical" style="left: 744px">
          <div class="arrow"></div>
          <div class="number">16</div>
        </div>
        <div class="vertical shortest" style="left: 767px"></div>
        <div class="vertical short" style="left: 790px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 813px"></div>
        <div class="vertical" style="left: 836px">
          <div class="arrow"></div>
          <div class="number">18</div>
        </div>
        <div class="vertical shortest" style="left: 859px"></div>
        <div class="vertical short" style="left: 882px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 905px"></div>
        <div class="vertical" style="left: 928px">
          <div class="arrow"></div>
          <div class="number">20</div>
        </div>
        <div class="vertical shortest" style="left: 951px"></div>
        <div class="vertical short" style="left: 974px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 997px"></div>
        <div class="vertical" style="left: 1020px">
          <div class="arrow"></div>
          <div class="number">22</div>
        </div>
        <div class="vertical shortest" style="left: 1043px"></div>
        <div class="vertical short" style="left: 1066px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 1089px"></div>
        <div class="vertical" style="left: 1112px">
          <div class="arrow"></div>
          <div class="number">24</div>
        </div>
        <div class="vertical shortest" style="left: 1135px"></div>
        <div class="vertical short" style="left: 1158px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 1181px"></div>
        <div class="vertical" style="left: 1204px">
          <div class="arrow"></div>
          <div class="number">26</div>
        </div>
        <div class="vertical shortest" style="left: 1227px"></div>
        <div class="vertical short" style="left: 1250px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 1273px"></div>
        <div class="vertical" style="left: 1296px">
          <div class="arrow"></div>
          <div class="number">28</div>
        </div>
        <div class="vertical shortest" style="left: 1319px"></div>
        <div class="vertical short" style="left: 1342px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 1365px"></div>
        <div class="vertical" style="left: 1388px">
          <div class="arrow"></div>
          <div class="number">30</div>
        </div>
        <div class="vertical shortest" style="left: 1411px"></div>
        <div class="vertical short" style="left: 1434px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 1457px"></div>
        <div class="vertical" style="left: 1480px">
          <div class="arrow"></div>
          <div class="number">32</div>
        </div>
        <div class="vertical shortest" style="left: 1503px"></div>
        <div class="vertical short" style="left: 1526px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 1549px"></div>
        <div class="vertical" style="left: 1572px">
          <div class="arrow"></div>
          <div class="number">34</div>
        </div>
        <div class="vertical shortest" style="left: 1595px"></div>
        <div class="vertical short" style="left: 1618px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 1641px"></div>
        <div class="vertical" style="left: 1664px">
          <div class="arrow"></div>
          <div class="number">36</div>
        </div>
        <div class="vertical shortest" style="left: 1687px"></div>
        <div class="vertical short" style="left: 1710px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 1733px"></div>
        <div class="vertical" style="left: 1756px">
          <div class="arrow"></div>
          <div class="number">38</div>
        </div>
        <div class="vertical shortest" style="left: 1779px"></div>
        <div class="vertical short" style="left: 1802px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 1825px"></div>
        <div class="vertical" style="left: 1848px">
          <div class="arrow"></div>
          <div class="number">40</div>
        </div>
        <div class="vertical shortest" style="left: 1779px"></div>
        <div class="vertical short" style="left: 1802px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 1825px"></div>
        <div class="vertical" style="left: 1848px">
          <div class="arrow"></div>
          <div class="number">42</div>
        </div>
        <div class="vertical shortest" style="left: 1871px"></div>
        <div class="vertical short" style="left: 1894px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 1917px"></div>
        <div class="vertical" style="left: 1940px">
          <div class="arrow"></div>
          <div class="number">44</div>
        </div>
        <div class="vertical shortest" style="left: 1963px"></div>
        <div class="vertical short" style="left: 1986px">
          <div class="arrow"></div>
        </div>
        <div class="vertical shortest" style="left: 2009px"></div>
        <div class="vertical" style="left: 2032px">
          <div class="arrow"></div>
          <div class="number">46</div>
        </div>
      </div>
      <div id="content">
        <small style="font-size: small;"
          >psst: Rechtsklick -> Bild herunterladen ...</small
        >
        <img
          src="../assets/Einleger-Leben.png"
          alt="Einleger Leben"
          :style="{ 'z-index': current === 0 ? 250 : 200 }"
          v-on:click="current = 0"
        />
        <img
          src="../assets/Einleger-Leben2.png"
          alt="Einleger Leben"
          :style="{ 'z-index': current === 1 ? 250 : 200 }"
          v-on:click="current = 1"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TitlebarButtons from "@/components/shared/TitlebarButtons.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Notes",
  components: {
    TitlebarButtons
  },
  data: () => ({
    title: "Notizen",
    current: 0
  }),
  emits: ["update-focus", "update-maximization"],
  methods: {
    updateFocus(focusValue: string) {
      this.$emit("update-focus", focusValue);
    },
    updateMaximization() {
      this.$emit("update-maximization", "notes");
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#notes {
  background-color: #cecece;
  border: solid 1pt rgba(0, 0, 0, 10%);
  border-radius: 7pt;
  width: 80em;
  height: 65em;
  #notes-content {
    width: 100%;
    height: calc(100% - 30pt);
    display: flex;
    flex-direction: column;
    #ruler {
      background-color: var(--white-bg-color);
      height: 54px;
      position: relative;
      .horizontal {
        position: absolute;
        width: 100%;
        top: 50%;
        left: 0;
        border-bottom: 2px solid #ababab;
      }
      .vertical {
        position: absolute;
        height: 40%;
        top: 48%;
        border-right: 2px solid #ababab;
        &.short {
          height: 20%;
        }
        &.shortest {
          top: 50%;
          height: 5%;
        }
        .arrow {
          position: absolute;
          top: -10px;
          left: 0.5px;
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;

          border-left: 6px solid #ababab;
        }
        .number {
          position: absolute;
          bottom: -5px;
          left: 5px;
          font-size: 12px;
        }
      }
    }
    #content {
      background-color: var(--white-bg-color);
      height: calc(100% - 54px);
      padding: 8px;
      font-size: 1.125rem;
      line-height: 2.125rem;
      position: relative;
      img {
        width: calc(93% - 5em);
        position: absolute;
        transition: z-index 0.25s ease-in-out;
        left: 5%;
        top: 7%;

        &:nth-of-type(2) {
          transform: translate(4em, 1.5em);
        }
      }
    }
  }
}
</style>
