import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import authProvider from "./utils/authProvider";
import routes from "./routes";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/shards-dashboards.1.1.0.css";

export default () => (
  <Router basename={process.env.REACT_APP_BASENAME || ""}>
    <div>
      {routes.map((route, index) => {
        if (route.path !== "/") {
          return (
            <PrivateRoute key={index} path={route.path} exact>
              <route.layout>
                <route.component />
              </route.layout>
            </PrivateRoute>
          );
        } else {
          return (
            <Route
              key={index}
              path={route.path}
              exact
              component={() => (
                <route.layout>
                  <route.component />
                </route.layout>
              )}
            ></Route>
          );
        }
      })}
    </div>
  </Router>
);

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        const allowed = authProvider.checkAuth();
        return allowed ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: {
                from: location,
              },
            }}
          />
        );
      }}
    />
  );
};
