<template>
  <div class="sidbar-menu d-flex flex-column px-3">
    <router-link
      :to="{ name: 'DashBoard' }"
      class="dash-board sidbar-item rounded mt-3 d-flex"
    >
      <div class="icon ms-3 fs-4"><i class="fas fa-th-large"></i></div>
      <div class="label ms-2 mt-1 p-1">Dash Board</div>
    </router-link>
    <router-link
      :to="{ name: 'RoleModel' }"
      class="role-model sidbar-item rounded mt-2 d-flex"
    >
      <div class="icon ms-3 fs-4"><i class="fas fa-user-graduate"></i></div>
      <div class="label ms-2 mt-1 p-1">Role Model</div>
    </router-link>
    <router-link
      :to="{ name: 'BlogPage' }"
      class="blog sidbar-item rounded mt-2 d-flex"
    >
      <div class="icon ms-3 fs-4"><i class="fas fa-align-right"></i></div>
      <div class="label ms-2 mt-1 p-1">Blog</div>
    </router-link>
    <router-link
      :to="{ name: 'MentorPage' }"
      class="mentor sidbar-item rounded mt-2 d-flex"
    >
      <div class="icon ms-3 fs-4"><i class="fas fa-user-tie"></i></div>
      <div class="label ms-2 mt-1 p-1">Mentor</div>
    </router-link>
    <router-link
      :to="{ name: 'WriterPage' }"
      class="writer sidbar-item rounded mt-2 d-flex"
    >
      <div class="icon ms-3 fs-4"><i class="fas fa-keyboard"></i></div>
      <div class="label ms-2 mt-1 p-1">Writer</div>
    </router-link>
    <router-link
      :to="{ name: 'UserPage' }"
      class="user sidbar-item rounded mt-2 d-flex"
    >
      <div class="icon ms-3 fs-4"><i class="fas fa-users"></i></div>
      <div class="label ms-2 mt-1 p-1">User</div>
    </router-link>
    <router-link
      :to="{ name: 'FieldPage' }"
      class="field sidbar-item rounded mt-2 d-flex"
    >
      <div class="icon ms-3 fs-4"><i class="fas fa-layer-group"></i></div>
      <div class="label ms-2 mt-1 p-1">Field</div>
    </router-link>
    <router-link
      :to="{ name: 'SettingPage' }"
      class="setting sidbar-item rounded mt-2 d-flex"
    >
      <div class="icon ms-3 fs-4"><i class="fas fa-cog"></i></div>
      <div class="label ms-2 mt-1 p-1">Setting</div>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isDashboard: true,
    };
  },
  methods: {},
};
</script>
<style scoped>
.sidbar-menu {
  background-color: #ecf1fe;
}
/* .dash-board:focus, .role-model:focus,.blog:focus,.mentor:focus,.user:focus,.writer:focus,.setting:focus,.field:focus{
background-color: #e7453a;
color: #fff;
} */
.active {
  background-color: #e7453a;
  color: #fff;
}
a {
  text-decoration: none;
  color: #000;
}
</style>
