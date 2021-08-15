import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';
import {Layout} from './components';
import * as pages from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <ErrorBoundary FallbackComponent={pages.Fallback}>
          <Switch>
            <Route path='/signup' component={pages.SignUp} />
            <Route path='/memberapplication' component={pages.MemberApplication} />
            <Route path='/' exact component={pages.Landing} />
            <Route path='/test' component={pages.Test} />
            <Route path='/groupmanagelist' component={pages.GroupManageList} />
            <Route path='/login' component={pages.Login} />
            <Route path='/modifyMypage' component={pages.ModifyMypage} />
            <Route path='/mypage' component={pages.Mypage} />
          </Switch>
        </ErrorBoundary>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
