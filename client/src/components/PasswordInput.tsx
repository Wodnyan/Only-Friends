import React, { InputHTMLAttributes, useState } from "react";

import TextField from "@material-ui/core/TextField";
import { Https, Visibility, VisibilityOff } from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((_: Theme) =>
  createStyles({
    passwordVisibilityButton: {
      background: "none",
      border: "none",
      cursor: "pointer",
    },
  })
);

export const PasswordInput: any = React.forwardRef<
  any,
  InputHTMLAttributes<HTMLInputElement>
>((_, ref) => {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <TextField
        fullWidth
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        {...ref}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Https />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="start">
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className={classes.passwordVisibilityButton}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
});
