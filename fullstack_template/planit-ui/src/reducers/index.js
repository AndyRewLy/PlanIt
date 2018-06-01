import { combineReducers } from 'redux';

import User from './User';
import AllOrgs from './AllOrgs';
import AdminOrgs from './AdminOrgs';
import MemberOrgs from './MemberOrgs';
import Members from './Members';
import AdminEvents from './AdminEvents';
import AllEvents from './AllEvents';
import RSVPEvents from './RSVPEvents';
import OrgEvents from './OrgEvents';
import EventComments from './EventComments';
import EventRSVPResponses from './EventRSVPResponses';
import AdminRequests from './AdminRequests';

const appReducer = combineReducers({User, AllOrgs, AdminOrgs, MemberOrgs, AdminEvents, AllEvents, RSVPEvents, EventComments, OrgEvents, EventRSVPResponses, Members, AdminRequests});

const rootReducer = (state, action) => {
    if (action.type == 'LOG_OUT')
        state = undefined;

    return appReducer(state, action);
}

export default rootReducer;