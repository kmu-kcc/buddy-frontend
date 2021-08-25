import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {APIRejectResponse} from '.';
import {User, Attendance} from '../../models/User';
import * as apis from '../apis/member';
import {MemberRequestsMessage} from '../../common/wordings';

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
export const getSignUpRequests = createAsyncThunk<User[], void, APIRejectResponse>('member/getSignUpRequests', async (data, thunkAPI) => {
  try {
    const response = await apis.getSignUpRequests();
    if (response.status === 200) {
      return response.data.data.signups;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err?.response?.data?.error ?? MemberRequestsMessage.loadingFail);
  }
});

export const getWithdrawalRequests = createAsyncThunk<User[], void, APIRejectResponse>('member/getWithdrawalRequests', async (data, thunkAPI) => {
  try {
    const response = await apis.getWithdrawalRequests();
    if (response.status === 200) {
      return response.data.data.exits;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err?.response?.data?.error ?? MemberRequestsMessage.loadingFail);
  }
});

export const approveSignUp = createAsyncThunk<void, apis.ApproveSignUpRequest, APIRejectResponse>('member/approveSignUp', async (data, thunkAPI) => {
  try {
    const response = await apis.approveSignUp(data);
    if (response.status === 200) {
      return;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err?.response?.data?.error);
  }
});

export const deleteMember = createAsyncThunk<void, apis.DeleteMemberRequest, APIRejectResponse>('member/rejectSignUp', async (data, thunkAPI) => {
  try {
    const response = await apis.deleteMember(data);
    if (response.status === 200) {
      return;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err?.response?.data?.error);
  }
});

// export const rejectWithdraw = createAsyncThunk<void, apis.RejectWithdrawRequest, APIRejectResponse>('member/rejectWithdraw', async (data, thunkAPI) => {
//   try {
//     const response = await apis.rejectWIthdraw(data);
//     if (response.status === 200) {
//       return;
//     } else {
//       return thunkAPI.rejectWithValue(response.data.error);
//     }
//   } catch (err) {
//     console.log(err);
//     return thunkAPI.rejectWithValue(err?.response?.data?.error);
//   }
// });

export const searchMember = createAsyncThunk<User[], apis.SearchMemberRequest, APIRejectResponse>('member/searchMember', async (data, thunkAPI) => {
  try {
    const response = await apis.searchMember(data);
    if (response.status === 200) {
      return response.data.data.members;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err?.response?.data?.error);
  }
});
