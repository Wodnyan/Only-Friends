import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { NavBar } from "../components/nav/Navbar";

export const LandingPage: React.FC = () => {
  return (
    <>
      <NavBar />
      <main>
        <Typography variant="h2" component="h1">
          Welcome to OnlyFriends
        </Typography>
        <Link to="/auth/sign-up">Sign Up</Link>
      </main>
    </>
  );
};
