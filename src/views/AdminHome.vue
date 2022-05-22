<template>
    <div class="shadow-lg position-relative">
        <the-header @myaccount="showAccount()"></the-header>
       <transition name="modal">
          <div  v-if="isMyAccount" class="myAccount">
            <account-setting @cancelModal="cancelDialog()"></account-setting>
        </div>
       </transition>
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
import AccountSetting from './AccountSetting.vue'
export default {
components:{
    TheHeader,
    SideBar,
    AccountSetting
},
data() {
    return {
       isMyAccount:false 
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
    },
    cancelDialog(){
        this.isMyAccount = false
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
    width: 45%;
    background-color: #fff;
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
.modal-enter-from{
  opacity: 0;
  transform: translateX(30%);
}
.modal-enter-active{
  transition: all .3s ease-out;
}
.modal-enter-to{
  opacity: 1;
}
.modal-leave-from{
  opacity: 1;
}
.modal-leave-active{
  transition: all .3s ease-out;
}
.modal-leave-to{
  opacity: 0;
  transform: translateX(30%);
}
@media(min-width: 992px){
    .myAccount{
        width: 30%;
    }
}
</style>