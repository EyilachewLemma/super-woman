<template>
  <div class="d-flex justify-content-between mt-3 px-3 w-100">
    <div class="squerecardgreen border rounded text-center">
      <div class="mt-3">Total Views</div>
      <p class="p-0">{{ summeryDatas.views }}</p>
    </div>
    <div class="squerecardyelow border rounded text-center">
      <div class="mt-3">Total Likes</div>
      <p>{{ summeryDatas.likes }}</p>
    </div>
    <div class="squerecardred border rounded text-center">
      <div class="mt-3">Total Shares</div>
      <p>{{ summeryDatas.shares }}</p>
    </div>
    <div class="squerecardblue border rounded text-center">
      <div class="mt-3">Total Comments</div>
      <p>{{ summeryDatas.comments }}</p>
    </div>
  </div>
  <base-card>
    <div class="d-flex justify-content-between">
      <div class="input-group search w-25 mt-4 align-self-start">
        <input
          type="text"
          class="form-control"
          placeholder="Search Role Model"
          aria-label="search"
          aria-describedby="addon-wrapping"
          v-model="search.searchBy"
          @keyup.enter="searchRoleModel()"
        />
        <span
          @click="searchRoleModel()"
          class="searchicon input-group-text"
          id="searchby_id"
          ><i class="fas fa-search"></i
        ></span>
      </div>
      <div class="mb-3">
        <label for="interestedin">Filter Role Model</label>
        <select
          class="form-select"
          v-model="search.filterBy"
          id="interestedin"
          @change="filterRoleModel($event)"
        >
          <option :value="''">All</option>
          <option v-for="field in fields" :key="field.id" :value="field.id">
            {{ field.title }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="interestedin">Sort Role Model By</label>
        <select
          class="form-select"
          id="interestedin"
          v-model="sortRoleModelBy"
          @change="sortRolModel($event, sortingRoleModels)"
        >
          <option value="view">More Viewed</option>
          <option value="like">Most Liked</option>
          <option value="share">Most Shared</option>
          <option value="day">Date Added</option>
        </select>
      </div>
      <button
        @click="postNewRoleModel()"
        class="btn addpostbtn mt-4 align-self-start"
      >
        Post New Role Model
      </button>
    </div>
    <div class="text-center mt-2">{{ resultsFound }}</div>
    <!-- dynamic data -->
    <div class="cardcontainer mt-3">
      <div class="row">
        <div
          v-for="roleModel in roleModels.data"
          :key="roleModel.id"
          class="col-md-6 col-lg-4 mt-3 rounded"
        >
          <div class="card">
            <div class="card-img">
              <router-link
                :to="{
                  name: 'RoleModelDetail',
                  params: { roleModelId: roleModel.id },
                }"
              >
                <img
                  :src="roleModel.image?.path"
                  class="card-img-top img-fluid rounded"
                  alt="role model image"
              /></router-link>
            </div>
            <div class="w-100 reviews d-flex justify-content-between py-3 px-1">
              <div class="view me-3">
                <i class="fas fa-eye"></i> {{ roleModel.view }}
              </div>
              <div class="likes me-3">
                <i class="fas fa-thumbs-up"></i> {{ roleModel.like }}
              </div>
              <div class="comments me-3">
                <i class="fas fa-comment-alt"></i> {{ roleModel.comment }}
              </div>
              <div class="shars me-3">
                <i class="fas fa-share"></i> {{ roleModel.share }}
              </div>
              <div
                class="verification"
                :class="{ verified: Number(roleModel.is_verified === 1) }"
              >
                {{ isVerified(roleModel.is_verified) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="roleModels.data?.length"
      class="d-flex justify-content-end mt-3 me-5"
    >
      <div class="rowsperpage me-3">Role Models per Page</div>
      <div class="limit col-sm-1 me-3">
        <select
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="search.per_page"
          @change="changePerPageValue($event)"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <div class="pageno me-3">
        {{
          roleModels.meta?.from +
          "-" +
          roleModels.meta?.to +
          " of " +
          roleModels.meta?.total +
          " Role Models"
        }}
      </div>
      <div class="leftchivron ms-3 me-3">
        <button
          @click="backChivron()"
          class="chivronbtn"
          :class="{ active: roleModels.meta.from !== 1 }"
          :disabled="roleModels.meta.from === 1"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
      </div>
      <div class="rightchivron">
        <button
          @click="forWardChivron()"
          class="chivronbtn"
          :class="{ active: roleModels.meta.to !== roleModels.meta.total }"
          :disabled="roleModels.meta.to === roleModels.meta.total"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </base-card>
</template>
<script>
import apiClient from "../../components/baseurl/index.js";
export default {
  data() {
    return {
      roleModels: {},
      summeryDatas: {},
      sortRoleModelBy: "",
      resultsFound: "",
      sortingRoleModels: [],
      search: {
        searchBy: "",
        filterBy: "",
        page: 1,
        per_page: 10,
      },
    };
  },
  created() {
    this.search.lang = this.$store.getters['admin/lang']
    this.fetchRoleModels(this.search);
    this.fetchSummaryData();
  },
  computed: {
    fields() {
      return this.$store.getters["admin/fields"];
    },
    lang(){
      return this.$store.getters["admin/lang"]
    }
  },
  methods: {
    postNewRoleModel() {
      this.$router.push({ name: "NewRoleModel" });
    },
    async fetchRoleModels(search) {
      this.$store.commit("setIsItemLoading", true);
      try {
        var response = await apiClient.get(
          `api/role_models?lang=${search.lang}&page=${search.page}&filter=${search.filterBy}&per_page=${search.per_page}`
        );
        if (response.status === 200) {
          this.roleModels = response.data;
          this.resultsFound = this.roleModels.data?.length + " Results";
          this.sortingRoleModels = response.data.data;
        }
      } finally {
        this.$store.commit("setIsItemLoading", false);
      }
    },
    async fetchSummaryData() {
      this.$store.commit("setIsItemLoading", true);
      try {
        var response = await apiClient.get("api/summary");
        if (response.status === 200) {
          this.summeryDatas = response.data;
        }
      } finally {
        this.$store.commit("setIsItemLoading", false);
      }
    },
    isVerified(value) {
      if (Number(value) === 1) {
        return "Verified";
      } else {
        return "Unverified";
      }
    },
   async searchRoleModel() {
          this.$store.commit("setIsItemLoading", true);
      try {
        var response = await apiClient.get(`api/search_role_models?search=${this.search.searchBy}`);
        if (response.status === 200) {
          this.roleModels = response.data;
          this.resultsFound = this.roleModels.data?.length + " Results";
          this.sortingRoleModels = response.data.data;
        }
      } finally {
        this.$store.commit("setIsItemLoading", false);
      }
    },
    filterRoleModel(event) {
      this.search.filterBy = event.target.value;
      this.search.lang = this.lang
      this.fetchRoleModels(this.search);
      // this.resultsFound = this.roleModels.data?.length +' Results'
    },
    sortRolModel(event, roleModelArray) {
      var value = event.target.value;
      if (value === "view") {
        this.sortRolModelByViews(roleModelArray);
      } else if (value === "like") {
        this.sortRolModelByLikes(roleModelArray);
      } else if (value === "share") {
        this.sortRolModelByshares(roleModelArray);
      } else if (value === "comment") {
        this.sortRolModelByComments(roleModelArray);
      } else if (value === "day") {
        this.sortRolModelByDate(roleModelArray);
      }
      //    this.resultsFound = this.roleModels.data?.length+' Results'
      console.log("sorted role-models", this.roleModels);
    },
    changePerPageValue(event) {
      this.search.per_page = event.target.value;
      this.search.lang = this.lang
      this.fetchRoleModels(this.search);
    },
    backChivron() {
      this.search.page = this.search.page - 1;
      this.search.lang = this.lang
      this.fetchRoleModels(this.search);
    },
    forWardChivron() {
      this.search.page = this.search.page + 1;
      this.search.lang = this.lang
      this.fetchRoleModels(this.search);
    },
    sortRolModelByViews(rolmodeles) {
      this.roleModels.data = rolmodeles.sort((obj1, obj2) => {
        return (obj2.view - obj1.view);
      });
    },
    sortRolModelByLikes(rolmodeles) {
      this.roleModels.data = rolmodeles.sort((obj1, obj2) => {
        return (obj2.like - obj1.like);
      });
    },
    sortRolModelByshares(rolmodeles) {
      this.roleModels.data = rolmodeles.sort((obj1, obj2) => {
        return (obj2.share - obj1.share);
      });
    },
    sortRolModelByComments(rolmodeles) {
      this.roleModels.data = rolmodeles.sort((obj1, obj2) => {
        return (obj2.comment - obj1.comment);
      });
    },
    sortRolModelByDate(rolmodeles) {
      this.roleModels.data = rolmodeles.sort((obj1, obj2) => {
        return new Date(obj2.created_at) - new Date(obj1.created_at);
      });
    },
  },
};
</script>
<style scoped>
.squerecardblue {
  width: 22%;
  height: 12vh;
  background-color: #344172;
  color: #fff;
}
.squerecardgreen {
  width: 22%;
  height: 12vh;
  background-color: #38b5a9;
  color: #fff;
}
.squerecardyelow {
  width: 22%;
  height: 12vh;
  background-color: #eb9713;
  color: #fff;
}
.squerecardred {
  width: 22%;
  height: 12vh;
  background-color: #e7453a;
  color: #fff;
}
.searchicon {
  cursor: pointer;
}
.search {
  padding: 0;
  background-color: #fff;
}
.search input {
  border-right: none;
}
.search input:focus {
  box-shadow: none;
  border-color: #d5d6d9;
  z-index: 0;
}
.search span {
  background-color: #fff;
  border-left: none;
}
.search span:hover {
  color: rgb(128, 128, 236);
}
.addpostbtn {
  background-color: #eb9713;
  color: #fff;
}
.addpostbtn:hover {
  background-color: #f81b0b;
  color: #fff;
}
.row {
  width: 100;
}
.card-img {
  width: 100;
  height: auto;
  overflow: hidden;
}
.card-img img {
  width: 100%;
  height: 17rem;
  min-height: 17rem;
  transition: all 1.5s;
}
.card-img img:hover {
  transform: scale(1.2);
}
.reviews {
  background-color: #12141c;
  color: #fff;
}
.verification {
  color: #d32a1e;
}
.verified {
  color: green;
}
.chivronbtn {
  border: none;
  background-color: #fff;
  color: rgba(97, 94, 94, 0.849);
}
.active {
  color: rgb(15, 15, 15);
}
</style>
