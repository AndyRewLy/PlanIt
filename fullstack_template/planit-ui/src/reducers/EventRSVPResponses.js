function EventRSVPResponses(state = [], action) {
    console.log("EventRSVPResponses reducing action " + action.type);
    switch(action.type) {
    case 'GET_EVENT_RSVP_RESPONSES':
       return action.responses;
    default:
       return state;
    }
 }
 
 export default EventRSVPResponses;