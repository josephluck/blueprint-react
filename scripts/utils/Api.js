import superagent from 'superagent';
import {browserHistory} from 'react-router';

var API_ROOT = 'http://localhost:1401/';

// Handle errors (unauthorized, forbidden etc)

function handleErrors(res) {
  let status = res.status;
  if (status === 403 || status === 401) {
    console.log("Forbidden / unauthorized")
  }
}

// POST some data to the server

function post(params) {
  return new Promise((resolve, reject) => {
    superagent
      .post(getApiUrl(params.url))
      .send(params.payload)
      .set('Content-Type', 'application/json')
      .end((error, res, a, b, c) => {
        error ?
          (function(res) {
            handleErrors(res);
            reject(res.body, res.status, res)
          })(res)
          :
          resolve(res.body, res.status, res);
      });
  });
}

// PUT some data to the server

function put(params) {
  return new Promise((resolve, reject) => {
    superagent
      .put(getApiUrl(params.url))
      .send(params.payload)
      .set('Content-Type', 'application/json')
      .end((error, res, a, b, c) => {
        error ?
          (function(res) {
            handleErrors(res);
            reject(res.body, res.status, res)
          })(res)
          :
          resolve(res.body, res.status, res);
      });
  });
}

// GET some data from the server

function get(params) {
  return new Promise((resolve, reject) => {
    superagent
      .get(getApiUrl(params.url))
      .set('Content-Type', 'application/json')
      .end((error, res, a, b, c) => {
        error ?
          (function(res) {
            handleErrors(res);
            reject(res.body, res.status, res)
          })(res)
          :
          resolve(res.body, res.status, res)
      });
  });
}

// DELETE some data from the server

function destroy(params) {
  return new Promise((resolve, reject) => {
    superagent
      .delete(getApiUrl(params.url))
      .send(params.payload)
      .set('Content-Type', 'application/json')
      .end((error, res, a, b, c) => {
        error ?
          (function(res) {
            handleErrors(res);
            reject(res.body, res.status, res)
          })(res)
          :
          resolve(res.body, res.status, res);
      });
  });
}

// API urls

function getApiUrl(options) {
  switch (options.name) {
    case 'resources':
      if (options.params) {
        return API_ROOT + `resources${options.params}`;
      } else {
        return API_ROOT + `resources`;
      }
      break;

    case 'resource':
      return API_ROOT + `resources/${options.resourceId}`;
      break;

    default:
      return false;
      break
  }
}


// Redirect (usually after POST, PUT, DELETE)
function redirect(path) {
  browserHistory.push(path);
}


export default {
  post,
  put,
  get,
  delete: destroy,
  redirect,
  API_ROOT
}