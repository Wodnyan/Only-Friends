import React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import { Skeleton } from "@material-ui/lab";

interface Props {
  handler?: string;
  loading?: boolean;
}

export const UserHandler: React.FC<Props> = ({ handler, loading = false }) => {
  return (
    <Typography color="textSecondary">
      {loading ? <Skeleton /> : `@${handler}`}
    </Typography>
  );
};
