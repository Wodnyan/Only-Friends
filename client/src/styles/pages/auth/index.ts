import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useAuthStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      marginBottom: theme.spacing(2),
    },
    form: {},
    input: {
      marginBottom: theme.spacing(2),
    },
    bottom: {
      marginTop: theme.spacing(1),
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  })
);
