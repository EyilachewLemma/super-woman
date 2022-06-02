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
        v-for="n in 4"
        :key="n"
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
          <p class="text-primary">2 hours ago</p>
        </div>
      </div>
    </div>
    <!-- blog notifications -->
    <h5 class="text-primary ms-3 mt-3">Blog Notifications</h5>
    <div
      v-for="n in 2"
      :key="n"
      @click="gotoBlogPage()"
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
        <p class="text-primary">1 hours ago</p>
      </div>
    </div>
    <!-- role model notifications -->
    <h5 class="text-primary ms-3 mt-3">Role Model Notifications</h5>
    <div
      v-for="n in 3"
      :key="n"
      @click="gotoRoleModelPage()"
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
        <p class="text-primary">3 hours ago</p>
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
    Notifications() {
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
