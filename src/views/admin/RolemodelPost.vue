<template>
 <div @click="$router.back()" class="ms-3 mt-3 fs-4"><i class="fas fa-chevron-left back-chevron"></i></div>
  <div class="d-flex justify-content-between mt-3">
  <div class="ms-3">Post Role Model</div>
  <base-button title="Save" :isLoading="false" @baseButton="savePost()"></base-button>
  <!-- <button @click="sendPost()" class="savebtn btn py-1 me-3">Save</button> -->
</div>
<base-card>
<div class="formContainer">
    <div class="mb-3">
    <label for="title">Role Model Title</label>
    <input type="text" class="form-control" id="title" v-model="title">
     </div>
  <div class="mb-3">
    <label for="tags">Please Enter Role Model Tags separet by comma</label>
    <input type="text" class="form-control" id="tags" v-model="tags">
  </div>
   <div class="mb-3">
  <label for="interestedin">Role Model's Interests</label>
  <select class="form-select" size="3" multiple v-model="interests" id="interestedin">
  <option :value="1">Software Engineer</option>
   <option :value="2">Mechanical Engineer</option>
    <option :value="3">Chemical Engineer</option>
</select>
  </div>
  <div class="mb-3">
    <label for="timeToRead">Time it takes to Read</label>
    <input type="text" class="form-control" id="timeToRead" v-model="timeToRead">
  </div>
  <div class="mb-3">
    <label for="postedDate">Posted Date</label>
    <input type="date" class="form-control" id="postedDate" v-model="postedDate">
  </div>
</div>
</base-card>
<base-card>
<div class="formContainer">
  <div class="ckeditor mt-2 mb-3">
  <file-editor @editorContent="sendToParent($event)"></file-editor>
</div>
<image-preview title="Role Model's Image" @selectedImages="imageSelected($event)"></image-preview>

</div>
</base-card>
</template>
<script>
import FileEditor from '../../components/FileEditor.vue'
import ImagePreview from '../../components/ImagePreview.vue'
import fileApiClient from '../../components/baseurl/multipart.js'
export default {
    components:{
      FileEditor,
      ImagePreview
    },
    data() {
        return {
              title:'',
            tags:'',
            roleModelDetail:'',
            interests:[],
            timeToRead:'',
            postedDate:'',
            selectedImages:[]
        }
    },
     methods: {
        async savePost(){
            const roleModelTags = this.tags.split(',')
            var formData = new FormData()
            this.selectedImages.forEach((image,i) =>{
                formData.append(`images[${i}]`,image)
            })
             roleModelTags.forEach((tag,i) =>{
                formData.append(`tags[${i}]`,tag)
            })
             this.interests.forEach((interest,i) =>{
                formData.append(`interests[${i}]`+i,interest)
            })
            formData.append('title',this.title)
            formData.append('time_take_to_read',this.timeToRead)
            // formData.append('posted_date',this.postedDate)
            formData.append('content',this.roleModelDetail)
            for (var key of formData.entries()) {
        console.log('key = ',key);
    }
          try {
            var response = await fileApiClient.post('api/role_models',formData)
            if(response.status === 200){
              console.log('successfuly saved')
            }
          }
          finally{
            console.log('')
          }
        },
        sendToParent(data){
            this.roleModelDetail = data
            console.log('content -----',data)
        },
        imageSelected(images){
          this.selectedImages = images
          console.log(images)
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