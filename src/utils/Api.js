import superagent from 'superagent';

const API_ROOT = 'http://localhost:1401/';

function url(options) {
  switch (options.name) {
    case 'resources':
      if (options.params) {
        return API_ROOT + `resources${options.params}`;
      }
      return API_ROOT + `resources`;
    case 'resource':
      return API_ROOT + `resources/${options.resourceId}`;
    default:
      return false;
  }
}

/*=============================================================================
  Create some data on the server
=============================================================================*/
function post(options) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      superagent
        .post(url(options.url))
        .send(options.payload)
        .set('Content-Type', 'application/json')
        .end((error, res) => {
          if (error) {
            handleErrors(res);
            reject(res, error);
          } else {
            resolve(res);
          }
        });
    });
  });
}

/*=============================================================================
  Update some data on the server
=============================================================================*/
function put(options) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      superagent
        .put(url(options.url))
        .send(options.payload)
        .set('Content-Type', 'application/json')
        .end((error, res) => {
          if (error) {
            handleErrors(res);
            reject(res, error);
          } else {
            resolve(res);
          }
        });
    });
  });
}

/*=============================================================================
  Get some data from the server
=============================================================================*/
function get(options) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      superagent
        .get(url(options.url))
        .set('Content-Type', 'application/json')
        .end((error, res) => {
          if (error) {
            handleErrors(res);
            reject(res, error);
          } else {
            resolve(res);
          }
        });
    });
  });
}

/*=============================================================================
  Delete some data from the server, named destroy since delete is a
  reserved word
=============================================================================*/
function destroy(options) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      superagent
        .delete(url(options.url))
        .set('Content-Type', 'application/json')
        .end((error, res) => {
          if (error) {
            handleErrors(res);
            reject(res, error);
          } else {
            resolve(res);
          }
        });
    });
  });
}

/*=============================================================================
  Handle errors from the API (generic 404, 500, 403, 401 errors)
=============================================================================*/
function handleErrors(res) {
  let status = res.status;
  if (status === 403 || status === 401) {
    // Handle errors here
  }
}

/*=============================================================================
  Export the four methods in an object, so it can be accessed under
  Http.get(), Http.destroy() etc.
=============================================================================*/
export default {
  post,
  put,
  get,
  destroy
};
