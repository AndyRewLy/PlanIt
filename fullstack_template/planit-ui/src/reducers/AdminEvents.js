function AdminEvents(state = [], action) {
    console.log("AdminEvents reducing action " + action.type);
    console.log(action.events);
    switch(action.type) {
    case 'GET_ADMIN_EVENTS':
       return action.events;
    case 'ADD_EVENT':
       return state.concat(action.event);
    default:
       return state;
    }
 }
 
 export default AdminEvents;