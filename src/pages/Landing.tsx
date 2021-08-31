import React, {useEffect} from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import {isExpired, getCredentials} from '../common/credentials';

export const Landing = () => {
  const history = useHistory();

  useEffect(() => {
    const credentials = getCredentials();
    if (!credentials || isExpired(credentials.expired_at)) {
      history.replace('/auth/signin');
    }

    history.replace('/user');
  }, [history]);

  return (
    <Redirect to='/auth/signin' />
  );
};
