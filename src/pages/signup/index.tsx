import React from 'react';
import {Route} from 'react-router-dom';
import {Router} from '../../utils/router';
import {Complete} from './Complete';
import {SignUp} from './SignUp';

export const Signup = () => (
  <Router>
    <Route path='/signup' exact component={SignUp} />
    <Route path='/signup/complete' exact component={Complete} />
  </Router>
);
