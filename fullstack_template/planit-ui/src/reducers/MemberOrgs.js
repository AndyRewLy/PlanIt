function MemberOrgs(state = [], action) {
    console.log("MemberOrgs reducing action " + action.type);
    switch(action.type) {
    case 'GET_MEMBER_ORGS':
       return action.memberOrgs;
    case 'UPDATE_ADMIN_REQUEST':
       console.log("----- UPdating admin request??? -----");
       return state.map(org => {if (org.organizationId === action.orgId) org.requestedAdmin = true; return org})
    default:
       return state;
    }
 }
 
 export default MemberOrgs;