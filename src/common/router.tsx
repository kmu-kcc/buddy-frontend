import React, {useEffect} from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
import {getCredentials, isExpired} from './credentials';
import {NotFound} from '../pages/NotFound';

interface Props {
  authentication?: boolean;
  children: JSX.Element | JSX.Element[];
}

export const Router = ({authentication, children}: Props) => {
  const history = useHistory();

  useEffect(() => {
    if (authentication) {
      const credentials = getCredentials();

      if (!credentials || isExpired(credentials.expired_at)) {
        history.push('/auth/signin');
      }
    }
  }, [history, authentication]);

  return (
    <Switch>
      {children}
      <Route component={NotFound} />
    </Switch>
  );
};
