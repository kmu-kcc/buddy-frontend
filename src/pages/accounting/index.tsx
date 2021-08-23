import React from 'react';
import {Route} from 'react-router-dom';
import {Router} from '../../utils/router';
import {AccountMembers} from './AccountMembers';

export const Accounting = () => (
  <Router>
    <Route path='/accounting/accountmembers' exact component={AccountMembers} />
  </Router>
);
