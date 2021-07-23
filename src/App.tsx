import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Layout} from './components';
import {LoginForm} from './pages/LoginForm';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <LoginForm/>
      </Layout>
    </BrowserRouter>
  );
};

export default App;


