import React from "react";
import { useForm } from "react-hook-form";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { AccountCircle, Email } from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";

import { useAuthStyles } from "../../styles/pages/auth";
import { Link } from "react-router-dom";
import { PasswordInput } from "../../components/PasswordInput";

interface Inputs {
  username: string;
  fullName: string;
  email: string;
  password: string;
}

export const SignUp: React.FC = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const classes = useAuthStyles();

  const onSubmit = (data: Inputs) => console.log(data);

  return (
    <Container className={classes.container} maxWidth="sm">
      <Typography
        className={classes.header}
        variant="h4"
        align="center"
        component="h1"
      >
        Create An Account
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classes.form}
        noValidate
      >
        <TextField
          fullWidth
          id="outlined-basic"
          label="Username"
          variant="outlined"
          className={classes.input}
          {...register("username")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Full Name"
          variant="outlined"
          className={classes.input}
          {...register("fullName")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Email"
          variant="outlined"
          className={classes.input}
          {...register("email")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />
        <PasswordInput ref={register("password")} />
        <div className={classes.bottom}>
          <span>
            Already have an account?
            <Link to="/auth/login">Log in</Link>
          </span>
          <Button type="submit" variant="contained">
            Sign Up!
          </Button>
        </div>
      </form>
    </Container>
  );
};
