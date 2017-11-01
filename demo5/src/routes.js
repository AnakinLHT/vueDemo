import VueRouter from 'vue-router';

import Bookstore from './components/Bookstore';
import Genre from './components/Genre';
import Order from './components/Order';

const routes = [
  { name: 'selectBooks', path: '/bookStore/:genre', component: Bookstore },
  { path: '/genre', component: Genre },
  { path: '/order', component: Order },
  { path: '*', redirect: '/genre' }
];

const router = new VueRouter({
  routes
});

export default router;
