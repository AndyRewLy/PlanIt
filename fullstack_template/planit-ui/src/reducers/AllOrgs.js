function AllOrgs(state = [], action) {
    console.log("All Orgs reducing action " + action.type);
    switch(action.type) {
    case 'GET_ALL_ORGS':
       return [].concat(action.orgs);
    case 'GET_ORG_EVENTS':
        console.log("getting org events: " + action.events)
       return action.events;
    default:
       return state;
    }
 }
 
 export default AllOrgs;