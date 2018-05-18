function AdminOrgs(state = [], action) {
    console.log("Admin Orgs reducing action " + action.type);
    switch(action.type) {
    case 'GET_ADMIN_ORGS':
       return action.adminOrgs;
    case 'ADD_ADMIN_ORG':
       return state.concat(action.org);
    default:
       return state;
    }
 }
 
 export default AdminOrgs;