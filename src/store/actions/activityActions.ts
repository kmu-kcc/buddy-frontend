import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {Activity, ActivityType} from '../../models/Activity';
import * as apis from '../apis/activity';

/**
 * actions for setting current activity
 */
export const setCurrentActivity = createAction<Activity>('activity/setCurrentActivity');

/**
 * actions for activity information
 */
export const changeStart = createAction<string>('activity/changeStart');
export const changeEnd = createAction<string>('activity/changeEnd');
export const changeDescription = createAction<string>('activity/changeDescription');
export const changePlace = createAction<string>('activity/changePlace');
export const changeType = createAction<ActivityType>('activity/changeType');
export const changeParticipants = createAction<string[]>('activity/changeParticipants');
export const changePrivate = createAction<boolean>('activity/changePrivate');

export const createActivity = createAsyncThunk<void, apis.CreateActivityRequest>('activity/createActivity', async (data, thunkAPI) => {
  try {
    const response = await apis.createActivity(data);
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

export const updateActivity = createAsyncThunk<void, apis.UpdateActivityRequest>('activity/updateActivity', async (data, thunkAPI) => {
  try {
    const response = await apis.updateActivity(data);
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

export const deleteActivity = createAsyncThunk<void, apis.DeleteActivityRequest>('activity/deleteActivity', async (data, thunkAPI) => {
  try {
    const response = await apis.deleteActivity(data);
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
