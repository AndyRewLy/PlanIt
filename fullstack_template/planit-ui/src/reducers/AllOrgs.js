function AllOrgs(state = {}, action) {
    console.log("All Orgs reducing action " + action.type);
    switch(action.type) {
    case 'GET_ALL_ORGS':
       return action.orgs;
    case 'GET_RSVP_EVENTS':
        console.log("WHAT IS THIS: " + action.events)
       return action.events;
    default:
       return state;
    }
 }
 
 export default AllOrgs;