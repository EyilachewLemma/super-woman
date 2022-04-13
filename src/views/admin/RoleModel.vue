<template>
    <div class="d-flex justify-content-between mt-3 px-3 w-100">
        <div class="squerecardgreen border rounded text-center">
            <div class="mt-3">Total Views</div>
            <p class="p-0">1000</p>
        </div>
        <div class="squerecardyelow border rounded text-center">
            <div class="mt-3">Total Likes</div>
            <p>1000</p>
        </div>
        <div class="squerecardred border rounded text-center">
            <div class="mt-3">Total Shares</div>
            <p>1000</p>
        </div>
        <div class="squerecardblue border rounded text-center">
            <div class="mt-3">Total Comments</div>
            <p>1000</p>
        </div>
    </div>
    <base-card>
    <div class="d-flex justify-content-between">
    <div class="input-group search w-25 mt-4 align-self-start">
     <input type="text" class="form-control" placeholder="Search Role Model" aria-label="search" aria-describedby="addon-wrapping">
     <span @click="searchByStudId()" class="searchicon  input-group-text" id="searchby_id"><i class="fas fa-search"></i></span>
</div>
 <div class="mb-3">
  <label for="interestedin">Filter Role Model</label>
  <select class="form-select" v-model="filterRoleModel" id="interestedin">
      <option value="all">All</option>
  <option value="Software Engineer">Software Engineer</option>
   <option value="Mechanical Engineer">Mechanical Engineer</option>
    <option value="Chemical Engineer">Chemical Engineer</option>
</select>
  </div>
<!-- <div>
    <span><i class="fas fa-sort-amount-up-alt"></i></span> <u>Filter Role Model</u>
</div> -->
 <div class="mb-3">
  <label for="interestedin">Sort Role Model</label>
  <select class="form-select" v-model="sortRoleModel" id="interestedin">
  <option value="Software Engineer">More View</option>
   <option value="Mechanical Engineer">Most Liked</option>
    <option value="Chemical Engineer">Most Shared</option>
      <option value="Chemical Engineer">Date Added</option>
        <option value="Chemical Engineer">More Follower</option>
</select>
  </div>
<!-- <div>
    <span><i class="fas fa-filter"></i></span> <u>Sort Role Model</u>
</div> -->
<button @click="postNewRoleModel()" class="btn addpostbtn  mt-4 align-self-start">Post new Role Model</button>
    </div>
    <div class="text-center mt-2">38 results</div>
     <div class="cardcontainer mt-3">
        <div class="row">
        <div v-for="n in 6" :key="n" class="col-md-6 col-lg-4 mt-3 rounded">
          <div class="card">
            <div class="card-img">
 <router-link :to="{name:'RoleModelDetail',params:{roleModelId:1}}"> <img src="../../assets/sayat.jpg" class="card-img-top img-fluid rounded" alt="image1"></router-link>
              </div>
              <div class="w-100 reviews d-flex justify-content-between py-3 px-1">
    <div class="view me-3"><i class="fas fa-eye"></i> 1000</div>
    <div class="likes me-3"><i class="fas fa-thumbs-up"></i> 0</div>
    <div class="comments me-3"><i class="fas fa-comment-alt"></i> 0</div>
    <div class="shars me-3"><i class="fas fa-share"></i> 0</div>
    <div class="verification text-danger">Unverified</div>
  </div>
</div>
</div>
        </div>
            </div>
            <!-- dynamic data -->
            <!-- <div class="cardcontainer mt-3">
        <div class="row">
        <div v-for="roleModel in roleModels" :key="roleModel.id" class="col-md-6 col-lg-4 mt-3 rounded">
          <div class="card">
            <div class="card-img">
 <router-link :to="{name:'RoleModelDetail'}"> <img :src="roleModel.src" class="card-img-top img-fluid rounded" alt="roleModel1"></router-link>
              </div>
              <div class="w-100 reviews d-flex justify-content-between py-3 px-1">
    <div class="view me-3"><i class="fas fa-eye"></i> {{roleModel.views}}</div>
    <div class="likes me-3"><i class="fas fa-thumbs-up"></i> {{roleModel.likes}}</div>
    <div class="comments me-3"><i class="fas fa-comment-alt"></i> {{roleModel.comments}}</div>
    <div class="shars me-3"><i class="fas fa-share"></i> {{roleModel.shares}}</div>
    <div class="verification text-danger">{{roleModel.isVerified}}</div>
  </div>
</div>
</div>
        </div>
            </div> -->
    </base-card>
</template>
<script>
import apiClient from '../../components/baseurl/index.js'
export default {
    data(){
        return{
            roleModels:{},
            filterRoleModel:'',
            sortRoleModel:'',
        }
    },
    created() {
        // this.fetchRoleModels()
    },
    methods: {
        postNewRoleModel(){
           this.$router.push({name:'NewRoleModel'}) 
        },
        async fetchRoleModels(){
        var response = await apiClient.get('api/role_models')
        if(response.status === 200){
            this.roleModels = response.data
        }
        }
    },
}
</script>
<style scoped>
.squerecardblue{
    width: 22%;
    height: 12vh;
    background-color: #344172;
    color: #fff;
    
}
.squerecardgreen{
    width: 22%;
    height: 12vh;
    background-color: #38b5a9;
    color: #fff;
    
}
.squerecardyelow{
    width: 22%;
    height: 12vh;
    background-color: #eb9713;
    color: #fff;
    
}
.squerecardred{
    width: 22%;
    height: 12vh;
    background-color: #e7453a;
    color: #fff;
    
}
.searchicon{
  cursor: pointer;
}
.search{
    padding: 0;
    background-color: #fff;
}
.search input{
    border-right: none;
}
.search input:focus{
    box-shadow: none;
}
.search span{
    background-color: #fff;
    border-left: none;
}
.search span:hover{
color: rgb(128, 128, 236);
}
.addpostbtn{
    background-color: #eb9713;
    color: #fff;
}
.addpostbtn:hover{
   background-color: #f81b0b;
   color: #fff;
}
.row{
  width: 100;
}
.card-img{
  width: 100;
  height: auto;
  overflow: hidden;
}
.card-img img{
    width: 100%;
    height: 17rem;
    min-height: 17rem;
    transition: all 1.5s;
}
.card-img img:hover{
      transform: scale(1.2);
 
}
.reviews{
  background-color: #12141c;
  color: #fff;
}
</style>