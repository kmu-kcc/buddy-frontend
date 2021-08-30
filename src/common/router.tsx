import React, {useEffect} from 'react';
import {Route as DefaultRoute, Switch, RouteProps as DefaultRouteProps, useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../store';
import {getMeRequest} from '../store/actions/userActions';
import {NotFound} from '../pages/NotFound';
import {UserRole} from '../models/User';
import {getCredentials, getCredentialInfo, isExpired} from './credentials';
import {CommonMessage} from './wordings';

interface RouteProps extends DefaultRouteProps {
  role?: keyof UserRole;
}

export const Route = (props: RouteProps) => {
  const history = useHistory();
  const {role, ...rest} = props;
  const {user} = useSelector((state: RootState) => state.user);

  if (role && (!user || !user?.role[role])) {
    toast.error(CommonMessage.noPermission);
    history.replace('/user');
    return null;
  }

  return <DefaultRoute {...rest} />;
};

interface RouterProps {
  authentication?: boolean;
  children: JSX.Element | JSX.Element[];
}

export const Router = ({authentication, children}: RouterProps) => {
  const dispatch = useDispatch();
  const {user, loading} = useSelector((state: RootState) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (authentication && !loading) {
      const credentials = getCredentials();
      const credentialInfo = getCredentialInfo();

      if (!credentials || isExpired(credentials.expired_at) || !credentialInfo) {
        history.push('/auth/signin');
      }

      if (!user && credentialInfo) {
        dispatch(getMeRequest({
          ...credentialInfo,
        }));
      }
    }
  }, [dispatch, history, authentication, user, loading]);

  return (
    <Switch>
      {children}
      <Route component={NotFound} />
    </Switch>
  );
};
