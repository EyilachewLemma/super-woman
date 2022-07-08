<template>
  <div class="col-md-3 mx-auto border rounded-1 px-3 pt-3 pb-5 mt-5">
    <h4 class="mt-2 mx-auto">SuperWoman</h4>

    <!-- loign form -->
    <form class="pt-1" @submit.prevent="submitNewPassword()">
      <div
        class="mb-2"
        :class="{ warining: v$.userCrediantail.new_password.$error }"
      >
        <label for="#name" class="form-label">Newpassword</label>
        <input
          class="form-control"
          v-model="userCrediantail.new_password"
          id="name"
          type="password"
          aria-label=".form-control-lg"
          @blur="v$.userCrediantail.new_password.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.userCrediantail.new_password.$errors"
          :key="index"
          >{{ error.$message + ", " }}</span
        >
      </div>
      <div
        class="mb-4"
        :class="{ warining: v$.userCrediantail.confirmPassword.$error }"
      >
        <label for="#password" class="form-label">Confirm Password</label>
        <div class="d-flex position-relative">
          <input
            class="form-control"
            v-model="userCrediantail.confirmPassword"
            id="password"
            type="password"
            aria-label=".form-control-lg"
            @blur="v$.userCrediantail.confirmPassword.$touch"
          />
          <!-- <i
            @click="toggleShowPassword"
            class="position-absolute end-0 mx-2 mt-2 far"
            :class="isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'"
          ></i> -->
        </div>
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.userCrediantail.confirmPassword.$errors"
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
            <span>Saving</span>
          </span>
          <span v-else>Save Password</span>
        </button>
      </div>
      <div class="mt-2">
        <p class="text-danger text-center small">{{ notify }}</p>
      </div>
    </form>

    <!-- forgot password form -->
    <!-- <form v-if="isForgotSelected" class="pt-1" @submit.prevent="forgotPassword">
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
    </form> -->
    <!-- <div class="mb-2 d-flex justify-content-end">
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
    </div> -->
  </div>
</template>

<script>
import { required, helpers, sameAs } from "@vuelidate/validators";
import useValidate from "@vuelidate/core";
import apiClient from "../../components/baseurl/index";
// import fileApiClient from "../../components/baseurl/multipart";
export default {
  props: ["token"],
  data() {
    return {
      //   isForgotSelected: false,
      v$: useValidate(),
      userCrediantail: {
        new_password: "",
        confirmPassword: "",
      },
      isLoading: false,
      notify: "",
    };
  },

  validations() {
    return {
      userCrediantail: {
        new_password: {
          required: helpers.withMessage(
            "new password can't be empty",
            required
          ),
        },
        confirmPassword: {
          sameAS: helpers.withMessage(
            "password does not match",
            sameAs(this.userCrediantail.new_password)
          ),
          required: helpers.withMessage(
            "confirm Password can't be empty",
            required
          ),
        },
      },
    };
  },
  methods: {
    // toggleShowPassword() {
    //   this.isPasswordVisible = !this.isPasswordVisible;
    // },
    // async forgotPassword() {
    //   this.notify = "";
    //   this.forgotSuccessMessage = "";
    //   this.v$.emailForForgot.$validate();
    //   if (!this.v$.emailForForgot.$error) {
    //     this.isLoading = true;
    //     try {
    //       const response = await apiClient.post("/api/forgot", {
    //         email: this.emailForForgot,
    //       });
    //       if (response.status == 200) {
    //         this.forgotSuccessMessage =
    //           "We have sent verfication link. Check your inbox please!";
    //       }
    //     } catch (e) {
    //       this.notify = "Failed";
    //     } finally {
    //       this.isLoading = false;
    //     }
    //   }
    // },
    async submitNewPassword() {
      this.notify = "";
      this.v$.userCrediantail.$validate();
      if (!this.v$.userCrediantail.$error) {
        this.isLoading = true;
        try {
          var response = await apiClient.post(
            `/api/reset_password/${this.token}`,
            this.userCrediantail
          );
          if (response.status === 200) {
            this.$router.push({ name: "Login" });
          } else {
            throw "faild to save new password";
          }
        } catch (e) {
          this.notify = "Faild to save new password";
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
