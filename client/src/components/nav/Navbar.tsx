import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import MaterialLink from "@material-ui/core/Link";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { useMeQuery } from "../../generated/graphql";

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
      li: {
        marginLeft: theme.spacing(1),
      },
    },
  })
);

export const NavBar = () => {
  const classes = useStyles();
  const [{ data, fetching }] = useMeQuery();

  let navList = null;

  console.log(data);

  // Loading
  if (fetching) {
    // User not logged in
  } else if (data?.me) {
    navList = <h1>{data.me.username}</h1>;
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
