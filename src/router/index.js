import Vue from 'vue'
import VueRouter from 'vue-router'
import China from '../views/China'
import Area from '../views/Area'
import City from '../views/City'
import Stroke from '../views/Stroke'
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'China',
    component: China
  },
  {
    path: '/area',
    name: 'Area',
    component: Area
  },
  {
    path: '/city',
    name: 'City',
    component: City
  },
  {
    path: '/stroke',
    name: 'Stroke',
    component: Stroke
  },
];

const router = new VueRouter({
  routes
});

export default router
