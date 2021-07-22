// import {Header} from 'antd/lib/layout/layout';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Layout, Navbar} from './components';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
      </Layout>
      <Navbar/>
    </BrowserRouter>
  );
};

export default App;
