import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import OAuth from './oauth';
import Migraiton from '../migration';
import Product from '../product';
import PageNotFound from '../components/PageNotFound';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => (<Redirect to="/migration" />)} />
      <Route path="/oauth" component={OAuth} />
      <Route path="/migration" component={Migraiton} />
      <Route path="/products/:storeName" component={Product} />
      <Route component={PageNotFound} />
    </Switch>
  </BrowserRouter>
);
