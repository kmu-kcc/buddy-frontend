import {createReducer} from '@reduxjs/toolkit';
import {Activity} from '../../models/Activity';
import * as actions from '../actions/activityActions';

interface State {
  activities: Activity[];
  currentActivity: Activity | null;
  loading: boolean;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  loadingDelete: boolean;
};

const initialState: State = {
  activities: [],
  currentActivity: null,
  loading: false,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
};

export const activityReducer = createReducer(initialState, (builder) => {
  builder
      .addCase(actions.setCurrentActivity, (state, {payload}) => {
        state.currentActivity = payload;
      })
      .addCase(actions.createActivity.pending, (state, action) => {
        state.loadingCreate = true;
      })
      .addCase(actions.createActivity.fulfilled, (state, action) => {
        state.loadingCreate = false;
      })
      .addCase(actions.createActivity.rejected, (state, action) => {
        state.loadingCreate = false;
      })
      .addCase(actions.updateActivity.pending, (state, action) => {
        state.loadingUpdate = true;
      })
      .addCase(actions.updateActivity.fulfilled, (state, action) => {
        state.loadingUpdate = false;
      })
      .addCase(actions.updateActivity.rejected, (state, action) => {
        state.loadingUpdate = false;
      })
      .addCase(actions.deleteActivity.pending, (state, action) => {
        state.loadingDelete = true;
      })
      .addCase(actions.deleteActivity.fulfilled, (state, action) => {
        state.loadingDelete = false;
      })
      .addCase(actions.deleteActivity.rejected, (state, action) => {
        state.loadingDelete = false;
      })
      .addCase(actions.searchActivity.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(actions.searchActivity.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.activities = payload ?? [];
      })
      .addCase(actions.searchActivity.rejected, (state, action) => {
        state.loading = false;
        state.activities = [];
      });
});
