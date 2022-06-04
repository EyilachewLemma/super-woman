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
          <li @click="markAsRead()">
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
      <h5 class="text-primary ms-3 mt-3">Mentor Request</h5>
      <div
        v-for="notification in notifications.mentor"
        :key="notification.id"
        @click="gotoMentorPage()"
        class="d-flex my-3 notificationbox"
      >
        <img
          src="../../assets/sayat1.jpg"
          class="img-fluid radius-circled ms-1"
          alt="mentors profile photo"
        />
        <div class="ms-3 me-1">
          <p>Abebe Yimer</p>
          <p>Requeste to be a mentor</p>
          <p class="text-primary">
            {{ formatingTime(notification.created_at) }}
          </p>
        </div>
      </div>
    </div>
    <!-- blog notifications -->
    <h5 class="text-primary ms-3 mt-3">Blog Notifications</h5>
    <div
      v-for="notification in notifications.blog"
      :key="notification.id"
      @click="gotoBlogPage(notification.data?.id)"
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
        <p class="text-primary">{{ formatingTime(notification.created_at) }}</p>
      </div>
    </div>
    <!-- role model notifications -->
    <h5 class="text-primary ms-3 mt-3">Role Model Notifications</h5>
    <div
      v-for="notification in notifications.rolemodel"
      :key="notification.id"
      @click="gotoRoleModelPage(notification.data.id)"
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
        <p class="text-primary">{{ formatingTime(notification.created_at) }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  emits: {
    closeNotification() {
      return true;
    },
  },
  computed: {
    notifications() {
      return this.$store.getters["admin/notifications"];
    },
  },
  methods: {
    gotoMentorPage() {
      this.$router.push({ name: "MentorPage" });
      this.$emit("closeNotification");
    },
    gotoBlogPage(blogId) {
      this.$router.push({ name: "BlogDetail", params: { blogId: blogId } });
      this.$emit("closeNotification");
    },
    gotoRoleModelPage(roleModelId) {
      this.$router.push({
        name: "RoleModelDetail",
        params: { roleModelId: roleModelId },
      });
      this.$emit("closeNotification");
    },
    markAsRead() {},
    filterUnReadNotification() {},
    allNotification() {},
    formatingTime(createdAt) {
      var seconds = Number(new Date(createdAt));
      var year = Math.floor(seconds / 31536000);
      var weeks = Math.floor(seconds / 604800);
      var days = Math.floor(seconds / (3600 * 24));
      var hours = Math.floor((seconds % (3600 * 24)) / 3600);
      var minuts = Math.floor((seconds % 3600) / 60);
      var second = Math.floor(seconds % 60);
      var yearDisplay =
        year > 0 ? year + (year == 1 ? " year ago, " : " years ago") : 0;
      var weekDisplay =
        weeks > 0 ? weeks + (weeks == 1 ? " week ago, " : " weeks ago") : 0;
      var dDisplay = days > 0 ? days + (days == 1 ? " day ago, " : " days ago") : 0;
      var hDisplay =
        hours > 0 ? hours + (hours == 1 ? " hour ago, " : " hours ago") : 0;
      var mDisplay =
        minuts > 0 ? minuts + (minuts == 1 ? " minute ago, " : " minutes ago") : 0;
      var sDisplay =
        second > 0 ? second + (second == 1 ? " second ago" : " seconds ago") : 0;
      if (year > 0) {
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
</style>
