function MemberOrgs(state = [], action) {
    console.log("MemberOrgs reducing action " + action.type);
    switch(action.type) {
    case 'GET_MEMBER_ORGS':
       return action.memberOrgs;
    default:
       return state;
    }
 }
 
 export default MemberOrgs;