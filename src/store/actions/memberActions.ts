import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {User, Attendance} from '../../models/User';
import * as apis from '../apis/member';

/**
 * actions for current member information change
 */
export const changePhoneNumber = createAction<string>('member/changePhoneNumber');
export const changeEmail = createAction<string>('member/changeEmail');
export const changeGrade = createAction<number>('member/changeGrade');
export const changeCollege = createAction<string>('member/changeCollege');
export const changeMajor = createAction<string>('member/changeMajor');
export const changeAttendance = createAction<Attendance>('member/changeAttendance');

/**
 * actions for async request
 */
export const getSignUpRequests = createAsyncThunk<User[], void>('member/getSignUpRequests', async (data, thunkAPI) => {
  try {
    const response = await apis.getSignUpRequests();
    if (response.status === 200) {
      return response.data.data.signups;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err);
  }
});

export const getWithdrawalRequests = createAsyncThunk('member/getWithdrawalRequests', async (data, thunkAPI) => {
  try {
    const response = await apis.getWithdrawalRequests();
    if (response.status === 200) {
      return response.data.data.exits;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err);
  }
});

export const approveSignUp = createAsyncThunk<void, apis.ApproveSignUpRequest>('member/approveSignUp', async (data, thunkAPI) => {
  try {
    const response = await apis.approveSignUp(data);
    if (response.status === 200) {
      return;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err);
  }
});

export const rejectSignUp = createAsyncThunk<void, apis.RejectSignUpRequest>('member/rejectSignUp', async (data, thunkAPI) => {
  try {
    const response = await apis.rejectSignUp(data);
    if (response.status === 200) {
      return;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err);
  }
});

export const searchMember = createAsyncThunk<User[], apis.SearchMemberRequest>('member/searchMember', async (data, thunkAPI) => {
  try {
    const response = await apis.searchMember(data);
    if (response.status === 200) {
      return response.data.data.members;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err);
  }
});
