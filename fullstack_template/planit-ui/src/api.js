const baseURL = "http://localhost:5000/";
const headers = new Headers();
var cookie;

headers.set('Content-Type', 'application/json');

const reqConf = {
    headers: headers,
    credentials: 'include',
};

var smartFetch = (url, body) => fetch(url, body).catch(serverConnectError);
// Helper functions for the common request types

/**
 * make a post request
 * @param {string} endpoint
 * @param {Object} body
 * @returns {Promise}
 */
export function post(endpoint, body) {
    return smartFetch(baseURL + endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
        ...reqConf
    })
}

/**
 * make a put request
 * @param {string} endpoint
 * @param {Object} body
 * @returns {Promise}
 */
export function put(endpoint, body) {
    return smartFetch(baseURL + endpoint, {
        method: 'PUT',
        body: JSON.stringify(body),
        ...reqConf
    })
}

/**
 * make a get request
 * @param {string} endpoint
 * @returns {Promise}
 */
export function get(endpoint) {
    return smartFetch(baseURL + endpoint, {
        method: 'GET',
        ...reqConf
    })
}

export function del(endpoint) {
    return smartFetch(baseURL + endpoint, {
        method: 'DELETE',
        ...reqConf
    })
}

export function signIn(cred) {
    console.log("API signin with " + cred);

    return post("login", cred)
     .then((response) => {
        if (response.ok) {
            return response.json();
        }

        return createErrorPromise(response);
     })
     .then(json => {
         cookie = json["access_token"];
         return {username: cred.username};
     })
}

export function signOut() {
    cookie = "access_token=undefined";
    
    return 200;
}

export function register(userInfo) {
    console.log("API register with " + userInfo);

    return post("register", userInfo)
     .then((response) => {
         if (response.ok) {
             return response.json();
         }

         return createErrorPromise(response);
     })
     .then(json => {
        return 200;
     });
}
export function serverConnectError() {
    return Promise.reject(["Server Connect Error"]);
}

function createErrorPromise(response, body) {
    console.log("CREATING ERROR PROMISE **********");
    console.log(response.status);
    console.log(response);
    if (response.status === 400)
       return Promise.resolve(response)
       .then(response => response.json())
       .then(errorList => Promise.reject(errorList.length ? 
        ["had an error"] : ["Unknown error"]));
    else if (response.status === 500)
       return Promise.reject(["Server Connect Error"]);
    else
       return Promise.reject(["Unknown error"]);
 }