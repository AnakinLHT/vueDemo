import VueRouter from 'vue-router';

import Bookstore from './components/Bookstore';
import Genre from './components/Genre';

const routes = [
  { name: 'selectBooks', path: '/bookStore/:genre', component: Bookstore },
  { path: '/genre', component: Genre },
  { path: '*', redirect: '/genre' }
];

const router = new VueRouter({
  routes
});

export default router;
