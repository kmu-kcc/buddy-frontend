import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {Attendance, User} from '../../models/User';
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
export const getMeRequest = createAsyncThunk<User, apis.GetMyRequest>('user/getMe', async (data, thunkAPI) => {
  try {
    const response = await apis.getMy(data);
    if (response.status === 200) {
      return response.data.data;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err);
  }
});

export const signInRequest = createAsyncThunk<void, apis.SignInRequest>('user/signIn', async (data, thunkAPI) => {
  try {
    const response = await apis.signIn(data);
    if (response.status === 200) {
      return response.data.data;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err);
  }
});

export const signUpRequest = createAsyncThunk<void, apis.SignUpRequest>('user/signUp', async (data, thunkAPI) => {
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
