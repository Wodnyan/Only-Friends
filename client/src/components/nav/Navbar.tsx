import { Link, useHistory } from "react-router-dom";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";

import MaterialLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
// import CircularProgress from "@material-ui/core/CircularProgress";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      alignItems: "center",
      background: theme.palette.info.dark,
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

export const Navbar = () => {
  const history = useHistory();
  const classes = useStyles();
  const [{ data, fetching }] = useMeQuery();
  const [, logout] = useLogoutMutation();
  let navList = null;

  const handleLogout = async () => {
    const { data } = await logout();

    if (data?.logout) {
      history.push("/");
    }
  };

  if (data?.me) {
    navList = (
      <ul className={classes.navList}>
        <li>
          <MaterialLink to="/home" component={Link}>
            Home
          </MaterialLink>
        </li>
        <li>
          <MaterialLink to={`/users/${data.me.id}`} component={Link}>
            {data.me.username}
          </MaterialLink>
        </li>
        <li>
          <Button onClick={handleLogout} variant="contained">
            Logout
          </Button>
        </li>
      </ul>
    );
  } else {
    navList = null;
  }

  return (
    <header className={classes.header}>
      <Box>
        <Typography variant="h4" component="span">
          Only
          <Typography variant="h4" component="span">
            Friends
          </Typography>
        </Typography>
      </Box>
      <nav className={classes.nav}>{navList}</nav>
    </header>
  );
};
