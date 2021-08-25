import React from 'react';
import {Route} from 'react-router-dom';
import {Router} from '../../utils/router';
import {SignIn} from './SignIn';
import {SignUp} from './SignUp';
import {Complete} from './Complete';

export const Auth = () => (
  <Router>
    <Route path='/auth/signin' exact component={SignIn} />
    <Route path='/auth/signup' exact component={SignUp} />
    <Route path='/auth/signup/complete' exact component={Complete} />
  </Router>
);
