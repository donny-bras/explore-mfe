import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Header from "./components/Header";
import Progress from "./components/Progress";

const AuthAppLazy = lazy(() => import("./components/AuthApp"));
const MarketingAppLazy = lazy(() => import("./components/MarketingApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default () => {
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header />
          <Suspense fallback={<Progress delay={500} />}>
            <Switch>
              <Route path="/auth" component={AuthAppLazy} />
              <Route path="/" component={MarketingAppLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
