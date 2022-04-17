<template>
    <div @click="backPage()" class="ms-3 mt-3 fs-4"><i class="fas fa-chevron-left back-chevron"></i></div>
    <div class="d-flex justify-content-between mt-2 mx-3">
        <div><strong>{{roleModelDetails.title}}</strong></div>
        <div class="d-flex">
          <base-button v-if="roleModelDetails.is_verified === 0" title="Verify" :isLoading="isLoading" @baseButton="verifyRoleModel(roleModelDetails)"></base-button>
            <!-- <button  @click="verifyRoleModel(roleModelDetails)" class="btn confirmbtn verify me-3">Verify</button> -->
            <button @click="editRoleModel()" class="btn edit">Edit</button>
        </div>
    </div>
    <div class="detail mx-3 mt-3">
      <div id="roleModelDetailImage" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img :src="roleModelDetails.images?.[0]?.path" class="d-block w-100 img-fluid" alt="role model image">
    </div>
    <div v-for="(image,index) in slicedImages" :key="index" class="carousel-item">
      <img :src="image.path" class="d-block w-100 img-fluid" alt="role model image">
    </div>
      </div>
  <!-- <button class="carousel-control-prev" type="button" data-bs-target="#roleModelDetailImage" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#roleModelDetailImage" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button> -->
</div>
    </div>
    <div class="indicator position-relative text-center p-2">
      <div class="carousel-indicators">
    <button type="button" data-bs-target="#roleModelDetailImage" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button v-for="(image,index) in slicedImages" :key="index" type="button" data-bs-target="#roleModelDetailImage" :data-bs-slide-to="index+1" :aria-label="'Slide'+ index+2"></button>
    <!-- <button type="button" data-bs-target="#roleModelDetailImage" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#roleModelDetailImage" data-bs-slide-to="3" aria-label="Slide 4"></button> -->
  </div>
    </div>
    <div class="description m-3" id="content" v-html="roleModelDetails.content"></div>
    <div class="horizontal position-relative">
      <hr>
      <div class="w-100 reviews d-flex p-3">
    <div class="me-5"><i class="fas fa-eye icon"></i> {{roleModelDetails.view}}</div>
    <div class="me-5"><i class="fas fa-thumbs-up icon"></i> {{roleModelDetails.like}}</div>
    <div class="me-5"><i class="fas fa-comment-alt icon"></i> {{roleModelDetails.comment}}</div>
    <div class="me-5"><i class="fas fa-share icon"></i> {{roleModelDetails.share}}</div>
    <div class="writer">Content written by {{roleModelDetails.written_by.first_name+' '+roleModelDetails.written_by.last_name }}</div>
  </div>
    </div>
    <delete-modal id="deleteModal" :title="modalTitle" :isSuccess="state" :isOKRequired="false">

    </delete-modal>
</template>
<script>
import apiClient from '../../components/baseurl/index.js'
import {Modal} from 'bootstrap'
export default {
  props:['roleModelId'],
  data(){
    return{
      roleModelDetails:{},
      slicedImages:[],
      isLoading:false,
      deleteModal:null,
      modalTitle:'',
      state:null
    }
  },
  created() {
    this.fetchRoleModelDetails()
  },
  mounted() {
    this.deleteModal = new Modal(document.getElementById('deleteModal'))
  },
  methods: {
    backPage(){
      this.$router.back()
    },
     async fetchRoleModelDetails(){
        this.$store.commit('setIsItemLoading',true)
        try{
        var response = await apiClient.get('api/role_models/'+this.roleModelId)
        if(response.status === 200){
            this.roleModelDetails = response.data
            this.slicedImages = this.roleModelDetails.images.slice(1)
        }
        }
        finally{
           this.$store.commit('setIsItemLoading',false)
        }
        },
        async verifyRoleModel(roleModelDetails){
          this.isLoading = true
          try{
        var response = await apiClient.post('api/rm_verify/'+this.roleModelId)
        if(response.status === 200){
            roleModelDetails.is_verified = 1
            this.modalTitle = 'Verified Successfully'
            this.state = true
           this.deleteModal.show()
            
        }
          }
        catch(e){
           this.modalTitle = 'Faild to Verify'
            this.state = false
           this.deleteModal.show()
        }
        finally{
          this.isLoading = false
        }
        },
        editRoleModel(){
          this.$router.push({name:'EditRoleModel',params:{entity:'Role Model',roleModelId:this.roleModelId}})
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
    background-color: #eb6213;
    color: #fff;
    width: 6rem;
}
.edit:hover{
    background-color: #f81b0b;
    color: #fff;
}
.carousel-indicators{
  position: absolute;
  background-color: #eb9713!important;
  top: 0;
  z-index: 1000;
}
.carousel-item img{
    max-height: 65vh;
}
.icon{
  color: #eb9713;
}
</style>