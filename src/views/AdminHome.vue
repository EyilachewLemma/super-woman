<template>
  <div class="shadow-lg position-relative">
    <the-header
      @myaccount="showAccount()"
      @viewNotification="showNotifications()"
    ></the-header>
    <transition name="modal">
      <div v-if="isMyAccount" class="myAccount">
        <account-setting @cancelModal="cancelDialog()"></account-setting>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="isNotification" class="notification">
        <notification-page @closeNotification="closeNotificationModal()">
        </notification-page>
      </div>
    </transition>
  </div>
  <div class="main-container d-flex position-relative">
    <div class="sidebar border shadow-sm">
      <side-bar></side-bar>
    </div>
    <div class="routerview flex-fill">
      <router-view></router-view>
      <div class="container-fluid">
        <div
          v-if="isItemLoading"
          class="loading-screen route-loading p-0 position-fixed top-0 start-0 bottom-0 end-0 w-100 h-100 bg-white"
        >
          <div class="loading-spinner text-center mt-5">
            <img src="../assets/newspinner.gif" alt="slow connection" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TheHeader from "../components/TheHeader.vue";
import SideBar from "../components/SideBar.vue";
import AccountSetting from "./admin/AccountSetting.vue";
import NotificationPage from "./admin/NotificationPage.vue";
import apiClient from "../components/baseurl/index.js";
import fileApiClient from '../components/baseurl/multipart'

export default {
  components: {
    TheHeader,
    SideBar,
    AccountSetting,
    NotificationPage,
  },
  data() {
    return {
      isMyAccount: false,
      isNotification: false,
    };
  },
  beforeCreate() {
    if (localStorage.getItem("tokenB")) {
      let token = localStorage.getItem("tokenB");
      this.$store.commit("setToken", token);
      this.$store.commit("setIsAuthenticated", true);
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fileApiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    if (localStorage.getItem("user")) {
      let user = localStorage.getItem("user");
      console.log("user", user);
      this.$store.commit("setUser", JSON.parse(user));
    }
  },
  created() {
    this.$store.dispatch("admin/fetchFields");
    this.$store.dispatch("admin/fetchNotifications");
    this.$store.dispatch('admin/fetchLanuages')
  },
  computed: {
    isItemLoading() {
      return this.$store.getters.isItemLoading;
    },
    notifications() {
      return this.$store.getters["admin/notifications"];
    },
  },
  methods: {
    showAccount() {
      this.isMyAccount = true;
      this.isNotification = false;
    },
    showNotifications() {
      if (this.notifications?.length) {
        this.isNotification = !this.isNotification;
        this.isMyAccount = false;
      }
    },
    cancelDialog() {
      this.isMyAccount = false;
    },
    closeNotificationModal() {
      this.isNotification = false;
    },
  },
};
</script>
<style scoped>
.btn-primary {
  margin-left: 50%;
}
.main-container {
  background-color: #f5f6fa;
}
.myAccount {
  width: 45%;
  background-color: #fff;
  position: absolute;
  top: 60px;
  right: 1%;
  z-index: 10;
}
.notification {
  width: 30%;
  background-color: #fff;
  position: absolute;
  top: 60px;
  right: 1%;
  z-index: 10;
  max-height: 100vh;
  overflow-y: auto;
}
.accBtn {
  border: none;
  background: none;
}
.sidebar {
  width: 17%;
  min-height: 100vh;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #ecf1fe;
}
.routerview {
  /* z-index: 1; */
  margin-left: 17%;
  background-color: #f5f6fa;
  min-height: 100vh;
}
.loading-spinner {
  background-color: #fff;
}
.modal-enter-from {
  opacity: 0;
  transform: translateX(30%);
}
.modal-enter-active {
  transition: all 0.3s ease-out;
}
.modal-enter-to {
  opacity: 1;
}
.modal-leave-from {
  opacity: 1;
}
.modal-leave-active {
  transition: all 0.3s ease-out;
}
.modal-leave-to {
  opacity: 0;
  transform: translateX(30%);
}
@media (min-width: 992px) {
  .myAccount {
    width: 30%;
  }
}
</style>
