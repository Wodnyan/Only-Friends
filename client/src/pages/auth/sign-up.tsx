import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { AccountCircle, Email } from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";

import { useRegisterMutation } from "../../generated/graphql";

import { useAuthStyles } from "../../styles/pages/auth";
import { Link } from "react-router-dom";
import { PasswordInput } from "../../components/PasswordInput";
import { registerSchema } from "../../utils/validators/user";
import { useYupValidationResolver } from "../../utils/validators/";

interface Inputs {
  username: string;
  fullName: string;
  email: string;
  password: string;
}

export const SignUp: React.FC = () => {
  const history = useHistory();
  const resolver = useYupValidationResolver(registerSchema);
  const {
    formState: { isValid, errors },
    register,
    handleSubmit,
    setError,
  } = useForm<Inputs>({
    resolver,
  });
  const [, registerMutation] = useRegisterMutation();
  const classes = useAuthStyles();

  const onSubmit = async (data: Inputs) => {
    try {
      if (isValid) {
        const response = await registerMutation(data);
        if (response.data?.register.validationErrors) {
          response.data?.register.validationErrors.forEach(
            ({ message, field }: any) => {
              setError(field, {
                message,
                type: "manual",
              });
            }
          );
        } else {
          history.push("/home");
        }
        /* 
          Temporary Fix
          Otherwise doesn't resubmit
        */
      } else {
        const response = await registerMutation(data);
        if (response.data?.register.validationErrors) {
          response.data?.register.validationErrors.forEach(
            ({ message, field }: any) => {
              setError(field, {
                message,
                type: "manual",
              });
            }
          );
        } else {
          history.push("/home");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          error={Boolean(errors?.username)}
          helperText={errors.username?.message}
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
          error={Boolean(errors?.fullName)}
          helperText={errors.fullName?.message}
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
          error={Boolean(errors?.email)}
          helperText={errors.email?.message}
        />
        <PasswordInput
          error={errors?.password?.message}
          ref={register("password")}
        />
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
