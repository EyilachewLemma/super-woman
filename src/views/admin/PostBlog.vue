<template>
 <div @click="$router.back()" class="ms-3 mt-3 fs-4"><i class="fas fa-chevron-left back-chevron"></i></div>
<div class="d-flex justify-content-between mt-3">
  <div class="ms-3"><strong>Post Blog</strong></div>
 <base-button title="Save" :isLoading="isLoading" @baseButton="saveBlogPost()"></base-button>
</div>
<base-card>
<div class="formContainer">
<div class="mt-3" :class="{warning:v$.blogTitle.$error}">
    <label for="title">Blog title</label>
    <input type="text" class="form-control" id="title" v-model="blogTitle">
    <span class="error-msg mt-1">{{ v$.blogTitle.$errors[0]?.$message}}</span>
  </div>
  <div class="mt-2" :class="{warning:v$.blogTags.$error}">
    <label for="tags">Enter blog tags separeted by comma</label>
    <input type="text" class="form-control" id="tags" v-model="blogTags">
    <span class="error-msg mt-1">{{ v$.blogTags.$errors[0]?.$message}}</span>
  </div>
    <div class="mb-3 mt-2" :class="{warning:v$.fields.$error}">
  <label for="interestedin">Select field of blog</label>
  <select class="form-select" size="3" multiple v-model="fields" id="interestedin">
  <option v-for="field in blogfields" :key="field.id" :value="field.id">{{field.title}}</option>
</select>
 <span class="error-msg mt-1">{{ v$.fields.$errors[0]?.$message}}</span>
  </div>
   <div class="mt-2" :class="{warning:v$.timeToRead.$error}">
    <label for="timetakestoread">Time it takes to read in mimute</label>
    <input type="number" class="form-control" id="timetakestoread" v-model="timeToRead">
    <span class="error-msg mt-1">{{ v$.timeToRead.$errors[0]?.$message}}</span>
  </div>
  <!-- ckeditor -->
<div class="ckeditor mt-2 pt-2" :class="{warning:v$.blogDetail.$error}">
  <file-editor content="Click here to write the content" @editorContent="acceptEditorData($event)"></file-editor>
   <span class="error-msg mt-1">{{ v$.blogDetail.$errors[0]?.$message}}</span>
</div>
</div>

</base-card>
<!-- image preview -->
<base-card>
<div class="formContainer">
 <image-preview title="Blog" picture="" @selectedImages="imageSelected($event)"></image-preview>
 
 </div>
</base-card>
<delete-modal id="deleteModal" :isSuccess="isSucceessfull" :isOKRequired="false" :modalHeader="modalHeader">
      <template #modalBody>
         <div>{{modalTitle}} </div>
      </template>
    </delete-modal>
</template>
<script>
import useValidate from '@vuelidate/core'
import { required,helpers} from '@vuelidate/validators'
import FileEditor from '../../components/FileEditor'
import ImagePreview from '../../components/ImagePreview'
import fileApiClient from '../../components/baseurl/multipart.js'
import{Modal} from 'bootstrap'
export default {
 components:{
   FileEditor,
   ImagePreview
 },
    data() {
        return {
            v$:useValidate(),
            blogTitle:'',
            blogTags:'',
            blogDetail:'',
            fields:[],
            selectedImages: [],
            timeToRead:'',
            isLoading:false,
            isSucceessfull:false,
            modalTitle:'',
            modalHeader:''
                                    
        }
    },
    validations(){
        return{
            blogTitle:{required:helpers.withMessage('title can not be empty',required)},
            blogTags:{required:helpers.withMessage('blog title can not be empty',required)},
            blogDetail:{required:helpers.withMessage('blog detail can not be empty',required)},
             timeToRead:{required:helpers.withMessage('time take  can not be empty',required)},
            fields:{required:helpers.withMessage('please select fields',required)},
        }
    },
      mounted() {
     this.deletemodal = new Modal(document.getElementById('deleteModal'))
   },
     computed:{
      blogfields(){
        return this.$store.getters['admin/fields']
      }
    },
    methods: {
        acceptEditorData(data){
            this.blogDetail = data
            console.log('editor content',this.blogDetail)
        },
        imageSelected(images){
          this.selectedImages = images
        },
       async saveBlogPost(){
         this.isLoading = true
            this.v$.$validate()
               const blogTags = this.blogTags.split(',')
            var formData = new FormData()
            this.selectedImages.forEach((image,i) =>{
                formData.append(`images[${i}]`,image)
            })
             blogTags.forEach((tag,i) =>{
                formData.append(`tags[${i}]`,tag)
            })
             this.fields.forEach((field,i) =>{
                formData.append(`interests[${i}]`+i,field)
            })
            formData.append('title',this.blogTitle)
            formData.append('time_take_to_read',this.timeToRead)
            // formData.append('posted_date',this.postedDate)
            formData.append('content',this.blogDetail)
            for (var key of formData.entries()) {
        console.log('key = ',key);
        console.log('blog content ====',this.blogDetail)
    }
       try {
            var response = await fileApiClient.post('api/blogs',formData)
            if(response.status === 201){
               this.isSucceessfull = true
              this.modalTitle = 'You have added one Blog Successfully'
              this.modalHeader = 'Successful'
              this.deletemodal.show()
            }
          }
          catch(e){
             this.isSucceessfull = false
              this.modalTitle = 'Faild to add Blog'
              this.modalHeader = 'Faild'
              this.deletemodal.show()
          }
          finally{
            this.isLoading = false
          }
        },
       
         },
}
</script>
<style scoped>
.back-chevron:hover{
    cursor: pointer;
    color: #eb9713;
}
.savebtn{
    background-color: #e7453a;
    color: #fff;
    width: 6rem;
}
.savebtn:hover{
    background-color: #f81b0b;
    color: #fff;
}
.warning input{
    border: 1px red solid;
  }
  .warning span{
    display: inline;
    color: red;

  }
.wraper input {
  visibility: hidden;
}
.imageContainer {
  height: auto;
  background: transparent;
  border: 2px dashed gray;
  border-radius: 1rem;
}
label {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.btnSelect {
  border: 1px solid gray;
   background-color: #e7453a;
  color: #fff;
}
.btnSelect:hover {
  background-color: #f81b0b;
  color: #fff;
}
.imageContainer:hover {
  border-color: #eb9713;
}
.uploadIcon:hover {
  color: #eb9713;
}
.active {
  background-color: #eb9713;;
  color: #fff;
  border-color: #eb9713;
}
.imagePreview {
  overflow-x: auto;
}
.image-box {
  width: 15%;
  height: 20vh;
  position: relative;
  overflow: hidden;
}
.removebtn {
  position: absolute;
  top: 2%;
  right: 3%;
  border: 2px solid blue;
  border-radius: 50%;
  display: none;
}
.removebtn:hover {
  color: blue;
}

.image-box img {
  width: 100%;
  height: 100%;
  transition: all 1s;
}
.image-box img:hover {
  transform: scale(1.2);
}
.image-box:hover .removebtn {
  display: block;
}
 @media(min-width: 992px) {
      .formContainer{
          width: 80%;
          margin: auto;
      }
  }
  @media(max-width: 992px) {
     .ckeditor{
  width: 75vw;
}
  }
</style>