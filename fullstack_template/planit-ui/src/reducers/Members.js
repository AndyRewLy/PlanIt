function Members(state = [], action) {
    console.log("Members reducing action " + action.type);
    switch(action.type) {
    case 'GET_MEMBERS':
       return action.members;
    default:
       return state;
    }
 }
 
 export default Members;