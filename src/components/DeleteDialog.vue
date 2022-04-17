<template>
<!-- Modal -->
<div class="modal fade" :id="id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-center" :class="{success:isSuccess,faild:!isSuccess}">
        {{title}}
      </div>
      <div class="d-flex justify-content-end mt-4 p-3">
        <button type="button" class="btn close me-4" data-bs-dismiss="modal">Close</button>
        <button v-if="isOKRequired" type="button" class="btn okBtn">KO</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
    props:['id','title','isSuccess','isOKRequired']
}
</script>
<style scoped>
.success{
  color: green
}
.faild{
  color: red;
}
.close,.okBtn{
  width: 6rem;
}
.close{
  border: 1px solid gray
}
.okBtn{
  background-color: #ef9713;
  color: #fff;
}
.close:hover,.okBtn:hover{
  background-color: #f81b0b;
}
</style>