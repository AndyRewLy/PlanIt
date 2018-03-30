function Events(state = [], action) {
    console.log("Events reducing action " + action.type);
    console.log(action.events);
    switch(action.type) {
    case 'GET_ALL_EVENTS':
       return action.events;
    case 'ADD_EVENT':
       return state.concat(action.event);
    default:
       return state;
    }
 }
 
 export default Events;