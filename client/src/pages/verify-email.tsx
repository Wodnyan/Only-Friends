import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useLocation } from "react-router";

export const VerifyEmail = () => {
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  return (
    <Box
      flexDirection="column"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Typography variant="h5">Activate your email</Typography>
      <Typography color="primary" variant="h4" component="h1">
        {email}
      </Typography>
    </Box>
  );
};
