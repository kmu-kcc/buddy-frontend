import React from 'react';
import {Route} from 'react-router-dom';
import {Profile} from './Profile';
import {Settings} from './Settings';

export const User = () => {
  return (
    <>
      <Route path='/user' exact component={Profile} />
      <Route path='/user/settings' exact component={Settings} />
    </>
  );
};
