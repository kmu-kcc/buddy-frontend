import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';
import {Layout} from './components';
import * as pages from './pages';
import {NotFound} from './pages/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <ErrorBoundary FallbackComponent={pages.Fallback}>
          <Switch>
            <Route path='/' exact component={pages.Landing} />
            <Route path='/signup' component={pages.SignUp} />
            <Route path='/signin' component={pages.SignIn} />
            <Route path='/organization' component={pages.Organization} />
            <Route path='/user' component={pages.User} />
            <Route path='/test' component={pages.Test} />
            <Route component={NotFound} />
          </Switch>
        </ErrorBoundary>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
