import React from "react";
import { Link } from "react-router-dom";

import { Navbar } from "../components/nav/Navbar";
import { useMeQuery } from "../generated/graphql";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      height: "100%",
      flexDirection: "column",
    },
    main: {
      display: "flex",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    choiceContainer: {
      "& > *": {
        marginInline: theme.spacing(1),
      },
    },
  })
);

export const LandingPage: React.FC = () => {
  const classes = useStyles();
  const [{ fetching, data }] = useMeQuery();
  let body = null;
  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <Typography variant="h2" component="h1">
          Welcome to OnlyFriends
        </Typography>
        <Box className={classes.choiceContainer}>
          <Link to="/explore">
            <Button variant="contained" color="primary">
              Explore as Guest
            </Button>
          </Link>
          <Link to="/auth/sign-up">
            <Button variant="contained" color="primary">
              Create an Account
            </Button>
          </Link>
        </Box>
      </>
    );
  } else {
    body = (
      <>
        <Typography variant="h2">Welcome back {data.me.fullName}</Typography>
        <Link to="/home">
          <Button variant="contained" color="primary">
            View Posts!
          </Button>
        </Link>
      </>
    );
  }
  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.main}>{body}</main>
    </div>
  );
};
