import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import CKEditor from '@ckeditor/ckeditor5-vue';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import BaseCard from './components/BaseCard.vue'
import BaseButton from './components/BaseButton.vue'
import BaseModal from './components/BaseModal.vue'
import DeleteModal from './components/DeleteDialog.vue'
import Toaster from "@meforma/vue-toaster";
const app = createApp(App)
app.component('BaseCard', BaseCard)
app.component('BaseModal', BaseModal)
app.component('BaseButton', BaseButton)
app.component('DeleteModal', DeleteModal)
app.use(store).use(router).use(CKEditor).use(Toaster, { position: 'top-right' }).mount('#app')