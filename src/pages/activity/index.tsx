import React from 'react';
import {Route} from 'react-router-dom';
import {Router} from '../../utils/router';
import {List} from './List';
import {Add} from './Add';
import {Status} from './Status';

export const Activity = () => (
  <Router>
    <Route path='/activity/add' exact component={Add} />
    <Route path='/activity/status' exact component={Status} />
    <Route path='/activity/list' exact component={List} />
  </Router>
);
