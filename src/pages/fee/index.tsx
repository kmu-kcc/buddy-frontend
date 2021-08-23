import React from 'react';
import {Route} from 'react-router-dom';
import {Router} from '../../utils/router';
import {Account} from './Account';
import {Members} from './Members';

export const Fee = () => (
  <Router>
    <Route path='/fee/account' exact component={Account} />
    <Route path='/fee/members' exact component={Members} />
  </Router>
);
