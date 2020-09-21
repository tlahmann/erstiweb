<template>
  <div id="calendar" v-bind:class="{ focused: focused }">
    <Titlebar focused="focused" @update-focus="update" />
    <div id="calendar-content" v-on:click="this.focused = true">
      <div id="side">
        <input type="checkbox" name="fh-common" value="bla" />
        <label for="fh-common"> FH Dortmund Allgemein</label><br />
        <input type="checkbox" name="communicationDesign" value="foo" />
        <label for="communicationDesign"> Kommunikationsdesign</label><br />
        <input type="checkbox" name="film-sound" value="bar" />
        <label for="film-sound"> Film & Sound</label><br />
        <input type="checkbox" name="object-room" value="this" />
        <label for="object-room"> Objekt- & Raumdesign</label><br />
        <input type="checkbox" name="fimography" value="that" />
        <label for="fimography"> Filmografie</label><br />
      </div>
      <div id="weeks">
        <div id="titles">
          <div>Mo</div>
          <div>DI</div>
          <div>Mi</div>
          <div>Do</div>
          <div>Fr</div>
          <div>Sa</div>
          <div>So</div>
        </div>
        <div>
          <div>31</div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
        </div>
        <div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
          <div>11</div>
          <div>12</div>
          <div>13</div>
        </div>
        <div>
          <div>14</div>
          <div>15</div>
          <div>16</div>
          <div>17</div>
          <div>18</div>
          <div>19</div>
          <div>20</div>
        </div>
        <div>
          <div>21</div>
          <div>22</div>
          <div>23</div>
          <div>24</div>
          <div>25</div>
          <div>26</div>
          <div>27</div>
        </div>
        <div>
          <div>28</div>
          <div>29</div>
          <div>30</div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Titlebar from "@/components/shared/Titlebar.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Calendar",
  components: {
    Titlebar
  },
  data: () => ({
    message: "jo",
    focused: false
  }),
  methods: {
    update(focused: boolean) {
      this.focused = focused;
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#calendar {
  background-color: #e8e8e8;
  border: solid 1pt rgba(0, 0, 0, 10%);
  border-radius: 7pt;
  width: 1280px;
  height: 815px;
  min-width: 1280px;
  min-height: 815px;
  #calendar-content {
    width: 100%;
    height: calc(100% - 25pt);
    display: flex;
    #side {
      background-color: #e8e8e8;
      flex: 1 1 20%;
      height: calc(100% - 40pt);
      padding: 20pt 17pt;
      input[type="checkbox"] {
        margin: 6.5px 3px;
      }
    }
    #weeks {
      background-color: white;
      flex: 1 1 80%;
      height: 100%;
      display: flex;
      flex-direction: column;
      div {
        display: flex;
        flex-direction: row;
      }
      #titles {
        flex: 0 0 5%;
      }
      div {
        flex: 1 1 auto;
        div {
          flex: 1 1 calc(100% / 7);
          border: 1pt solid black;
          padding: 0.5em;
        }
      }
    }
  }
}
</style>
