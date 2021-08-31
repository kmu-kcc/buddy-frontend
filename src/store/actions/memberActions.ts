import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {APIRejectResponse} from '.';
import {User} from '../../models/User';
import * as apis from '../apis/member';
import {MemberRequestsMessage} from '../../common/wordings';

/**
 * actions for current member information change
 */
export const changeCheckedInSignUpRequests = createAction<{index: number; checked: boolean;}>('member/changeCheckedInSignUpRequests');
export const changeCheckedInWithdrawalRequests = createAction<{index: number; checked: boolean;}>('member/changeCheckedInWithdrawalRequests');
export const setCurrentMember = createAction<User>('member/setCurrentMember');

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

export const updateMemberRole = createAsyncThunk<void, apis.UpdateMemberRoleRequest, APIRejectResponse>('member/updateMemberRole', async (data, thunkAPI) => {
  try {
    const response = await apis.updateMemberRole(data);
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

export const getSignUpActivated = createAsyncThunk<boolean, void, APIRejectResponse>('member/getSignUpActivated', async (data, thunkAPI) => {
  try {
    const response = await apis.getSignUpActivated();
    if (response.status === 200) {
      return response.data.data.active;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err?.response?.data?.error);
  }
});

export const activateSignUp = createAsyncThunk<boolean, apis.ActivateSignUpRequest, APIRejectResponse>('member/activateSignUp', async (data, thunkAPI) => {
  try {
    const response = await apis.activateSignUp(data);
    if (response.status === 200) {
      return response.data.data.active;
    } else {
      return thunkAPI.rejectWithValue(response.data.error);
    }
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err?.response?.data?.error);
  }
});
