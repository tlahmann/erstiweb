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
          <!-- <input
            type="checkbox"
            class="category-checkbox"
            :id="'fhdo-' + category.title"
            :name="'fhdo-' + category.title"
            :value="category.title"
            v-model="checkedCategories"
          />
          <label
            :for="'fhdo-' + category.title"
            :style="{ color: category.color }"
          >
            {{ category.title }}</label
          > -->
          <label class="checkbox" :for="'fhdo-' + category.title">
            <span class="checkbox__input">
              <input
                type="checkbox"
                name="checkbox"
                :id="'fhdo-' + category.title"
                :value="category.title"
                v-model="checkedCategories"
              />
              <span
                class="checkbox__control"
                :style="{ 'background-color': category.color }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    fill="none"
                    stroke-width="2"
                    stroke="white"
                    d="M1.73 12.91l6.37 6.37L22.79 4.59"
                  />
                </svg>
              </span>
            </span>
            <span class="radio__label">{{ category.title }}</span>
          </label>
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
                  <div
                    class="category"
                    :style="{
                      'background-color': getCategoryColor(event.category)
                    }"
                  ></div>
                  <div class="title">{{ event.title }}</div>
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
        this.checkedCategories = this.getCategories().map((v) => v.title);
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
    getCategories(): { title: string; color: string }[] {
      const colors = [
        "#FF0000",
        "#00EAFF",
        "#AA00FF",
        "#FF7F00",
        "#BFFF00",
        "#0095FF",
        "#FF00AA",
        "#FFD400",
        "#6AFF00",
        "#0040FF",
        "#EDB9B9",
        "#B9D7ED",
        "#E7E9B9",
        "#DCB9ED",
        "#B9EDE0",
        "#8F2323",
        "#23628F",
        "#8F6A23",
        "#6B238F",
        "#4F8F23",
        "#000000",
        "#737373",
        "#CCCCCC"
      ];
      return this.events
        ?.map((e) => e.category)
        ?.filter((value, index, self) => self.indexOf(value) === index)
        ?.map((v: string, i: number) => ({ title: v, color: colors[i] }));
    },
    getCategoryColor(category: string): string {
      return (
        this.getCategories().find((v) => v.title === category)?.color || "white"
      );
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
  background-color: #cecece;
  border: solid 1pt rgba(0, 0, 0, 10%);
  border-radius: 7pt;
  // width: 1280px;
  // height: 815px;
  width: 80em;
  height: 50em;
  #calendar-content {
    width: 100%;
    height: calc(100% - 25pt);
    display: flex;
    #side {
      background-color: #cecece;
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
          font-size: 0.75em;
        }
      }
      #days {
        flex: 1 1 100%;
        flex-direction: column;
        display: flex;
        color: #3d3d3d;
        font-size: 0.875em;
        .row {
          display: flex;
          flex-direction: row;
          flex: 1 1 calc(100% / 4);
          .day {
            flex: 0 1 calc(100% / 7);
            overflow: hidden;
            padding: 0.4em 0.9em;
            display: flex;
            flex-direction: column;
            border-top: 1px solid #ababab;
            border-left: 1px solid #ababab;
            .day-number {
              // width: 20px;
              // height: 20px;
              align-self: flex-end;
              text-align: end;
              position: relative;
              font-size: 0.8125em;
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
                // border: 1px solid #ababab;
                border-radius: 4px;
                padding: 2px;
                margin-bottom: 2px;
                font-size: 0.825em;
                display: flex;
                flex-direction: row;
                align-items: center;
                .category {
                  width: 0.8em;
                  height: 0.8em;
                  border-radius: 0.4em;
                  margin-right: 0.5em;
                  flex: 1 0 0.8em;
                }
                .title {
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  flex: 1 0 calc(100% - 0.8em);
                }
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
    }
    // .category-checkbox {
    //   display: none;
    // }
    // .category-checkbox + label::before {
    //   width: 22px;
    //   height: 18px;
    //   background-image: url("unchecked.png");
    //   display: block;
    //   content: "";
    //   float: left;
    //   margin-right: 5px;
    // }
    // .category-checkbox:checked + label::before {
    //   background-image: url("checked.png");
    // }
    .checkbox {
      display: grid;
      grid-template-columns: min-content auto;
      grid-gap: 0.5em;
      font-size: 1em;
    }
    .checkbox__control {
      display: inline-grid;
      width: 1em;
      height: 1em;
      border-radius: 0.25em;
      border: 0.1em solid currentColor;
      svg {
        transition: transform 0.1s ease-in 25ms;
        transform: scale(0);
        transform-origin: bottom left;
      }
    }
    .checkbox__input {
      display: grid;
      grid-template-areas: "checkbox";
      > * {
        grid-area: checkbox;
      }
      input {
        opacity: 0;
        width: 1em;
        height: 1em;

        &:focus + .checkbox__control {
          box-shadow: 0 0 0 0.05em #fff, 0 0 0.15em 0.1em currentColor;
        }

        &:checked + .checkbox__control svg {
          transform: scale(1);
        }

        &:disabled + .checkbox__control {
          color: var(--disabled);
        }
      }
    }
  }
}
</style>
