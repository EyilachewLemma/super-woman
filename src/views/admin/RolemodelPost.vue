<template>
  <div @click="$router.back()" class="ms-3 mt-3 fs-4">
    <i class="fas fa-chevron-left back-chevron"></i>
  </div>
  <div class="d-flex justify-content-between align-items-center mx-3 mt-3">
    <div class="ms-3">Post Role Model</div>
   <div class="ms-auto">
     <base-button
      title="Save"
      :isLoading="isLoading"
      @baseButton="savePost()"
    ></base-button>
   </div>
    <!-- <div>
      <language-selector></language-selector>
    </div> -->
      </div>
  <base-card>
    <div class="formContainer">
      <div class="mb-3" :class="{warning:v$.title.$error}">
        <label for="title">Role model title</label>
        <input type="text" class="form-control" id="title" v-model="title" />
        <span class="error-msg mt-1">{{ v$.title.$errors[0]?.$message}}</span>
      </div>
      <div class="mb-3" :class="{warning:v$.tags.$error}">
        <label for="tags">Please enter role model tags separet by comma</label>
        <input type="text" class="form-control" id="tags" v-model="tags" />
         <span class="error-msg mt-1">{{ v$.tags.$errors[0]?.$message}}</span>
      </div>
      <div class="mb-3" :class="{warning:v$.interests.$error}">
        <label for="interestedin">Select role model's fields</label>
        <select
          class="form-select"
          size="3"
          multiple
          v-model="interests"
          id="interestedin"
        >
          <option v-for="field in fields" :key="field.id" :value="field.id">
            {{ field.title }}
          </option>
        </select>
         <span class="error-msg mt-1">{{ v$.interests.$errors[0]?.$message}}</span>
      </div>
      <div class="mb-3" :class="{warning:v$.timeToRead.$error}">
        <label for="timeToRead">Time it takes to read in minute</label>
        <input
          type="number"
          class="form-control"
          id="timeToRead"
          v-model="timeToRead"
        />
         <span class="error-msg mt-1">{{ v$.timeToRead.$errors[0]?.$message}}</span>
      </div>
      <!-- short description -->
      <div :class="{warning:v$.intro.$error}">
        <label for="shortDescription mb-2">Short Description</label>
        <div class="form-floating">
  <textarea class="form-control" placeholder="Leave a comment here" id="shortDescription" v-model="intro"></textarea>
</div>
 <span class="error-msg mt-1">{{ v$.intro.$errors[0]?.$message}}</span>
      </div>
    </div>
  </base-card>
  <base-card>
    <div class="formContainer">
      <div class="ckeditor mt-2 mb-3" :class="{warning:v$.roleModelDetail.$error}">
        <file-editor
          content="Clic here to write the content"
          @editorContent="sendToParent($event)"
        ></file-editor>
         <span class="error-msg mt-1">{{ v$.roleModelDetail.$errors[0]?.$message}}</span>
      </div>
      <image-preview
        title="Role Model"
        @selectedImages="imageSelected($event)"
      ></image-preview>
    </div>
  </base-card>
  <delete-modal
    id="deleteModal"
    :isSuccess="isSuccessfull"
    :isOKRequired="false"
    :modalHeader="modalHeader"
    @yes="yesDelete()"
  >
    <template #modalBody>
      <div>{{ modalTitle }}</div>
    </template>
  </delete-modal>
</template>
<script>
import FileEditor from "../../components/FileEditor.vue";
import ImagePreview from "../../components/ImagePreview.vue";
import fileApiClient from "../../components/baseurl/multipart.js";
import { Modal } from "bootstrap";
import useValidate from '@vuelidate/core'
import { required,helpers, maxLength} from '@vuelidate/validators'
export default {
  components: {
    FileEditor,
    ImagePreview,
  },
  data() {
    return {
      v$:useValidate(),
      title: "",
      tags: "",
      roleModelDetail: "",
      interests: [],
      timeToRead: "",
      intro:'',
      postedDate: "",
      selectedImages: [],
      isLoading: false,
      isSuccessfull: false,
      modalHeader:'',
      deletemodal: null,
      modalTitle: "",
      selectedLanguage:'en'
    };
  },
      validations(){
        return{
            title:{required:helpers.withMessage('title can not be empty',required)},
            tags:{required:helpers.withMessage('Please enter tags separet by comma',required)},
            roleModelDetail:{required:helpers.withMessage('role model detail can not be empty',required)},
             timeToRead:{required:helpers.withMessage('time take  can not be empty',required)},
            interests:{required:helpers.withMessage('please select fields',required)},
             intro:{required:helpers.withMessage('write short introduction about the role model',required),
             max:helpers.withMessage('introduction should be described with lessthan 250 characters',maxLength(250))
             },
        }
    },
  mounted() {
    this.deletemodal = new Modal(document.getElementById("deleteModal"));
  },
  computed: {
    fields() {
      return this.$store.getters["admin/fields"];
    },
     lang(){
      return this.$store.getters["admin/lang"]
    }
  },
  methods: {
    async savePost() {
      this.v$.$validate()
      if(!this.v$.$error){
      this.isLoading = true;
      const roleModelTags = this.tags.split(",");
      var formData = new FormData();
      this.selectedImages.forEach((image, i) => {
        formData.append(`images[${i}]`, image);
      });
      roleModelTags.forEach((tag, i) => {
        formData.append(`tags[${i}]`, tag);
      });
      this.interests.forEach((interest, i) => {
        formData.append(`interests[${i}]` + i, interest);
      });
      formData.append("title", this.title);
      formData.append("time_take_to_read", this.timeToRead);
      formData.append("content", this.roleModelDetail);
      formData.append("intro",this.intro)
      //         for (var key of formData.entries()) {
      //     console.log('key = ',key);
      // }
      try {
        var response = await fileApiClient.post(`api/role_models?lang=${'en'}`, formData);
        if (response.status === 201) {
          this.isSuccessfull = true;
          this.modalTitle = "You have added one Role Model Successfully";
          this.modalHeader = 'Successful'
          this.deletemodal.show();
        }
      } catch (e) {
        this.isSuccessfull = false;
        this.modalTitle = "Faild to add role model";
        this.modalHeader = 'Faild'
        this.deletemodal.show();
      } finally {
        this.isLoading = false;
      }
      }
    },
    sendToParent(data) {
      this.roleModelDetail = data;
      console.log("content -----", data);
    },
    imageSelected(images) {
      this.selectedImages = images;
      console.log(images);
    },
   
  },
};
</script>
<style scoped>
.back-chevron:hover {
  cursor: pointer;
  color: #eb9713;
}
.savebtn {
  background-color: #e7453a;
  color: #fff;
  width: 6rem;
}
.savebtn:hover {
  background-color: #f81b0b;
  color: #fff;
}
.warning input {
  border: 1px red solid;
}
.warning span {
  display: inline;
  color: red;
}
@media (min-width: 992px) {
  .formContainer {
    width: 80%;
    margin: auto;
  }
}
@media (max-width: 992px) {
  .ckeditor {
    width: 75vw;
  }
}
</style>
