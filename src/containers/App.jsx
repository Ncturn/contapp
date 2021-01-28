import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt, faTrashAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import editAccount from '../views/editAccount';
import createAccount from '../views/createAccount';
import AccountTable from '../components/AccountTable';
import Policy from '../components/Policy';
import CreatePolicy from '../views/CreatePolicy';
import EditPolicy from '../views/EditPolicy';
import Layout from '../components/Layout';

const App = () => {
  library.add(faPencilAlt, faTrashAlt, faPlusSquare);
  return (
    <HashRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={AccountTable} />
          <Route exact path='/account' component={AccountTable} />
          <Route exact path='/account/create' component={createAccount} />
          <Route exact path='/account/edit/:identifier' component={editAccount} />
          <Route exact path='/policy' component={Policy} />
          <Route exact path='/policy/create' component={CreatePolicy} />
          <Route exact path='/policy/edit/:identifier' component={EditPolicy} />
        </Switch>
      </Layout>
    </HashRouter>
  );
};

export default App;
