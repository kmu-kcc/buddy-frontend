import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import {Integrations} from '@sentry/tracing';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';

if (process.env.REACT_APP_ENV === 'production') {
  Sentry.init({
    dsn: 'https://6bd1c8df0ace4d2ba6a8e589df6ac78a@o983297.ingest.sentry.io/5938930',
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
);
