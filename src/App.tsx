// import {Header} from 'antd/lib/layout/layout';
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';
import {Provider} from 'react-redux';
import {Layout} from './components';
import * as pages from './pages';
import {Router} from './common/router';
import {store} from './store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <ErrorBoundary FallbackComponent={pages.Fallback}>
            <Router>
              <Route path='/' exact component={pages.Landing} />
              <Route path='/auth' component={pages.Auth} />
              <Route path='/organization' component={pages.Organization} />
              <Route path='/user' component={pages.User} />
              <Route path='/activity' component={pages.Activity} />
              <Route path='/fee' component={pages.Fee} />
              <Route path='/test' component={pages.Test} />
            </Router>
          </ErrorBoundary>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
