<template>
    <div class="d-flex justify-content-between mt-3 px-3 w-100">
        <div class="squerecardgreen border rounded text-center">
            <div class="mt-3">Total Views</div>
            <p class="p-0">{{blogSummary.views}}</p>
        </div>
        <div class="squerecardyelow border rounded text-center">
            <div class="mt-3">Total Likes</div>
            <p>{{blogSummary.likes}}</p>
        </div>
        <div class="squerecardred border rounded text-center">
            <div class="mt-3">Total Shares</div>
            <p>{{blogSummary.shars}}</p>
        </div>
        <div class="squerecardblue border rounded text-center">
            <div class="mt-3">Total Comments</div>
            <p>{{blogSummary.comments}}</p>
        </div>
    </div>
    <base-card>
    <div class="d-flex justify-content-between">
    <div class="input-group search w-25 align-self-start mt-4">
     <input type="text" class="form-control" placeholder="Search Blogs" aria-label="search" aria-describedby="addon-wrapping" v-model="search.searchBy" @keyup.enter="searchBlog()">
     <span @click="searchBlog()" class="searchicon  input-group-text" id="searchby_id"><i class="fas fa-search"></i></span>
</div>
<div class="mb-3">
  <label for="interestedin">Filter Blog By</label>
  <select class="form-select" v-model="search.filterBy" id="interestedin" @change="filterBlog($event)">
        <option :value="''">All</option>
  <option v-for="field in fields" :key="field.id" :value="field.id">{{field.title}}</option>
</select>
  </div>
 <div class="mb-3">
  <label for="interestedin">Sort Blog By</label>
  <select class="form-select" v-model="sortBlog" id="interestedin" @change="sortBlogsBy($event,sortingBlogs)">
  <option value="view">More Viewed</option>
   <option value="like">Most Liked</option>
    <option value="share">Most Shared</option>
      <option value="day">Date Added</option>
</select>
  </div>
<button @click="postNewBlog()" class="btn addpostbtn align-self-start mt-4">Post new Blogs</button>
    </div>
    <div class="text-center mt-2">{{searchResults}}</div>
                <!-- dynamic data -->
  <div class="cardcontainer mt-3">
        <div class="row">
        <div v-for="blog in blogs.data" :key="blog.id" class="col-md-6 col-lg-4 mt-3 rounded">
          <div class="card">
            <div class="card-img">
 <router-link :to="{name:'BlogDetail',params:{blogId:blog.id}}">
      <img :src="blog.image?.path" class="card-img-top img-fluid rounded" alt="blog image"></router-link>
              </div>
              <h5 class="card-title text-center mt-2">{{blog.title}}</h5>
    <div class="card-body">
         <!-- <div class="card-text">{{blog.content.slice(0,30)}}.</div> -->
    <div class="w-100 reviews d-flex justify-content-between pt-2 pb-3 px-1">
    <div class="view me-3"><i class="fas fa-eye icon"></i> {{blog.view}}</div>
    <div class="likes me-3"><i class="fas fa-thumbs-up icon"></i> {{blog.like}}</div>
    <div class="comments me-3"><i class="fas fa-comment-alt icon"></i> {{blog.comment}}</div>
    <div class="shars me-3"><i class="fas fa-share icon"></i> {{blog.share}}</div>
     <div class="verification" :class="{verified:blog.is_verified === 1}">{{isVerified(blog.is_verified)}}</div>
  </div>
    </div>
</div>
</div>
</div>
</div>
 <div v-if="blogs.data?.length" class="d-flex justify-content-end mt-3 me-5">
<div class="rowsperpage me-3">
   Blogs per Page
</div>
<div class="limit col-sm-1 me-3">
<select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="search.per_page" @change="changePerPageValue($event)">
  <option value="5">5</option>
  <option value="10">10</option>
  <option value="15">15</option>
  <option value="20">20</option>
  
</select>
</div>
<div class="pageno me-3">
{{blogs.meta?.from+'-'+blogs.meta?.to+' of '+blogs.meta?.total+' Blogs'}}
</div>
<div class="leftchivron ms-3 me-3">
<button @click="backChivron()" class="chivronbtn" :class="{active:blogs.meta.from !== 1}" :disabled="blogs.meta.from === 1"><i class="fas fa-chevron-left"></i></button>
</div>
<div class="rightchivron"><button @click="forWardChivron()" class="chivronbtn" :class="{active:blogs.meta.to !==blogs.meta.total}" :disabled="blogs.meta.to ===blogs.meta.total"><i class="fas fa-chevron-right"></i></button></div>
</div>
    </base-card>
</template>
<script>
import apiClient from '../../components/baseurl/index.js'
export default {
    data() {
        return {
            blogs:{},
            fliterBlog:'',
            sortBlog:'',
            blogSummary:{},
            sortingBlogs:[],
            search:{
                searchBy:'',
                filterBy:'',
                page:1,
                per_page:10
            },
            searchResults:''
        }
    },
    created() {
        this.fetchBlogs(this.search)
        this.fetchBlogSummary()
    },
     computed:{
        fields(){
            return this.$store.getters['admin/fields']
        }
    },
    methods: {
        postNewBlog(){
           this.$router.push({name:'PostBlog'}) 
        },
         async fetchBlogs(search){
              this.$store.commit('setIsItemLoading',true)
             try{
        var response = await apiClient.get(`api/blogs?page=${search.page}&search=${search.searchBy}&filter=${search.filterBy}&per_page=${search.per_page}`)
        if(response.status === 200){
            this.blogs = response.data
            this.searchResults = this.blogs.data?.length+ ' results found'
            this.sortingBlogs = response.data.data
        }
             }
             finally{
                  this.$store.commit('setIsItemLoading',false)
             }
        },
        async fetchBlogSummary(){
             this.$store.commit('setIsItemLoading',true)
             try{
            var response = await apiClient.get('api/blog_summary')
        if(response.status === 200){
            this.blogSummary = response.data
        }
             }
             finally{
                  this.$store.commit('setIsItemLoading',false)
             }
        },
         isVerified(value){
            if(Number(value) === 1){
                return 'Verified'
            }
            else{
                return 'Unverified'
            }
        },
        filterBlog(event){
            this.search.filterBy = event.target.value
            this.fetchBlogs(this.search)
        },
        sortBlogsBy(event,blogs){
              var value = event.target.value
           if(value === 'view'){
               this.sortBlogsByViews(blogs)
           }
           else if(value === 'like'){
               this.sortBlogsByLikes(blogs)
           }
            else if(value === 'share'){
               this.sortBlogsByshares(blogs)
           }
            else if(value === 'comment'){
               this.sortBlogsByComments(blogs)
           }
            else if(value === 'day'){
               this.sortBlogsByDate(blogs)
           }
           console.log('sorted blogs',this.blogs)
        },
          sortBlogsByViews(blogs){
              this.blogs.data = blogs.sort((obj1, obj2)=>{
               return new Date(obj2.view) - new Date(obj1.view)})
        },
        sortBlogsByLikes(blogs){
               this.blogs.data = blogs.sort((obj1, obj2)=>{
               return new Date(obj2.like) - new Date(obj1.like)})
        },
        sortBlogsByshares(blogs){
               this.blogs.data = blogs.sort((obj1, obj2)=>{
               return new Date(obj2.share) - new Date(obj1.share)})
        },
        sortBlogsByComments(blogs){
               this.blogs.data = blogs.sort((obj1, obj2)=>{
               return new Date(obj2.comment) - new Date(obj1.comment)})
        },
        sortBlogsByDate(blogs){
           this.blogs.data = blogs.sort((obj1, obj2)=>{
               return new Date(obj2.created_at) - new Date(obj1.created_at)})
        },
        searchBlog(){
            this.fetchBlogs(this.search)
        },
        changePerPageValue(event){
            this.search.per_page = event.target.value
            this.fetchBlogs(this.search)
        },
          backChivron(){
            this.search.page = this.search.page - 1
            this.fetchBlogs(this.search)
        },
        forWardChivron(){
            this.search.page = this.search.page +1
            this.fetchBlogs(this.search)
        }
    },
}
</script>
<style scoped>
.squerecardblue{
    width: 22%;
    height: 12vh;
    background-color: #344172;
    color: #fff;
    
}
.squerecardgreen{
    width: 22%;
    height: 12vh;
    background-color: #38b5a9;
    color: #fff;
    
}
.squerecardyelow{
    width: 22%;
    height: 12vh;
    background-color: #eb9713;
    color: #fff;
    
}
.squerecardred{
    width: 22%;
    height: 12vh;
    background-color: #e7453a;
    color: #fff;
    
}
.searchicon{
  cursor: pointer;
}
.search{
    padding: 0;
    background-color: #fff;
}
.search input{
    border-right: none;
}
.search input:focus{
    box-shadow: none;
     border-color: #d5d6d9;
    z-index: 0;
}
.search span{
    background-color: #fff;
    border-left: none;
}
.search span:hover{
color: rgb(128, 128, 236);
}
.addpostbtn{
    background-color: #eb9713;
    color: #fff;
}
.addpostbtn:hover{
   background-color: #f81b0b;
}
.row{
  width: 100;
}
.card-img{
  width: 100;
  height: auto;
  overflow: hidden;
}
.card{
    border: none;
}
.card-img img{
    width: 100%;
    height: 20rem;
    min-height: 20rem;
    transition: all 1.5s;
}
.card-img img:hover{
      transform: scale(1.2);
 
}
.icon{
  color: #eb9713;
}
.verification{
    color: #d32a1e;
}
.verified{
    color: green;
}
.chivronbtn{
    border: none;
    background-color: #fff;
    color: rgba(97, 94, 94, 0.849);
}
.active{
  color: rgb(15, 15, 15);
}
</style>