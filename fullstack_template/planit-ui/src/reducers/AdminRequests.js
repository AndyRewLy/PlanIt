function AdminRequests(state = [], action) {
    console.log("Admin Requests reducing action " + action.type);
    switch(action.type) {
    case 'GET_ADMIN_REQUESTS':
       return action.requests;
    default:
       return state;
    }
 }
 
 export default AdminRequests;