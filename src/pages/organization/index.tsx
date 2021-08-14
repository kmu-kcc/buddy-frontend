import React from 'react';
import {Route} from 'react-router-dom';
import {Members} from './Members';
import {MemberRequests} from './MemberRequests';

export const Organization = () => (
  <>
    <Route component={Members} />
    <Route component={MemberRequests} />
  </>
);
