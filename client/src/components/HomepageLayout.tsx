import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useScreenType } from "../hooks/useScreenType";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: theme.breakpoints.width("lg"),
      margin: "0 auto",
    },
  }),
);

interface Props {
  posts: React.ReactNode;
  createPost: React.ReactNode;
  userInfo: React.ReactNode;
}

export const HomepageLayout: React.FC<Props> = ({
  posts,
  createPost,
  userInfo,
}) => {
  const classes = useStyles();
  const screen = useScreenType();

  switch (screen) {
    case "fullscreen":
      return (
        <Grid className={classes.container} container>
          <Grid item xs={3}>
            Recommended
          </Grid>
          <Grid item xs={6}>
            {createPost}
            {posts}
          </Grid>
          <Grid item xs={3}>
            {userInfo}
          </Grid>
        </Grid>
      );
    case "tablet":
      return (
        <Grid className={classes.container} container>
          <Grid item xs={8}>
            {createPost}
            {posts}
          </Grid>
          <Grid item xs={4}>
            {userInfo}
          </Grid>
        </Grid>
      );
    case "mobile":
      return (
        <Grid className={classes.container} container>
          <Grid item xs={12}>
            {createPost}
            {posts}
          </Grid>
        </Grid>
      );
  }
};
