<template>
     <div >
      <!-- <div>Select Language</div> -->
      <select class="form-select" aria-label="Default select example" v-model="selectedLanguage" @change="setLanguage($event)">
  <option v-for="language in languages" :key="language.id" :value="language.code">{{language.name}}</option>
</select>
    </div>
</template>
<script>
export default {
    data() {
        return {
            selectedLanguage:'en'
        }
    },
    computed:{
        languages(){
            return this.$store.getters['admin/languages']
        }
    },
    methods: {
         setLanguage(event){
      localStorage.setItem('language',event.target.value)
      this.$store.commit('admin/setLang',event.target.value)
      console.log('selected language=',this.$store.getters['admin/lang'])

    }
    },
}
</script>