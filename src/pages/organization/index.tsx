import React from 'react';
import {Route} from 'react-router-dom';
import {Members} from './Members';
import {Router} from '../../utils/router';
import {MemberRequests} from './MemberRequests';

export const Organization = () => (
  <Router>
    <Route path='/organization/members' exact component={Members} />
    <Route path='/organization/members/request' exact component={MemberRequests} />
  </Router>
);
