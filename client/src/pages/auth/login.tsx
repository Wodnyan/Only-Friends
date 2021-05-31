import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Email } from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";

import { useLoginMutation } from "../../generated/graphql";

import { useAuthStyles } from "../../styles/pages/auth";
import { Link } from "react-router-dom";
import { PasswordInput } from "../../components/PasswordInput";
import { loginSchema } from "../../utils/validators/user";
import { useYupValidationResolver } from "../../utils/validators/";

interface Inputs {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const history = useHistory();
  const resolver = useYupValidationResolver(loginSchema);
  const {
    formState: { errors },
    register,
    handleSubmit,
    setError,
  } = useForm<Inputs>({
    resolver,
  });
  const [, loginMutation] = useLoginMutation();
  const classes = useAuthStyles();

  const onSubmit = async (data: Inputs) => {
    // try {
    //   const response = await loginMutation(data);
    //   if (response.error) {
    //     console.log(response.error);
    //   } else {
    //     history.push("/home");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <Container className={classes.container} maxWidth="sm">
      <Typography
        className={classes.header}
        variant="h4"
        align="center"
        component="h1"
      >
        Log in
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classes.form}
        noValidate
      >
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
            Don't have an account?
            <Link to="/auth/sign-up">Register!</Link>
          </span>
          <Button type="submit" variant="contained">
            Login!
          </Button>
        </div>
      </form>
    </Container>
  );
};
