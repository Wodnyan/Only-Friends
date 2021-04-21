import React from "react";
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
      </main>
    </>
  );
};
