import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt, faTrashAlt, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import EditAccount from '../views/EditAccount';
import CreateAccount from '../views/CreateAccount';
import Account from '../views/Account';
import Policy from '../views/Policy';
import CreatePolicy from '../views/CreatePolicy';
import EditPolicy from '../views/EditPolicy';
import Layout from '../components/Layout';
import AccountBalance from '../views/AccountBalance';

const App = () => {
  library.add(faPencilAlt, faTrashAlt, faPlusSquare, faMinusSquare);
  return (
    <HashRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={Account} />
          <Route exact path='/account' component={Account} />
          <Route exact path='/account/create' component={CreateAccount} />
          <Route exact path='/account/edit/:identifier' component={EditAccount} />
          <Route exact path='/policy' component={Policy} />
          <Route exact path='/policy/create' component={CreatePolicy} />
          <Route exact path='/policy/edit/:identifier' component={EditPolicy} />
          <Route exact path='/balance' component={AccountBalance} />
        </Switch>
      </Layout>
    </HashRouter>
  );
};

export default App;
