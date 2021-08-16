import React from 'react';
import {Route} from 'react-router-dom';
import {NotFound} from '../pages/NotFound';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Router = ({children}: Props) => {
  return (
    <>
      {children}
      <Route component={NotFound} />
    </>
  );
};
