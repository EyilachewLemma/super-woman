<template>
   <nav class="navbar navbar-expand-lg navbar-light">
  <div class="w-100 d-flex mx-3">
    <div class="brand">
      <a class="navbar-brand" href="#">SuperWoman</a>
    </div>
    <div class="ms-auto profileSection">
      <div class="d-flex justify-content-end">
        <button class="notification-icon me-3 position-relative border rounded shadow-sm p-1">
        <div class="bell-size"><i class="far fa-bell"></i></div>
        <div class="bage-text p-1"><span class="bage-color px-1 rounded-circle">8</span></div>
      </button>
      <div class="profil-img border rounded shadow-sm p-1 d-flex align-items-center">
        <img src="../assets/sayat.jpg" alt="profile picture" class="img-fluid rounded">
        <div class="ms-1">Sayat Demsie</div>
        <div class="btn-group">
  <button type="button" class="downbtn mx-2 fs-4" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
    <i class="fas fa-chevron-down"></i>
  </button>
  <ul class="dropdown-menu dropdown-menu-start p-0">
     <li><span @click="accountSetting()"  class="dropdown-item px-4 py-3">Account Setting</span></li>
       <hr class="m-0 p-0">
       <li><span @click="logout()" class="dropdown-item px-4 py-3">Logout</span></li>
  </ul>
</div>
      </div>
      </div>
     
    </div>
  </div>
</nav>
</template>
<script>
export default {
  emits:{
    accSetting(){
      return true
    },
    logout(){
      return true
    }
  },
   methods: {
     accountSetting(){
       this.$emit('accSetting')
     },
      logout(){
       this.$emit('logout')
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
  font-size: 1.7rem;
}
.bage-color{
  background-color: #e7453a;
  color: #fff;
}
.bage-text{
  position: absolute;
  top: 3%;
  right: 3%;
}
img{
  width: 20%;
  height: 2.5em;
}
 .profileSection{
  min-width: 30%;
  }
  .accountBtn{
    box-shadow: none;
    background:none;
  }
  .downChivron{
    cursor: pointer;
  }
  .downChivron:hover{
    color: #f12112;
  }
  li:hover{
    cursor: pointer;
  }
  .downbtn{
    box-shadow: none;
    background: none;
    border: none;
  }
  ul{
    position: absolute!important;
    top: 60px;
    right: 3%;
  }
</style>