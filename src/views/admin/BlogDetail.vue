<template>
    <div @click="backPage()" class="ms-3 mt-3 fs-4"><i class="fas fa-chevron-left back-chevron"></i></div>
    <div class="d-flex justify-content-between mt-2 mx-3">
        <div><strong>{{blogDetails.title}}</strong></div>
        <div class="d-flex">
           <base-button v-if="blogDetails.is_verified === 0" title="Verify" :isLoading="isLoading" @baseButton="verifyBlog(blogDetails)"></base-button>
            <button @click="editBlog()" class="btn edit">Edit</button>
        </div>
    </div>
    <div class="detail mx-3 mt-3">
      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img :src="blogDetails.images?.[0]?.path" class="d-block w-100 img-fluid" alt="role model image">
    </div>
    <div v-for="(image,index) in slicedImages" :key="index" class="carousel-item">
      <img :src="image.path" class="d-block w-100 img-fluid" alt="blog image">
    </div>
  </div>
</div>
    </div>
    <div class="position-relative text-center p-2">
        <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button v-for="(image,index) in slicedImages" :key="index" type="button" data-bs-target="#carouselExampleIndicators" :data-bs-slide-to="index+1" :aria-label="'Slide'+ index+2"></button>
  </div>
    </div>
    <div class="description m-3" v-html="blogDetails.content"></div>
    <div class="horizontal position-relative">
      <hr>
      <div class="w-100 reviews d-flex p-3">
    <div class="me-5"><i class="fas fa-eye icon"></i> {{blogDetails.view}}</div>
    <div class="me-5"><i class="fas fa-thumbs-up icon"></i> {{blogDetails.like}}</div>
    <div class="me-5"><i class="fas fa-comment-alt icon"></i> {{blogDetails.comment}}</div>
    <div class="me-5"><i class="fas fa-share icon"></i> {{blogDetails.share}}</div>
    <div class="writer">Content written by {{blogDetails.written_by?.first_name+' '+blogDetails.written_by?.last_name}}</div>
  </div>
    </div>
    
     <delete-modal id="deleteModal" :isSuccess="isSuccess" :isOKRequired="false">
       <template #modalBody>
         <div>{{modalTitle}} </div>
       </template>
     </delete-modal>
</template>
<script>
import {Modal} from 'bootstrap'
import apiClient from '../../components/baseurl/index.js'
export default {
  props:['blogId'],
  data(){
    return{
        blogDetails:{},
        slicedImages:[],
        isLoading:false,
        modalTitle:'',
        isSuccess:false,
        deleteModal:null
    }
  },
  created() {
    this.fetchBlogDetails()
  },
    mounted() {
    this.deleteModal = new Modal(document.getElementById('deleteModal'))
  },
  methods: {
    backPage(){
      this.$router.back()
    },
      async fetchBlogDetails(){
         this.$store.commit('setIsItemLoading',true)
         try{
        var response = await apiClient.get('api/blogs/'+this.blogId)
        if(response.status === 200){
            this.blogDetails = response.data
            this.slicedImages = this.blogDetails.images.slice(1)
            console.log('response ===',response.data)
        }
         }
         finally{
            this.$store.commit('setIsItemLoading',false)
         }
        },
        async verifyBlog(blogDetails){
             this.isLoading = true
          try{
            var response = await apiClient.post('api/blog_verify/'+this.blogId)
        if(response.status === 200){
            blogDetails.is_verified = 1             
             this.modalTitle = 'Verified Successfully',
             this.isSuccess = true
             this.deleteModal.show()
        }
          }
          catch(e){
             this.modalTitle = 'Faild to Verify',
             this.isSuccess = false
             this.deleteModal.show()
          }
          finally{
            this.isLoading =false
          }
        },
        editBlog(){
           this.$router.push({name:'EditBlog',params:{entity:'Blog',blogId:this.blogId}})
        }
  },
}
</script>
<style scoped>
.back-chevron:hover{
    cursor: pointer;
    color: #eb9713;
}
.edit{
  width: 6rem;
    background-color: #eb6213;
    color: #fff;
}
.edit:hover{
   background-color: #f81b0b;
    color: #fff;
} 
.carousel-indicators{
  position: absolute;
  color: #eb9713!important;
  top: 0;
  z-index: 100;
}
.carousel-item img{
    max-height: 65vh;
}
.icon{
  color: #eb9713;
}
</style>