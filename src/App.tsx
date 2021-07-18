import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Layout} from './components';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
