<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="w-100 d-flex mx-3">
      <div class="brand">
        <a class="navbar-brand" href="#">SuperWoman</a>
      </div>
      <div class="ms-auto profileSection">
        <div class="d-flex justify-content-end">
          <button
            @click="showNotification()"
            class="notification-icon me-3 position-relative border rounded shadow-sm"
          >
            <div class="bell-size"><i class="far fa-bell"></i></div>
            <div class="bage-text">
              <span
                v-if="newNotifications?.length"
                class="bage-color px-1 rounded-circle"
                >{{ newNotifications?.length }}</span
              >
            </div>
          </button>
          <div class="dropdown">
            <button
              class="btn profilebtn border shadow-sm p-1 d-flex"
              type="button"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                :src="user.profile_picture"
                alt="profile picture"
                class="img-fluid rounded"
              />
              <dir class="ms-1 me-2 small">
                {{ user.first_name + " " + user.last_name }}
              </dir>
              <div class="fs-5 ms-auto me-2 mt-2">
                <i class="fas fa-chevron-down"></i>
              </div>
            </button>
            <ul
              class="dropdown-menu dropdown-menu-dark p-0"
              aria-labelledby="dropdownMenuButton2"
            >
              <li>
                <span @click="accountSetting()" class="dropdown-item px-4 py-3"
                  >Account Setting</span
                >
              </li>
              <hr class="m-0 p-0" />
              <li>
                <span @click="logOut()" class="dropdown-item px-4 py-3"
                  >Logout</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import apiClient from "./baseurl/index";
export default {
  emits: {
    myaccount() {
      return true;
    },
    viewNotification() {
      return true;
    },
  },
  // data(){
  //   return {
  //     newNotifications:[]
  //   }
  // },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    notifications() {
      return this.$store.getters["admin/notifications"];
    },
    newNotifications() {
      var addedNotifications = [];
      this.notifications.forEach((notificatin) => {
        if (Number(notificatin.seen) === Number(0)) {
          addedNotifications.push(notificatin);
        }
      });
      console.log("new notification = ", addedNotifications);
      return addedNotifications;
    },
  },
  created() {
    
  },
  methods: {
    accountSetting() {
      this.$emit("myaccount");
    },
    async logOut() {
      var response = await apiClient.post("api/logout");
      if (response.status === 200) {
        this.$store.commit("setToken", null);
        this.$store.commit("setIsAuthenticated", false);
        this.$store.commit("setUser", null);
        localStorage.removeItem("tokenB");
        this.$router.push({ name: "Login" });
        console.log("logout successfully");
      }
    },
    async showNotification() {
      this.$emit("viewNotification");
      if (this.newNotifications?.length) {
        try {
          var response = await apiClient.get(`api/mark_all_as_seen`);
          if (response.status === 200) {
            this.$store.commit("admin/setNotifications", response.data);
          }
        } catch (err) {
          console.log("err", err);
        }
      }
    },
  },
};
</script>
<style scoped>
.navbar {
  background-color: white;
}
.notification-icon {
  width: 20%;
  background-color: white;
  padding: 0;
}
.bell-size {
  font-size: 1.5rem;
}
.bage-color {
  background-color: #e7453a;
  color: #fff;
}
.bage-text {
  position: absolute;
  top: 7%;
  right: 7%;
}
.profilebtn {
  box-shadow: none;
}
img {
  width: 20%;
  height: 2.5em;
}
.profileSection {
  min-width: 30%;
}
li:hover {
  cursor: pointer;
}
</style>
