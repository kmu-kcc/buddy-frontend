import React from 'react';
import {Route} from 'react-router-dom';
import {Router} from '../../utils/router';
import {Members} from './Members';

export const Fee = () => (
  <Router>
    <Route path='/fee/members' exact component={Members} />
  </Router>
);
