import React from "react";
// import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useScreenType } from "../hooks/useScreenType";
import { CreatePost } from "../components/CreatePost";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     container: {
//       maxWidth: theme.breakpoints.width("lg"),
//       margin: "0 auto",
//     },
//   })
// );

interface Props {
  guest: boolean;
  children: React.ReactNode;
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
}

export const HomepageLayout: React.FC<Props> = ({
  children,
  guest,
  leftPanel = <h1>Left Panel</h1>,
  rightPanel = <h1>Right Panel</h1>,
}) => {
  const screen = useScreenType();

  switch (screen) {
    case "fullscreen":
      return (
        <Grid container>
          <Grid item xs={3}>
            {!guest && leftPanel}
          </Grid>
          <Grid item xs={6}>
            {!guest && <CreatePost full={false} />}
            {children}
          </Grid>
          <Grid item xs={3}>
            {!guest && rightPanel}
          </Grid>
        </Grid>
      );
    case "tablet":
      return (
        <Grid container>
          <Grid item xs={8}>
            {!guest && <CreatePost full={false} />}
            {children}
          </Grid>
          <Grid item xs={4}>
            {!guest && rightPanel}
          </Grid>
        </Grid>
      );
    case "mobile":
      return (
        <Grid container>
          <Grid item xs={12}>
            {!guest && <CreatePost full={false} />}
            {children}
          </Grid>
        </Grid>
      );
  }
};
