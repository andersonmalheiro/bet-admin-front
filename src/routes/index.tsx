import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from 'pages/Login';
import Register from 'pages/Register';
import Admin from 'pages/Admin';
import ProtectedRoute from 'components/ProtectedRoute';

interface RouteInterface {
  path: string;
  component: any;
  exact: boolean;
  protected: boolean;
}

const routes: RouteInterface[] = [
  {
    path: '/',
    component: Login,
    exact: true,
    protected: false
  },
  {
    path: '/register',
    component: Register,
    exact: false,
    protected: false
  },
  {
    path: '/admin',
    component: Admin,
    exact: false,
    protected: true
  }
];

function Routes() {
  return (
    <Router>
      <Switch>
        {routes.map((route, i) =>
          route.protected ? (
            <ProtectedRoute
              key={i}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          ) : (
            <Route
              key={i}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          )
        )}
      </Switch>
    </Router>
  );
}

export default Routes;
