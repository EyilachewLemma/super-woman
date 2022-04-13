<template>
<div class="row">
   <div class="border rounded shadow-sm ms-4 mt-3 me-3 px-0 bg-white col-md-7">
       <div class="d-flex justify-content-between px-3 pt-4">
    <div class="input-group search">
     <input type="text" class="form-control p-1" placeholder="Search Mentor" aria-label="search" aria-describedby="addon-wrapping">
     <span @click="searchByStudId()" class="searchicon  input-group-text" id="searchby_id"><i class="fas fa-search"></i></span>
</div>
<div>
    <span><i class="fas fa-sort-amount-up-alt"></i></span> <u>Filter Mentor</u>
</div>
<div>
    <span><i class="fas fa-filter"></i></span> <u>Sort Mentor</u>
</div>
    </div>
    <div class="text-center mt-1 mb-3">38 results</div>
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
              <button class="btn me-3 viewBtn profileBtn">View Profile</button>
              <button class="btn blockBtn profileBtn">Block</button>
          </div>
      </div>
      <hr>
    </div>

   </div>
   <div class="border rounded shadow-sm ms-1 mt-3 me-2 px-0 bg-white col-md-4">
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
              <button class="btn me-2 viewRequestBtn mentorRequestBtn small p-1">View request</button>
              <button class="btn confirmBtn mentorRequestBtn small p-1">Confirm</button>
          </div>
      </div>
      <hr>
    </div>
   </div>
</div>
</template>
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