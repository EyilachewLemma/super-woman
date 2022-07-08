<template>
  <div class="border rounded shadow-sm py-3">
    <div class="d-flex justify-content-between mx-4">
      <h3>Notifications</h3>
      <div class="dropdown">
        <button
          class="dropdownbtn"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span class="fs-3">
            <i class="fas fa-ellipsis-h ellipsisIcon"> </i
          ></span>
        </button>
        <ul class="dropdown-menu p-0" aria-labelledby="dropdownMenuLink">
          <li @click="markAllAsRead()">
            <span class="ms-1">Mark all as read</span>
          </li>
          <li @click="filterUnReadNotification()">
            <span class="ms-1">Unread Notification</span>
          </li>
          <li @click="allNotification()">
            <span class="ms-1">All Notifications</span>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <div
        v-for="notification in adminNotificatins"
        :key="notification.id"
        @click="viewMessage(notification)"
        class="d-flex my-3 notificationbox"
      >
        <img
          src="../../assets/sayat1.jpg"
          class="img-fluid radius-circled ms-1"
          alt="mentors profile photo"
        />
        <div class="ms-3 me-1">
          <p>Abebe Yimer</p>
          <p>{{ notification.data.title }}</p>
          <p :class="{ textprimary: !notification.read_at }">
            {{ formatingTime(notification.created_at) }}
          </p>
        </div>
        <div v-if="!notification.read_at" class="text-primary ms-auto me-3">
          Unread
        </div>
      </div>
    </div>
    <!-- blog notifications
    <h5 class="text-primary ms-3 mt-3">Blog Notifications</h5>
    <div
      v-for="notification in adminNotificatins.blog"
      :key="notification.id"
      @click="gotoBlogPage(notification.data?.id, notification)"
      class="d-flex my-3 notificationbox"
    >
      <img
        src="../../assets/sayat6.jpg"
        class="img-fluid radius-circled ms-1"
        alt="mentors profile photo"
      />
      <div class="ms-3 me-1">
        <p>Maza Mamaru</p>
        <p>New blog is posted</p>
        <p :class="{ textprimary: !notification.read_at }">
          {{ formatingTime(notification.created_at) }}
        </p>
      </div>
    </div> -->
    <!-- role model notifications -->
    <!-- <h5 class="text-primary ms-3 mt-3">Role Model Notifications</h5>
    <div
      v-for="notification in adminNotificatins.rolemodel"
      :key="notification.id"
      @click="gotoRoleModelPage(notification.data.id, notification)"
      class="d-flex my-3 notificationbox"
    >
      <img
        src="../../assets/sayat4.jpg"
        class="img-fluid radius-circled ms-1"
        alt="mentors profile photo"
      />
      <div class="ms-3 me-1">
        <p>Woyinshet Shegaw</p>
        <p>New Role Model is posted</p>
        <p :class="{ textprimary: !notification.read_at }">
          {{ formatingTime(notification.created_at) }}
        </p>
      </div>
    </div> -->
  </div>
</template>
<script>
import apiClient from "../../components/baseurl";

export default {
  emits: {
    closeNotification() {
      return true;
    },
  },
  data() {
    return {
      adminNotificatins: [],
    };
  },
  computed: {
    notifications() {
      this.setNotifications();
      return this.$store.getters["admin/notifications"];
    },
  },
  watch: {
    notifications(newValue) {
      this.adminNotificatins = newValue;
    },
  },
  methods: {
    setNotifications() {
      this.adminNotificatins = this.$store.getters["admin/notifications"];
      console.log("admin notification", this.adminNotificatins);
    },
    viewMessage(notification) {
      if (notification.data.type === "mentor") {
        this.gotoMentorPage(notification);
      } else if (notification.data.type === "blog") {
        this.gotoBlogPage(notification);
      } else if (notification.data.type === "rolemodel") {
        this.gotoRoleModelPage(notification);
      }
      console.log("notification type = ", notification.data.type);
      this.closeNotificationDialog();
      this.markAsRead(notification);
      notification.read_at = new Date();
    },
    gotoMentorPage() {
      this.$router.push({ name: "MentorPage" });
    },
    gotoBlogPage(notification) {
      this.$router.push({
        name: "BlogDetail",
        params: { blogId: notification.data.content.id },
      });
    },
    gotoRoleModelPage(notification) {
      this.$router.push({
        name: "RoleModelDetail",
        params: { roleModelId: notification.data?.content?.id },
      });
    },
    closeNotificationDialog() {
      this.$emit("closeNotification");
    },
    markAsRead(notification) {
      // var notificationId = encodeURI(notification.id);
      // console.log("notification id = ", notification.id);
      try {
        var response = apiClient.get(`api/mark_as_read/${notification.id}`);
        if (response.status === 200) {
          // this.$store.commit("admin/setNotifications", response.data);
          notification.read_at = new Date();
        }
      } catch (err) {
        console.log("error");
      }
    },
    markAllAsRead() {
      try {
        var response = apiClient.get("api/mark_all_as_read");
        if (response.status === 200) {
          this.$store.commit("admin/setNotifications", response.data);
        }
      } catch (err) {
        console.log("error");
      }
    },
    filterUnReadNotification() {
      this.adminNotificatins = this.notifications.filter((notification) => {
        notification.read_at === null;
      });
    },
    allNotification() {
      this.adminNotificatins = this.notifications;
    },
    formatingTime(createdAt) {
      var createdDate = new Date(createdAt);
      var dateNow = new Date();
      var createdseconds = Math.floor(createdDate.getTime() / 1000);
      var secondNow = Math.floor(dateNow.getTime() / 1000);

      console.log("createdDate =  ", createdDate);
      console.log("dateNow =  ", dateNow);
      var seconds = createdseconds - secondNow;
      console.log("seconds = ", seconds);
      var years = Math.floor(seconds / 31536000);
      var weeks = Math.floor(seconds / 604800);
      var days = Math.floor(seconds / 86400);
      var hours = Math.floor(seconds / 3600);
      var minuts = Math.floor(seconds / 60);
      var second = seconds;
      var yearDisplay =
        years > 0 ? years + (years == 1 ? " year ago, " : " years ago") : 0;
      var weekDisplay =
        weeks > 0 ? weeks + (weeks == 1 ? " week ago, " : " weeks ago") : 0;
      var dDisplay =
        days > 0 ? days + (days == 1 ? " day ago, " : " days ago") : 0;
      var hDisplay =
        hours > 0 ? hours + (hours == 1 ? " hour ago, " : " hours ago") : 0;
      var mDisplay =
        minuts > 0
          ? minuts + (minuts == 1 ? " minute ago, " : " minutes ago")
          : 0;
      var sDisplay =
        second > 0
          ? second + (second == 1 ? " second ago" : " seconds ago")
          : 0;
      if (years > 0) {
        return yearDisplay;
      } else if (weeks > 0) {
        return weekDisplay;
      } else if (days > 0) {
        return dDisplay;
      } else if (hours > 0) {
        return hDisplay;
      } else if (minuts > 0) {
        return mDisplay;
      } else {
        return sDisplay;
      }
    },
  },
};
</script>
<style scoped>
.dropdownbtn {
  background: none;
  border: none;
}
li:hover {
  background-color: aliceblue;
  cursor: pointer;
}
.notificationbox:hover {
  background-color: aliceblue;
  cursor: pointer;
}
img {
  min-width: 3rem;
  min-height: 3rem;
  max-width: 3rem;
  max-height: 3rem;
  border-radius: 50%;
}
p {
  padding: 0;
  margin: 0;
}
.textprimary {
  color: blue;
}
</style>
