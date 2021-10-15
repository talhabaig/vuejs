/**
 * HTTP request layer
 * if auth is required return patched axios instance(with access token in headers)
 * else return clear axios instance
 */

//import axios from 'axios';
const { API } = require('axios-client');//require('../../api/axios-client');
const axios = API();
import { eventHub } from '../../eventhub';
//import accountService from '../account/account.service';
import router from '../../router';
const $store = require('../../store');
//import { auth } from '../../store/keys';

export default class Http {
  constructor(status) {
    this.isAuth = status && status.auth ? status.auth : false;
    this.config = status.config;
    this.instance = axios.create({
      baseURL: status.baseURL ? status.baseURL : process.env.VUE_APP_API_URL,
      responseType: status.responseType,
      headers: status.headers ? status.headers : {
        'content-type': 'application/json; charset=utf-8',
        'api-security-key': process.env.VUE_APP_API_SECURITY_KEY
      }
    });

    return this.init()
  }
  emitLoader(config, eventName) {
    if (config) {
      if (config.loader && config.loader.show) {
        let eventHubName = config.loader.id ? eventName + config.loader.id : eventName + 'global';
        let message = config.loader.message ? config.loader.message : '';
        eventHub.$emit(eventHubName, { message: message, showOverlay: config.loader.showOverlay });
      }
    }
  }
  init() {
    this.instance.interceptors.request.use((request) => {
      if (this.isAuth) {
        //request.headers.common['Authorization'] = accountService.getToken();
        // // if access token expired and refreshToken exists >> go to API and get new access token
        // if (accountService.isTokenExpired() && accountService.getRefreshToken()) {
        //   return accountService.refreshTokens()
        //     .then(response => {
        //       request.headers['token'] = response.data.token
        //       return request
        //     }).catch(error => Promise.reject(error))
        // } else {
        //   return request
        // }
      }

      this.emitLoader(this.config, 'before-request-');

      return request;
    }, error => {
      this.emitLoader(this.config, 'request-error-');

      return Promise.reject(error);
    })

    this.instance.interceptors.response.use(
      response => {
        this.emitLoader(this.config, 'after-response-');
        return response;
      },
      error => {
        this.emitLoader(this.config, 'response-error-');
       
        if (error.response.status === 401) {
          //$store.default.dispatch(`${auth.namespace}/${auth.actions.log_Out}`);

        }

        return Promise.reject(error);
      }
    );


    return this.instance;
  }
}
