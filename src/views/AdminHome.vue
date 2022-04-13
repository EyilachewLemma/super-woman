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
        </div>
    </div>
</template>
<script>
import TheHeader from '../components/TheHeader.vue'
import SideBar from '../components/SideBar.vue'
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
methods: {
    showAccount(){
        this.isMyAccount = !this.isMyAccount
        console.log(' down arrow is clicked',this.isMyAccount)
    }
},
}
</script>
<style scoped>
.main-container{
    background-color: #f5f6fa;
}
.myAccount{
    width: 15%;
    background-color: rgb(172, 236, 228);
    position: absolute;
    top: 60px;
    right: 1%;
    z-index: 1000;
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
    z-index: 1;
    margin-left: 17%;
    background-color: #f5f6fa;
    min-height: 100vh;
}
</style>