import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import React from "react";

type ScreenType = "fullscreen" | "mobile" | "tablet";

export const useScreenType = (): ScreenType => {
  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.up("lg"));
  const tablet = useMediaQuery(theme.breakpoints.up("md"));
  const mobile = useMediaQuery(theme.breakpoints.up("sm"));

  if (fullscreen) {
    return "fullscreen";
  } else if (tablet) {
    return "tablet";
  } else {
    return "mobile";
  }
};
