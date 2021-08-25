import {createReducer} from '@reduxjs/toolkit';
import {User} from '../../models/User';
import * as actions from '../actions/memberActions';

interface State {
  members: User[];
  currentMember: User | null;
  signUpRequests: User[] | null;
  withdrawalRequests: User[] | null;
  loading: boolean,
  loadingSignUpRequests: boolean,
  loadingWithdrawalRequests: boolean,
  loadingSignUpApproveRequests: boolean;
  loadingDeleteMemberRequests: boolean;
};

const initialState: State = {
  members: [],
  currentMember: null,
  signUpRequests: [],
  withdrawalRequests: [],
  loading: false,
  loadingSignUpRequests: false,
  loadingWithdrawalRequests: false,
  loadingSignUpApproveRequests: false,
  loadingDeleteMemberRequests: false,
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
      .addCase(actions.changeCheckedInSignUpRequests, (state, {payload}) => {
        if (!state.signUpRequests) {
          return;
        }
        state.signUpRequests[payload.index].checked = payload.checked;
      })
      .addCase(actions.changeCheckedInWithdrawalRequests, (state, {payload}) => {
        if (!state.withdrawalRequests) {
          return;
        }
        state.withdrawalRequests[payload.index].checked = payload.checked;
      })
      .addCase(actions.getSignUpRequests.pending, (state, action) => {
        state.loadingSignUpRequests = true;
      })
      .addCase(actions.getSignUpRequests.fulfilled, (state, {payload}) => {
        state.loadingSignUpRequests = false;
        state.signUpRequests = payload?.map((req) => ({
          ...req,
          checked: false,
        }));
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
        state.withdrawalRequests = payload?.map((req) => ({
          ...req,
          checked: false,
        }));
      })
      .addCase(actions.getWithdrawalRequests.rejected, (state, action) => {
        state.loadingWithdrawalRequests = false;
        state.withdrawalRequests = [];
      })
      .addCase(actions.approveSignUp.pending, (state, action) => {
        state.loadingSignUpApproveRequests = true;
      })
      .addCase(actions.approveSignUp.fulfilled, (state, {payload}) => {
        state.loadingSignUpApproveRequests = false;
      })
      .addCase(actions.approveSignUp.rejected, (state, action) => {
        state.loadingSignUpApproveRequests = false;
      })
      .addCase(actions.deleteMember.pending, (state, action) => {
        state.loadingDeleteMemberRequests = true;
      })
      .addCase(actions.deleteMember.fulfilled, (state, {payload}) => {
        state.loadingDeleteMemberRequests = false;
      })
      .addCase(actions.deleteMember.rejected, (state, action) => {
        state.loadingDeleteMemberRequests = false;
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
