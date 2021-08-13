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
          <Route path='/memberapplication' component={pages.MemberApplication} />
          <Route path='/' exact component={pages.Landing} />
          <Route path='/test' component={pages.Test} />
          <Route path='/groupmanagelist' component={pages.GroupManageList} />
          <Route path='/login' component={pages.Login} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
