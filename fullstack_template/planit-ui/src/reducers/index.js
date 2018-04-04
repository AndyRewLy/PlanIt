import { combineReducers } from 'redux';

import User from './User';
import AllOrgs from './AllOrgs';
import AdminOrgs from './AdminOrgs';
import MemberOrgs from './MemberOrgs';
import Events from './Events';

const rootReducer = combineReducers({User, AllOrgs, AdminOrgs, MemberOrgs, Events});

export default rootReducer;