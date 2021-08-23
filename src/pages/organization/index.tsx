import React from 'react';
import {Route} from 'react-router-dom';
import {Members} from './Members';
import {Router} from '../../utils/router';
import {MemberRequests, WithdrawRequests} from './MemberRequests';

export const Organization = () => (
  <Router>
    <Route path='/organization/members' exact component={Members} />
    <Route path='/organization/members/request' exact component={MemberRequests} />
    <Route path='/organization/members/withdraw' exact component={WithdrawRequests} />
  </Router>
);
