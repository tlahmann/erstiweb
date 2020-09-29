<template>
  <div id="calendar">
    <Titlebar focused="focused" @update-focus="updateFocus" />
    <div id="calendar-content" v-on:click="updateFocus('calendar')">
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
        <div id="title">
          <span id="month">{{ month }}</span>
          <span id="year">{{ year }}</span>
        </div>
        <div id="titles">
          <div>Mo</div>
          <div>Di</div>
          <div>Mi</div>
          <div>Do</div>
          <div>Fr</div>
          <div>Sa</div>
          <div>So</div>
        </div>
        <div id="days">
          <div class="row" v-for="(week, weekIndex) in days" :key="weekIndex">
            <div
              v-for="(day, dayIndex) in week"
              :key="dayIndex"
              :class="{
                weekend: dayIndex >= 5,
                'foreign-mongth': !day.isThisMonth
              }"
            >
              {{ day.day }}
            </div>
          </div>
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
  emits: ["update-focus"],
  data: () => ({
    days: [0],
    month: "None",
    year: "2020"
  }),
  mounted() {
    const now = new Date();
    this.month = [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember"
    ][now.getMonth()];
    this.days = this.constructMonth(now.getMonth(), now.getFullYear()).reduce(
      (resultArray: any[], item: any, index: number) => {
        const chunkIndex = Math.floor(index / 7);

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
      },
      []
    );
  },
  methods: {
    updateFocus(focusValue: string) {
      this.$emit("update-focus", focusValue);
    },
    getFirstDayOfMonth(zeroBasedMonthNum: number, fullYear: number) {
      const monthNames = [
        "January",
        "Febuary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const dateStr = `${monthNames[zeroBasedMonthNum]} 1, ${fullYear}, 00:00:00`;
      const monthStart = new Date(dateStr);
      return monthStart;
    },
    daysInMonth(zeroBasedMonthNumber: number) {
      return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][
        zeroBasedMonthNumber
      ];
    },
    constructMonth(monthIndex: number, year: number) {
      let firstDay = this.getFirstDayOfMonth(monthIndex, year).getDay();
      if (firstDay == 0) {
        firstDay = 6;
      } else {
        firstDay--;
      }

      const daysFromLastMonth = firstDay;
      const result = [];

      const daysInLastMonth = this.daysInMonth(monthIndex - 1);
      const first = daysInLastMonth - daysFromLastMonth + 1;
      for (let i = 0; i < daysFromLastMonth; i++) {
        //result.push(first+i);
        result.push({ day: first + i, isThisMonth: false });
      }

      for (let i = 1; i <= this.daysInMonth(monthIndex); i++)
        //result.push( i );
        result.push({ day: i, isThisMonth: true });

      const daysDone = result.length;
      const daysToGo = 6 * 7 - daysDone;
      for (let i = 1; i <= daysToGo; i++)
        //result.push( i );
        result.push({ day: i, isThisMonth: false });

      return result;
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
      #title {
        display: flex;
        flex-direction: row;
        font-size: 2em;
        padding: 16px 21px;
        #month {
          font-family: muli-black, Helvetica, Arial, sans-serif;
          font-weight: 700;
          margin-right: 12px;
        }
      }
      #titles {
        flex: 0 0 3%;
        flex-direction: row;
        display: flex;
        div {
          flex: 1 1 calc(100% / 7);
          padding: 0.4em 0.9em;
          text-align: end;
          font-size: 12px;
        }
      }
      #days {
        flex: 1 1 auto;
        flex-direction: column;
        display: flex;
        color: #3d3d3d;
        font-size: 14px;
        .row {
          display: flex;
          flex-direction: row;
          flex: 1 1 calc(100% / 4);
          div {
            flex: 1 1 calc(100% / 7);
            padding: 0.4em 0.9em;
            text-align: end;
            border-top: 1pt solid #e6e5e6;
            border-left: 1pt solid #e6e5e6;
          }
        }
      }
      .weekend,
      .foreign-mongth {
        color: #3d3d3d88;
      }
      .weekend {
        background-color: #f5f5f5;
      }
      // #days div {
      //   border: 1pt solid #e6e5e6;
      // }
    }
  }
}
</style>
