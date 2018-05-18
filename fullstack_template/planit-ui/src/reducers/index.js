import { combineReducers } from 'redux';

import User from './User';
import AllOrgs from './AllOrgs';
import AdminOrgs from './AdminOrgs';
import MemberOrgs from './MemberOrgs';
import AdminEvents from './AdminEvents';
import AllEvents from './AllEvents';
import RSVPEvents from './RSVPEvents';
import EventComments from './EventComments';

const appReducer = combineReducers({User, AllOrgs, AdminOrgs, MemberOrgs, AdminEvents, AllEvents, RSVPEvents, EventComments});
const rootReducer = (state, action) => {
    if (action.type == 'LOG_OUT')
        state = undefined;

    return appReducer(state, action);
}

export default rootReducer;