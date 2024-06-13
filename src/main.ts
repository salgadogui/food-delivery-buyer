import './assets/main.css'
import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Paginator from 'primevue/paginator';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import FloatLabel from 'primevue/floatlabel';
import Dropdown from 'primevue/dropdown';
import Tag from 'primevue/tag';
import Dialog from 'primevue/dialog';

const app = createApp(App)
const pinia = createPinia()

app.component('Button', Button)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Paginator', Paginator)
app.component('InputText', InputText)
app.component('InputNumber', InputNumber)
app.component('FloatLabel', FloatLabel)
app.component('Dropdown', Dropdown)
app.component('Tag', Tag)
app.component('Dialog', Dialog)

pinia.use(({ store }) => {store.router = markRaw(router)})
app.use(PrimeVue)
app.use(pinia)
app.use(router)

app.mount('#app')
