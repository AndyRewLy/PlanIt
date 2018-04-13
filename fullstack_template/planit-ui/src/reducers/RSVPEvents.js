function RSVPEvents(state = [], action) {
    console.log("RSVPEvents reducing action " + action.type);
    console.log(action.events);
    switch(action.type) {
    case 'GET_RSVP_EVENTS':
       return action.events;
    default:
       return state;
    }
 }
 
 export default RSVPEvents;