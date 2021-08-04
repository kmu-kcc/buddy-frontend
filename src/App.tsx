import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Layout} from './components';
import * as pages from './pages';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/signup' component={pages.SignUp} />
          <Route path='/' exact component={pages.Landing} />
          <Route path='/test' component={pages.Test} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
