import * as storeKeys from './keys';
import createPersistedState from "vuex-persistedstate";
import * as Cookies from 'js-cookie';
import cookie from 'cookie';
import cookieBus from '../cookieBus.js'
import { appConstants } from "../common/constants"; 

export const classPersistState = createPersistedState({
  key: storeKeys.classes.namespace,
  paths: [storeKeys.classes.namespace],
  storage: {
    getItem: (key) => {
      if (process.env.VUE_ENV === 'client') {
        return Cookies.get(key);
      } else {
        //const parsedCookies = cookie.parse(req.headers.cookie);
        if (cookieBus.$cookie) {
          const parsedCookies = cookie.parse(cookieBus.$cookie)
          return parsedCookies[key];
        }
      }
    },
    setItem: (key, value) => {
      if (process.env.VUE_ENV === 'server') {
        Cookies.set('testHaris', value);
      }
    },
    removeItem: (key) => {

      //if (process.env.VUE_ENV === 'client') {
      Cookies.remove(key);
      // } else {

      // }
    },
  },
});

export const alertPersistState = createPersistedState({
  key: storeKeys.alert.namespace,
  paths: [storeKeys.alert.namespace],
  storage: {
    getItem(key) {
      if (process.env.VUE_ENV === 'client') {
        return sessionStorage.getItem(key);
      }
    },
    setItem(key, value) {
      if (process.env.VUE_ENV === 'client') {
        sessionStorage.setItem(key, value);
      }
    },
    removeItem(key) {
      if (process.env.VUE_ENV === 'client') {
        sessionStorage.removeItem(key);
      }
    },
  },
});

export const cartPersistState = createPersistedState({
  key: storeKeys.cart.namespace,
  paths: [storeKeys.cart.namespace],
  storage: {
    getItem(key) {
      if (process.env.VUE_ENV === 'client') {
        resetCart();
        let cart = sessionStorage.getItem(key)

        return cart;
      }
    },
    setItem(key, value) {
      if (process.env.VUE_ENV === 'client') {
        sessionStorage.setItem(key, value);
      }
    },
    removeItem(key) {
      if (process.env.VUE_ENV === 'client') {
        sessionStorage.removeItem(key);
      }
    },
  },
});
