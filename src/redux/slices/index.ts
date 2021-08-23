import {activitySlice} from './activitySlice';
import {feeSlice} from './feeSlice';
import {memberSlice} from './memberSlice';
import {userSlice} from './userSlice';

export const reducer = {
  activity: activitySlice,
  fee: feeSlice,
  member: memberSlice,
  user: userSlice,
};
