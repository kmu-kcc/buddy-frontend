import {createAsyncThunk} from '@reduxjs/toolkit';
import {Payers, Deptors, SearchFee} from '../../models/Fee';
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

export const searchAmountList = createAsyncThunk<number, apis.SearchAmountListRequest>('/fee/amount', async (data, thunkAPI) => {
  try {
    const response = await apis.searchAmountList(data);
    if (response.status === 200) {
      return response.data.data.amount;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    thunkAPI.rejectWithValue(err);
  }
});

export const searchPayersList= createAsyncThunk<Payers[], apis.SearchPayersListRequest>('/fee/payers', async (data, thunkAPI) => {
  try {
    const response = await apis.searchPayersList(data);
    if (response.status === 200) {
      return response.data.data.payers;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    thunkAPI.rejectWithValue(err);
  }
});

export const searchDeptorsList= createAsyncThunk<Deptors[], apis.SearchDeptorsListRequest>('/fee/deptors', async (data, thunkAPI) => {
  try {
    const response = await apis.searchDeptorsList(data);
    if (response.status === 200) {
      return response.data.data.deptors;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    thunkAPI.rejectWithValue(err);
  }
});

export const searchTransaction= createAsyncThunk<SearchFee[], apis.SearchTransactionRequest>('/fee/search', async (data, thunkAPI) => {
  try {
    const response = await apis.searchTransaction(data);
    if (response.status === 200) {
      return response.data.data;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    thunkAPI.rejectWithValue(err);
  }
});

export const pay= createAsyncThunk<void, apis.PayRequest>('/fee/pay', async (data, thunkAPI) => {
  try {
    const response = await apis.pay(data);
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

export const deposit= createAsyncThunk<void, apis.DepositRequest>('/fee/deposit', async (data, thunkAPI) => {
  try {
    const response = await apis.searchTransaction(data);
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

export const exempt= createAsyncThunk<void, apis.ExemptRequest>('/fee/exempt', async (data, thunkAPI) => {
  try {
    const response = await apis.searchTransaction(data);
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
