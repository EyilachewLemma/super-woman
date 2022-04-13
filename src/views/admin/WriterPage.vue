<template> 
      <div class="border rounded shadow-sm m-3 bg-white pb-1">
           <div class="d-flex px-3 pt-4 justify-content-between">
    <div class="input-group search me-5">
      <input type="text" class="form-control p-1" placeholder="Search User" aria-label="search" aria-describedby="addon-wrapping"/>
      <span @click="searchUser()" class="searchicon input-group-text" id="searchby_id"><i class="fas fa-search"></i></span>
    </div>
    <div>
        <button class="btn addWriterBtn px-5">Add new Writer</button>
    </div>
  </div>
  <table class="listofusers mt-4">
  <thead class="headers">
      <tr class="table-header">
      <th class="text-white p-2">NO</th>
      <th class="text-white p-2">Full Name</th>
      <th class="text-white p-2">Phone No</th>
      <th class="text-white p-2">Email Address</th>
      <!-- <th class="text-white p-2">Education Level</th>
      <th class="text-white p-2">Joined Date</th>
      <th class="text-white p-2">State</th> -->
      <th class="text-white p-2">Action</th>
      </tr>
      </thead>
  <tbody>
  <tr v-for="(coc,index) in 6" :key="coc.id">
  <td class="py-2">{{index+1}}</td>
  <td class="py-2">Shiferaw Muluye</td>
  <td class="py-2">0912343456</td>
  <td class="py-2">shiferaw@gmail.com</td>
  <!-- <td class="py-2">Phd</td>
  <td class="py-2">09/03/2021</td>
  <td class="py-2">Unblocked</td> -->
  <td>
      <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v ellipsisIcon"></i></span>
          </a>

          <ul class="dropdown-menu py-0" aria-labelledby="dropdownMenuLink border rounded shadow-sm">
            <li><span class="dropdown-item px-4 py-2">View Status</span></li>
             <li><span class="dropdown-item px-4 py-2">View Detail</span></li>
              </ul>
        </div>
    </td>
  </tr>
  </tbody>
    </table>
    </div>
</template>
<script>
import { Modal } from 'bootstrap';
export default {
  data() {
    return {
      basemodal:null,
    }
  },
   mounted() {
     this.basemodal = new Modal(document.getElementById('baseModal'))
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
</style>
