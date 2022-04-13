import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import CKEditor from '@ckeditor/ckeditor5-vue';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import BaseCard from './components/BaseCard.vue'
import BaseButton from './components/BaseButton.vue'
const app = createApp(App)
app.component('BaseCard', BaseCard)
app.component('BaseButton', BaseButton)
app.use(store).use(router).use(CKEditor).mount('#app')