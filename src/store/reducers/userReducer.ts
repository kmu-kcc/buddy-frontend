import {createReducer} from '@reduxjs/toolkit';
import {User} from '../../models/User';
import * as actions from '../actions/userActions';

interface State {
  user: User | null;
  loading: boolean;
  loadingSignIn: boolean;
  loadingSignUp: boolean;
};

const initialState: State = {
  user: null,
  loading: false,
  loadingSignIn: false,
  loadingSignUp: false,
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
      .addCase(actions.signInRequest.fulfilled, (state, action) => {
        state.loadingSignIn = false;
        // credentials store logic required
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
        state.user = payload;
      })
      .addCase(actions.getMeRequest.rejected, (state, action) => {
        state.loading = false;
      });
});
