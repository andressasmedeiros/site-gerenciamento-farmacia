import { createApp } from 'vue'
import { createRouter } from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import { createWebHistory } from 'vue-router'
import Login from './components/Login.vue'
import Users from './components/Users.vue'
import Products from './components/Products.vue'
import User from './components/User.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import {
  InputText,
  Password,
  Button,
  ProgressSpinner,
  Toolbar,
  PanelMenu,
  DataTable,
  Column,
  ColumnGroup,
  Row,
  ToggleSwitch,
  IftaLabel,
  Select,
  Tag,
  Toast
} from 'primevue'
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/users', component: Users },
  { path: '/user', component: User },
  { path: '/products', component: Products }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App);
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});
app.component('Button', Button);
app.component('Password', Password);
app.component('InputText', InputText);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Toolbar', Toolbar);
app.component('PanelMenu', PanelMenu);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('ToggleSwitch', ToggleSwitch);
app.component('IftaLabel', IftaLabel);
app.component('Select', Select);
app.component('Tag', Tag);
app.component('Toast', Toast);
app.mount('#app')






