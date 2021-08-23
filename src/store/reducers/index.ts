import {combineReducers} from '@reduxjs/toolkit';
import {activityReducer} from './activityReducer';
import {feeReducer} from './feeReducer';
import {memberReducer} from './memberReducer';
import {userReducer} from './userReducer';

export const reducer = combineReducers({
  activity: activityReducer,
  fee: feeReducer,
  member: memberReducer,
  user: userReducer,
});
