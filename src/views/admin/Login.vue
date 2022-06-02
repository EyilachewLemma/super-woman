<template>
  <div class="col-md-3 mx-auto border rounded-1 px-3 pt-3 mt-5">
    <h4 class="mt-2 mx-auto">SuperWoman</h4>

    <!-- loign form -->
    <form v-if="!isForgotSelected" class="pt-1" @submit.prevent="login">
      <div class="mb-2" :class="{ warining: v$.userCrediantail.email.$error }">
        <label for="#name" class="form-label">Email</label>
        <input
          class="form-control"
          v-model="userCrediantail.email"
          id="name"
          type="text"
          aria-label=".form-control-lg"
          @blur="v$.userCrediantail.email.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.userCrediantail.email.$errors"
          :key="index"
          >{{ error.$message + ", " }}</span
        >
      </div>
      <div
        class="mb-4"
        :class="{ warining: v$.userCrediantail.password.$error }"
      >
        <label for="#password" class="form-label">Password</label>
        <div class="d-flex position-relative">
          <input
            class="form-control"
            v-model="userCrediantail.password"
            id="password"
            :type="isPasswordVisible ? 'text' : 'password'"
            aria-label=".form-control-lg"
            @blur="v$.userCrediantail.password.$touch"
          />
          <i
            @click="toggleShowPassword"
            class="position-absolute end-0 mx-2 mt-2 far"
            :class="isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'"
          ></i>
        </div>
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.userCrediantail.password.$errors"
          :key="index"
          >{{ error.$message + ", " }}</span
        >
      </div>

      <div class="d-grid gap-2">
        <button class="btn text-white" type="submit">
          <span v-if="isLoading">
            <span
              class="spinner-border spinner-border-sm mx-2"
              role="status"
              aria-hidden="true"
            ></span>
            <span>Signing</span>
          </span>
          <span v-else>Sign in</span>
        </button>
        <p class="text-danger text-center small">{{ notify }}</p>
      </div>
    </form>

    <!-- forgot password form -->
    <form v-if="isForgotSelected" class="pt-1" @submit.prevent="forgotPassword">
      <div class="mb-2" :class="{ warining: v$.emailForForgot.$error }">
        <label for="#name" class="form-label">Email</label>
        <input
          class="form-control"
          v-model="emailForForgot"
          id="name"
          type="text"
          aria-label=".form-control-lg"
          @blur="v$.emailForForgot.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.emailForForgot.$errors"
          :key="index"
          >{{ error.$message + ", " }}</span
        >
      </div>

      <div class="d-grid gap-2">
        <button class="btn text-white" type="submit">
          <span v-if="isLoading">
            <span
              class="spinner-border spinner-border-sm mx-2"
              role="status"
              aria-hidden="true"
            ></span>
            <span>Forgot Password</span>
          </span>
          <span v-else>Forgot password</span>
        </button>
        <p class="text-danger text-center small">{{ notify }}</p>
        <p class="text-center">{{ forgotSuccessMessage }}</p>
      </div>
    </form>
    <div class="mb-2 d-flex justify-content-end">
      <a
        v-if="!isForgotSelected"
        role="button"
        @click="toggleFormType"
        class="nav-link d-inline"
        >Forgot password</a
      >
      <a
        v-if="isForgotSelected"
        role="button"
        @click="toggleFormType"
        class="nav-link d-inline"
        >Login</a
      >
    </div>
  </div>
</template>

<script>
import { required, helpers, email } from "@vuelidate/validators";
import useValidate from "@vuelidate/core";
import apiClient from "../../components/baseurl/index";
// import fileApiClient from "../../components/baseurl/multipart";
export default {
  data() {
    return {
      isForgotSelected: false,
      v$: useValidate(),
      userCrediantail: {
        email: "",
        password: "",
      },
      emailForForgot: "",
      forgotSuccessMessage: "",
      isPasswordVisible: false,
      isLoading: false,
      notify: "",
    };
  },

  validations() {
    return {
      userCrediantail: {
        email: {
          email,
          required: helpers.withMessage("Email can't be empty", required),
        },
        password: {
          required: helpers.withMessage("Password can't be empty", required),
        },
      },
      emailForForgot: {
        email,
        required,
      },
    };
  },
  methods: {
    toggleFormType() {
      if (this.isLoading) return;
      this.isForgotSelected = !this.isForgotSelected;
      this.notify = "";
      this.userCrediantail = {};
      this.emailForForgot = "";
      this.v$.$reset();
    },
    toggleShowPassword() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
    async forgotPassword() {
      this.notify = "";
      this.forgotSuccessMessage = "";
      this.v$.emailForForgot.$validate();
      if (!this.v$.emailForForgot.$error) {
        this.isLoading = true;
        try {
          const response = await apiClient.post("/api/forgot", {
            email: this.emailForForgot,
          });
          if (response.status == 200) {
            this.forgotSuccessMessage =
              "We have sent verfication link. Check your inbox please!";
          }
        } catch (e) {
          this.notify = "Failed";
        } finally {
          this.isLoading = false;
        }
      }
    },
    async login() {
      this.notify = "";
      this.v$.userCrediantail.$validate();
      if (!this.v$.userCrediantail.$error) {
        this.isLoading = true;
        try {
          var response = await apiClient.post(
            "/api/login",
            this.userCrediantail
          );
          if (response.status === 200) {
            // let toPath= this.$route.query.to || '/staff'
            apiClient.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${response.data.access_token}`;
            // fileApiClient.defaults.headers.common[
            //   "Authorization"
            // ] = `Bearer ${response.data.access_token}`;
            this.$store.commit("setToken", response.data.access_token);
            this.$store.commit("setUser", response.data.user);
            this.$store.commit("setIsAuthenticated", true);
            let user = response.data.user;

            localStorage.setItem("tokenB", response.data.access_token);
            localStorage.setItem("user", JSON.stringify(user));

            let toPath = this.$router.to || "/dash-board";
            this.$router.push(toPath);
          } else {
            throw "faild" + response.status;
          }
        } catch (e) {
          this.notify = "Faild to login, check your email and password";
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
};
</script>
<style scoped>
.btn {
  background-color: #2f4587;
}
</style>
