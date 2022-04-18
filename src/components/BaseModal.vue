<template>
<div class="modal fade" :id="id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
       <div class="modal-body">
           <slot name="modalBody"/>
      </div>
          <div class="d-flex  pb-4">
          <button :disabled="isLoading" type="button" @click="cancel()" class="btn  mx-3 btn-cancel border border-secondary ms-auto"  data-bs-dismiss="modal">CANCEL</button>
          <button v-if="buttonType==='add'" :disabled="isLoading" type="button" @click="save()" class="btn  px-4 btn-save text-white mx-3">
            <span v-if="isLoading">
               <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                 SAVING
               </span>      
            <span v-else>SAVE</span>   
          </button>
          <button v-if="buttonType==='edit'" :disabled="isLoading" type="button" @click="edit" class="btn  px-4 btn-save text-white mx-3">
            <span v-if="isLoading">
               <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
               EDITING
            </span>      
            <span v-else>EDIT</span>   
          </button>      
      </div>
  </div>
</div>
</div>
</template>
<script>
export default {
  props:['isLoading','id','buttonType'],
  data() {
    return {
      
    }
  },
  methods: {
    save(){
      this.$emit('save')
    },
    edit(){
      this.$emit('edit')
    },
    cancel(){
      this.$emit('cancel')
    },
  },
}
</script>
<style scoped>  
.btn-save{
    background-color: #eb9713;
    border-radius: 0;
}
.btn-save:hover{
  background-color: #f4480a;
}
.btn-cancel{
  border-radius: 0;  
}


</style>




