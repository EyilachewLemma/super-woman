<template>
  <div @click="backPage()" class="ms-3 mt-3 fs-4">
    <i class="fas fa-chevron-left back-chevron"></i>
  </div>
  <div class="d-flex justify-content-between mt-2 mx-3">
    <div>
      <strong>{{ roleModelDetails.title }}</strong>
    </div>
    <div class="d-flex align-self-start">
      <base-button
        v-if="roleModelDetails.is_verified === 0"
        title="Verify"
        :isLoading="isLoading"
        @baseButton="verifyRoleModel(roleModelDetails)"
      ></base-button>
      <base-button
        v-else
        title="Unverify"
        :isLoading="isLoading"
        @baseButton="unVerifyRoleModel(roleModelDetails)"
      ></base-button>
      <!-- <button  @click="verifyRoleModel(roleModelDetails)" class="btn confirmbtn verify me-3">Verify</button> -->
      <button @click="editRoleModel()" class="btn edit me-3">Edit</button>
      <button @click="translateRoleModel()" class="btn edit me-3">Translate</button>
      <button
        @click="deleteRoleModel()"
        :disabled="isDeleteLoading"
        type="button"
        class="btn edit px-1"
      >
        <span v-if="isDeleteLoading">
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span
          >Deleting</span
        >
        <span v-else>Delete</span>
      </button>
      <!-- <button @click="deleteRoleModel()" class="btn edit">Delete</button> -->
    </div>
  </div>
  <div class="detail mx-3 mt-3">
    <div
      id="roleModelDetailImage"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            :src="roleModelDetails.images?.[0]?.path"
            class="d-block w-100 img-fluid"
            alt="role model image"
          />
        </div>
        <div
          v-for="(image, index) in slicedImages"
          :key="index"
          class="carousel-item"
        >
          <img
            :src="image.path"
            class="d-block w-100 img-fluid"
            alt="role model image"
          />
        </div>
      </div>
      <!-- <button class="carousel-control-prev" type="button" data-bs-target="#roleModelDetailImage" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#roleModelDetailImage" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button> -->
    </div>
  </div>
  <div class="indicator position-relative text-center p-2">
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#roleModelDetailImage"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        v-for="(image, index) in slicedImages"
        :key="index"
        type="button"
        data-bs-target="#roleModelDetailImage"
        :data-bs-slide-to="index + 1"
        :aria-label="'Slide' + index + 2"
      ></button>
      <!-- <button type="button" data-bs-target="#roleModelDetailImage" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#roleModelDetailImage" data-bs-slide-to="3" aria-label="Slide 4"></button> -->
    </div>
  </div>
  <div
    class="description m-3"
    id="content"
    v-html="roleModelDetails.content"
  ></div>
  <div class="horizontal position-relative pb-5">
    <hr />
    <div class="w-100 reviews d-flex p-3">
      <div class="me-5">
        <i class="fas fa-eye icon"></i> {{ roleModelDetails.view }}
      </div>
      <div class="me-5">
        <i class="fas fa-thumbs-up icon"></i> {{ roleModelDetails.like }}
      </div>
      <div class="me-5">
        <i class="fas fa-comment-alt icon"></i> {{ roleModelDetails.comment }}
      </div>
      <div class="me-5">
        <i class="fas fa-share icon"></i> {{ roleModelDetails.share }}
      </div>
      <div class="writer">
        Content written by
        {{
          roleModelDetails.written_by?.first_name +
          " " +
          roleModelDetails.written_by?.last_name
        }}
      </div>
    </div>
  </div>
  <delete-modal
    id="deleteModal"
    :isSuccess="state"
    :isOKRequired="false"
    :modalHeader="modalHeader"
  >
    <template #modalBody>
      <div>{{ modalTitle }}</div>
    </template>
  </delete-modal>
  <delete-modal
    id="deleteRoleModel"
    :isSuccess="false"
    :isOKRequired="true"
    :modalHeader="modalHeader"
    @yes="okDeleteRoleModel()"
  >
    <template #modalBody>
      <div>{{ modalTitle }}</div>
    </template>
  </delete-modal>
</template>
<script>
import apiClient from "../../components/baseurl/index.js";
import { Modal } from "bootstrap";
export default {
  props: ["roleModelId"],
  data() {
    return {
      roleModelDetails: {},
      slicedImages: [],
      isLoading: false,
      deleteModal: null,
      modalTitle: "",
      modalHeader: "",
      state: null,
      deleteRoleModelModal: null,
      isDeleteLoading: false,
    };
  },
  created() {
    this.fetchRoleModelDetails();
  },
  mounted() {
    this.deleteModal = new Modal(document.getElementById("deleteModal"));
    this.deleteRoleModelModal = new Modal(
      document.getElementById("deleteRoleModel")
    );
  },
  computed:{
     lang(){
      return this.$store.getters["admin/lang"];
    }
  },
  watch:{
    lang(){
    this.fetchRoleModelDetails();
    }
  },
  methods: {
    backPage() {
      this.$router.back();
    },
    async fetchRoleModelDetails() {
      this.$store.commit("setIsItemLoading", true);
      try {
        var response = await apiClient.get(`api/role_models/${this.roleModelId}?lang=${this.lang}`)
        if (response.status === 200) {
          this.roleModelDetails = response.data;
          if(this.roleModelDetails.images?.length){
          this.slicedImages = this.roleModelDetails.images.slice(1);
          }
          console.log("rolemodel detail =", response.data);
        }
      } finally {
        this.$store.commit("setIsItemLoading", false);
      }
    },
    async verifyRoleModel(roleModelDetails) {
      this.isLoading = true;
      try {
        var response = await apiClient.post(
          `api/rm_verify/${this.roleModelId}?verified=${1}`
        );
        if (response.status === 200) {
          console.log("is verified response = ", response.data);
          roleModelDetails.is_verified = 1;
          this.modalTitle = "Blog Verified Successfully";
          this.modalHeader = "Successful";
          this.state = true;
          this.deleteModal.show();
        }
      } catch (e) {
        this.modalTitle = "Faild to Verify Blog";
        this.modalHeader = "Faild";
        this.state = false;
        this.deleteModal.show();
      } finally {
        this.isLoading = false;
      }
    },
    async unVerifyRoleModel(roleModelDetails) {
      this.isLoading = true;
      try {
        var response = await apiClient.post(
          `api/rm_verify/${this.roleModelId}?verified=${0}`
        );
        if (response.status === 200) {
          console.log("is verified response = ", response.data);
          roleModelDetails.is_verified = 0;
          this.modalTitle = "Role Model Unverified Successfully";
          this.modalHeader = "Successful";
          this.state = true;
          this.deleteModal.show();
        }
      } catch (e) {
        this.modalTitle = "Faild To Unverify Role Model";
        this.modalHeader = "Faild";
        this.state = false;
        this.deleteModal.show();
      } finally {
        this.isLoading = false;
      }
    },
    editRoleModel() {
      this.$router.push({
        name: "EditRoleModel",
        params: { entity: "Role Model", roleModelId: this.roleModelId },
      });
    },
    translateRoleModel(){
      this.$router.push({
        name: "TranslateRolemodel",
        params: {roleModelId: this.roleModelId },query:{entity:'Role Model'}});
    },
    
    deleteRoleModel() {
      this.modalTitle = "Do you want to delete this Role Model ?";
      this.isSuccess = false;
      this.modalHeader = "Delete Role Model";
      this.deleteRoleModelModal.show();
    },
    async okDeleteRoleModel() {
      this.isDeleteLoading = true;
      try {
        var response = await apiClient.delete(
          `api/role_models/${this.roleModelId}`
        );
        if (response.status === 200) {
          this.$router.back();
        }
      } catch (e) {
        this.modalTitle = "Faild To Delete Role Model";
        this.isSuccess = false;
        this.modalHeader = "Faild";
        this.deleteModal.show();
      } finally {
        this.isDeleteLoading = false;
      }
    },
  },
};
</script>
<style scoped>
.back-chevron:hover {
  cursor: pointer;
  color: #eb9713;
}
.edit {
  background-color: #eb6213;
  color: #fff;
  width: 6rem;
}
.edit:hover {
  background-color: #f81b0b;
  color: #fff;
}
.carousel-indicators {
  position: absolute;
  background-color: #eb9713 !important;
  top: 0;
  z-index: 1000;
}
.carousel-item img {
  max-height: 65vh;
}
.icon {
  color: #eb9713;
}
</style>
