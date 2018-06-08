function EventComments(state = [], action) {
    console.log("EventComments reducing action " + action.type);
    //console.log(action.comments);
    switch(action.type) {
    case 'GET_EVENT_COMMENTS':
       console.log('i hate my life')
       console.log(action.comments)
       return action.comments;
    default:
       return state;
    }
 }
 
 export default EventComments;