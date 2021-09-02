// import {Header} from 'antd/lib/layout/layout';
import React, {useCallback} from 'react';
import * as Sentry from '@sentry/react';
import {BrowserRouter} from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';
import {Provider, useSelector} from 'react-redux';
import {RootState, store} from './store';
import {Layout} from './components';
import * as pages from './pages';
import {Router, Route} from './common/router';

const App = () => {
  const {user} = useSelector((state: RootState) => state.user);
  const handleError = useCallback((error, info) => {
    Sentry.captureException(error, {
      extra: info,
      user: {
        username: user?.name,
        id: user?.id,
        email: user?.email,
      },
    });
  }, [user]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <ErrorBoundary FallbackComponent={pages.Fallback} onError={handleError}>
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
