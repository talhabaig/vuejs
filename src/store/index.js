import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules';
import { cartPersistState, alertPersistState, checkoutPersistState, signupPersistState } from './plugins';
//import createPersistedState from "vuex-persistedstate";
// import createPersistedState from "vuex-persistedstate";
// import * as Cookies from 'js-cookie';
// import cookie from 'cookie';
// import cookieBus from '../cookieBus.js'

Vue.use(Vuex)

export const clientStore = new Vuex.Store({
  modules,
  plugins: process.env.VUE_ENV === 'client' ? [restoreState, alertPersistState, cartPersistState, checkoutPersistState, signupPersistState] : [],
})

export function createStore(context) {
  return new Vuex.Store({
    modules
  });
}

function restoreState(store) {
  if (process.env.VUE_ENV === 'client') {
    if (store) {
      if (window.__INITIAL_STATE__) {
        //console.log('log INITIAL_STATE');
        //console.log(store);
        store.replaceState(window.__INITIAL_STATE__);
        //delete window.__INITIAL_STATE__;
      }
    }

    // store.subscribe((mutation, state) => {
    // });
  }
}

