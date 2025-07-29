import React, { Suspense, lazy } from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Header from "./components/Header";
import Progress from "./components/Progress";
import { createBrowserHistory } from "history";
import useUser from "./hooks/useUser";

const AuthAppLazy = lazy(() => import("./components/AuthApp"));
const MarketingAppLazy = lazy(() => import("./components/MarketingApp"));
const DashboardAppLazy = lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const history = createBrowserHistory();

export default () => {
  const [user, updateUser] = useUser();
  const isSignedIn = !!user;

  const handleSignIn = (user) => {
    updateUser(user);
    history.push("/dashboard");
  };

  const handleSignOut = () => {
    updateUser(null);
  };

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header isSignedIn={isSignedIn} onSignOut={handleSignOut} />
          <Suspense fallback={<Progress delay={500} />}>
            <Switch>
              <Route path="/auth">
                {isSignedIn ? (
                  <Redirect to="/" />
                ) : (
                  <AuthAppLazy onSignIn={handleSignIn} />
                )}
              </Route>
              <Route path="/dashboard">
                {isSignedIn ? (
                  <DashboardAppLazy />
                ) : (
                  <Redirect to="/auth/signin" />
                )}
              </Route>
              <Route path="/" component={MarketingAppLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
