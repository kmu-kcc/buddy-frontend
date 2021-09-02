import {configureStore, Middleware} from '@reduxjs/toolkit';
import {useDispatch as useReduxDispatch} from 'react-redux';
import loggerMiddleware from 'redux-logger';
import {reducer} from './reducers';
import {isProduction} from '../utils/env';

const middleware: Middleware[] = isProduction() ? [] : [loggerMiddleware];

export const store = configureStore({
  reducer,
  middleware: (middlewares) => middlewares().concat(middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export const useDispatch = () => useReduxDispatch<Dispatch>();
