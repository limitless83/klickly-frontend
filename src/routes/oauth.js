import React from 'react';
import { Switch, Route } from 'react-router-dom';
import OAuthShopify from '../oauth/OAuthShopify';
import PageNotFound from '../components/PageNotFound';

// This is for an app that uses more than one OAuth and each needs to have a different algorithm.
export default () => (
  <>
    <Switch>
      <Route exact path="/oauth/shopify" component={OAuthShopify} />
      <Route component={PageNotFound} />
    </Switch>
  </>
);
