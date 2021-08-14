import React from 'react';
import {Route} from 'react-router-dom';
import {Members} from './Members';
import {MemberRequests} from './MemberRequests';

export const Organization = () => (
  <>
    <Route path='/organization/members' component={Members} />
    <Route path='/organization/members/request' component={MemberRequests} />
  </>
);
