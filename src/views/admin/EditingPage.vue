<template>
  <div @click="$router.back()" class="ms-3 mt-3 fs-4">
    <i class="fas fa-chevron-left back-chevron"></i>
  </div>
  <div class="d-flex justify-content-between mt-3 mx-3">
    <div class="ms-3">Edit {{ entity }}</div>
     <div >
      <!-- <div>Select Language</div> -->
     <language-selector></language-selector>
    </div>

    <!-- <button @click="sendPost()" class="savebtn btn py-1 me-3">Save</button> -->
  </div>
  <base-card>
    <div class="formContainer">
      <div class="mb-3" :class="{warning:v$.title.$error}">
        <label for="title">{{ entity }} Title</label>
        <input type="text" class="form-control" id="title" v-model="title" />
        <span class="error-msg mt-1">{{ v$.title.$errors[0]?.$message}}</span>
      </div>
      <div class="mb-3" :class="{warning:v$.tags.$error}">
        <label for="tags"
          >Please Enter {{ entity }} Tags separet by comma</label
        >
        <input type="text" class="form-control" id="tags" v-model="tags" />
        <span class="error-msg mt-1">{{ v$.tags.$errors[0]?.$message}}</span>
      </div>
      <div class="mb-3" :class="{warning:v$.fields.$error}">
        <label for="interestedin">Select fields</label>
        <select
          class="form-select"
          size="3"
          multiple
          v-model="fields"
          id="interestedin"
        >
          <option v-for="field in fieldAreas" :key="field.id" :value="field.id">
            {{ field.title }}
          </option>
        </select>
        <span class="error-msg mt-1">{{ v$.fields.$errors[0]?.$message}}</span>
      </div>
      <div class="mb-3" :class="{warning:v$.timeToRead.$error}">
        <label for="timeToRead">Time it takes to Read</label>
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
      <div class="ckeditor mt-3 mb-3" :class="{warning:v$.intro.$error}">
        <file-editor
          :content="content"
          @editorContent="sendToParent($event)"
        ></file-editor>
        <span class="error-msg mt-1">{{ v$.content.$errors[0]?.$message}}</span>
      </div>

      <div class="d-flex justify-content-end">
        <base-button
          title="Edit"
          :isLoading="isLoading"
          @baseButton="editContent()"
        ></base-button>
      </div>
    </div>
  </base-card>
  <!-- image display -->
  <base-card v-if="imageFiles?.length">
    <div class="row">
      <div
        v-for="(image, index) in imageFiles"
        :key="image.id"
        class="col-sm-6 col-md-4 col-lg-3 mt-3 imageWraper position-relative"
      >
        <img :src="image.path" class="img-fluid" alt="" />
        <button
          type="button"
          class="removebtn fs-4 px-1"
          @click="removeImage(index, image.id)"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </base-card>
  <base-card>
    <div class="formContainer">
      <image-preview
        :title="entity"
        @selectedImages="imageSelected($event)"
      ></image-preview>
      <div class="d-flex justify-content-end">
        <base-button
          v-if="selectedImages?.length"
          title="Upload"
          :isLoading="isLoading"
          @baseButton="uploadImage()"
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
import ImagePreview from "../../components/ImagePreview.vue";
import fileApiClient from "../../components/baseurl/multipart.js";
import apiClient from "../../components/baseurl/index.js";
import { Modal } from "bootstrap";
import useValidate from '@vuelidate/core'
import { required,helpers, maxLength} from '@vuelidate/validators'
export default {
  components: {
    FileEditor,
    ImagePreview,
  },
  props: ["entity", "roleModelId", "blogId"],
  data() {
    return {
      v$:useValidate(),
      title: "",
      tags: "",
      content: "",
      fields: [],
      timeToRead: "",
      intro:'',
      selectedImages: [],
      isLoading: false,
      imageFiles: [],
      isSucceessfull: false,
      modalTitle: "",
      modalHeader:'',
    };
  },
    validations(){
        return{
            title:{required:helpers.withMessage('title can not be empty',required)},
            tags:{required:helpers.withMessage('blog title can not be empty',required)},
            content:{required:helpers.withMessage('blog detail can not be empty',required)},
             timeToRead:{required:helpers.withMessage('time take  can not be empty',required)},
            fields:{required:helpers.withMessage('please select fields',required)},
             intro:{required:helpers.withMessage('write short introduction about the blog',required),
             max:helpers.withMessage('introduction should be described with lessthan 250 characters',maxLength(250))
             },
        }
    },
  created() {
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
        this.imageFiles = response.data.images;
        this.content = response.data.content;
        this.title = response.data.title;
        this.timeToRead = response.data.time_take_to_read;
        this.intro = response.data.intro;
        var tagList = [];
        response.data.tags.forEach((tag) => {
          tagList.push(tag.title);
        });
        this.tags = tagList.join();
      }
      response.data.fields.forEach((field) => {
        this.fields.push(field.id);
      });
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
        this.imageFiles = response.data.images;
        this.title = response.data.title;
        // this.tags = response.data.tags.join();
        this.timeToRead = response.data.time_take_to_read;
        this.content = response.data.content;
        this.intro = response.data.intro;
        var tagList = [];
        response.data.tags.forEach((tag) => {
          tagList.push(tag.title);
        });
        this.tags = tagList.join();
        response.data.fields.forEach((field) => {
          this.fields.push(field.id);
        });
      }
      console.log("content data to be edited", this.content);
      }
      finally{
        this.$store.commit('setIsItemLoading',false)
      }
    },

    async editContent() {
      this.v$.$validate()
      if(!this.v$.$error){
      this.isLoading = true;
      var detailContents = {};
      detailContents.title = this.title;
      detailContents.tags = this.tags.split(",");
      detailContents.fields = this.fields;
      detailContents.time_take_to_read = this.timeToRead;
      detailContents.content = this.content;
      detailContents.intro = this.intro;

      try {
        var response;
        if (this.entity === "Blog") {
          response = await fileApiClient.put(
            "api/blogs/" + this.blogId,
            detailContents
          );
        } else {
          response = await fileApiClient.put(`api/role_models/${this.roleModelId}?lang=${this.lang}`,
            detailContents
          );
        }
        if (response.status === 200) {
          this.isSucceessfull = true;
          this.modalTitle = `You Have Edited Successfully`;
          this.modalHeader = 'Successful'
          this.deletemodal.show();
        }
      } catch (e) {
        this.isSucceessfull = false;
        this.modalTitle = "Faild To Edit!, Try Again";
        this.modalHeader = 'Faild'
        this.deletemodal.show();
      } finally {
        this.isLoading = false;
      }
      }
    },
    async uploadImage() {
      this.isLoading = true;
      var formData = new FormData();
      this.selectedImages.forEach((image, i) => {
        formData.append(`images[${i}]`, image);
      });
      try {
        var response;
        if (this.entity === "Blog") {
          response = await fileApiClient.post(
            "api/update_blog_images/" + this.blogId,
            formData
          );
        } else {
          response = await fileApiClient.post(
            "api/update_images/" + this.roleModelId,
            formData
          );
        }
        if (response.status === 200) {
          this.isSucceessfull = true;
          this.modalTitle = `You have Upload Image Successfully`;
          this.modalHeader = 'Successful '
          this.deletemodal.show();
          response.data.forEach((image) => {
            this.imageFiles.push(image);
          });
          this.selectedImages = [];
        }
      } catch (e) {
        this.isSucceessfull = false;
        this.modalTitle = `Faild to Upload Images`;
        this.modalHeader = 'Faild'
        this.deletemodal.show();
      } finally {
        this.isLoading = false;
      }
    },
    async removeImage(endex, imgId) {
      var response;
      if (this.entity === "Blog") {
        response = await apiClient.delete("api/delete_blog_image/" + imgId);
      } else {
        response = await apiClient.delete("api/delete_image/" + imgId);
      }

      if (response.status === 200) {
        this.imageFiles.splice(endex, 1);
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
.imageWraper {
  min-height: 28vh;
  max-height: 28vh;
  overflow: hidden;
}
.imageWraper img {
  width: 100%;
  min-height: 100%;
  transition: all 1s;
}
.removebtn {
  position: absolute;
  top: 2%;
  right: 3%;
  background-color: rgb(247, 234, 88);
  border: 2px solid rgb(68, 67, 67);
  border-radius: 50%;
  display: none;
}
.removebtn:hover {
  color: #e7453a;
}
.imageWraper img:hover {
  transform: scale(1.3);
}
.imageWraper:hover .removebtn {
  display: block;
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
