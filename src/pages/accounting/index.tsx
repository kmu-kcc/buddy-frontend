import React from 'react';
import {Route} from 'react-router-dom';
import {Router} from '../../utils/router';
import {AccountMembers} from './AccountMembers';
import {AccountRequests} from './AccountRequests';

export const Accounting = () => (
  <Router>
    <Route path='/accounting/accountmembers' exact component={AccountMembers} />
    <Route path='/accounting/account/request' exact component={AccountRequests} />
  </Router>
);
