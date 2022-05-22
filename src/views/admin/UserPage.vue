<template>
 
      <div class="border rounded shadow-sm m-3 bg-white pb-1">
           <div class="d-flex px-3 pt-4 justify-content-between">
               <div class="input-group search w-25 mt-4 align-self-start me-5 bordrd rounded">
     <input type="text" class="form-control" placeholder="Search User" aria-label="search" aria-describedby="addon-wrapping" v-model="search.searchBy" @keyup.enter="searchUsers()">
     <span @click="searchUsers()" class="searchicon  input-group-text" id="searchby_id"><i class="fas fa-search"></i></span>
</div>
     <div class="mb-3 me-5">
  <label for="interestedin">Filter Users By</label>
  <select class="form-select" v-model="search.filterBy" id="interestedin" @change="filterUsers($event)">
      <option :value="''">All</option>
  <option v-for="field in fields" :key="field.id" :value="field.id">{{field.title}}</option>
</select>
  </div>
  </div>
  <table class="listofusers mt-2">
  <thead class="headers">
      <tr class="table-header">
      <th class="text-white p-2">NO</th>
      <th class="text-white p-2">Full Name</th>
      <th class="text-white p-2">Phone No</th>
      <th class="text-white p-2">Location</th>
      <th class="text-white p-2">Education Level</th>
      <th class="text-white p-2">Joined Date</th>
      <th class="text-white p-2">State</th>
      <th class="text-white p-2">Action</th>
      </tr>
      </thead>
  <tbody>
  <tr v-for="(user,index) in users.data" :key="user.id">
  <td class="py-2">{{index+1}}</td>
  <td class="py-2">{{user.first_name+" "+user.last_name}}</td>
  <td class="py-2">{{user.phone_no}}</td>
  <td class="py-2">{{user.city}}</td>
  <td class="py-2">{{user.education_level}}</td>
  <td class="py-2">{{user.created_at}}</td>
  <td class="py-2" :class="{activeUser:user.is_active===1,blockedUser:user.is_active===0}">{{isActive(user.is_active)}}</td>
  <td>
      <div class="d-flex">
          <div @click="viewUserDetail(user.id)" class="me-3 icons fs-4"><i class="fas fa-eye"></i></div>
          <div @click="blockUser(user)" class="me-2 icons fs-4">
            <span v-if="user.is_active === 0"><i class="far fa-check-circle"></i></span>
            <span v-else><i class="fas fa-ban"></i></span>
        </div>
      </div>
  </td>
  </tr>
  </tbody>
    </table>
     <div v-if="users.data?.length" class="d-flex justify-content-end mt-3 pb-2 me-5">
<div class="rowsperpage me-3">
   Users per Page
</div>
<div class="limit col-sm-1 me-3">
<select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="search.per_page" @change="perPageValue($event)">
  <option value="5">5</option>
  <option value="10">10</option>
  <option value="15">15</option>
  <option value="20">20</option>
  
</select>
</div>
<div class="pageno me-3">
{{users.from+'-'+users.to+' of '+users.total+' Role Models'}}
</div>
<div class="leftchivron ms-3 me-3">
<button @click="backChivron()" class="chivronbtn" :class="{active:users.from !== 1}" :disabled="users.from === 1"><i class="fas fa-chevron-left"></i></button>
</div>
<div class="rightchivron"><button @click="forWardChivron()" class="chivronbtn" :class="{active:users.to !==users.total}" :disabled="users.to ===users.total"><i class="fas fa-chevron-right"></i></button></div>
</div>
    </div>
<!-- Modal -->
<div class="modal fade" id="userDetailModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <div class="profil text-center ms-5">
         <img src="../../assets/sayat4.jpg" class="img-fluid rounded-circle" alt="profile picture">
      </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
         <div>
           <p><strong>First Name: </strong> {{userDetail.first_name}}</p>
           <p> <strong>Last Name: </strong> {{userDetail.last_name}}</p>
           <p><strong>Phone Number: </strong> {{userDetail.phone_no}}</p>
           <p><strong>Email Address: </strong> {{userDetail.email}}</p>
           <p><strong>Location: </strong> {{userDetail.city}}</p>
           <p><strong>Date of Birth: </strong> {{userDetail.date_of_birth}}</p>
           <p><strong>Education Level: </strong> {{userDetail.education_level}}</p>         

         </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn closeModal" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn blockUser">Block</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {Modal} from 'bootstrap'
import apiClient from '../../components/baseurl/index.js'
export default {
  data() {
    return {
      users:{},
      search:{
        searchBy:'',
        filterBy:'',
        page:1,
        per_page:15
        },
      sortUsersBy:'',
      modalDialog:'',
      userDetail:{}
    }
  },
  created() {
    this.fetchUsers(this.search)
  },
  mounted() {
     this.modalDialog = new Modal(document.getElementById('userDetailModal'))
   },
  computed:{
      fields(){
            return this.$store.getters['admin/fields']
        }
  },
  methods: {
    async fetchUsers(search){
        this.$store.commit('setIsItemLoading',true)
            try{
        var response = await apiClient.get(`api/users?page=${search.page}&search=${search.searchBy}&filter=${search.filterBy}&per_page=${search.per_page}`)
        if(response.status === 200){
            this.users = response.data
        }
         }
            finally{
                 this.$store.commit('setIsItemLoading',false)
            }
    },
    isActive(value){
      if(Number(value) === 1){
        return 'Active'
      }
      else{
        return 'Blocked'
      }
    },
    filterUsers(event){
      this.search.filterBy = event.target.value
      this.fetchUsers(this.search)
    },
     searchUsers(){
    this.fetchUsers(this.search)
  },
  viewUserDetail(id){
this.users.data.forEach(user=>{
  if(user.id === id){
    this.userDetail = user
    return
  }
})
this.modalDialog.show()
  },
  async blockUser(user){
    var state = (user.is_active === 1) ? 0 : 1
     var response = await apiClient.post(`api/block_user/${user.id}`,{state:state})
        if(response.status === 200){
          user.is_active = state
        }
    
  },
  perPageValue(event){
     this.search.per_page = event.target.value
      this.fetchUsers(this.search)
  },
   backChivron(){
            this.search.page = this.search.page - 1
            this.fetchUsers(this.search)
        },
        forWardChivron(){
            this.search.page = this.search.page +1
            this.fetchUsers(this.search)
        }
  },

}
</script>
<style scoped>
.modal-content{
  z-index: 1000000;
}
.searchicon{
  cursor: pointer;
}
.search{
    width: 35%;
    padding: 0;
    background-color: #fff;
}
.search input{
    border-right: none;
}
.search input:focus{
    box-shadow: none;
    border-color: #d5d6d9;
    z-index: 0;
}
.search span{
    background-color: #fff;
    border-left: none;
}
.search span:hover{
color: rgb(128, 128, 236);
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
.headers{
    background-color: #e7453a; ;
    border-radius: 5px; 
}
th{
  text-align: left;
  padding-bottom: 8px;
  padding-top: 4px;
  
}
td{
  border: 1px solid #dddddd;
  text-align: left;
  vertical-align: top;
}
.dropdown ul{
    background-color: #ecf1fe;
}
 li span:hover{
background-color: #366ad9;
color: #fff;
cursor: pointer;
}
.listofusers th{
  color: #fff!important;
  font-size: 14px;
}
.listofusers tr{
  border-top: 2px solid rgb(231, 228, 228);
  border-bottom: none
}
.listofusers td{ 
  padding-left: 15px;
  border-left: none;
  border-right: none;
  border-bottom: none;
}
.icons{
    cursor: pointer;
}
.icons:hover{
    color: #eb9713;
}
a{
    text-decoration: none;
}
.activeUser{
  color: rgb(67, 199, 67);
}
.blockedUser{
  color: red;
}
.chivronbtn{
    border: none;
    background-color: #fff;
    color: rgba(97, 94, 94, 0.849);
}
.active{
  color: rgb(15, 15, 15);
}
/* view detail section */
img{
  width: 5rem;
  height: 5rem;
  margin:auto;
}
.blockUser{
  background-color: #eb9713;
  color: #fff;
}
.blockUser:hover{
  background-color: #fa2b1d;
}
.closeModal{
  border: 1px solid gainsboro;
}
.closeModal:hover{
background-color: #fa2b1d;
color: #fff;
}

</style>
