import React, {useEffect, useMemo} from 'react';
import {Route as DefaultRoute, Switch, RouteProps as DefaultRouteProps, useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../store';
import {getMeRequest} from '../store/actions/userActions';
import {NotFound} from '../pages/NotFound';
import {UserRole} from '../models/User';
import {getCredentials, getCredentialInfo, isExpired} from './credentials';
import {CommonMessage} from './wordings';
import {Loading} from '../components';

interface RouteProps extends DefaultRouteProps {
  role?: keyof UserRole;
}

export const Route = (props: RouteProps) => {
  const {role, ...rest} = props;
  const history = useHistory();
  const {user} = useSelector((state: RootState) => state.user);
  const verified = useMemo(() => {
    if (!role) return true;

    return user?.role[role] ?? false;
  }, [role, user]);

  useEffect(() => {
    if (role && !user?.role[role]) {
      toast.error(CommonMessage.noPermission);
      history.replace('/user');
    }
  }, [history, role, user]);

  return verified ? <DefaultRoute {...rest} /> : <Loading />;
};

interface RouterProps {
  authentication?: boolean;
  role?: keyof UserRole;
  children: JSX.Element | JSX.Element[];
}

export const Router = ({authentication, children, role}: RouterProps) => {
  const dispatch = useDispatch();
  const {user, loading} = useSelector((state: RootState) => state.user);
  const history = useHistory();
  const verified = useMemo(() => {
    if (!authentication && !role) return true;

    if (role) {
      return user?.role[role] ?? false;
    } else {
      return !!user;
    }
  }, [authentication, user, role]);

  useEffect(() => {
    if (authentication) {
      const credentials = getCredentials();
      const credentialInfo = getCredentialInfo();

      if (!credentials || isExpired(credentials.expired_at) || !credentialInfo) {
        history.replace('/auth/signin');
      }

      if (!user && credentialInfo) {
        dispatch(getMeRequest({
          ...credentialInfo,
        }));
      }
    }

    if (role && !loading) {
      if (!user?.role[role]) {
        history.replace('/auth/signin');
      }
    }
  }, [dispatch, history, authentication, role, user, loading]);

  if (!verified) {
    return <Loading />;
  }

  return (
    <Switch>
      {children}
      <Route component={NotFound} />
    </Switch>
  );
};
