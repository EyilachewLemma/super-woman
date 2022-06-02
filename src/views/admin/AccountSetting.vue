<template>
  <div class="border rounded shadow-sm">
    <div class="d-flex position-relative">
      <button @click="cancelDialog()" class="cancelDialog ms-auto fs-4">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="profileImg text-center mt-3">
      <div class="position-relative profile_photo">
        <img
          v-if="!image"
          :src="user.profile_picture"
          alt="admin profile picture"
          class="img-fluid radius-circled"
        />
        <img
          v-else
          id="profile_img"
          alt="admin profile picture"
          class="img-fluid radius-circled"
        />
        <button @click="editYourInfo()" class="editBtn fs-4">
          <i class="fas fa-edit"></i>
        </button>
      </div>
      <div>
        <input
          type="file"
          class="form-control"
          id="editprofile"
          ref="profileImage"
          accept="image/.*"
          @change="fileHandler($event)"
        />
      </div>
      <label for="editprofile" class="form-label">
        <span class="btn text-primary small"><u>change Profile</u></span>
      </label>
      <button
        @click="changePassword()"
        class="passwordBtn text-primary ms-auto small"
      >
        <u>Change Password</u>
      </button>
    </div>
    <transition mode="out-in">
      <div v-if="image" class="d-flex justify-content-between mx-5">
        <base-button
          title="Save"
          :isLoading="isProfileSaving"
          @baseButton="saveProfilePicture()"
        ></base-button>
        <button class="cancelprofile btn" @click="cancelProfile()">
          cancel
        </button>
      </div>
    </transition>
    <hr />
    <div class="m-3 p-2">
      <div
        class="d-flex"
        :class="{ warning: v$.personalInfo.first_name.$error }"
      >
        <p class="me-3">First Name</p>
        <input
          type="text"
          class="nameField form-control rounded-0 ms-auto align-self-start mt-1 px-3"
          id="fname"
          :readonly="isEditInfo === false"
          ref="infoInput"
          v-model="personalInfo.first_name"
        />
        <span class="error-msg mt-1">{{
          v$.personalInfo.first_name.$errors[0]?.$message
        }}</span>
      </div>
      <div
        class="d-flex"
        :class="{ warning: v$.personalInfo.last_name.$error }"
      >
        <p class="me-3">Last Name</p>
        <input
          type="text"
          class="nameField form-control rounded-0 ms-auto align-self-start mt-1 px-3"
          id="lname"
          :readonly="isEditInfo === false"
          ref="infoInput"
          v-model="personalInfo.last_name"
        />
        <span class="error-msg mt-1">{{
          v$.personalInfo.last_name.$errors[0]?.$message
        }}</span>
      </div>
      <div class="d-flex" :class="{ warning: v$.personalInfo.phone_no.$error }">
        <p class="me-3">Phone Number</p>
        <input
          type="tel"
          class="nameField form-control rounded-0 ms-auto align-self-start mt-1 px-3"
          id="phoneno"
          :readonly="isEditInfo === false"
          ref="infoInput"
          v-model="personalInfo.phone_no"
        />
        <span class="error-msg mt-1">{{
          v$.personalInfo.phone_no.$errors[0]?.$message
        }}</span>
      </div>
      <transition mode="out-in">
        <div v-if="isNewInfo" class="d-flex justify-content-between mx-5 mt-3">
          <base-button
            title="Save"
            :isLoading="isInfoLoading"
            @baseButton="saveNewInfo()"
          ></base-button>
          <button class="btn cancelprofile" @click="cancelInfoEditing()">
            Cancel
          </button>
        </div>
      </transition>
      <transition mode="out-in">
        <div v-if="isNewPassword" class="oldPassword">
          <div class="mb-3 mt-3" :class="{ warning: v$.oldPassword.$error }">
            <label for="oldpws" class="form-label">Enter Old Password</label>
            <input
              type="password"
              class="form-control"
              id="oldpws"
              ref="oldpwd"
              v-model="oldPassword"
            />
            <span class="error-msg mt-1">{{
              v$.oldPassword.$errors[0]?.$message
            }}</span>
          </div>
          <div class="mb-3 mt-3" :class="{ warning: v$.newPassword.$error }">
            <label for="newpws" class="form-label">Enter New Password</label>
            <input
              type="password"
              class="form-control"
              id="newpws"
              ref="newpwd"
              v-model="newPassword"
            />
            <span class="error-msg mt-1">{{
              v$.newPassword.$errors[0]?.$message
            }}</span>
          </div>
          <div class="mb-3" :class="{ warning: v$.confirmPassword.$error }">
            <label for="confirmpws" class="form-label"
              >Confirm New Password</label
            >
            <input
              type="password"
              class="form-control"
              id="confirmpws"
              v-model="confirmPassword"
            />
            <span class="error-msg mt-1">{{
              v$.confirmPassword.$errors[0]?.$message
            }}</span>
          </div>
          <div class="d-flex justify-content-between mx-5 mt-3">
            <base-button
              title="Save"
              :isLoading="isSavingNewPws"
              @baseButton="saveNewPassword()"
            ></base-button>
            <button class="btn cancelprofile" @click="cancelPasswordEditing()">
              Cancel
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import useValidate from "@vuelidate/core";
import {
  required,
  helpers,
  minLength,
  maxLength,
  sameAs,
} from "@vuelidate/validators";
import apiClient from "../../components/baseurl/index";
import axios from "axios";
export default {
  props: {},
  emits: {
    cancelModal() {
      return true;
    },
  },
  data() {
    return {
      v$: useValidate(),
      isEditInfo: false,
      isSavingNewPws: false,
      isInfoLoading: false,
      isProfileSaving: false,
      isNewInfo: false,
      isNewPassword: false,
      personalInfo: {},
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      isSucceessfull: false,
      modalTitle: "",
      incorrectPassword: false,
      deletemodal: null,
      image: false,
      imageFile: "",
    };
  },
  validations() {
    return {
      personalInfo: {
        first_name: {
          required: helpers.withMessage(
            "first name can not be empty",
            required
          ),
        },
        last_name: {
          required: helpers.withMessage("last name can not be empty", required),
        },
        phone_no: {
          required: helpers.withMessage(
            "phone number can not be empty",
            required
          ),
          min: helpers.withMessage(
            "number of digits must be equal to 10",
            minLength(10)
          ),
          max: helpers.withMessage(
            "number of digits must be equal to 10",
            maxLength(10)
          ),
        },
      },
      oldPassword: {
        required: helpers.withMessage("plsase enter your password", required),
      },
      newPassword: {
        required: helpers.withMessage("enter your New password", required),
      },
      confirmPassword: {
        required: helpers.withMessage("your password is not mutch", required),
        sameAsnewPassword: sameAs(this.newPassword),
      },
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  created() {
    this.personalInfo.first_name = this.user.first_name;
    this.personalInfo.last_name = this.user.last_name;
    this.personalInfo.phone_no = this.user.phone_no;
  },
  watch: {
    user() {
      this.personalInfo.first_name = this.user.first_name;
      this.personalInfo.last_name = this.user.last_name;
      this.personalInfo.phone_no = this.user.phone_no;
    },
  },
  methods: {
    editYourInfo() {
      this.isEditInfo = true;
      this.$refs.infoInput.focus();
      this.isNewInfo = true;
      this.isNewPassword = false;
      this.image = false;
    },
    changePassword() {
      this.isNewInfo = false;
      this.isNewPassword = true;
    },
    async saveNewInfo() {
      this.v$.$validate();
      var response;
      if (
        !this.v$.personalInfo.first_name.$error &&
        !this.v$.personalInfo.last_name.$error &&
        !this.v$.personalInfo.phone_no.$error
      ) {
        this.isInfoLoading = true;
        var user = {
          first_name: this.personalInfo.first_name,
          last_name: this.personalInfo.last_name,
          phone_no: this.personalInfo.phone_no,
        };
        try {
          response = await apiClient.put(`api/employees/${this.user.id}`, user);
          console.log("status code=", response.status);
          if (response.status === 200) {
            this.isEditInfo = false;
            var editedUser = {
              id: this.user.id,
              first_name: response.data.first_name,
              last_name: response.data.last_name,
              phone_no: response.data.phone_no,
              profile_picture: this.user.profile_picture,
            };
            this.$store.commit("setUser", editedUser);
            this.$toast.success(`successfully edited`);
            // console.log("edited user ", user);
            // console.log("response data= ", response.data);
            this.isNewInfo = false;
          }
        } catch (e) {
          this.$toast.error(`Faild to Edit your informaion`);
        } finally {
          this.isInfoLoading = false;
        }
      }
    },
    async saveNewPassword() {
      this.v$.$validate();
      if (
        !this.v$.newPassword.$error &&
        !this.v$.oldPassword.$error &&
        !this.v$.confirmPassword.$error
      ) {
        this.isSavingNewPws = true;
        var password = {
          new_password: this.newPassword,
          old_password: this.oldPassword,
        };
        try {
          var response = await apiClient.post(`api/change_password`, password);
          if (response.status === 200) {
            this.$toast.success(`your password is changed`);
            this.isNewPassword = false;
            this.cancelDialog();
          }
        } catch (e) {
          this.$toast.error(`Faild to change your password`);
        } finally {
          this.isSavingNewPws = false;
        }
      }
    },
    async saveProfilePicture() {
      this.isProfileSaving = true;
      try {
        var token = localStorage.getItem("tokenB");
        console.log("token = ", token);
        console.log("loged in user= ", this.user);
        var formData = new FormData();
        formData.append("profile", this.imageFile);
        var response = await axios.post(
          `http://10.161.160.238:8000/api/change_profile/${this.user.id}`,
          formData,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          // console.log("profile picture saved");
          this.$store.commit("setUser", response.data);
          this.$toast.success(`your profile picture changed`);
          this.image = false;
          // console.log("user = ", this.$store.getters.user);
          // console.log("user data =", response.data);
        }
      } catch (e) {
        this.$toast.error(`Faild to change profile picture`);
      } finally {
        this.isProfileSaving = false;
      }
    },
    cancelProfile() {
      this.image = false;
    },
    cancelDialog() {
      this.isNewInfo = false;
      this.isNewPassword = false;
      this.isEditInfo = false;
      this.$emit("cancelModal");
    },
    fileHandler(e) {
      var reader = new FileReader();
      reader.onload = function () {
        var output = document.getElementById("profile_img");
        output.src = reader.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      this.image = true;
      this.imageFile = e.target.files[0];
    },
    cancelInfoEditing() {
      this.isNewInfo = false;
    },
    cancelPasswordEditing() {
      this.isNewPassword = false;
    },
  },
};
</script>
<style scoped>
img {
  min-width: 5rem;
  min-height: 5rem;
  max-width: 5rem;
  max-height: 5rem;
  border-radius: 50%;
}
.editBtn {
  position: absolute;
  top: 7%;
  right: 20%;
  background: none;
  border: none;
}
.cancelDialog {
  position: absolute;
  top: 3%;
  right: 7%;
  background: none;
  border: none;
}
.editBtn:hover,
.cancelDialog:hover {
  color: #eb9713;
}
.saveprofile {
  background-color: #eb9713;
  color: white;
}
.saveprofile:hover {
  background-color: #f7ad37;
}
.cancelprofile {
  background-color: white;
  border: 1px solid gray;
}
.cancelprofile:hover {
  background-color: rgb(145, 140, 140);
  color: white;
}
.nameField {
  width: 60%;
  background-color: #fff !important;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: none !important;
  padding: 0 !important;
}
.nameField:focus {
  box-shadow: none !important;
}
#editprofile {
  display: none;
}
.passwordBtn {
  background: none;
  border: none;
}
.warning input {
  border: 1px red solid;
}
.warning span {
  display: inline;
  color: red;
}
.v-enter-from {
  opacity: 0;
}
.v-enter-active {
  transition: all 0.8s ease-out;
}
.v-enter-to {
  opacity: 1;
}
.v-leave-from {
  opacity: 1;
}
.v-leave-active {
  transition: all 0.8s ease-out;
}
.v-leave-to {
  opacity: 0;
}
</style>
