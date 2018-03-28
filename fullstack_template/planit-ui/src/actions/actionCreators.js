import * as api from '../api';

export function signIn(credentials, cb, errCb) {
    console.log("Sign In Action Creator");

    return (dispatch, prevState) => {
        api.signIn(credentials)
         .then((userInfo) => dispatch({user: userInfo, type: "SIGN_IN"}))
         .then(() => {if (cb) cb();})
         .catch((error) => {
             if (errCb)
                errCb();
             console.log('We had an error of ' + error);
         });
    };
}

export function signOut(cb) {
    console.log("Sign Out Action Creator");

    return (dispatch, prevState) => {
        api.signOut();
        dispatch({type: "SIGN_OUT"});
        if (cb) cb();
         
    };
}
export function register(userInfo, cb, errCb) {
    console.log("Register Action Creator");

    return (dispatch, prevState) => {
        api.register(userInfo)
         .then(() => { if (cb) cb();})
         .catch((error) => {if (errCb) errCb();})
    }
}