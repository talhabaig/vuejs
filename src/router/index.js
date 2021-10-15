import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import * as middlewares from './middlewares';
import VueGtag from "vue-gtag";
const appTitle = "KIPSLMS";//process.env.VUE_APP_TITLE;

Vue.use(Router)


//Route::get('/{vue_capture?}', function () { return view('home'); })->where('vue_capture', '[\/\w\.-]*');
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
}) 

Vue.use(VueGtag, {
  config: { id: process.env.VUE_APP_GOOGLE_Analytics_ID }
}, router); 

//export default router
router.beforeEach(middlewares.checkAccessMiddleware)
export function createRouter() {
  return router
}