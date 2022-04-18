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
        <div class="bage-text p-1"><span class="bage-color px-1 rounded-circle">{{notifications?.length}}</span></div>
      </button>
      <div class="dropdown">
  <button class="btn profilebtn dropdown-toggle border shadow-sm px-1 py-2" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
     <img src="../assets/sayat.jpg" alt="profile picture" class="img-fluid rounded">Dropdown button
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
import {onMounted,ref} from 'vue'
import Echo from 'laravel-echo'
window.Pusher = require('pusher-js');
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: '51df02a0da376c37ab66',
  cluster: 'ap2', 
  forceTLS: true
 
});
export default {
  emits:{
    accSetting(){
      return true
    },
    logout(){
      return true
    }
  },
   setup () {
    onMounted(()=>{
      window.Echo.listen('AdminNotification',(data)=>{
        console.log(data);
        this.notifications.value = data
      })
    })
    const notifications = ref(null)
    return {notifications}
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