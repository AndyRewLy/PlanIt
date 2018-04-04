function AllOrgs(state = {}, action) {
    console.log("All Orgs reducing action " + action.type);
    switch(action.type) {
    case 'GET_ALL_ORGS':
       return action.orgs;
    default:
       return state;
    }
 }
 
 export default AllOrgs;