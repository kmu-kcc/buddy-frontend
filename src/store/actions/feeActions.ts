import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {APIRejectResponse} from '.';
import {Deptors, Account, Semester} from '../../models/Fee';
import {User} from '../../models/User';
import * as apis from '../apis/fee';

/**
 * actions for semester
 */
export const setSemester = createAction<Semester>('fee/setSemester');

/**
 * actions for async request
 */
export const createFee = createAsyncThunk<void, apis.CreateFeeRequest, APIRejectResponse>('fee/createFee', async (data, thunkAPI) => {
  try {
    const response = await apis.createFee(data);
    if (response.status === 200) {
      return;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err?.response?.data?.error ?? '');
  }
});

export const searchAmount = createAsyncThunk<number, apis.SearchAmountRequest, APIRejectResponse>('fee/searchAmount', async (data, thunkAPI) => {
  try {
    const response = await apis.searchAmount(data);
    if (response.status === 200) {
      return response.data.data.amount;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err?.response?.data?.error ?? '');
  }
});

export const searchPayers = createAsyncThunk<User[], apis.SearchPayersRequest, APIRejectResponse>('fee/searchPayers', async (data, thunkAPI) => {
  try {
    const response = await apis.searchPayers(data);
    if (response.status === 200) {
      return response.data.data.payers;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err?.response?.data?.error ?? '');
  }
});

export const searchDeptors = createAsyncThunk<Deptors[], apis.SearchDeptorsRequest, APIRejectResponse>('fee/searchDeptors', async (data, thunkAPI) => {
  try {
    const response = await apis.searchDeptors(data);
    if (response.status === 200) {
      return response.data.data.deptors;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err?.response?.data?.error ?? '');
  }
});

export const searchAccount = createAsyncThunk<Account, apis.SearchAccountRequest, APIRejectResponse>('fee/searchAccount', async (data, thunkAPI) => {
  try {
    const response = await apis.searchAccount(data);
    if (response.status === 200) {
      return response.data.data;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err?.response?.data?.error ?? '');
  }
});

export const pay = createAsyncThunk<void, apis.PayRequest, APIRejectResponse>('fee/pay', async (data, thunkAPI) => {
  try {
    const response = await apis.pay(data);
    if (response.status === 200) {
      return;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err?.response?.data?.error ?? '');
  }
});

export const deposit = createAsyncThunk<void, apis.DepositRequest, APIRejectResponse>('fee/deposit', async (data, thunkAPI) => {
  try {
    const response = await apis.searchAccount(data);
    if (response.status === 200) {
      return;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err?.response?.data?.error ?? '');
  }
});

export const exempt = createAsyncThunk<void, apis.ExemptRequest, APIRejectResponse>('fee/exempt', async (data, thunkAPI) => {
  try {
    const response = await apis.searchAccount(data);
    if (response.status === 200) {
      return;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err?.response?.data?.error ?? '');
  }
});
