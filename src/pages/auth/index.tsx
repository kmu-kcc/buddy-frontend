import React, {useEffect} from 'react';
import {Route, useHistory} from 'react-router-dom';
import {getCredentials, getCredentialInfo, isExpired} from '../../common/credentials';
import {Router} from '../../common/router';
import {SignIn} from './SignIn';
import {SignUp} from './SignUp';
import {Complete} from './Complete';

export const Auth = () => {
  const history = useHistory();
  useEffect(() => {
    const credentials = getCredentials();
    const info = getCredentialInfo();

    if (credentials && !isExpired(credentials.expired_at) && info) {
      history.push('/user');
    }
  }, [history]);

  return (
    <Router>
      <Route path='/auth/signin' exact component={SignIn} />
      <Route path='/auth/signup' exact component={SignUp} />
      <Route path='/auth/signup/complete' exact component={Complete} />
    </Router>
  );
};
