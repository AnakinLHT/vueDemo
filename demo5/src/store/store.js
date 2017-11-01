import Vue from 'vue'
import Vuex from 'vuex'
import bookStoreModule from './module/bookStoreModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    bookStore: bookStoreModule
  }
})

export default store;
