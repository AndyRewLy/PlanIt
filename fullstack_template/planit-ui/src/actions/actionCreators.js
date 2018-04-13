/* actionCreators.js
 *
 * An intermediate file between the components and the api calls.
 * The functions in this file call functions in api.js.
 * The functions 'dispatch' events based on a given type.
 */
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

export function getAllOrgs(cb, errCb) {
    console.log("Get all Orgs Action Creator");

    return (dispatch, prevState) => {
        api.getAllOrgs()
         .then(orgs => dispatch({orgs, type: "GET_ALL_ORGS"}))
         .then(() => { if (cb) cb();})
         .catch((error) => {if (errCb) errCb();})
    }
}

export function getAllAdminOrgs(cb, errCb) {
    console.log("Get all Admin Orgs Action Creator");

    return (dispatch, prevState) => {
        api.getAllAdminOrgs()
         .then(adminOrgs => dispatch({adminOrgs: adminOrgs, type: "GET_ADMIN_ORGS"}))
         .then(() => {if (cb) cb();})
         .catch((error) => {if (errCb) errCb();})
    }
}

export function getAllMemberOrgs(cb, errCb) {
    console.log("Get all Member Orgs Action Creator");

    return (dispatch, prevState) => {
        api.getAllMemberOrgs()
         .then(memberOrgs => dispatch({memberOrgs: memberOrgs, type: "GET_MEMBER_ORGS"}))
         .then(() => {if (cb) cb();})
         .catch((error) => {if (errCb) errCb();})
    }
}

export function createNewOrg(org, cb, errCb) {
    console.log("Post new Member Orgs Action Creator");

    return (dispatch, prevState) => {
        api.postOrg(org)
         .then(() => dispatch({org: org, type: "ADD_ADMIN_ORG"}))
         .then(() => { if (cb) cb(); })
         .catch((error) => {if (errCb) errCb();})
    }

}

export function getAllFilteredEvents(filter, cb, errCb) {
    console.log("Get all events with the filter Action Creator");

    return (dispatch, prevState) => {
        api.getAllFilteredEvents(filter)
         .then((events) => dispatch({events: events, type: "GET_FILTERED_EVENTS"}))
         .then(() => {if (cb) cb();})
         .catch((error) => {if (errCb) errCb();})
    }
}

export function getAllAdminEvents(cb, errCb) {
    console.log("Get all events Action Creator");

    return (dispatch, prevState) => {
        api.getAdminEvents()
         .then((events) => dispatch({events: events, type: "GET_ADMIN_EVENTS"}))
         .then(() => { if (cb) cb();})
         .catch((error) => {if (errCb) errCb();})
    }
}

export function postEvent(eventInfo, cb, errCb) {
    console.log("Creating event action creator");

    return (dispatch, prevState) => {
        api.postEvent(eventInfo)
         .then(() => api.getAdminEvents())
         .then((events) => dispatch({events: events, type: "GET_ADMIN_EVENTS"}))
         .then(() => { if (cb) cb();})
         .catch((error) => {if (errCb) errCb();})
    }
}

export function postEventResponse(status, eventId, cb, errCb) {
    console.log("Posting Event Response Action Creator");

    console.log({status, eventId});
    return (dispatch, prevState) => {
        api.postEventResponse({status, eventId})
         .then(() => api.getAllFilteredEvents(""))
         .then((events) => dispatch({events: events, type: "GET_FILTERED_EVENTS"}))
         .then(() => { if (cb) cb();})
         .catch((error) => {if (errCb) errCb();})
    }
}

export function postOrgJoinStatus(response, orgId, cb, errCb) {

    return (dispatch, prevState) => {
        api.postOrgJoinStatus(response, orgId)
         .then(() => { if (cb) cb();})
         .then(() => api.getAllOrgs())
         .then(orgs => dispatch({orgs, type: "GET_ALL_ORGS"}))
         .then(() => api.getAllAdminOrgs())
         .then(adminOrgs => dispatch({adminOrgs: adminOrgs, type: "GET_ADMIN_ORGS"}))
         .then(() => api.getAllMemberOrgs())
         .then(memberOrgs => dispatch({memberOrgs: memberOrgs, type: "GET_MEMBER_ORGS"}))
         .catch((error) => { if (errCb) errCb();})
    }
}

export function getAllRSVPEvents(cb, errCb) {
    console.log("Get all RSVP Events Action Creator");

    return (dispatch, prevState) => {
        api.getAllRSVPEvents()
         .then(events => dispatch({events: events, type: "GET_RSVP_EVENTS"}))
         .then(() => {if (cb) cb();})
         .catch((error) => {if (errCb) errCb();})
    }
}