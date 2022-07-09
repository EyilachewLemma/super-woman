<template>
  <div @click="$router.back()" class="ms-3 mt-3 fs-4">
    <i class="fas fa-chevron-left back-chevron"></i>
  </div>
  <div class="d-flex justify-content-between mt-3 mx-3">
    <div class="ms-3">Translate {{ entity }}</div>
     <div >
        <!-- language selection  -->
     <language-selector></language-selector>
    </div>
  </div>
  <base-card class="mb-4">
    <div class="formContainer">
      <div class="mb-3" :class="{warning:v$.title.$error}">
        <label for="title">{{ entity }} Title</label>
        <input type="text" class="form-control" id="title" v-model="title" />
        <span class="error-msg mt-1">{{ v$.title.$errors[0]?.$message}}</span>
      </div>
      <div :class="{warning:v$.intro.$error}">
        <label for="shortDescription mb-2">Short Description</label>
        <div class="form-floating">
  <textarea class="form-control" style="height:auto" placeholder="Leave a comment here" id="shortDescription" v-model="intro"></textarea>

</div>
<span class="error-msg mt-1">{{ v$.intro.$errors[0]?.$message}}</span>
      </div>
      <div class="ckeditor mt-3 mb-3" :class="{warning:v$.intro.$error}">
        <file-editor
          :content="content"
          @editorContent="sendToParent($event)"
        ></file-editor>
        <span class="error-msg mt-1">{{ v$.content.$errors[0]?.$message}}</span>
      </div>

      <div class="d-flex justify-content-end mb-5">
        <base-button
          title="Save"
          :isLoading="isLoading"
          @baseButton="saveTranslation()"
        ></base-button>
      </div>
    </div>
  </base-card>
  <delete-modal
    id="deleteModal"
    :isSuccess="isSucceessfull"
    :isOKRequired="false"
    :modalHeader="modalHeader"
  >
    <template #modalBody>
      <div>{{ modalTitle }}</div>
    </template>
  </delete-modal>
</template>
<script>
import FileEditor from "../../components/FileEditor.vue";
// import fileApiClient from "../../components/baseurl/multipart.js";
import apiClient from "../../components/baseurl/index.js";
import { Modal } from "bootstrap";
import useValidate from '@vuelidate/core'
import { required,helpers, maxLength} from '@vuelidate/validators'
export default {
  components: {
    FileEditor,
    // ImagePreview,
  },
  props: ["roleModelId", "blogId"],
  data() {
    return {
      v$:useValidate(),
      entity:'',
      title: "",
      content: "",
      intro:'',
      isLoading: false,
      isSucceessfull: false,
      modalTitle: "",
      modalHeader:'',
    };
  },
    validations(){
        return{
            title:{required:helpers.withMessage('title can not be empty',required)},
            content:{required:helpers.withMessage('blog detail can not be empty',required)},
             intro:{required:helpers.withMessage('write short introduction about the blog',required),
             max:helpers.withMessage('introduction should be described with lessthan 250 characters',maxLength(250))
             },
        }
    },
  created() {
    this.entity = this.$route.query.entity
    if (this.entity === "Blog") {
      this.fetchBlogData();
    } else {
      this.fetchRoleModelData();
    }
  },
  mounted() {
    this.deletemodal = new Modal(document.getElementById("deleteModal"));
  },
  computed: {
    fieldAreas() {
      return this.$store.getters["admin/fields"];
    },
    lang(){
      return this.$store.getters["admin/lang"];
    }
  },
  watch:{
    lang(){
      if (this.entity === "Blog") {
      this.fetchBlogData();
    } else {
      this.fetchRoleModelData();
    }
    }
  },
  methods: {
    sendToParent(data) {
      this.content = data;
    },
    imageSelected(images) {
      this.selectedImages = images;
    },
    async fetchRoleModelData() {
      try{
      this.$store.commit('setIsItemLoading',true)
      var response = await apiClient.get(`api/role_models/${this.roleModelId}?lang=${this.lang}`);
      if (response.status === 200) {
        this.content = response.data.content;
        this.title = response.data.title;
        this.intro = response.data.intro;
      }
      
    }
    finally{
      this.$store.commit('setIsItemLoading',false)
    }
    },
    async fetchBlogData() {
      try{
        this.$store.commit('setIsItemLoading',true)
      var response = await apiClient.get(`api/blogs/${this.blogId}?lang=${this.lang}`);
      if (response.status === 200) {
        this.title = response.data.blog_title;
        this.content = response.data.blog_content;
        this.intro = response.data.blog_intro;
      }
      console.log("content data to be edited", this.content);
      }
      finally{
        this.$store.commit('setIsItemLoading',false)
      }
    },

    async saveTranslation() {
      this.v$.$validate()
      if(!this.v$.$error){
      try {
        var response;
        if (this.entity === "Blog") {
      this.isLoading = true;
       var translatedBlogContent = {};
        translatedBlogContent.blog_title = this.title;
        translatedBlogContent.blog_content = this.content;
        translatedBlogContent.blog_intro = this.intro;
        translatedBlogContent.lang = this.lang;    
          response = await apiClient.put(`api/blog_translations/${this.blogId}?lang=${this.lang}`,translatedBlogContent);
        } else if(this.entity === "Role Model") {
            this.isLoading = true;
            var translatedContent = {};
      translatedContent.title = this.title;
      translatedContent.content = this.content;
      translatedContent.intro = this.intro;
      translatedContent.lang = this.lang;     
          response = await apiClient.put(`api/role_model_translations/${this.roleModelId}`,translatedContent);
          }
        if (response.status === 200) {
          this.isSucceessfull = true;
          this.modalTitle = `You Have Translated Successfully`;
          this.modalHeader = 'Successful'
          this.deletemodal.show();
        }
      } catch (e) {
        this.isSucceessfull = false;
        this.modalTitle = "Faild To Translate!, Try Again";
        this.modalHeader = 'Faild'
        this.deletemodal.show();
      } finally {
        this.isLoading = false;
      }
      }
    },
  },
};
</script>
<style scoped>
.back-chevron:hover {
  cursor: pointer;
  color: #eb9713;
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
.ckeditor {
  max-width: 100%;
}
@media (max-width: 992px) {
  .ckeditor {
    width: 75vw;
  }
}
</style>
