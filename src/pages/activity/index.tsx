import React from 'react';
import {Route} from 'react-router-dom';
import {Router} from '../../common/router';
import {List} from './List';
import {Create} from './Create';
import {Detail} from './Detail';
import {Edit} from './Edit';

export const Activity = () => {
  return (
    <Router authentication role='activity_management'>
      <Route path='/activity' exact component={List} />
      <Route path='/activity/create' exact component={Create} />
      <Route path='/activity/detail' exact component={Detail} />
      <Route path='/activity/edit' exact component={Edit} />
    </Router>
  );
};
