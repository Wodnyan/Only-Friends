import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home } from "./pages";
import { SignUp } from "./pages/auth/sign-up";

export const Routing: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth/sign-up" component={SignUp} />
      </Switch>
    </Router>
  );
};
