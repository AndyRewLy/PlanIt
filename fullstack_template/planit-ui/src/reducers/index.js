import { combineReducers } from 'redux';

import User from './User';
import AdminOrgs from './AdminOrgs';
import MemberOrgs from './MemberOrgs';
import Events from './Events';

const rootReducer = combineReducers({User, AdminOrgs, MemberOrgs, Events});

export default rootReducer;