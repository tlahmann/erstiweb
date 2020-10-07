<template>
  <div id="contact">
    <div id="contact-content">
      <div id="side">
        <div id="buttons">
          <TitlebarButtons
            @update-focus="updateFocus"
            @update-maximization="updateMaximization"
          />
        </div>
        <div id="side-content" v-on:click="updateFocus('contact')">
          <p>FH Dortmund</p>
          <ul>
            <li
              v-on:click="
                () => {
                  filter = '';
                  current = filteredContacts()?.[0];
                }
              "
            >
              Alle Kontakte
            </li>
            <li
              v-for="(category, categoryIndex) in getCategories()"
              :key="categoryIndex"
              v-on:click="
                () => {
                  filter = category;
                  current = filteredContacts()?.[0];
                }
              "
            >
              {{ category }}
            </li>
          </ul>
        </div>
      </div>
      <div id="contacts" v-on:click="updateFocus('contact')">
        <div id="contact-list">
          <input
            id="contact-search"
            v-model="filter"
            type="text"
            placeholder="Suche"
          />
          <ul
            v-for="(letter, letterIndex) in getContactLetter()"
            :key="letterIndex"
          >
            <li>{{ letter }}</li>
            <li
              v-for="(contact, contactIndex) in getContactsByLetter(letter)"
              :key="contactIndex"
              :class="{ active: contact === current }"
              v-on:click="current = contact"
            >
              <span class="first-name"> {{ contact.firstname }}&nbsp; </span>
              <span class="last-name">{{ contact.lastname }}</span>
            </li>
          </ul>
        </div>
        <div id="contact-info">
          <span id="first-name" v-if="current?.title">
            {{ current?.title }}&nbsp;
          </span>
          <span id="first-name"> {{ current?.firstname }}&nbsp; </span>
          <span id="last-name">{{ current?.lastname }}</span>
          <ul>
            <li
              v-for="(info, contactIndex) in current?.contactInfos"
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
    current: {},
    filter: "",
    contacts: [] as {
      firstname: string;
      lastname: string;
      category: string;
      title: string;
      contactInfos: { key: string; value: string }[];
    }[]
  }),
  emits: ["update-focus", "update-maximization"],
  created: function() {
    axios
      .get("./_content/contacts.json")
      .then((response) => {
        this.contacts = response.data?.sort((c1: any, c2: any) =>
          c2.lastname > c1.lastname ? -1 : 1
        );
        this.current = this.contacts?.[0];
      })
      .catch((error) => console.error(error));
  },
  methods: {
    updateFocus(focusValue: string) {
      this.$emit("update-focus", focusValue);
    },
    updateMaximization() {
      this.$emit("update-maximization", "contact");
    },
    filteredContacts() {
      return this.contacts.filter((c) => {
        return (
          !this.filter ||
          c.firstname?.toLowerCase().match(this.filter.toLowerCase()) ||
          c.lastname?.toLowerCase().match(this.filter.toLowerCase()) ||
          c.title?.toLowerCase().match(this.filter.toLowerCase()) ||
          c.category?.toLowerCase().match(this.filter.toLowerCase()) ||
          c.contactInfos?.some((ci) =>
            ci.value.toLowerCase().match(this.filter.toLowerCase())
          )
        );
      });
    },
    getCategories() {
      return this.contacts
        ?.map((i) => i.category)
        ?.filter((value, index, self) => self.indexOf(value) === index);
    },
    getContactLetter() {
      return this.filteredContacts()
        ?.map((c) => c.lastname.charAt(0).toUpperCase())
        ?.filter((value, index, self) => self.indexOf(value) === index)
        ?.sort();
    },
    getContactsByLetter(letter: string) {
      return this.filteredContacts()?.filter(
        (value) => value.lastname.charAt(0).toUpperCase() === letter
      );
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#contact {
  background-color: #cecece;
  border: solid 1pt rgba(0, 0, 0, 10%);
  border-radius: 7pt;
  width: 1079px;
  height: 827px;
  #contact-content {
    width: 100%;
    height: 100%;
    display: flex;
    #side {
      background-color: #cecece;
      flex: 1 1 18.9%;
      height: calc(100% - 30pt);
      padding: 10pt 8pt;
      display: flex;
      flex-direction: column;
      font-size: 0.875rem;
      line-height: 1.125rem;

      #buttons {
        margin-bottom: 1rem;
      }

      #side-content {
        height: 100%;
      }
      input[type="checkbox"] {
        margin: 6.5px 3px;
      }
      p {
        margin: 0;
        color: rgba(36, 36, 36, 0.6);
        margin-bottom: 6px;
      }
      ul {
        margin: 0;
        list-style-type: none;
        padding-left: 1.5rem;
        li {
          margin-bottom: 6px;
          cursor: pointer;
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
        border-right: 1px solid #cecece;
        background-color: white;
        height: 100%;
        padding: 1rem 0;
        ul {
          margin: 0;
          padding: 0;
          list-style: none;
          li {
            border-bottom: 1px solid #cecece;
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
          border-top: 1px solid #cecece;
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
      #contact-search {
        font-size: 0.875rem;
        width: 82%;
        padding: 3px;
        margin: 10px auto;
        display: block;
        border-radius: 2px;
        border: 1px solid rgb(0 0 0 / 0.1);
        box-shadow: 0px 0.5px 1px 0px rgba(0, 0, 0, 0.28);
        &::placeholder {
          /* Chrome, Firefox, Opera, Safari 10.1+ */
          color: #cecece;
          opacity: 1; /* Firefox */
        }

        &:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: #cecece;
        }

        &::-ms-input-placeholder {
          /* Microsoft Edge */
          color: #cecece;
        }
      }
    }
  }
}
</style>
