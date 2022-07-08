<template>
  <router-view/>
</template>
<script>
import apiClient from './components/baseurl/index';
import fileApiClient from './components/baseurl/multipart'
export default {
  created() {
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
}
</script>
<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  }
#app {
  font-family: 'mulish', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
}
.warining input {
  border: 1px red solid;
}
.warining span {
  display: inline;
  color: red;
  font-size: 14px;
}
</style>
