import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AccountTable from '../components/AccountTable';
import AccountForm from '../components/AccountForm';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={AccountTable} />
        <Route exact path='/create' component={AccountForm} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
