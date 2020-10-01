<template>
  <div id="contact">
    <div id="contact-content">
      <div id="side">
        <div>
          <TitlebarButtons @update-focus="updateFocus" />
        </div>
        <div class="list" v-on:click="updateFocus('contact')">
          <ul>
            <li>Alle Kontakte</li>
          </ul>
          <span>FH Dortmund</span>
          <ul>
            <li>Alle FH Dortmund Kontakte</li>
          </ul>
          <span>FH Dortmund</span>
          <ul>
            <li>Alle Fachbereich-Kontakte</li>
            <li>Kommunikationsdesign</li>
            <li>Fotografie</li>
            <li>Objekt- und Raumdesign</li>
            <li>Film & Sound</li>
          </ul>
        </div>
      </div>
      <div id="contacts" v-on:click="updateFocus('contact')">
        <div id="contact-list">
          <ul>
            <li
              v-for="(contact, contactIndex) in contacts"
              :key="contactIndex"
              :class="{ active: contactIndex === current }"
              v-on:click="current = contactIndex"
            >
              <span class="first-name"> {{ contact.firstname }}&nbsp; </span>
              <span class="last-name">{{ contact.lastname }}</span>
            </li>
          </ul>
        </div>
        <div id="contact-info">
          <span id="first-name" v-if="contacts[current]?.title">
            {{ contacts[current]?.title }}&nbsp;
          </span>
          <span id="first-name">
            {{ contacts[current]?.firstname }}&nbsp;
          </span>
          <span id="last-name">{{ contacts[current]?.lastname }}</span>
          <ul>
            <li
              v-for="(info, contactIndex) in contacts[current]?.contactInfos"
              :key="contactIndex"
            >
              <span class="title">{{ info.key }}</span>
              <span class="value">{{ info.value }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TitlebarButtons from "@/components/shared/TitlebarButtons.vue"; // @ is an alias to /src
import axios from "axios";

export default defineComponent({
  name: "Contact",
  components: {
    TitlebarButtons
  },
  data: () => ({
    current: 0,
    contacts: [] as { text: string }[]
  }),
  emits: ["update-focus"],
  created: function() {
    axios
      .get("./_content/contacts.json")
      .then((response) => {
        this.contacts = response.data?.sort((c1: any, c2: any) =>
          c2.lastname > c1.lastname ? -1 : 1
        );
      })
      .catch((error) => console.error(error));
  },
  methods: {
    updateFocus(focusValue: string) {
      this.$emit("update-focus", focusValue);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#contact {
  background-color: #e8e8e8;
  border: solid 1pt rgba(0, 0, 0, 10%);
  border-radius: 7pt;
  width: 1079px;
  height: 827px;
  #contact-content {
    width: 100%;
    height: 100%;
    display: flex;
    #side {
      background-color: #e8e8e8;
      flex: 1 1 22.7%;
      height: calc(100% - 40pt);
      padding: 20pt 17pt;
      input[type="checkbox"] {
        margin: 6.5px 3px;
      }
      .list {
        height: 100%;
        display: flex;
        flex-direction: column;
        ul {
          margin: 0;
          padding: 0;
          list-style: none;
          li {
            border-bottom: 1px solid #e8e8e8;
            padding: 14px 18px;
          }
        }
      }
    }
    #contacts {
      background-color: #ffffff;
      flex: 1 1 77.3%;
      height: 100%;
      display: flex;
      flex-direction: row;
      #contact-list,
      #contact-info {
        padding: 1rem;
      }
      #contact-list,
      #contact-info {
        flex: 1 1 40.1%;
        border-right: 1px solid #e8e8e8;
        background-color: white;
        height: 100%;
        padding: 1rem 0;
        ul {
          margin: 0;
          padding: 0;
          list-style: none;
          li {
            border-bottom: 1px solid #e8e8e8;
            padding: 14px 18px 14px 22px;
            color: #7c7c7c;
            &.active {
              background-color: #707070;
              color: white;
            }
            .first-name,
            .last-name {
              font-size: 0.875rem;
            }
            .first-name {
              font-weight: 400;
            }
            .last-name {
              font-weight: 600;
            }
          }
        }
      }
      #contact-info {
        flex: 1 1 69.9%;
        padding: 3rem 1.375em;
        height: calc(100% - 6rem);
        #first-name,
        #last-name {
          color: #7c7c7c;
          font-size: 2.125rem;
          margin-bottom: 1rem;
          display: inline-block;
        }
        #first-name {
          font-weight: 400;
        }
        #last-name {
          font-weight: 600;
        }
        ul li {
          display: flex;
          flex-direction: row;
          padding: 20px 5px;
          border-top: 1px solid #e8e8e8;
          border-bottom: none;
          .value {
            flex: 1 1 78%;
            font-size: 0.875rem;
          }
          .title {
            flex: 1 1 22%;
            font-weight: 600;
            font-size: 0.785rem;
          }
        }
      }
    }
  }
}
</style>
