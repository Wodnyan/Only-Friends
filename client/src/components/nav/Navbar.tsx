import { Link, useHistory } from "react-router-dom";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";

import MaterialLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      background: theme.palette.secondary.light,
      padding: theme.spacing(1),
    },
    nav: {
      marginLeft: "auto",
    },
    navList: {
      display: "flex",
      alignItems: "center",
      "& > *": {
        marginLeft: theme.spacing(1),
      },
    },
  })
);

export const NavBar = () => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const history = useHistory();
  const classes = useStyles();
  const [{ data, fetching }] = useMeQuery();
  let navList = null;

  const handleLogout = async () => {
    await logout();
    history.push("/");
  };

  // Loading
  if (fetching) {
    // User not logged in
  } else if (data?.me) {
    navList = (
      <div className={classes.navList}>
        <h1>{data.me.username}</h1>{" "}
        <Button onClick={handleLogout} variant="contained">
          {logoutFetching ? <CircularProgress /> : "Logout"}
        </Button>
      </div>
    );
    // User logged in
  } else {
    navList = (
      <ul className={classes.navList}>
        <li>
          <MaterialLink to="/auth/sign-up" component={Link}>
            Sign Up
          </MaterialLink>
        </li>
        <li>
          <MaterialLink to="/auth/login" component={Link}>
            Login
          </MaterialLink>
        </li>
      </ul>
    );
  }

  return (
    <header className={classes.header}>
      <Typography>OnlyFriends</Typography>
      <nav className={classes.nav}>{navList}</nav>
    </header>
  );
};
