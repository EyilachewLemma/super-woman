<template>
<div class="row">
   <div class="border rounded shadow-sm ms-4 mt-3 me-3 px-0 bg-white col-lg-7">
       <div class="d-flex justify-content-between px-3 pt-4">
    <div class="input-group search align-self-start mt-4">
     <input type="text" class="form-control" placeholder="Search Mentor" aria-label="search" aria-describedby="addon-wrapping" v-model="search.searchBy" @keyup.enter="searchByStudId()">
     <span @click="searchByStudId()" class="searchicon  input-group-text" id="searchby_id"><i class="fas fa-search"></i></span>
</div>
<div class="mb-3">
  <label for="interestedin">Filter Mentors By</label>
  <select class="form-select" v-model="search.filterBy" id="interestedin" @change="filterMentors($event)">
      <option :value="''">All</option>
  <option v-for="field in fields" :key="field.id" :value="field.id">{{field.title}}</option>
</select>
  </div>
 <div class="mb-3">
  <label for="interestedin">Sort Mentors By</label>
  <select class="form-select" id="interestedin" v-model="sortMentor" @change="sortMentor($event,sortingMenors)">
  <option value="view">More Viewed</option>
   <option value="like">Most Liked</option>
    <option value="share">Most Shared</option>
      <option value="day">Date Added</option>
</select>
  </div>
    </div>
    <div class="text-center mt-1 mb-3">{{searchResults}}</div>
    <hr />
    <div v-for="n in 10" :key="n" class="mentor-list">
      <div class="px-3 profil-img d-flex align-items-center">
          <img src="../../assets/sayat2.jpg" alt="mentor profile picture" class="img-fluid">
          <div class="px-3">
              <strong>Hewan Gashe</strong>
              <div class="small">UX Designer, Amazon</div>
              <div class="small">10 Followers</div>
          </div>
          <div class="ms-auto d-flex">
              <button @click="viewProfile()" class="btn me-3 viewBtn profileBtn">View Profile</button>
              <button @click="blockMentor()" class="btn blockBtn profileBtn">Block</button>
          </div>
      </div>
      <hr>
    </div>

   </div>
   <div class="border rounded shadow-sm ms-1 mt-3 me-2 px-0 bg-white col-lg-4">
       <p class="p-3">mentor request</p>
       <hr>
        <div v-for="n in 10" :key="n" class="mentor-list">
      <div class="newMentorImg d-flex align-items-center ps-2">
          <img src="../../assets/sayat4.jpg" alt="mentor profile picture" class="img-fluid">
          <div class="ms-2 me-2">
              <strong class="small">Meseret Defar</strong>
              <div class="small">UX Designer, Amazon</div>
          </div>
          <div class="d-flex">
              <button @click="viewRequest()" class="btn me-2 viewRequestBtn mentorRequestBtn small p-1">View request</button>
              <button @click="confirmRequest()" class="btn confirmBtn mentorRequestBtn small p-1">Confirm</button>
          </div>
      </div>
      <hr>
    </div>
   </div>
</div>
</template>
<script>
import apiClient from '../../components/baseurl/index.js'
export default {
    data() {
        return {
            mentors:{},
            sortingMenors:[],
            sortMentor:'',
            searchResults:'',
            search:{
                filterBy:'',
                page:1,
                searchBy:''
            }
        }
    },
     computed:{
        fields(){
            return this.$store.getters['admin/fields']
        }
        },
    methods: {
         async fetchMentors(search){
              this.$store.commit('setIsItemLoading',true)
             try{
        var response = await apiClient.get(`api/mentors?page=${search.page}&search=${search.searchBy}&filter=${search.filterBy}&per_page=${search.per_page}`)
        if(response.status === 200){
            this.mentors = response.data
            this.searchResults = this.mentors.data?.length+ ' results found'
            this.sortingBlogs = response.data.data
        }
             }
             finally{
                  this.$store.commit('setIsItemLoading',false)
             }
        },
        viewProfile(){},
        blockMentor(){},
        viewRequest(){},
        confirmRequest(){},
        filterMentors(event){
            this.search.filterBy = event.target.value
            this.fetchMentors(this.search)
        },
        sortMentorsBy(event,mentors){
              var value = event.target.value
           if(value === 'view'){
               this.sortMentorsByViews(mentors)
           }
           else if(value === 'like'){
               this.sortMentorsByLikes(mentors)
           }
            else if(value === 'share'){
               this.sortMentorsByshares(mentors)
           }
            else if(value === 'comment'){
               this.sortMentorsByComments(mentors)
           }
            else if(value === 'day'){
               this.sortMentorsByDate(mentors)
           }
           console.log('sorted mentors',this.mentors)
        },
          sortMentorsByViews(mentors){
              this.mentors.data = mentors.sort((obj1, obj2)=>{
               return new Date(obj2.view) - new Date(obj1.view)})
        },
        sortMentorsByLikes(mentors){
               this.mentors.data = mentors.sort((obj1, obj2)=>{
               return new Date(obj2.like) - new Date(obj1.like)})
        },
        sortMentorsByshares(mentors){
               this.mentors.data = mentors.sort((obj1, obj2)=>{
               return new Date(obj2.share) - new Date(obj1.share)})
        },
        sortMentorsByComments(mentors){
               this.mentors.data = mentors.sort((obj1, obj2)=>{
               return new Date(obj2.comment) - new Date(obj1.comment)})
        },
        sortMentorsByDate(mentors){
           this.mentors.data = mentors.sort((obj1, obj2)=>{
               return new Date(obj2.created_at) - new Date(obj1.created_at)})
        },
    },
}
</script>
<style scoped>
.searchicon{
  cursor: pointer;
}
.search{
    width: 35%;
    padding: 0;
    background-color: #fff;
}
.search input{
    border-right: none;
}
.search input:focus{
    box-shadow: none;
}
.search span{
    background-color: #fff;
    border-left: none;
}
.search span:hover{
color: rgb(128, 128, 236);
}
.profil-img img{
    max-width: 3rem;
    max-height: 3.5em;
    min-height: 3.5em;
    border-radius: 5px;
}
.viewBtn{
    width: 7rem;
    background-color: #eb9713;
    color: #fff;
}
.blockBtn{
    width: 7rem;
    border: 1px solid #ccced2;
}
.profileBtn:hover{
background-color: #f81b0b;
color: #fff;
}
.newMentorImg img{
    max-width: 1.5rem;
    min-width: 1.5rem;
    max-height: 2em;
    min-height: 2em;
    border-radius: 2px;
}
/* .mentorRequestBtn{
    width: 5rem;
} */
.mentorRequestBtn:hover{
   background-color: #f81b0b;
    color: #fff;
}
.viewRequestBtn{
    border: 1px solid #ccced2;
}
.confirmBtn{
    background-color: #38b5a9;
    color: #fff;
}
</style>