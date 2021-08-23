import {createReducer} from '@reduxjs/toolkit';
import {User} from '../../models/User';

interface State {
  user: User | null;
};

const initialState: State = {
  user: null,
};

export const userReducer = createReducer(initialState, {

});
