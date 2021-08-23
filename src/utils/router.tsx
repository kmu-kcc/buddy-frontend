import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {NotFound} from '../pages/NotFound';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Router = ({children}: Props) => {
  return (
    <Switch>
      {children}
      <Route component={NotFound} />
    </Switch>
  );
};
