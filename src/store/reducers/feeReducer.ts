import {createReducer} from '@reduxjs/toolkit';
import {Deptors, Account, Semester} from '../../models/Fee';
import {User} from '../../models/User';
import * as actions from '../actions/feeActions';
import {getCurrentSemester} from '../../utils/semester';

interface State {
  payers: User[];
  deptors: Deptors[];
  account: Account | null;
  amounts: number;
  currentSemester: Semester;
  loadingCreateFee: boolean;
  loadingAmount: boolean;
  loadingPayers: boolean;
  loadingDeptors: boolean;
  loadingTransaction: boolean;
  loadingPay: boolean;
  loadingDeposit: boolean;
  loadingExempt: boolean;
};

const initialState: State = {
  payers: [],
  deptors: [],
  account: null,
  amounts: 0,
  currentSemester: getCurrentSemester(),
  loadingCreateFee: false,
  loadingAmount: false,
  loadingPayers: false,
  loadingDeptors: false,
  loadingTransaction: false,
  loadingPay: false,
  loadingDeposit: false,
  loadingExempt: false,
};

export const feeReducer = createReducer(initialState, (builder) => {
  builder
      .addCase(actions.setSemester, (state, {payload}) => {
        state.currentSemester = payload;
      })
      .addCase(actions.createFee.pending, (state, action) => {
        state.loadingCreateFee = true;
      })
      .addCase(actions.createFee.fulfilled, (state, action) => {
        state.loadingCreateFee = false;
      })
      .addCase(actions.createFee.rejected, (state, action) => {
        state.loadingCreateFee = false;
      })
      .addCase(actions.searchAmount.pending, (state, action) => {
        state.loadingAmount = true;
      })
      .addCase(actions.searchAmount.fulfilled, (state, {payload}) => {
        state.loadingAmount = false;
        state.amounts = payload ?? 0;
      })
      .addCase(actions.searchAmount.rejected, (state, action) => {
        state.loadingAmount = false;
        state.amounts = 0;
      })
      .addCase(actions.searchPayers.pending, (state, action) => {
        state.loadingPayers = true;
      })
      .addCase(actions.searchPayers.fulfilled, (state, {payload}) => {
        state.loadingPayers = false;
        state.payers = payload ?? [];
      })
      .addCase(actions.searchPayers.rejected, (state, action) => {
        state.loadingPayers = false;
        state.payers = [];
      })
      .addCase(actions.searchDeptors.pending, (state, action) => {
        state.loadingDeptors = true;
      })
      .addCase(actions.searchDeptors.fulfilled, (state, {payload}) => {
        state.loadingDeptors = false;
        state.deptors = payload ?? [];
      })
      .addCase(actions.searchDeptors.rejected, (state, action) => {
        state.loadingDeptors = false;
        state.deptors = [];
      })
      .addCase(actions.searchAccount.pending, (state, action) => {
        state.loadingTransaction = true;
      })
      .addCase(actions.searchAccount.fulfilled, (state, {payload}) => {
        state.loadingTransaction = false;
        state.account = payload;
      })
      .addCase(actions.searchAccount.rejected, (state, action) => {
        state.loadingTransaction = false;
        state.account = null;
      })
      .addCase(actions.pay.pending, (state, action) => {
        state.loadingPay = true;
      })
      .addCase(actions.pay.fulfilled, (state, action) => {
        state.loadingPay = false;
      })
      .addCase(actions.pay.rejected, (state, action) => {
        state.loadingPay = false;
      })
      .addCase(actions.deposit.pending, (state, action) => {
        state.loadingDeposit = true;
      })
      .addCase(actions.deposit.fulfilled, (state, action) => {
        state.loadingDeposit = false;
      })
      .addCase(actions.deposit.rejected, (state, action) => {
        state.loadingDeposit = false;
      })
      .addCase(actions.exempt.pending, (state, action) => {
        state.loadingExempt = true;
      })
      .addCase(actions.exempt.fulfilled, (state, action) => {
        state.loadingExempt = false;
      })
      .addCase(actions.exempt.rejected, (state, action) => {
        state.loadingExempt = false;
      });
});
