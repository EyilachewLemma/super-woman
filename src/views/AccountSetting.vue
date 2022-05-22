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
          src="../assets/sayat.jpg"
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
        <!-- <button class="saveprofile btn" @click="saveProfilePicture()">
        save profile <picture></picture>
      </button> -->
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
      <div class="d-flex" :class="{ warning: v$.personalInfo.city.$error }">
        <p class="me-3">Location</p>
        <input
          type="text"
          class="nameField form-control rounded-0 ms-auto align-self-start mt-1 px-3"
          id="location"
          :readonly="isEditInfo === false"
          ref="infoInput"
          v-model="personalInfo.city"
        />
        <span class="error-msg mt-1">{{
          v$.personalInfo.city.$errors[0]?.$message
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
        <div v-if="isOldPassword" class="oldPassword">
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
          <div class="d-flex justify-content-end">
            <base-button
              title="Submit"
              :isLoading="isLoading"
              @baseButton="checkOldPassword('1234')"
            ></base-button>
          </div>
        </div>
      </transition>
      <div v-if="isNewPassword" class="newPassword">
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
        <div class="d-flex justify-content-end">
          <base-button
            title="Save"
            :isLoading="isSavingNewPws"
            @baseButton="saveNewPassword()"
          ></base-button>
        </div>
      </div>
    </div>
  </div>
  <delete-modal
    id="deleteDialog"
    :isSuccess="isSucceessfull"
    :isOKRequired="false"
  >
    <template #modalBody>
      <div>{{ modalTitle }}</div>
    </template>
  </delete-modal>
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
import apiClient from "../components/baseurl/index.js";
import fileApiClient from "../components/baseurl/multipart";
// import Modal from 'bootstrap'
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
      isOldPassword: false,
      isNewPassword: false,
      personalInfo: {
        first_name: "Yeshiwas",
        last_name: "Bekele",
        phone_no: "0921321234",
        city: "Bahir Dar",
      },
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
        city: {
          required: helpers.withMessage("location can not be empty", required),
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
  //   mounted() {
  //    this.deletemodal = new Modal(document.getElementById('deleteDialog'))
  //  },
  methods: {
    editYourInfo() {
      this.isEditInfo = true;
      this.$refs.infoInput.focus();
      this.isNewInfo = true;
      this.isNewPassword = false;
      this.isOldPassword = false;
    },
    changePassword() {
      this.isNewInfo = false;
      this.isOldPassword = true;
      this.$refs.oldpwd.focus();
    },
    async saveNewInfo() {
      this.v$.$validate();
      var response;
      if (
        !this.v$.personalInfo.first_name.$error &&
        !this.v$.personalInfo.last_name.$error &&
        !this.v$.personalInfo.phone_no.$error &&
        !this.v$.personalInfo.city.$error
      ) {
        this.isInfoLoading = true;
        try {
          response = await apiClient.post("api/edited_info", this.personalInfo);
          if (response.status === 200) {
            this.isSucceessfull = true;
            this.modalTitle = `Your have Edited Successfully`;
            this.deletemodal.show();
            this.isEditInfo = false;
          }
        } catch (e) {
          this.isSucceessfull = false;
          this.modalTitle = `Faild to Edit`;
          this.deletemodal.show();
        } finally {
          this.isInfoLoading = false;
        }
      }
    },
    checkOldPassword(oldPassword) {
      this.v$.$validate();
      if (!this.v$.oldPassword.$error && this.oldPassword === oldPassword) {
        this.isNewInfo = false;
        this.isOldPassword = false;
        this.v$.$reset();
        this.isNewPassword = true;
        // this.$refs.newpwd.focus()
        console.log("password is cheked=");
      }
    },
    async saveNewPassword() {
      this.v$.$validate();
      if (!this.v$.newPassword.$error && !this.v$.confirmPassword.$error) {
        this.isSavingNewPws = true;
        try {
          var response = await apiClient.post("api/new_password");
          if (response.status === 200) {
            this.isSucceessfull = true;
            this.modalTitle = `Your Pssword is Changed Successfully`;
            this.deletemodal.show();
            this.isEditInfo = false;
            this.cancelDialog();
          }
        } catch (e) {
          this.isSucceessfull = false;
          this.modalTitle = `Faild to change Password`;
          this.deletemodal.show();
        } finally {
          this.isSavingNewPws = false;
        }
      }
    },
    async saveProfilePicture() {
      this.isProfileSaving = true;
      try {
        var formData = new FormData();
        formData.append("profile_picture", this.imageFile);
        var response = await fileApiClient.post(
          "api/profile_picture",
          formData
        );
        if (response.status === 201) {
          console.log("saved");
          this.image = false;
        }
      } catch (e) {
        console.log("faild to save profile picture");
      } finally {
        this.isProfileSaving = false;
      }
    },
    cancelProfile() {
      this.image = false;
    },
    cancelDialog() {
      this.isNewInfo = false;
      this.isOldPassword = false;
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
    // applyImage() {
    //   let reader = new FileReader();
    //   reader.onload = () => {
    //     this.imageFile.src = reader.result;
    //   };
    //   reader.readAsDataURL(this.imageFile);
    // },
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
