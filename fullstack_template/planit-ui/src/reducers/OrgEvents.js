function OrgEvents(state = [], action) {
    console.log("RSVPEvents reducing action " + action.type);
    console.log(action.events);
    switch(action.type) {
    case 'GET_ORG_EVENTS':
      console.log("getting org events: " + action.events)
      return action.events;
    default:
       return state;
    }
 }
 
 export default OrgEvents;