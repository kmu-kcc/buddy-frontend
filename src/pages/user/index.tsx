import React from 'react';
import {Route} from 'react-router-dom';
import {Router} from '../../utils/router';
import {Profile} from './Profile';
import {Settings} from './Settings';

export const User = () => (
  <Router>
    <Route path='/user' exact component={Profile} />
    <Route path='/user/settings' exact component={Settings} />
  </Router>
);
