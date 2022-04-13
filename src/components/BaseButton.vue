<template>
    <div class="baseBtn">
         <button @click="emitEvent()" :disabled="isLoading" type="button" class="btn btn-save text-white mx-3 px-2">
            <span v-if="isLoading">
               <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                 {{title+'ing'}}
               </span>      
            <span v-else>{{title}}</span>   
          </button>
    </div>
</template>
<script>
export default {
    props:['title','isLoading'],
    emits:{
        baseButton(){
            return true
        }
    },
    methods: {
        emitEvent(){
            this.$emit('baseButton')
        }
    },
}
</script>
<style scoped>
.btn{
    width: 7em;
    background-color: #e7453a;
    color: #fff;
}
.btn:hover{
    background-color: #f81b0b;
    color: #fff;
}
</style>