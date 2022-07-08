<template>
  <div class="border rounded shadow-sm m-3 bg-white pb-1">
    <div class="d-flex px-3 pt-4 justify-content-end">      
        <button @click="addNewLanguage()" class="btn addLanguageBtn px-5">Add new Language</button>
    </div>
    <table class="listofusers mt-4">
      <thead class="headers">
        <tr class="table-header">
          <th class="text-white p-2">NO</th>
          <th class="text-white p-2">Language Name</th>
          <th class="text-white p-2">Language Code</th>
          <th class="text-white p-2 sr-only">Acton</th>
        
        </tr>
      </thead>
      <tbody>
        <tr v-for="(language, index) in languages" :key="language.id">
          <td class="py-2">{{ index + 1 }}</td>
          <td class="py-2">{{ language.name  }}</td>
          <td class="py-2">{{ language.code }}</td>
          <td>
            <button @click="editLanguage(language.id)" class="border-none background-none">edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <base-modal
    id="baseModal"
    :buttonType="buttonTitle"
    :isLoading="isLoading"
    @save="addLanguage()"
    @edit="saveEditedLanguage()"
  >
    <template #modalBody>
      <div class="mb-3" :class="{ warning: v$.newLanguage.name.$error }">
        <label for="fname" class="form-label">Language Name</label>
        <input
          type="text"
          class="form-control"
          id="fname"
          v-model="newLanguage.name"
        />
        <span class="error-msg mt-1">{{
          v$.newLanguage.name.$errors[0]?.$message
        }}</span>
      </div>
      <div class="mb-3" :class="{ warning: v$.newLanguage.code.$error }">
        <label for="lname" class="form-label">Language Code</label>
        <input
          type="text"
          class="form-control"
          id="lname"
          v-model="newLanguage.code"
        />
        <span class="error-msg mt-1">{{
          v$.newLanguage.code.$errors[0]?.$message
        }}</span>
      </div>
     
    </template>
  </base-modal>
 
</template>
<script>
import useValidate from "@vuelidate/core";
import {
  required,
  helpers,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import apiClient from "../../components/baseurl/index.js";
import DeleteDialog from "../../components/DeleteDialog.vue";
import { Modal } from "bootstrap";
export default {
  component: {
    DeleteDialog,
  },
  data() {
    return {
      v$: useValidate(),
      basemodal: null,
      isLoading: false,
      buttonTitle: "",
      newLanguage: {
      },
    };
  },
  validations() {
    return {
      newLanguage: {
        name: {
          required: helpers.withMessage(
            "language name can not be empty",
            required
          ),
        },
        code: {
          required: helpers.withMessage("language code can not be empty", required),
          min:helpers.withMessage("at least language code must be two letters",minLength(2)),
          max:helpers.withMessage("language code must be a maximum of three letters",maxLength(3))
        },
      },
    };
  },
  mounted() {
    this.basemodal = new Modal(document.getElementById("baseModal"));
  },
  
  computed: {
    languages() {
      return this.$store.getters["admin/languages"];
    },
  },
  methods: {
    addNewLanguage() {
      this.newLanguage = {};
      this.buttonTitle = "add";
      this.basemodal.show();
      this.v$.$reset();
    },
    async addLanguage() {
      this.v$.$validate();
      this.isLoading = true;
      try {
        if (!this.v$.$error) {
          var response = await apiClient.post("api/languages", this.newLanguage);
          if (response.status === 201) {
            var previousLanguages = this.languages;
            previousLanguages.push(response.data);
            this.$store.commit("admin/setLanguages", previousLanguages);
            this.basemodal.hide();
            this.newLanguage = {};
            this.v$.$reset();
          }
        }
      } finally {
        this.isLoading = false;
      }
    },
    cancelDialog() {
      this.newLanguage = {};
      this.v$.$reset();
    },
    editLanguage(id) {
      this.buttonTitle = "edit";
      var languageToBeEdite = {};
      this.languages.forEach((language) => {
        if (Number(language.id) === Number(id)) {
          languageToBeEdite = language;
          return;
        }
      });
      this.newLanguage.name = languageToBeEdite.name;
      this.newLanguage.code = languageToBeEdite.code;
      this.newLanguage.id = id;
      this.basemodal.show();
      // this.isAddLanguage = true
    },
    async saveEditedLanguage() {
      this.isLoading = true;
      try {
        if (!this.v$.$error) {
          var response = await apiClient.put(
            "api/languages/" + this.newLanguage.id,
            this.newLanguage
          );
          if (response.status === 200) {
            var previousLanguages = this.languages;
            var index = previousLanguages.findIndex((language) => {
              return language.id === this.newLanguage.id;
            });
            previousLanguages[index] = response.data;
            this.$store.commit("admin/setLanguages", previousLanguages);
            this.newLanguage = {};
            this.v$.$reset();
            this.basemodal.hide();
          }
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
<style scoped>
.addLanguageBtn {
  background-color: #eb9713;
  color: #fff;
}
.addLanguageBtn:hover {
  background-color: #f81b0b;
  color: #fff;
}

.searchicon {
  cursor: pointer;
}
.search {
  width: 35%;
  padding: 0;
  background-color: #fff;
}
.search input {
  border-right: none;
}
.search input:focus {
  box-shadow: none;
  border-color: #d5d6d9;
  z-index: 0;
}
.search span {
  background-color: #fff;
  border-left: none;
}
.search span:hover {
  color: rgb(128, 128, 236);
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
.headers {
  background-color: #e7453a;
  border-radius: 5px;
}
th {
  text-align: left;
  padding-bottom: 8px;
  padding-top: 4px;
}
td {
  border: 1px solid #dddddd;
  text-align: left;
  vertical-align: top;
}
.dropdown ul {
  background-color: #ecf1fe;
}
li span:hover {
  background-color: #366ad9;
  color: #fff;
  cursor: pointer;
}
.listofusers th {
  color: #fff !important;
  font-size: 14px;
}
.listofusers tr {
  border-top: 2px solid rgb(231, 228, 228);
  border-bottom: none;
}
.listofusers td {
  padding-left: 15px;
  border-left: none;
  border-right: none;
  border-bottom: none;
}
.icons {
  cursor: pointer;
}
.icons:hover {
  color: #eb9713;
}
a {
  text-decoration: none;
}
.dropdown ul {
  background-color: #ecf1fe;
}
.ellipsisIcon:hover {
  color: #eb9713;
}
li span:hover {
  background-color: #366ad9;
  color: #fff;
  cursor: pointer;
}
/* for dialog */
.editwraper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh !important;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  overflow-y: hidden;
}
.writerForm {
  width: 50%;
  position: absolute;
  top: 7%;
  left: 30%;
}
.activeWriter {
  color: green;
}
.blockedWriter {
  color: red;
}
.commnBtn {
  width: 7rem;
}
.commnBtn:hover {
  background-color: #f81b0b;
  color: #fff;
}
.save {
  background-color: #eb9713;
  color: #fff;
}
.cancel {
  border: 1px solid rgb(151, 151, 152);
}
.warning input {
  border: 1px red solid;
}
.warning span {
  display: inline;
  color: red;
}
</style>
