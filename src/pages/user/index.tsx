import React from 'react';
import {Router, Route} from '../../common/router';
import {Profile} from './Profile';
import {Settings} from './Settings';

export const User = () => (
  <Router authentication>
    <Route path='/user' exact component={Profile} />
    <Route path='/user/settings' exact component={Settings} />
  </Router>
);
