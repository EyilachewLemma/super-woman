<template>
   <nav class="navbar navbar-expand-lg navbar-light">
  <div class="w-100 d-flex mx-3">
    <div class="brand">
      <a class="navbar-brand" href="#">SuperWoman</a>
    </div>
    <div class="ms-auto profileSection">
      <div class="d-flex justify-content-end">
        <button class="notification-icon me-3 position-relative border rounded shadow-sm">
        <div class="bell-size"><i class="far fa-bell"></i></div>
        <div class="bage-text"><span class="bage-color px-1 rounded-circle">9</span></div>
      </button>
      <div class="dropdown">
  <button class="btn profilebtn border shadow-sm p-1 d-flex" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
     <img src="../assets/sayat.jpg" alt="profile picture" class="img-fluid rounded">
     <dir class="ms-1 me-2 mt-2">Sayat Demssie</dir>
     <div class="fs-5 me-2 mt-2"><i class="fas fa-chevron-down"></i></div>
     </button>
  <ul class="dropdown-menu dropdown-menu-dark p-0" aria-labelledby="dropdownMenuButton2">
    <li><span @click="accountSetting()"  class="dropdown-item px-4 py-3">Account Setting</span></li>
       <hr class="m-0 p-0">
   <li><span @click="logout()" class="dropdown-item px-4 py-3">Logout</span></li>
  </ul>
</div>
      </div>
     
    </div>
  </div>
</nav>
</template>
<script>
export default {
  emits:{
    myaccount(){
      return true
    },
  },
   methods: {
     accountSetting(){
       this.$emit('myaccount')
     },
      logout(){
       
     }
   },
}
</script>
<style scoped>
.navbar{
  background-color: white;
}
.notification-icon{
  width: 20%;
  background-color: white;
  padding: 0;
}
.bell-size{
  font-size: 1.5rem;
}
.bage-color{
  background-color: #e7453a;
  color: #fff;
}
.bage-text{
  position: absolute;
  top: 7%;
  right: 7%;
}
.profilebtn{
   box-shadow: none;
}
img{
  width: 20%;
  height: 2.5em;
}
 .profileSection{
  min-width: 30%;
  }
  li:hover{
    cursor: pointer;
  }
</style>