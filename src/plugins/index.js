/************************************************************* Bootstrap-Vue Config *************************************************************/
import Vue from 'vue';

//npm i bootstrap-vue
import BootstrapVue from 'bootstrap-vue';

//npm WARN bootstrap@4.3.1 requires a peer of jquery@1.9.1 - 3 but none is installed. You must install peer dependencies yourself.
//npm audit recomend to install
//npm install jquery@3.4.1

import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

/************************************************************* LandingPage CSS *************************************************************/
// import '../assets/css/LandingPage.css'
import '../assets/css/fontawesome-all.css';
import '../assets/scss/style.scss'


/************************************************************* VueMeta *************************************************************/
import VueMeta from 'vue-meta'
 
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

/************************************************************* Custom Plugins *************************************************************/
import alertPlugin from './appNotification/alert';
Vue.use(alertPlugin);

/************************************************************* vuex-persistedstate Config *************************************************************/
// npm install --save vuex-persistedstate

/************************************************************* cookie js-cookie Config *************************************************************/
//npm install --save cookie js-cookie


/************************************************************* Moment *************************************************************/
//npm install moment --save


/************************************************************* Cryptojs *************************************************************/
//npm install vue-cryptojs
import VueCryptojs from 'vue-cryptojs'
Vue.use(VueCryptojs)

// const encryptedText = this.CryptoJS.AES.encrypt(
//   "{name : 'haris',lastanem : 'asdf'}",
//   "haris123"
// ).toString();
// const decryptedText = this.CryptoJS.AES.decrypt(
//   encryptedText,
//   "haris123"
// ).toString(this.CryptoJS.enc.Utf8);
/************************************************************* Vuelidate Config *************************************************************/
// npm install vuelidate --save
import Vuelidate from 'vuelidate';

Vue.use(Vuelidate);

/************************************************************* Analytics Config *************************************************************/
// npm install vue-gtag --save
// import VueGtag from "vue-gtag";

// Vue.use(VueGtag, {
//   config: {
//     id: "UA-152528317-1" 
//   }
// }); 
