import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {APIRejectResponse} from '.';
import {Attendance, Credentials, User} from '../../models/User';
import * as apis from '../apis/auth';

/**
 * actions for user information change
 */
export const changePhoneNumber = createAction<string>('user/changePhoneNumber');
export const changeEmail = createAction<string>('user/changeEmail');
export const changeGrade = createAction<number>('user/changeGrade');
export const changeCollege = createAction<string>('user/changeCollege');
export const changeMajor = createAction<string>('user/changeMajor');
export const changeAttendance = createAction<Attendance>('user/changeAttendance');

/**
 * actions for async request
 */
export const getMeRequest = createAsyncThunk<User, apis.GetMyRequest, APIRejectResponse>('user/getMe', async (data, thunkAPI) => {
  try {
    const response = await apis.getMy(data);
    if (response.status === 200) {
      return response.data.data.data;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err);
  }
});

export const signInRequest = createAsyncThunk<Credentials, apis.SignInRequest, APIRejectResponse>('user/signIn', async (data, thunkAPI) => {
  try {
    const response = await apis.signIn(data);
    if (response.status === 200) {
      return response.data.data;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.error || '로그인에 실패했습니다.');
  }
});

export const signUpRequest = createAsyncThunk<void, apis.SignUpRequest, APIRejectResponse>('user/signUp', async (data, thunkAPI) => {
  try {
    const response = await apis.signUp(data);
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

export const updateMeRequest = createAsyncThunk<void, apis.UpdateMeRequest, APIRejectResponse>('user/updateMe', async (data, thunkAPI) => {
  try {
    const response = await apis.updateMe(data);
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

export const withdraw = createAsyncThunk<void, apis.WithdrawRequest, APIRejectResponse>('user/withdraw', async (data, thunkAPI) => {
  try {
    const response = await apis.withdrawRequest(data);
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
