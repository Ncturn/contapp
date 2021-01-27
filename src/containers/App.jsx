import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import editAccount from '../views/editAccount';
import createAccount from '../views/createAccount';
import AccountTable from '../components/AccountTable';
import Policy from '../components/Policy';
import CreatePolicy from '../views/CreatePolicy';
import Layout from '../components/Layout';

const App = () => {
  library.add(faPencilAlt, faTrashAlt);
  return (
    <HashRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={AccountTable} />
          <Route exact path='/create' component={createAccount} />
          <Route exact path='/edit/:identifier' component={editAccount} />
          <Route exact path='/policy' component={Policy} />
          <Route exact path='/policy/create' component={CreatePolicy} />
        </Switch>
      </Layout>
    </HashRouter>
  );
};

export default App;
