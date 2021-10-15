//import axios from 'axios';
import Http from './http.init';
import { ResponseWrapper, ErrorWrapper } from './util';
const { API } = require('axios-client');//require('../../api/axios-client');
const axios = API();

export default class BaseService {
  /**
   * ------------------------------
   * @HELPERS
   * ------------------------------
   */

  request(status = { auth: false }) {
    return new Http(status);
  }

  responseWrapper(...rest) {
    return new ResponseWrapper(...rest);
  }

  errorWrapper(...rest) {
    return new ErrorWrapper(...rest);
  }


  /**
   * ------------------------------
   * @API_CALLS
   * ------------------------------
   */

  login(url, auth = true, data = window.required(), config = {}, parameters = {}) {
    const params = {
      ...parameters
    };

    return new Promise((resolve, reject) => {
      return this.request({ auth, config, headers: { 'api-security-key': process.env.VUE_APP_API_SECURITY_KEY, contentType: 'application/x-www-form-urlencoded' } }).post(`${url}`, data, { params })
        .then(response => { return resolve(new ResponseWrapper(response, response.data)) })
        .catch(error => {
          let message = error.response.data ? error.response.data.error_description : error.response.status;
          reject(new ErrorWrapper(error, message));
        });
    })
  }

  get(url, auth = true, parameters = {}, config = {}) {
    const params = {
      ...parameters
    };

    const cache = axios.cachedItems;

    let key;

    if (params) {
      var query = Object.keys(params).map(key => key + '=' + params[key]).join('&');
      key = url + '?' + query;
    } else {
      key = url;
    }

    if (cache && cache.has(key)) {
      return Promise.resolve(cache.get(key));
    } else {

      return new Promise((resolve, reject) => {
        return this.request({ auth, config })
          .get(url, { params })
          .then(response => {
            cache && cache.set(key, response);
            resolve(this.responseWrapper(response, response.data))
          })
          .catch(error => {
            let message = error.response.data ? error.response.data.Message : error.response.status;
            reject(this.errorWrapper(error, message));
          });
      })
    }
  }

  post(url, auth = true, data = window.required(), config = {}, parameters = {}) {
    const params = {
      ...parameters
    };
    return new Promise((resolve, reject) => {
      return this.request({ auth, config }).post(`${url}`, data, { params })
        .then(response => resolve(this.responseWrapper(response, response.data)))
        .catch(error => {
          let message = error.response.data ? error.response.data.Message : error.response.status;
          reject(this.errorWrapper(error, message));
        });
    })
  }

  put(url, auth = true, id = window.required(), data = window.required(), config = {}) {
    return new Promise((resolve, reject) => {
      return this.request({ auth, config }).put(`${url}/${id}`, data)
        .then(response => resolve(this.responseWrapper(response, response.data)))
        .catch(error => {
          let message = error.response.data ? error.response.data.Message : error.response.status;
          reject(this.errorWrapper(error, message));
        });
    })
  }

  patch(url, auth = true, id = window.required(), data = window.required(), config = {}) {
    return new Promise((resolve, reject) => {
      return this.request({ auth, config }).patch(`${url}/${id}`, data)
        .then(response => resolve(this.responseWrapper(response, response.data)))
        .catch(error => {
          //if (error.response.status !== 401)
          {
            let message = error.response.data ? error.response.data.Message : error.response.status;
            reject(this.errorWrapper(error, message));
          }
        });
    })
  }

  delete(url, auth = true, id = window.required(), config = {}) {
    return new Promise((resolve, reject) => {
      return this.request({ auth, config }).delete(`${url}/${id}`)
        .then(response => resolve(this.responseWrapper(response, response.data)))
        .catch(error => {
          let message = error.response.data ? error.response.data.Message : error.response.status;
          reject(this.errorWrapper(error, message));
        });
    })
  }

  downloadFromCDN(url, auth = true, parameters = {}, config = {}) {
    const params = {
      ...parameters
    };

    return new Promise((resolve, reject) => {
      return this.request({ auth: false, config, headers: {}, responseType: 'blob', baseURL: process.env.VUE_APP_CDN_BASE_URL })
        .get(url, { params })
        .then(response => {
          resolve(this.responseWrapper(response, response.data))
        })
        .catch(error => {
          let message = error.response.data ? error.response.statusText : error.response.status;
          reject(this.errorWrapper(error, message));
        });
    })
  }
}
