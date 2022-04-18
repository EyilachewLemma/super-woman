<template>
    <div class="shadow-lg position-relative">
        <the-header @my-account="showAccount()"></the-header>
         <div v-if="isMyAccount" class="myAccount border rounded shadow-sm">
             <div>
                 <button class="accBtn">Account Setting</button>
             </div>
             <hr class="w-100" />
        <div>
           <button class="accBtn">Logout</button>
        </div>
        
    </div>
        </div>
    <div class="main-container d-flex position-relative">
        <div class="sidebar border shadow-sm">
            <side-bar></side-bar>
        </div>
        <div class="routerview flex-fill">
            <router-view></router-view>
                    <div class="container-fluid content">
            <div v-if="isItemLoading" class="loading-screen route-loading p-0  position-fixed top-0 start-0 bottom-0 end-0 w-100 h-100 bg-white">
               <div class="loading-spinner text-center mt-5">
                   <img src="../assets/spinner.gif"   alt="slow connection">
               </div>
            </div>   
        </div>
        </div>
    </div>
</template>
<script>
import TheHeader from '../components/TheHeader.vue'
import SideBar from '../components/SideBar.vue'
import apiClient from '../components/baseurl/index.js'

export default {
components:{
    TheHeader,
    SideBar
},
data() {
    return {
       isMyAccount:false 
    }
},
  beforeCreate() {
    if (localStorage.getItem("tokenB")) {
      let token = localStorage.getItem("tokenB");
      this.$store.commit("setToken", token);
      this.$store.commit("setIsAuthenticated", true);
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    if (localStorage.getItem("user")) {
      let user = localStorage.getItem("user");
      console.log("user", user);
      this.$store.commit("setUser", JSON.parse(user));
    }
  },
created() {
     this.$store.dispatch('admin/fetchFields')
},
computed:{
    isItemLoading(){
        return this.$store.getters.isItemLoading
    }
},
methods: {
    showAccount(){
        this.isMyAccount = !this.isMyAccount
        console.log(' down arrow is clicked',this.isMyAccount)
    }
},
}
</script>
<style scoped>
.btn-primary{
    margin-left: 50%;
}
.main-container{
    background-color: #f5f6fa;
}
.myAccount{
    width: 15%;
    background-color: rgb(172, 236, 228);
    position: absolute;
    top: 60px;
    right: 1%;
    z-index: 10;
}
.accBtn{
    border: none;
    background: none;
}
.sidebar{
    width: 17%;
    min-height: 100vh;
    position: absolute;
    top: 0;
    bottom: 0; 
    background-color: #ecf1fe;
}
.routerview{
    /* z-index: 1; */
    margin-left: 17%;
    background-color: #f5f6fa;
    min-height: 100vh;
}
.loading-spinner{
    background-color: #fff;
}
</style>