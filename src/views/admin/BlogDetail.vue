<template>
  <div @click="backPage()" class="ms-3 mt-3 fs-4">
    <i class="fas fa-chevron-left back-chevron"></i>
  </div>
  <div class="d-flex justify-content-between mt-2 mx-3">
    <div>
      <strong>{{ blogDetails.blog_title }}</strong>
    </div>
    <div class="d-flex">
      <base-button
        v-if="blogDetails.is_verified === 0"
        title="Verify"
        :isLoading="isLoading"
        @baseButton="verifyBlog(blogDetails)"
      ></base-button>
      <base-button
        v-else
        title="Unverify"
        :isLoading="isLoading"
        @baseButton="unVerifyBlog(blogDetails)"
      ></base-button>
      <button @click="editBlog()" class="btn edit me-3">Edit</button>
      <button @click="translateBloge()" class="btn edit me-3">Translate</button>
      <button
        @click="deleteBlog()"
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
      <!-- <button @click="deleteBlog()" class="btn edit">Delete</button> -->
    </div>
  </div>
  <div class="detail mx-3 mt-3">
    <div
      id="carouselExampleIndicators"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            :src="blogDetails.images?.[0]?.path"
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
            alt="blog image"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="position-relative text-center p-2">
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        v-for="(image, index) in slicedImages"
        :key="index"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        :data-bs-slide-to="index + 1"
        :aria-label="'Slide' + index + 2"
      ></button>
    </div>
  </div>
  
  <div class="description m-3" v-html="blogDetails.blog_content"></div>
  <div class="horizontal position-relative pb-5">
    <hr />
    <div class="w-100 reviews d-flex p-2">
      <div class="me-5">
        <i class="fas fa-eye icon"></i> {{ blogDetails.view }}
      </div>
      <div class="me-5">
        <i class="fas fa-thumbs-up icon"></i> {{ blogDetails.like }}
      </div>
      <div class="me-5">
        <i class="fas fa-comment-alt icon"></i> {{ blogDetails.comment }}
      </div>
      <div class="me-5">
        <i class="fas fa-share icon"></i> {{ blogDetails.share }}
      </div>
      <div class="writer">
        Content written by
        {{
          blogDetails.written_by?.first_name +
          " " +
          blogDetails.written_by?.last_name
        }}
      </div>
    </div>
  </div>

  <delete-modal
    id="deleteModal"
    :isSuccess="isSuccess"
    :isOKRequired="false"
    :modalHeader="modalHeader"
  >
    <template #modalBody>
      <div>{{ modalTitle }}</div>
    </template>
  </delete-modal>
  <delete-modal
    id="deleteBlog"
    :isSuccess="false"
    :isOKRequired="true"
    :modalHeader="modalHeader"
    @yes="okDeleteBlog()"
  >
    <template #modalBody>
      <div>{{ modalTitle }}</div>
    </template>
  </delete-modal>
</template>
<script>
import { Modal } from "bootstrap";
import apiClient from "../../components/baseurl/index.js";
export default {
  props: ["blogId"],
  data() {
    return {
      blogDetails: {},
      slicedImages: [],
      isLoading: false,
      modalTitle: "",
      isSuccess: false,
      modalHeader: "",
      deleteModal: null,
      deleteBlogModal: null,
      isDeleteLoading: false,
    };
  },
  created() {
    this.fetchBlogDetails();
  },
  mounted() {
    this.deleteModal = new Modal(document.getElementById("deleteModal"));
    this.deleteBlogModal = new Modal(document.getElementById("deleteBlog"));
  },
  methods: {
    backPage() {
      this.$router.back();
    },
    async fetchBlogDetails() {
      this.$store.commit("setIsItemLoading", true);
      try {
        var response = await apiClient.get(`api/blogs/${this.blogId}?lang=${this.$store.getters['admin/lang']}`);
        if (response.status === 200) {
          this.blogDetails = response.data;
          this.slicedImages = this.blogDetails.images.slice(1);
          console.log("response ===", response.data);
        }
      } finally {
        this.$store.commit("setIsItemLoading", false);
      }
    },
    async verifyBlog(blogDetails) {
      this.isLoading = true;
      try {
        var response = await apiClient.post(
          `api/blog_verify/${this.blogId}?verified =${1}`
        );
        if (response.status === 200) {
          blogDetails.is_verified = 1;
          this.modalTitle = "Blog Verified Successfully";
          this.isSuccess = true;
          this.modalHeader = "Successful";
          this.deleteModal.show();
        }
      } catch (e) {
        this.modalTitle = "Faild to Verify Blog";
        this.isSuccess = false;
        this.modalHeader = "Faild";
        this.deleteModal.show();
      } finally {
        this.isLoading = false;
      }
    },
    async unVerifyBlog(blogDetails) {
      this.isLoading = true;
      try {
        var response = await apiClient.post(
          `api/blog_verify/${this.blogId}?verified=${0}`
        );
        if (response.status === 200) {
          blogDetails.is_verified = 0;
          this.modalTitle = "Blog Unverified Successfully";
          this.isSuccess = true;
          this.modalHeader = "Successful";
          this.deleteModal.show();
        }
      } catch (e) {
        this.modalTitle = "Faild To Unverify Blog";
        this.isSuccess = false;
        this.modalHeader = "Faild";
        this.deleteModal.show();
      } finally {
        this.isLoading = false;
      }
    },
    editBlog() {
      this.$router.push({
        name: "EditBlog",
        params: { entity: "Blog", blogId: this.blogId },
      });
    },
    translateBloge(){
       this.$router.push({
        name: "TranslateBlog",
        params: {blogId: this.blogId },query:{entity:'Blog'}});
    },
    deleteBlog() {
      this.modalTitle = "Do you want to delete this Blog ?";
      this.isSuccess = false;
      this.modalHeader = "Delete Blog";
      this.deleteBlogModal.show();
    },
    async okDeleteBlog() {
      this.isDeleteLoading = true;
      try {
        var response = await apiClient.delete(`api/blogs/${this.blogId}`);
        if (response.status === 200) {
          this.$router.back();
        }
      } catch (e) {
        this.modalTitle = "Faild To Delete Blog";
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
  width: 6rem;
  background-color: #eb6213;
  color: #fff;
}
.edit:hover {
  background-color: #f81b0b;
  color: #fff;
}
.carousel-indicators {
  position: absolute;
  color: #eb9713 !important;
  top: 0;
  z-index: 100;
}
.carousel-item img {
  max-height: 65vh;
}
.icon {
  color: #eb9713;
}
</style>
