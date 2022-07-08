<template>
  <div class="row">
    <div class="border rounded shadow-sm ms-4 mt-3 me-2 px-0 bg-white col-lg-7">
      <div class="d-flex justify-content-between px-3 pt-4">
        <div class="input-group search align-self-start mt-4">
          <input
            type="text"
            class="form-control"
            placeholder="Search Mentor"
            aria-label="search"
            aria-describedby="addon-wrapping"
            v-model="search.searchBy"
            @keyup.enter="searchMentor()"
          />
          <span
            @click="searchMentor()"
            class="searchicon input-group-text"
            id="searchby_id"
            ><i class="fas fa-search"></i
          ></span>
        </div>
        <div class="mb-3">
          <label for="interestedin">Filter Mentors By</label>
          <select
            class="form-select"
            v-model="search.filterBy"
            id="interestedin"
            @change="filterMentors($event)"
          >
            <option :value="''">All</option>
            <option v-for="field in fields" :key="field.id" :value="field.id">
              {{ field.title }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="interestedin">Sort Mentors By</label>
          <select
            class="form-select"
            id="interestedin"
            v-model="sortMentor"
            @change="sortMentor($event, sortingMentors)"
          >
            <option value="view">More Viewed</option>
            <option value="like">Most Liked</option>
            <option value="share">Most Shared</option>
            <option value="day">Date Added</option>
          </select>
        </div>
      </div>
      <div class="text-center mt-1 mb-3">{{ searchResults }}</div>
      <hr />
      <div v-for="n in 10" :key="n" class="mentor-list">
        <div class="px-3 profil-img d-flex align-items-center">
          <img
            src="../../assets/sayat2.jpg"
            alt="mentor profile picture"
            class="img-fluid"
          />
          <div class="px-3">
            <strong>Hewan Gashe</strong>
            <div class="small">UX Designer, Amazon</div>
            <div class="small">10 Followers</div>
          </div>
          <div class="ms-auto me-2 d-flex">
            <button
              @click="viewProfile(mentor)"
              class="btn me-3 viewBtn profileBtn px-1"
            >
              View Profile
            </button>
            <button
              @click="blockMentor(mentor)"
              class="btn blockBtn profileBtn"
            >
              Block
            </button>
          </div>
        </div>
        <hr />
      </div>
    </div>
    <div
      class="border rounded shadow-sm mt-3 ms-4 me-2 me-lg-0 px-0 bg-white col-lg-4"
    >
      <p class="p-3">mentor request</p>
      <hr />
      <div v-for="n in 10" :key="n" class="mentor-list">
        <div class="newMentorImg d-flex align-items-center ps-2">
          <img
            src="../../assets/sayat4.jpg"
            alt="mentor profile picture"
            class="img-fluid"
          />
          <div class="ms-2 me-2">
            <strong class="small">Meseret Defar</strong>
            <div class="small">UX Designer, Amazon</div>
          </div>
          <div class="d-flex ms-auto me-4 me-lg-3">
            <button
              @click="viewRequest()"
              class="btn me-2 viewRequestBtn mentorRequestBtn small px-1"
            >
              View request
            </button>
            <button
              @click="confirmRequest()"
              class="btn confirmBtn mentorRequestBtn small"
            >
              Confirm
            </button>
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
  <!-- profile dialog -->
  <div
    class="modal fade"
    id="mentorProfileModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <div class="profil text-center ms-5">
            <img
              src="../../assets/sayat4.jpg"
              class="img-fluid rounded-circle mentorprofile"
              alt="profile picture"
            />
          </div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div>
            <p><strong>First Name: </strong> Betelhem</p>
            <p><strong>Last Name: </strong> Dagne</p>
            <p><strong>Phone Number: </strong> 0910234545</p>
            <p><strong>Email Address: </strong> bety@gmail.com</p>
            <p><strong>Location: </strong> Bahir Dar</p>
            <p><strong>Date of Birth: </strong> 1995</p>
            <p><strong>Education Level: </strong> masters Degree</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn closeModal" data-bs-dismiss="modal">
            Close
          </button>
          <button
            @click="blockMentor(mentor)"
            type="button"
            class="btn blockUser px-3"
          >
            Block
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- view profile modal  -->
  <div
    class="modal fade"
    id="viewRequest"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <div class="profil text-center ms-5">
            <img
              src="../../assets/sayat4.jpg"
              class="img-fluid rounded-circle mentorprofile"
              alt="profile picture"
            />
          </div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div>
            <p><strong>First Name: </strong> Fikirte</p>
            <p><strong>Last Name: </strong> Libona</p>
            <p><strong>Phone Number: </strong> 0910234545</p>
            <p><strong>Email Address: </strong> fikir@gmail.com</p>
            <p><strong>Location: </strong> Addis Ababa</p>
            <p><strong>Date of Birth: </strong> 1995</p>
            <p><strong>Education Level: </strong> masters Degree</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn closeModal" data-bs-dismiss="modal">
            Close
          </button>
          <button
            @click="confirmRequest(mentor)"
            type="button"
            class="btn blockUser"
          >
            confirm request
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from "bootstrap";
import apiClient from "../../components/baseurl/index.js";
export default {
  data() {
    return {
      mentors: {},
      sortingMentors: [],
      sortMentor: "",
      searchResults: "",
      search: {
        filterBy: "",
        page: 1,
        searchBy: "",
      },
      modalDialog: null,
      viewRequestModal: null,
      mentorDetail: {},
      mentorApplicants: [],
      mentorApplicant: {},
    };
  },
  mounted() {
    this.modalDialog = new Modal(document.getElementById("mentorProfileModal"));
    this.viewRequestModal = new Modal(document.getElementById("viewRequest"));
  },
  computed: {
    fields() {
      return this.$store.getters["admin/fields"];
    },
  },
  created() {
    // this.fetchMentors(this.search)
    //this.fetchMentorApplicants();
  },
  methods: {
    async fetchMentors(search) {
      this.$store.commit("setIsItemLoading", true);
      try {
        var response = await apiClient.get(
          `api/mentors?page=${search.page}&search=${search.searchBy}&filter=${search.filterBy}&per_page=${search.per_page}`
        );
        if (response.status === 200) {
          this.mentors = response.data;
          this.searchResults = this.mentors.data?.length + " results found";
          this.sortingMentors = response.data.data;
        }
      } finally {
        this.$store.commit("setIsItemLoading", false);
      }
    },
    async fetchMentorApplicants() {
      var response = await apiClient.get("api/mentor_applicants");
      if (response.status === 200) {
        this.mentorApplicants = response.data;
      }
    },
    viewProfile() {
      // this.mentors.forEach((mentor) => {
      //   if (mentor.id === mentorId) {
      //     this.mentorDetail = mentor;
      //     this.viewRequestModal.hide();
      this.modalDialog.show();
      //     return;
      //   }
      // });
    },
    async blockMentor(mentor) {
      var response = await apiClient.post(`api/block_user/${mentor.id}`, {
        mentor_status: mentor.is_active,
      });
      if (response.status === 200) {
        mentor.status = "Blocked";
      }
    },
    async viewRequest() {
      // this.mentorApplicant = mentor;
      // this.modalDialog.hide();
      this.viewRequestModal.show();
    },
    async confirmRequest(mentor) {
      var response = await apiClient.post(`api/block_user/${mentor.id}`, {
        mentor_status: mentor.is_active,
      });
      if (response.status === 200) {
        mentor.status = "Blocked";
      }
    },
    filterMentors(event) {
      this.search.filterBy = event.target.value;
      this.fetchMentors(this.search);
    },
    sortMentorsBy(event, mentors) {
      var value = event.target.value;
      if (value === "view") {
        this.sortMentorsByViews(mentors);
      } else if (value === "like") {
        this.sortMentorsByLikes(mentors);
      } else if (value === "share") {
        this.sortMentorsByshares(mentors);
      } else if (value === "comment") {
        this.sortMentorsByComments(mentors);
      } else if (value === "day") {
        this.sortMentorsByDate(mentors);
      }
      console.log("sorted mentors", this.mentors);
    },
    sortMentorsByViews(mentors) {
      this.mentors.data = mentors.sort((obj1, obj2) => {
        return new Date(obj2.view) - new Date(obj1.view);
      });
    },
    sortMentorsByLikes(mentors) {
      this.mentors.data = mentors.sort((obj1, obj2) => {
        return new Date(obj2.like) - new Date(obj1.like);
      });
    },
    sortMentorsByshares(mentors) {
      this.mentors.data = mentors.sort((obj1, obj2) => {
        return new Date(obj2.share) - new Date(obj1.share);
      });
    },
    sortMentorsByComments(mentors) {
      this.mentors.data = mentors.sort((obj1, obj2) => {
        return new Date(obj2.comment) - new Date(obj1.comment);
      });
    },
    sortMentorsByDate(mentors) {
      this.mentors.data = mentors.sort((obj1, obj2) => {
        return new Date(obj2.created_at) - new Date(obj1.created_at);
      });
    },
  },
};
</script>
<style scoped>
.searchicon {
  cursor: pointer;
}
.search {
  width: 35%;
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
.profil-img img {
  max-width: 3rem;
  max-height: 3.5em;
  min-height: 3.5em;
  border-radius: 5px;
}
.viewBtn {
  width: 8rem;
  background-color: #eb9713;
  color: #fff;
}
.blockBtn,
.closeModal {
  width: 6rem;
  border: 1px solid #ccced2;
}
.profileBtn:hover {
  background-color: #f81b0b;
  color: #fff;
}
.blockUser {
  background-color: #eb9713;
  color: #fff;
}
.newMentorImg img {
  max-width: 2rem;
  min-width: 2rem;
  max-height: 2.5em;
  min-height: 2.5em;
  border-radius: 2px;
}
/* .mentorRequestBtn{
    width: 5rem;
} */
.mentorRequestBtn:hover {
  background-color: #f81b0b;
  color: #fff;
}
.viewRequestBtn {
  width: 7rem;
  border: 1px solid #ccced2;
}
.confirmBtn {
  background-color: #38b5a9;
  color: #fff;
}
.mentorprofile {
  width: 5rem;
  height: 5rem;
  margin: auto;
}
</style>
