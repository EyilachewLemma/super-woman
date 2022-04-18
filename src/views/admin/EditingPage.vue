<template>
 <div @click="$router.back()" class="ms-3 mt-3 fs-4"><i class="fas fa-chevron-left back-chevron"></i></div>
  <div class="d-flex justify-content-between mt-3">
  <div class="ms-3">Edit {{entity}}</div>
 
  <!-- <button @click="sendPost()" class="savebtn btn py-1 me-3">Save</button> -->
</div>
<base-card>
<div class="formContainer">
    <div class="mb-3">
    <label for="title">{{entity}} Title</label>
    <input type="text" class="form-control" id="title" v-model="title">
     </div>
  <div class="mb-3">
    <label for="tags">Please Enter {{entity}} Tags separet by comma</label>
    <input type="text" class="form-control" id="tags" v-model="tags">
  </div>
   <div v-if="entity==='Role Model'" class="mb-3">
  <label for="interestedin">Role Model's Interests</label>
  <select class="form-select" size="3" multiple v-model="fields" id="interestedin">
  <option v-for="field in roleModelFields" :key="field.id" :value="field.id">{{field.title}}</option>
</select>
  </div>
  <div class="mb-3">
    <label for="timeToRead">Time it takes to Read</label>
    <input type="number" class="form-control" id="timeToRead" v-model="timeToRead">
  </div>
    <div class="ckeditor mt-3 mb-3">
  <file-editor :content="content" @editorContent="sendToParent($event)"></file-editor>
</div>
 <div class="d-flex justify-content-end">
   <base-button title="Edit" :isLoading="isLoading" @baseButton="editContent()"></base-button>
 </div>
</div>
</base-card>
<!-- image display -->
<base-card v-if="imageFiles?.length">
<div class="row">
  <div v-for="(image,index) in imageFiles" :key="image.id" class="col-sm-6 col-md-4 col-lg-3 mt-3 imageWraper position-relative">
    <img :src="image.path" class="img-fluid" alt="">
     <button type="button" class="removebtn fs-4 px-1" @click="removeImage(index,image.id)"><i class="fas fa-times"></i></button>
  </div>
</div>
</base-card>
<base-card>
<div class="formContainer">

<image-preview :title="entity"  @selectedImages="imageSelected($event)"></image-preview>
 <div class="d-flex justify-content-end">
   <base-button v-if="selectedImages?.length" title="Upload" :isLoading="isLoading" @baseButton="uploadImage()"></base-button>
 </div>

</div>
</base-card>
<delete-modal id="deleteModal" :isSuccess="isSucceessfull" :isOKRequired="false">
      <template #modalBody>
         <div>{{modalTitle}} </div>
      </template>
    </delete-modal>
</template>
<script>
import FileEditor from '../../components/FileEditor.vue'
import ImagePreview from '../../components/ImagePreview.vue'
import fileApiClient from '../../components/baseurl/multipart.js'
import apiClient from '../../components/baseurl/index.js'
import {Modal} from 'bootstrap'
export default {
    components:{
      FileEditor,
      ImagePreview
    },
    props:['entity','roleModelId','blogId'],
    data() {
        return {
            title:'',
            tags:'',
            content:'',
            fields:[],
            timeToRead:'',
            selectedImages:[],
            isLoading:false,
            imageFiles:[],
            isSucceessfull:false,
            modalTitle:''
        }
    },
    created() {
      if(this.entity === 'Blog'){
        this.fetchBlogData()
      }
      else{
        this.fetchRoleModelData()
      }
    },
       mounted() {
     this.deletemodal = new Modal(document.getElementById('deleteModal'))
   },
     computed:{
      roleModelFields(){
        return this.$store.getters['admin/fields']
      }
    },
     methods: {
              sendToParent(data){
            this.content = data
        },
        imageSelected(images){
          this.selectedImages = images
        },
        async fetchRoleModelData(){
       var response = await apiClient.get('api/role_models/'+this.roleModelId)
        if(response.status === 200){
          this.imageFiles = response.data.images
            this.content = response.data.content
           var tagList = []
            var fieldList = []
            response.data.tags.forEach(tag=>{
                 tagList.push(tag.title)
            })
            response.data.fields.forEach(field=>{
                 fieldList.push(field.id)
            })
             this.tags = tagList.toString()
             this.fields = fieldList
            this.title = response.data.title
            this.timeToRead = response.data.time_take_to_read          
        }
        },
        async fetchBlogData(){
        var response = await apiClient.get('api/blogs/'+this.blogId)
        if(response.status === 200){
          this.imageFiles = response.data.images
            var tagList = []
             var fieldList = []
            response.data.tags.forEach(tag=>{
                 tagList.push(tag.title)
            })
             this.tags = tagList.toString()
              response.data.fields.forEach(field=>{
                 fieldList.push(field.id)
            })
            this.title = response.data.title
            // this.tags = response.data.tags.toString()
            this.timeToRead = response.data.time_take_to_read
            this.content = response.data.content
             console.log('content data to be edited',this.content)
          
        }
        },

        async editContent(){
          this.isLoading = true
            const roleModelTags = this.tags.split(',')
            var detailContents = {}
            detailContents.title = this.title
            detailContents.tags = roleModelTags
            detailContents.fields = this.fields
            detailContents.time_take_to_read = this.timeToRead
            detailContents.content = this.content

             try {
            var response
            if(this.entity === 'Blog'){
              response = await fileApiClient.put('api/blogs/'+this.blogId,detailContents)
            }
            else{
              response = await fileApiClient.put('api/role_models/'+this.roleModelId,detailContents)
            }
            if(response.status === 200){
               this.isSucceessfull = true
              this.modalTitle = `You have Edited Successfully`
              this.deletemodal.show()
            }
          }
          catch(e){
              this.isSucceessfull = false
              this.modalTitle = 'Faild to Edit'
              this.deletemodal.show()
          }
          finally{
            this.isLoading = false
          }
        
        
        },
        async uploadImage(){
          this.isLoading = true
           var formData = new FormData()
            this.selectedImages.forEach((image,i) =>{
                formData.append(`images[${i}]`,image)
            })
              try {
            var response
            if(this.entity === 'Blog'){
              response = await fileApiClient.post('api/update_blog_images/'+this.blogId,formData)
            }
            else{
              response = await fileApiClient.post('api/update_images/'+this.roleModelId,formData)
            }
            if(response.status === 200){
                this.isSucceessfull = true
              this.modalTitle = `You have Upload Image Successfully`
              this.deletemodal.show()
              response.data.forEach(image=>{
                this.imageFiles.push(image)
                  })
            }
          }
          catch(e){
             this.isSucceessfull = false
              this.modalTitle = `Faild to Upload Images`
              this.deletemodal.show()
          }
          finally{
            this.isLoading = false
          }
        },
        async removeImage(endex,imgId){        
            var response 
            if(this.entity === 'Blog'){
              response = await apiClient.delete('api/delete_blog_image/'+imgId)
            }
            else{
              response = await apiClient.delete('api/delete_image/'+imgId)
            }
             
            if(response.status === 200){
              this.imageFiles.splice(endex,1)
            }
          

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
  .imageWraper{
    min-height: 28vh;
    max-height: 28vh;
    overflow: hidden;
  }
  .imageWraper img{
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