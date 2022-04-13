<template>
    <div @click="backPage()" class="ms-3 mt-3 fs-4"><i class="fas fa-chevron-left back-chevron"></i></div>
    <div class="d-flex justify-content-between mt-2 mx-3">
        <div><strong></strong> how to be successfull a woman in Africa</div>
        <div class="d-flex">
            <button @click="verifyBlog()" class="btn confirmbtn verify me-3">Verify</button>
            <button @click="editBlog()" class="btn confirmbtn edit">Edit</button>
        </div>
    </div>
    <div class="detail mx-3 mt-3">
      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="../../assets/sayat5.jpg" class="d-block w-100 img-fluid" alt="role model image">
    </div>
    <div class="carousel-item">
      <img src="../../assets/sayat2.jpg" class="d-block w-100 img-fluid" alt="...">
    </div>
    <div class="carousel-item">
      <img src="../../assets/sayat3.jpg" class="d-block w-100 img-fluid" alt="...">
    </div>
    <div class="carousel-item">
      <img src="../../assets/sayat6.jpg" class="d-block w-100 img-fluid" alt="...">
    </div>
  </div>
  <!-- <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button> -->
</div>
    </div>
    <div class="position-relative text-center p-2">
        <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
  </div>
    </div>
    <div class="description m-3">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam modi, commodi necessitatibus, voluptatum asperiores, cumque praesentium officiis ab minima alias enim eos! Minima fugiat rem quasi magnam ipsum rerum sapiente. Alias, fugit praesentium dolor nobis deleniti molestias, placeat quaerat harum provident, iste culpa qui eos excepturi temporibus sunt explicabo exercitationem rerum. Perferendis tenetur iusto, officia iure, porro temporibus vitae, nihil consequatur aliquid reiciendis cupiditate culpa a. Odit fugiat porro modi fugit obcaecati placeat magnam sed nesciunt, culpa aperiam in recusandae illo quibusdam earum eum exercitationem a ab amet nihil, provident sit quaerat? Facilis odit, at velit inventore ducimus animi, modi ipsum nisi saepe quas dolorem optio illum nemo fugit veniam accusamus voluptatibus cumque omnis facere. Neque laborum reprehenderit, inventore nisi fugit tempora quas alias dolor rem dolores placeat pariatur porro ipsum in, obcaecati sed magnam nobis, omnis incidunt eligendi explicabo esse nihil itaque. Eligendi aspernatur quidem tempora magni a, doloribus vitae corporis vel pariatur, deleniti eveniet. Voluptatum ipsum quibusdam temporibus aliquam ab aliquid dolores in eius corporis ipsam? Labore, rerum rem ab ut, suscipit voluptates at, quia qui deleniti cupiditate corporis minus corrupti natus? Porro laborum molestiae et. Dolorum, ipsa in? Adipisci at quos, dolorem culpa illum commodi ipsa eaque, molestiae dolore quia, reprehenderit quisquam incidunt sunt aut totam exercitationem voluptatibus aliquam esse rerum minus soluta excepturi nostrum pariatur ut! Dolores ad molestias voluptates nesciunt deserunt quis, earum iusto, accusamus error odio culpa eveniet temporibus similique facere eius corporis vitae dolorum sit provident excepturi at. Nam ipsam ad laboriosam? Nostrum delectus incidunt numquam consequuntur vel nemo placeat cum perferendis earum at. Qui numquam magnam voluptatum excepturi voluptatibus ut dolor voluptas dolorum esse similique voluptatem minima consequatur perferendis facilis tenetur minus aspernatur eaque sit deserunt itaque, vero, consequuntur dolorem, aliquid veniam? Quo optio incidunt debitis, suscipit temporibus enim distinctio vero? A!
    </div>
    <div class="horizontal position-relative">
      <hr>
      <div class="w-100 reviews d-flex p-3">
    <div class="me-5"><i class="fas fa-eye icon"></i> 12K</div>
    <div class="me-5"><i class="fas fa-thumbs-up icon"></i> 21K</div>
    <div class="me-5"><i class="fas fa-comment-alt icon"></i> 100</div>
    <div class="me-5"><i class="fas fa-share icon"></i> 564</div>
    <div class="writer">Content written by Hewan Gebire</div>
  </div>
    </div>
</template>
<script>
import apiClient from '../../components/baseurl/index.js'
export default {
  props:['blogId'],
  data(){
    return{
        blogDetails:{},
        slicedBlogDetails:[]
    }
  },
  created() {
    // this.fetchBlogDetails()
  },
  methods: {
    backPage(){
      this.$router.back()
    },
      async fetchBlogDetails(){
        var response = await apiClient.get('api/blog_details/'+this.blogId)
        if(response.status === 200){
            this.blogDetails = response.data
        }
        },
        async verifyBlog(){
            var response = await apiClient.post('api/verify_blog/'+this.blogId)
        if(response.status === 200){
            this.blogDetails = response.data
        }
        },
        editBlog(){}
  },
}
</script>
<style scoped>
.back-chevron:hover{
    cursor: pointer;
    color: #eb9713;
}
.verify{
    background-color: #e7453a;
}
.edit{
    background-color: #eb9713;
}
.confirmbtn{
    color: #fff;
    width: 6rem;
}
.confirmbtn:hover{
   background-color: #f81b0b;
    color: #fff;
}
.carousel-indicators{
  position: absolute;
  color: #eb9713!important;
  top: 0;
  z-index: 100;
}
.carousel-item img{
    max-height: 65vh;
}
.icon{
  color: #eb9713;
}
</style>