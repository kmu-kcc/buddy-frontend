// import {Header} from 'antd/lib/layout/layout';
import React, {useCallback} from 'react';
import * as Sentry from '@sentry/react';
import {BrowserRouter} from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';
import {Provider} from 'react-redux';
import {Layout} from './components';
import * as pages from './pages';
import {Router, Route} from './common/router';
import {store} from './store';

const App = () => {
  const handleError = useCallback((error, info) => {
    Sentry.captureException(error, {
      extra: info,
    });
  }, []);

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
