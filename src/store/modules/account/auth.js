import * as Cookies from 'js-cookie';
// import cookie from 'cookie';
// import cookieBus from '../../../cookieBus.js'
export default {
    namespaced: true,
    state: "",
    getters: {
        hasToken(state) {
            if (process.env.VUE_ENV === 'client') {
                return Cookies.get(process.env.VUE_APP_COOKIE_NAME) ? true : false
            }
            // else {
            //     if (cookieBus.$cookie) {
            //         const parsedCookies = cookie.parse(cookieBus.$cookie);
            //         return parsedCookies[process.env.VUE_APP_COOKIE_NAME];
            //     }
            // }
        },
        token(state) { return Cookies.get(process.env.VUE_APP_COOKIE_NAME) }
    },
    mutations: {

    },
    actions: {

    }
};
