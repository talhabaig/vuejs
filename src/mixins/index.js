import Vue from 'vue';
import filters from './filters';
import { common } from './common';

Vue.mixin(common);
Vue.mixin(filters);
