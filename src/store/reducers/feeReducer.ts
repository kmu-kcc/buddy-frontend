import {createReducer} from '@reduxjs/toolkit';
import {Payers, Deptors, SearchFee} from '../../models/Fee';
import * as actions from '../actions/feeActions';

interface State {
  payers: Payers[];
  deptors: Deptors[];
  searchfee: SearchFee[];
  amounts: number;
  loadingCreatefee: boolean;
  loadingAmount: boolean;
  loadingPayers: boolean;
  loadingDeptors: boolean;
  loadingSearch: boolean;
  loadingPay: boolean;
  loadingDeposit: boolean;
  loadingExempt: boolean;
};

const initialState: State = {
  payers: [],
  deptors: [],
  searchfee: [],
  amounts: 0,
  loadingCreatefee: false,
  loadingAmount: false,
  loadingPayers: false,
  loadingDeptors: false,
  loadingSearch: false,
  loadingPay: false,
  loadingDeposit: false,
  loadingExempt: false,
};

export const feeReducer = createReducer(initialState, (builder) => {
  builder
      .addCase(actions.createFee.pending, (state, action) => {
        state.loadingCreatefee = true;
      })
      .addCase(actions.createFee.fulfilled, (state, action) => {
        state.loadingCreatefee = false;
      })
      .addCase(actions.createFee.rejected, (state, action) => {
        state.loadingCreatefee = false;
      })
      .addCase(actions.searchAmountList.pending, (state, action) => {
        state.loadingAmount = true;
      })
      .addCase(actions.searchAmountList.fulfilled, (state, {payload}) => {
        state.loadingAmount = false;
        state.amounts = payload;
      })
      .addCase(actions.searchAmountList.rejected, (state, action) => {
        state.loadingAmount = false;
        state.amounts = 0;
      })
      .addCase(actions.searchPayersList.pending, (state, action) => {
        state.loadingPayers = true;
      })
      .addCase(actions.searchPayersList.fulfilled, (state, {payload}) => {
        state.loadingPayers = false;
        state.payers = payload;
      })
      .addCase(actions.searchPayersList.rejected, (state, action) => {
        state.loadingPayers = false;
        state.payers = [];
      })
      .addCase(actions.searchDeptorsList.pending, (state, action) => {
        state.loadingDeptors = true;
      })
      .addCase(actions.searchDeptorsList.fulfilled, (state, {payload}) => {
        state.loadingDeptors = false;
        state.deptors = payload;
      })
      .addCase(actions.searchDeptorsList.rejected, (state, action) => {
        state.loadingDeptors = false;
      })
      .addCase(actions.searchTransaction.pending, (state, action) => {
        state.loadingSearch = true;
      })
      .addCase(actions.searchTransaction.fulfilled, (state, {payload}) => {
        state.loadingSearch = false;
        state.searchfee = [payload];
      })
      .addCase(actions.searchTransaction.rejected, (state, action) => {
        state.loadingSearch = false;
        state.searchfee = [];
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
