import {createReducer} from '@reduxjs/toolkit';
import {Activity} from '../../models/Activity';
import * as actions from '../actions/activityActions';

interface State {
  activities: Activity[];
  currentActivity: Activity | null;
  loading: boolean;
};

const initialState: State = {
  activities: [],
  currentActivity: null,
  loading: false,
};

export const activityReducer = createReducer(initialState, (builder) => {
  builder
      .addCase(actions.setCurrentActivity, (state, {payload}) => {
        state.currentActivity = payload;
      })
      .addCase(actions.createActivity.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(actions.createActivity.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(actions.createActivity.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(actions.updateActivity.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(actions.updateActivity.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(actions.updateActivity.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(actions.deleteActivity.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(actions.deleteActivity.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(actions.deleteActivity.rejected, (state, action) => {
        state.loading = false;
      });
});
