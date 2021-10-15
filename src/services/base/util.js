import forEach from 'lodash/forEach'
import isArray from 'lodash/isArray'

/**
 * Return message for HTTP status code
 * @param {number} status - HTTP status code
 * @returns {string} Message of network operation
 */
function _getStatusMessage(status) {
  let message = ''
  switch (status) {
    case 200:
      message = 'All done. Request successfully executed';
      break;
    case 201:
      message = 'Data successfully created';
      break;
    case 400:
      message = 'Bad Request';
      break;
    case 401:
      message = 'Need auth';
      break;
    case 404:
      message = 'Not found';
      break;
    case 503:
      message = 'Service Unavailable';
      break;
    default:
      message = 'Something went wrong. Please try later.';
      break;
  }
  return message;
}

function _getResponseErrorMessage(error) {
  if (error.response && error.response.data) return error.response.data.description;
  if (error.response && error.response.statusText) return error.response.statusText;
  if (error.message) return error.message;
  return '_getResponseErrorMessage can\'t handle error';
}

/**
 * Create instant, which represent response object
 * @param {Object} [data] - custom data
 * @param {Object} [response] - axios response object
 * @param {String} [message] - custom message to display
 */
export class ResponseWrapper {
  constructor(response, data = {}) {
    this.data = data;
    this.success = response.data.success;
    this.status = response.status;
    this.statusMessage = _getStatusMessage(this.status);
    this.message = data.Message || null;
  }
}

/**
 * Create instant, which represent error object
 * @param {Object} [error] - axios error object
 * @param {String} [message] - custom message to display
 */
export class ErrorWrapper extends Error {
  constructor(error, message) {
    super();
    this.name = '';
    this.stack = error.stack ? error.stack : null;
    this.success = error.response ? error.response.data.success : false;
    this.status = error.response ? error.response.status : false;
    this.statusMessage = _getStatusMessage(this.status);
    this.message = message || _getResponseErrorMessage(error);
    this.exception = error.response.data.errors ? error.response.data.errors : null;
  }
}

/**
 * Uses to clear request data before send it
 * Client shouldn't change entity id
 * @param data
 * @return {{}}
 */
export function clearData(data) {
  let result = {};
  forEach(data, (item, propName) => {
    if (isArray(item) && item.length) {
      result[propName] = item;
    }
    if (!isArray(item) && item && (propName !== 'id')) {
      result[propName] = item;
    }
  })
  return result;
}
