import React, {useLayoutEffect} from 'react';
import {Route, useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {RootState} from '../../store';
import {Router} from '../../common/router';
import {List} from './List';
import {Create} from './Create';
import {Detail} from './Detail';
import {Edit} from './Edit';
import {CommonMessage} from '../../common/wordings';

export const Activity = () => {
  const history = useHistory();
  const {user} = useSelector((state: RootState) => state.user);

  useLayoutEffect(() => {
    if (!user?.role?.activity_management) {
      toast.error(CommonMessage.noPermission);
      history.replace('/user');
    }
  }, [history, user]);

  return (
    <Router authentication>
      <Route path='/activity' exact component={List} />
      <Route path='/activity/create' exact component={Create} />
      <Route path='/activity/detail' exact component={Detail} />
      <Route path='/activity/edit' exact component={Edit} />
    </Router>
  );
};
