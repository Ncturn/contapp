import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import AccountTable from '../components/AccountTable';
import AccountForm from '../components/AccountForm';
import Layout from '../components/Layout';

const App = () => {
  return (
    <HashRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={AccountTable} />
          <Route exact path='/create' component={AccountForm} />
        </Switch>
      </Layout>
    </HashRouter>
  );
};

export default App;
