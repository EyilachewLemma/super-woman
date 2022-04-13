<template>
 <div @click="$router.back()" class="ms-3 mt-3 fs-4"><i class="fas fa-chevron-left back-chevron"></i></div>
<div class="d-flex justify-content-between mt-3">
  <div class="ms-3"><strong>Post Blog</strong></div>
  <button class="savebtn btn py-1 me-3">Save</button>
</div>
<base-card>
<div class="formContainer">
<div class="mt-3" :class="{warning:v$.blogTitle.$error}">
    <label for="title">Blog Title</label>
    <input type="text" class="form-control" id="title" v-model="blogTitle">
    <span class="error-msg mt-1">{{ v$.blogTitle.$errors[0]?.$message}}</span>
  </div>
  <div class="mt-2" :class="{warning:v$.blogTags.$error}">
    <label for="tags">Blog Tags</label>
    <input type="text" class="form-control" id="tags" v-model="blogTags">
    <span class="error-msg mt-1">{{ v$.blogTags.$errors[0]?.$message}}</span>
  </div>
   <div class="mt-2" :class="{warning:v$.timeToRead.$error}">
    <label for="timetakestoread">Time Take to Read</label>
    <input type="text" class="form-control" id="timetakestoread" v-model="timeToRead">
    <span class="error-msg mt-1">{{ v$.timeToRead.$errors[0]?.$message}}</span>
  </div>
   <div class="mt-2" :class="{warning:v$.postedDate.$error}">
    <label for="posteddate">Posted Date</label>
    <input type="text" class="form-control" id="posteddate" v-model="postedDate">
    <span class="error-msg mt-1">{{ v$.postedDate.$errors[0]?.$message}}</span>
  </div>
  <!-- ckeditor -->
<div class="ckeditor mt-2 pt-2" :class="{warning:v$.BlogDetail.$error}">
  <file-editor @editorContent="sendToParent($event)"></file-editor>
   <span class="error-msg mt-1">{{ v$.BlogDetail.$errors[0]?.$message}}</span>
</div>
<!-- image preview -->
 <image-preview title="Blog's Images" @selected-images="imageSelected($event)"></image-preview>
 
 </div>
</base-card>

</template>
<script>
import useValidate from '@vuelidate/core'
import { required,helpers} from '@vuelidate/validators'
import FileEditor from '../../components/FileEditor'
import ImagePreview from '../../components/ImagePreview'
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
            BlogDetail:'',
            selectedImages: [],
            postedDate:'',
            timeToRead:''
                                    
        }
    },
    validations(){
        return{
            blogTitle:{required:helpers.withMessage('title can not be empty',required)},
            blogTags:{required:helpers.withMessage('blog title can not be empty',required)},
            BlogDetail:{required:helpers.withMessage('blog detail can not be empty',required)},
             timeToRead:{required:helpers.withMessage('time take  can not be empty',required)},
              postedDate:{required:helpers.withMessage('posted date can not be empty',required)},
        }
    },
    methods: {
        savePost(){
            this.v$.$validate()
               const blogTags = this.tags.split(',')
            var formData = new FormData()
            this.selectedImages.forEach((image,i) =>{
                formData.append(`blog_images[${i}]`,image)
            })
             blogTags.forEach((tag,i) =>{
                formData.append(`blog_tags[${i}]`,tag)
            })
            formData.append('role_model-title',this.blogTitle)
            formData.append('time_take',this.timeToRead)
            formData.append('posted_date',this.postedDate)
            formData.append('blog_detail',this.blogDetail)
            for (var key of formData.entries()) {
        console.log('key = ',key);
    }
        },
         sendToParent(data){
            this.BlogDetail = data
            console.log('content -----',data)
        },
        imageSelected(images){
          this.selectedImages = images
        }
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
</style>