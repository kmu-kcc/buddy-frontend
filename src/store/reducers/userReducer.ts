import {createReducer} from '@reduxjs/toolkit';
import {User} from '../../models/User';
import * as actions from '../actions/userActions';
import {setCredentials} from '../../common/credentials';

interface State {
  user: User | null;
  loading: boolean;
  loadingSignIn: boolean;
  loadingSignUp: boolean;
  loadingWithdraw: boolean;
};

const initialState: State = {
  user: null,
  loading: false,
  loadingSignIn: false,
  loadingSignUp: false,
  loadingWithdraw: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
      .addCase(actions.changePhoneNumber, (state, {payload}) => {
        if (!state.user) {
          return;
        }
        state.user.phone = payload;
      })
      .addCase(actions.changeEmail, (state, {payload}) => {
        if (!state.user) {
          return;
        }
        state.user.phone = payload;
      })
      .addCase(actions.changeGrade, (state, {payload}) => {
        if (!state.user) {
          return;
        }
        state.user.grade = payload;
      })
      .addCase(actions.changeCollege, (state, {payload}) => {
        if (!state.user) {
          return;
        }
        const departments = state.user.department.split(' ').slice(1);
        state.user.department = [payload, ...departments].join(' ');
      })
      .addCase(actions.changeMajor, (state, {payload}) => {
        if (!state.user) {
          return;
        }
        const departments = state.user.department.split(' ').slice(0, 1);
        state.user.department = [...departments, payload].join(' ');
      })
      .addCase(actions.changeAttendance, (state, {payload}) => {
        if (!state.user) {
          return;
        }
        state.user.attendance = payload;
      })
      .addCase(actions.signInRequest.pending, (state, action) => {
        state.loadingSignIn = true;
      })
      .addCase(actions.signInRequest.fulfilled, (state, {payload}) => {
        state.loadingSignIn = false;
        console.log('store credentials into localStorage');
        setCredentials(payload);
      })
      .addCase(actions.signInRequest.rejected, (state, action) => {
        state.loadingSignIn = false;
      })
      .addCase(actions.signUpRequest.pending, (state, action) => {
        state.loadingSignUp = true;
      })
      .addCase(actions.signUpRequest.fulfilled, (state, action) => {
        state.loadingSignUp = false;
      })
      .addCase(actions.signUpRequest.rejected, (state, action) => {
        state.loadingSignUp = false;
      })
      .addCase(actions.getMeRequest.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(actions.getMeRequest.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.user = payload;
      })
      .addCase(actions.getMeRequest.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(actions.updateMemberRequest.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(actions.updateMemberRequest.fulfilled, (state, {payload}) => {
        state.loading = false;
      })
      .addCase(actions.updateMemberRequest.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(actions.withdraw.pending, (state, action) => {
        state.loadingWithdraw = true;
      })
      .addCase(actions.withdraw.fulfilled, (state, {payload}) => {
        state.loadingWithdraw = false;
      })
      .addCase(actions.withdraw.rejected, (state, action) => {
        state.loadingWithdraw = false;
      });
});
