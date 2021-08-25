import React from 'react';
import {Route} from 'react-router-dom';
import {Router} from '../../utils/router';
import {List} from './List';
import {Create} from './Create';
import {Detail} from './Detail';

export const Activity = () => (
  <Router>
    <Route path='/activity/create' exact component={Create} />
    <Route path='/activity/detail' exact component={Detail} />
    <Route path='/activity' exact component={List} />
  </Router>
);