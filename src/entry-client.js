import Vue from 'vue';
import { createApp } from './main'
import progress from './components/Progressbar.vue';
import { alert } from './store/keys';
import AlertModel from "./models/app/alertModel";
import { AlertTypeEnum } from "./plugins/appNotification/alert/constants";
const alertActionKey = `${alert.namespace}/${alert.actions.new}`;

const { app, router, store } = createApp();

const bar = Vue.prototype.$bar = new Vue(progress).$mount();

document.body.appendChild(bar.$el);

Vue.mixin({
    beforeRouteUpdate(to, from, next) {
        const { asyncData } = this.$options;
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next)
        } else {
            next()
        }
    }
});

// if (window.__INITIAL_STATE__) {
//     store.replaceState(window.__INITIAL_STATE__);
// }

router.onReady(() => {

    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to);
        const prevMatched = router.getMatchedComponents(from);

        let diffed = false;
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c));
        });

        // if(!activated.length) return next();

        // Promise.all(activated.map(c => {
        //     if(c.asyncData) return c.asyncData({store, route:to});
        // }))
        // .then(next)
        // .catch(next);

        const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _);

        if (!asyncDataHooks.length) {
            return next()
        }

        bar.start();

        Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
            .then(() => {
                bar.finish();
                next();
            })
            .catch((ex) => {

                bar.fail();
                let alertModel = new AlertModel(ex.message, AlertTypeEnum.Error)
                store.dispatch(alertActionKey, alertModel);

                //next();
            })
    });

    app.$mount('#app')
})

// service worker
// if ('https:' === location.protocol && navigator.serviceWorker) {
//     navigator.serviceWorker.register('/service-worker.js', { scope: './' }).then(function (registration) {
//         console.log('Service worker registration succeeded:', registration);
//     }, /*catch*/ function (error) {
//         console.log('Service worker registration failed:', error);
//     });
// } else {
//     console.log('Service workers are not supported.');
// }
