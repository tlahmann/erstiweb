<template>
  <div id="calendar">
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
      <div style="margin: 0 auto;">
        <input type="button" class="dead-button" value="Tag" />
        <input type="button" class="dead-button" value="Woche" />
        <input type="button" class="dead-button" value="Monat" />
        <input type="button" class="dead-button" value="Jahr" />
      </div>
      <input type="text" class="dead-button" placeholder="Suche" />
    </div>
    <div id="calendar-content" v-on:click="updateFocus('calendar')">
      <div id="side">
        <div
          v-for="(category, categoryIndex) in getCategories()"
          :key="categoryIndex"
        >
          <input
            type="checkbox"
            :id="'fhdo-' + category"
            :name="'fhdo-' + category"
            :value="category"
            v-model="checkedCategories"
          />
          <label :for="'fhdo-' + category"> {{ category }}</label>
        </div>
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
              class="day"
              v-for="(day, dayIndex) in week"
              :key="dayIndex"
              :class="{
                weekend: dayIndex >= 5,
                'foreign-month': day.monthOffset !== 0
              }"
            >
              <div
                class="day-number"
                :class="{
                  'current-day': day.isCurrent
                }"
              >
                <span>{{ day.day }}</span>
              </div>
              <div class="events">
                <div
                  class="event"
                  v-for="(event, eventIndex) in getEventsOfDay(day)"
                  :key="eventIndex"
                >
                  {{ event.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TitlebarButtons from "@/components/shared/TitlebarButtons.vue"; // @ is an alias to /src
import axios from "axios";

type Event = { title: string; category: string; date: string };

export default defineComponent({
  name: "Calendar",
  components: {
    TitlebarButtons
  },
  emits: ["update-focus", "update-maximization"],
  data: () => ({
    title: "Kalender",
    days: [0],
    month: "None",
    year: "2020",
    checkedCategories: [] as string[],
    events: [] as Event[]
  }),
  created: function() {
    axios
      .get("./_content/calendar.json")
      .then((response) => {
        this.events = response.data;
        this.checkedCategories = this.getCategories();
      })
      .catch((error) => console.error(error));
  },
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
    updateMaximization() {
      this.$emit("update-maximization", "calendar");
    },
    getCategories(): string[] {
      return this.events
        ?.map((e) => e.category)
        ?.filter((value, index, self) => self.indexOf(value) === index);
    },
    setSelectedEvents(): Event[] {
      return this.events.filter((e) =>
        this.checkedCategories.includes(e.category)
      );
    },
    getEventsOfMonth(month?: number): Event[] {
      return this.setSelectedEvents().filter(
        (e) => new Date(e.date).getMonth() === (month || new Date().getMonth())
      );
    },
    getEventsOfDay(day: {
      day: number;
      monthOffset: number;
      isCurrent: boolean;
    }): Event[] {
      return this.getEventsOfMonth(
        new Date().getMonth() + day.monthOffset
      ).filter((e) => new Date(e.date).getDate() === day.day);
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
        result.push({ day: first + i, monthOffset: -1, isCurrent: false });
      }

      for (let i = 1; i <= this.daysInMonth(monthIndex); i++) {
        //result.push( i );
        result.push({
          day: i,
          monthOffset: 0,
          isCurrent: i === new Date().getDate()
        });
      }

      const daysDone = result.length;
      const daysToGo = 6 * 7 - daysDone;
      for (let i = 1; i <= daysToGo; i++)
        //result.push( i );
        result.push({ day: i, monthOffset: +1, isCurrent: false });

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
          font-size: 0.75rem;
        }
      }
      #days {
        flex: 1 1 auto;
        flex-direction: column;
        display: flex;
        color: #3d3d3d;
        font-size: 0.875rem;
        .row {
          display: flex;
          flex-direction: row;
          flex: 1 1 calc(100% / 4);
          .day {
            flex: 1 1 calc(100% / 7);
            padding: 0.4em 0.9em;
            display: flex;
            flex-direction: column;
            border-top: 1pt solid #e6e5e6;
            border-left: 1pt solid #e6e5e6;
            .day-number {
              // width: 20px;
              // height: 20px;
              align-self: flex-end;
              text-align: end;
              position: relative;
              font-size: 0.8125rem;
              // color: #3d3d3d;
              &.current-day {
                color: white;
                display: inline-block;
                line-height: 0px;
                border-radius: 50%;
                background-color: #fe453a;
                transform: translateX(6px);
                span {
                  display: inline-block;
                  padding-top: 50%;
                  padding-bottom: 50%;
                  margin-left: 6px;
                  margin-right: 6px;
                }
              }
            }
            .events {
              display: flex;
              flex-direction: column;
              .event {
                border: 1px solid #e6e5e6;
                border-radius: 4px;
                padding: 2px;
                margin-bottom: 2px;
                font-size: 0.75em;
              }
            }
          }
        }
      }
      .weekend,
      .foreign-month {
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
