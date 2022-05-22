<template> 
      <div class="border rounded shadow-sm m-3 bg-white pb-1">
           <div class="d-flex px-3 pt-4 justify-content-end">
    <!-- <div class="input-group search me-5">
      <input type="text" class="form-control p-1" placeholder="Search User" aria-label="search" aria-describedby="addon-wrapping" v-model="searchFieldsBy" @keyup.enter="searchFields()"/>
      <span @click="searchFields()" class="searchicon input-group-text" id="searchby_id"><i class="fas fa-search"></i></span>
    </div> -->
    <div>
        <button @click="addNewField()" class="btn addFieldBtn px-5">Add new Field</button>
    </div>
  </div>
  <table class="listofusers mt-4">
  <thead class="headers">
      <tr class="table-header">
      <th class="text-white p-2">NO</th>
      <th class="text-white p-2">Title</th>
      <th class="text-white p-2">Action</th>
      </tr>
      </thead>
  <tbody>
  <tr v-for="(field,index) in fields" :key="field.id">
  <td class="py-2">{{index+1}}</td>
  <td class="py-2">{{field.title}}</td>
  <td> <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v ellipsisIcon"></i></span>
          </a>
          <ul class="dropdown-menu py-0" aria-labelledby="dropdownMenuLink border rounded shadow-sm">
            <li><span @click="editField(field.id)" class="dropdown-item px-4 py-2">Edit field</span></li>
             <li><span @click="deletefield(field)" class="dropdown-item px-4 py-2">Delete field</span></li>
              </ul>
        </div>
    </td>
  </tr>
  </tbody>
    </table>
    </div>
    <base-modal id="baseModal" :buttonType="buttonTitle" :isLoading="isLoading" @save="addField()" @edit="saveEditedField()" @cancel="cancelDialog()">
    <template #modalBody>
        <div class="mb-3" :class="{warning:v$.fieldBoject.title.$error}">
  <label for="title" class="form-label">Title</label>
  <input type="text" class="form-control" id="title" v-model="fieldBoject.title">
   <span class="error-msg mt-1">{{ v$.fieldBoject.title.$errors[0]?.$message}}</span>
  </div>
    </template>
    </base-modal>
    <delete-modal id="deleteModal" :isSuccess="isSucceessfull" :isOKRequired="true" @yes="yesDelete()">
      <template #modalBody>
         <div>do you want to delete Field {{idOfFieldToDelete.title}} ?</div>
      </template>
    </delete-modal>
</template>
<script>
import useValidate from '@vuelidate/core'
import { required,helpers} from '@vuelidate/validators'
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
      deletemodal:null,
      idOfFieldToDelete:'',
      isLoading:false,
      isAddField:false,
      searchFieldsBy:'',
      buttonTitle:'',
      isSucceessfull:false,
     fieldBoject:{
         title:'',
     }
    }
  },
  validations(){
    return{
        fieldBoject:{
      title:{required:helpers.withMessage('title can not be empty',required)},
        }
  } 
 },
   mounted() {
     this.basemodal = new Modal(document.getElementById('baseModal'))
     this.deletemodal = new Modal(document.getElementById('deleteModal'))
   },
  created() {
    this.$store.dispatch('admin/fetchWriter',this.searchFieldsBy)
  },
   computed:{
        fields(){
            return this.$store.getters['admin/fields']
        }
    },
   methods: {
     addNewField(){
       this.buttonTitle = 'add'
      this.basemodal.show()
     },
     async addField(){
       this.v$.$validate()
       this.isLoading = true
       try{
         if(!this.v$.$error){
           var response = await apiClient.post('api/fields',this.fieldBoject)
         if(response.status ===201){
           var previousfields = this.fields
           previousfields.push(response.data)  
           this.$store.commit('admin/setFields',previousfields)         
           this.v$.$reset()
           this.basemodal.hide()
         }
         }
         
       }
       finally{
         this.isLoading = false
       }
     },
     cancelDialog(){
       this.v$.$reset()
     },
     editField(id){
        this.buttonTitle = 'edit'
      this.fields.forEach(field => {
       if(Number(field.id) === Number(id)){
         this.fieldBoject.title = field.title
         this.fieldBoject.id = id
          this.basemodal.show()
         return
       }
      });
     },
     async saveEditedField(){
       this.isLoading = true
       try{
          if(!this.v$.$error){
           var response = await apiClient.put('api/fields/'+this.fieldBoject.id,this.fieldBoject)
         if(response.status ===200){
           var previousfields = this.fields
            var index = previousfields.findIndex(field => {
                        return field.id === this.fieldBoject.id
                    })
                    previousfields[index] = response.data 
           this.$store.commit('admin/setFields',previousfields)         
           this.v$.$reset()
           this.basemodal.hide()
         }
         }
         }
      finally{
          this.isLoading = false
         }
     },
      deletefield(field){
     this.idOfFieldToDelete = field
     this.deletemodal.show()

     },
     async yesDelete(){
            var response = await apiClient.delete(`api/fields/${this.idOfFieldToDelete.id}`)
          if(response.status ===200){
           var previousfields = this.fields
            var index = previousfields.findIndex(field => {
                        return field.id === this.idOfFieldToDelete.id
                    })
                    previousfields.splice(index,1)
           this.$store.commit('admin/setFields',previousfields)         
           this.deletemodal.hide()
         }
     },
    //  searchFields(){
    //     this.$store.dispatch('admin/fetchWriter',this.searchFieldsBy)
    //  }
   },
}
</script>
<style scoped>
.addFieldBtn{
    background-color: #eb9713;
    color: #fff;
}
.addFieldBtn:hover{
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
