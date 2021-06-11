import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { LandingPage } from "./pages";
import { HomePage } from "./pages/home";
import { SignUp } from "./pages/auth/sign-up";
import { NotFound } from "./pages/not-found";
import { Login } from "./pages/auth/login";
import UserPage from "./pages/users";

export const Routing: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={HomePage} />
        <Route path="/auth/sign-up" component={SignUp} />
        <Route path="/auth/login" component={Login} />
        <Route path="/users/:userId" component={UserPage} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};
