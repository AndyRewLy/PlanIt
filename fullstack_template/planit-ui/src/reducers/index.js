import { combineReducers } from 'redux';

import User from './User';
import AdminOrgs from './AdminOrgs';
import MemberOrgs from './MemberOrgs';

const rootReducer = combineReducers({User, AdminOrgs, MemberOrgs});

export default rootReducer;