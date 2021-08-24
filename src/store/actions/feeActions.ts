import {createAsyncThunk} from '@reduxjs/toolkit';
import * as apis from '../apis/fee';

/**
 * actions for async request
 */
export const createFee = createAsyncThunk<void, apis.CreateFeeRequest>('fee/createFee', async (data, thunkAPI) => {
  try {
    const response = await apis.createFee(data);
    if (response.status === 200) {
      return;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    thunkAPI.rejectWithValue(err);
  }
});
