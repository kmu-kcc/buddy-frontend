// import {Header} from 'antd/lib/layout/layout';
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Layout, Navbar} from './components'
import * as pages from './pages';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/' exact component={pages.Landing} />
          <Route path='/test' component={pages.Test} />
        </Switch>
      </Layout>
      <Navbar/>
    </BrowserRouter>
  );
};

export default App;
