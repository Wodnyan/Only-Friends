import React from "react";
import Typography from "@material-ui/core/Typography/Typography";

interface Props {
  handler?: string;
}

export const UserHandler: React.FC<Props> = ({ handler }) => {
  return <Typography color="textSecondary">@{handler}</Typography>;
};
