import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {Attendance, User} from '../../models/User';
import {signIn, SignInRequest, signUp, SignUpRequest, getMy, GetMyRequest} from '../apis/auth';

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
export const getMeRequest = createAsyncThunk<User, GetMyRequest>('user/getMe', async (data, thunkAPI) => {
  try {
    const response = await getMy(data);
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

export const signInRequest = createAsyncThunk<void, SignInRequest>('user/signIn', async (data, thunkAPI) => {
  try {
    const response = await signIn(data);
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

export const signUpRequest = createAsyncThunk<void, SignUpRequest>('user/signUp', async (data, thunkAPI) => {
  try {
    const response = await signUp(data);
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
