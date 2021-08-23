import {createReducer} from '@reduxjs/toolkit';
import {User} from '../../models/User';
import * as actions from '../actions/memberActions';

interface State {
  members: User[];
  currentMember: User | null;
  signUpRequests: User[];
  withdrawalRequests: User[];
  loading: boolean,
  loadingSignUpRequests: boolean,
  loadingWithdrawalRequests: boolean,
  loadingApproveRequests: boolean;
  loadingRejectRequests: boolean;
};

const initialState: State = {
  members: [],
  currentMember: null,
  signUpRequests: [],
  withdrawalRequests: [],
  loading: false,
  loadingSignUpRequests: false,
  loadingWithdrawalRequests: false,
  loadingApproveRequests: false,
  loadingRejectRequests: false,
};

export const memberReducer = createReducer(initialState, (builder) => {
  builder
      .addCase(actions.changePhoneNumber, (state, {payload}) => {
        if (!state.currentMember) {
          return;
        }
        state.currentMember.phone = payload;
      })
      .addCase(actions.changeEmail, (state, {payload}) => {
        if (!state.currentMember) {
          return;
        }
        state.currentMember.email = payload;
      })
      .addCase(actions.changeGrade, (state, {payload}) => {
        if (!state.currentMember) {
          return;
        }
        state.currentMember.grade = payload;
      })
      .addCase(actions.changeCollege, (state, {payload}) => {
        if (!state.currentMember) {
          return;
        }
        const departments = state.currentMember.department.split(' ').slice(1);
        state.currentMember.department = [payload, ...departments].join(' ');
      })
      .addCase(actions.changeMajor, (state, {payload}) => {
        if (!state.currentMember) {
          return;
        }
        const departments = state.currentMember.department.split(' ').slice(0, 1);
        state.currentMember.department = [...departments, payload].join(' ');
      })
      .addCase(actions.changeAttendance, (state, {payload}) => {
        if (!state.currentMember) {
          return;
        }
        state.currentMember.attendance = payload;
      })
      .addCase(actions.getSignUpRequests.pending, (state, action) => {
        state.loadingSignUpRequests = true;
      })
      .addCase(actions.getSignUpRequests.fulfilled, (state, {payload}) => {
        state.loadingSignUpRequests = false;
        state.signUpRequests = payload;
      })
      .addCase(actions.getSignUpRequests.rejected, (state, action) => {
        state.loadingSignUpRequests = false;
        state.signUpRequests = [];
      })
      .addCase(actions.getWithdrawalRequests.pending, (state, action) => {
        state.loadingWithdrawalRequests = true;
      })
      .addCase(actions.getWithdrawalRequests.fulfilled, (state, {payload}) => {
        state.loadingWithdrawalRequests = false;
        state.withdrawalRequests = payload;
      })
      .addCase(actions.getWithdrawalRequests.rejected, (state, action) => {
        state.loadingWithdrawalRequests = false;
        state.withdrawalRequests = [];
      })
      .addCase(actions.approveSignUp.pending, (state, action) => {
        state.loadingApproveRequests = true;
      })
      .addCase(actions.approveSignUp.fulfilled, (state, {payload}) => {
        state.loadingApproveRequests = false;
      })
      .addCase(actions.approveSignUp.rejected, (state, action) => {
        state.loadingApproveRequests = false;
      })
      .addCase(actions.rejectSignUp.pending, (state, action) => {
        state.loadingRejectRequests = true;
      })
      .addCase(actions.rejectSignUp.fulfilled, (state, {payload}) => {
        state.loadingRejectRequests = false;
      })
      .addCase(actions.rejectSignUp.rejected, (state, action) => {
        state.loadingRejectRequests = false;
      })
      .addCase(actions.searchMember.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(actions.searchMember.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.members = payload;
      })
      .addCase(actions.searchMember.rejected, (state, action) => {
        state.loading = false;
        state.members = [];
      });
});
