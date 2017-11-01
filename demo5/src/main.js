// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App'
import Quasar from 'quasar-framework'
import 'quasar-extras/fontawesome'

import router from './routes';
import store from './store/store';

Vue.config.productionTip = false
const __THEME = 'mat';

require(`quasar-framework/dist/quasar.mat.css`)
require('quasar-extras/roboto-font')

import 'quasar-extras/material-icons'

/* eslint-disable no-new */

Vue.use(Quasar)
Vue.use(VueRouter)

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    router,
    store
  })
})
