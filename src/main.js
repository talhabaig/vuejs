import Vue from 'vue'
import App from './App.vue'
import './plugins';
import './mixins';
import { createRouter } from './router'
import { clientStore, createStore } from './store'
import { sync } from 'vuex-router-sync'
import './components';
// import './common/constants';

export function createApp(context) {
    const router = createRouter();
    let store;

    if (process.env.VUE_ENV === 'server') {
        store = createStore(context)
    } else {
        store = clientStore
    }

    sync(store, router);

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app');

    return { app, router, store }
}