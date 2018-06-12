function AdminRequests(state = [], action) {
    console.log("Admin Requests reducing action " + action.type);
    switch(action.type) {
    case 'GET_ADMIN_REQUESTS':
       return action.requests;
    case 'DELETE_ADMIN_REQUEST':
       return state.filter(request => request.id !== action.userId)
    default:
       return state;
    }
 }
 
 export default AdminRequests;