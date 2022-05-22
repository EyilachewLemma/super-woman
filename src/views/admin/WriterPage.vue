<template> 
      <div class="border rounded shadow-sm m-3 bg-white pb-1">
           <div class="d-flex px-3 pt-4 justify-content-between">
    <div class="input-group search me-5">
      <input type="text" class="form-control p-1" placeholder="Search User" aria-label="search" aria-describedby="addon-wrapping" v-model="searchUserBy" @keyup.enter="searchUser()"/>
      <span @click="searchUser()" class="searchicon input-group-text" id="searchby_id"><i class="fas fa-search"></i></span>
    </div>
    <div>
        <button @click="addNewWriter()" class="btn addWriterBtn px-5">Add new Writer</button>
    </div>
  </div>
  <table class="listofusers mt-4">
  <thead class="headers">
      <tr class="table-header">
      <th class="text-white p-2">NO</th>
      <th class="text-white p-2">Full Name</th>
      <th class="text-white p-2">Phone No</th>
      <th class="text-white p-2">Email Address</th>
       <th class="text-white p-2">State</th>
      <th class="text-white p-2">Action</th>
      </tr>
      </thead>
  <tbody>
  <tr v-for="(writer,index) in writers" :key="writer.id">
  <td class="py-2">{{index+1}}</td>
  <td class="py-2">{{writer.first_name+" "+writer.last_name}}</td>
  <td class="py-2">{{writer.phone_no}}</td>
  <td class="py-2">{{writer.email}}</td>
  <td class="py-2">{{isActive(writer.is_active)}}</td>
  <td>
      <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v ellipsisIcon"></i></span>
          </a>

          <ul class="dropdown-menu py-0" aria-labelledby="dropdownMenuLink border rounded shadow-sm">
            <li><span @click="editWrter(writer.id)" class="dropdown-item px-4 py-2">Edit</span></li>
             <li><span @click="deleteWriter(writer)" class="dropdown-item px-4 py-2">
               <span v-if="writer.is_active === 1">Deactivate</span>
               <span v-else>Activate</span>
               </span></li>
              </ul>
        </div>
    </td>
  </tr>
  </tbody>
    </table>
    </div>
    <base-modal id="baseModal" :buttonType="buttonTitle" :isLoading="isLoading" @save="addWriter()" @edit="saveEditedWriter()">
    <template #modalBody>
        <div class="mb-3" :class="{warning:v$.writerData.first_name.$error}">
  <label for="fname" class="form-label">First Name</label>
  <input type="text" class="form-control" id="fname" v-model="writerData.first_name">
   <span class="error-msg mt-1">{{ v$.writerData.first_name.$errors[0]?.$message}}</span>
  </div>
  <div class="mb-3" :class="{warning:v$.writerData.last_name.$error}">
  <label for="lname" class="form-label">Last Name</label>
  <input type="text" class="form-control" id="lname" v-model="writerData.last_name">
   <span class="error-msg mt-1">{{ v$.writerData.last_name.$errors[0]?.$message}}</span>
</div>
<div class="mb-3" :class="{warning:v$.writerData.phone_no.$error}">
  <label for="phone" class="form-label">Phone Number</label>
  <input type="tel" class="form-control" id="phone" v-model="writerData.phone_no">
   <span class="error-msg mt-1">{{ v$.writerData.phone_no.$errors[0]?.$message}}</span>
</div>
<div class="mb-3" :class="{warning:v$.writerData.email.$error}">
  <label for="emailadress" class="form-label">Email address</label>
  <input type="email" class="form-control" id="emailadress" placeholder="name@example.com" v-model="writerData.email">
   <span class="error-msg mt-1">{{ v$.writerData.email.$errors[0]?.$message}}</span>
</div>
    </template>
    </base-modal>
    <delete-dialog id="deleteModale">
      <template #modalBody>
         <div>do you want to delete writer ?</div>
      </template>
    </delete-dialog>
</template>
<script>
import useValidate from '@vuelidate/core'
import { required,helpers,minLength,maxLength, email} from '@vuelidate/validators'
import apiClient from '../../components/baseurl/index.js'
import DeleteDialog from '../../components/DeleteDialog.vue'
import { Modal } from 'bootstrap';
export default {
  component:{
    DeleteDialog
  },
  data() {
    return {
      v$:useValidate(),
      basemodal:null,
      isLoading:false,
      isAddWriter:false,
      searchUserBy:'',
      buttonTitle:'',
      writerData:{
        role:'writer'
      }
    }
  },
  validations(){
    return{
    writerData:{
      first_name:{required:helpers.withMessage('first name can not be empty',required)},
      last_name:{required:helpers.withMessage('last name can not be empty',required)},
      phone_no:{required:helpers.withMessage('phone number can not be empty',required),
      min:helpers.withMessage('number of digits must be equal to 10',minLength(10)),
      max:helpers.withMessage('number of digits must be equal to 10',maxLength(10))
      },
      email:{required:helpers.withMessage('email is required',required),
      email}
    
  }
  } 
 },
   mounted() {
     this.basemodal = new Modal(document.getElementById('baseModal'))
   },
  created() {
    this.$store.dispatch('admin/fetchWriter',this.searchUserBy)
  },
  computed:{
    writers(){
      return this.$store.getters['admin/writers']
    }
  },
   methods: {
     addNewWriter(){
       this.buttonTitle = 'add'
      this.basemodal.show()
      // this.isAddWriter = true
     },
     async addWriter(){
       this.v$.$validate()
       this.isLoading = true
       try{
         if(!this.v$.$error){
           var response = await apiClient.post('api/employees',this.writerData)
         if(response.status ===201){
           var previousWriters = this.writers
           previousWriters.push(response.data)  
           this.$store.commit('admin/setWriters',previousWriters)         
           this.isAddWriter = false
           this.v$.$reset()
         }
         }
         
       }
       finally{
         this.isLoading = false
       }
     },
     cancelDialog(){
       this.isAddWriter = false
       this.v$.$reset()
     },
     editWrter(id){
        this.buttonTitle = 'edit'
      var writerToBeEdite ={}
      this.writers.forEach(writer => {
       if(Number(writer.id) === Number(id)){
         writerToBeEdite = writer
         return
       }
      });
      this.writerData.first_name = writerToBeEdite.first_name
      this.writerData.last_name = writerToBeEdite.last_name
      this.writerData.phone_no = writerToBeEdite.phone_no
      this.writerData.email = writerToBeEdite.email
      this.writerData.id = id
      this.basemodal.show()
      // this.isAddWriter = true
     },
     async saveEditedWriter(){
       this.isLoading = true
       try{
          if(!this.v$.$error){
           var response = await apiClient.put('api/employees/'+this.writerData.id,this.writerData)
         if(response.status ===200){
           var previousWriters = this.writers
            var index = previousWriters.findIndex(writer => {
                        return writer.id === this.writerData.id
                    })
                    previousWriters[index] = response.data 
           this.$store.commit('admin/setWriters',previousWriters)         
           this.v$.$reset()
           this.basemodal.hide()
         }
         }
         }
      finally{
          this.isLoading = false
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
     async deleteWriter(writer){
        var state = (writer.is_active === 1) ? 0 : 1
        console.log('state=',state)
     var response = await apiClient.delete(`api/employees/${writer.id}?state=${state}`)
        if(response.status === 200){
          writer.is_active = state
        }

     },
     searchUser(){
        this.$store.dispatch('admin/fetchWriter',this.searchUserBy)
     }
   },
}
</script>
<style scoped>
.addWriterBtn{
    background-color: #eb9713;
    color: #fff;
}
.addWriterBtn:hover{
    background-color: #f81b0b;
    color: #fff;
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
.dropdown ul{
    background-color: #ecf1fe;
}
.ellipsisIcon:hover{
    color: #eb9713;
}
 li span:hover{
background-color: #366ad9;
color: #fff;
cursor: pointer;
}
/* for dialog */
.editwraper{
 position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh!important;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    overflow-y: hidden;
}
.writerForm{
  width: 50%;
  position: absolute;
  top: 7%;
  left: 30%;
}
.commnBtn{
  width: 7rem;
}
.commnBtn:hover{
  background-color: #f81b0b;
  color: #fff;
}
.save{
  background-color: #eb9713;
  color: #fff;
}
.cancel{
  border: 1px solid rgb(151, 151, 152);
  
}
.warning input{
    border: 1px red solid;
  }
  .warning span{
    display: inline;
    color: red;

  }
</style>
