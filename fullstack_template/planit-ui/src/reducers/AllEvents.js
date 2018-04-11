function AllEvents(state = [], action) {
    console.log("AllEvents reducing action " + action.type);
    console.log(action.events);
    switch(action.type) {
    case 'GET_FILTERED_EVENTS':
       return action.events;
    default:
       return state;
    }
 }
 
 export default AllEvents;