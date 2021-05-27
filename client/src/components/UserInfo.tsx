import React from "react";

import Avatar from "@material-ui/core/Avatar/Avatar";
import { UserHandler } from "./UserHandler";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

interface Props {
  user: {
    username?: string;
    handle?: string;
    avatar?: string;
  };
  full?: boolean;
}

export const UserInfo: React.FC<Props> = ({ user, full }) => {
  if (full) {
    return (
      <Paper>
        <Box p={3}>
          <Avatar src={user.avatar}>{!user.avatar ? user.username : ""}</Avatar>
          {user.username}
          <UserHandler handler={user.handle} />
          <Box display="flex">
            <Typography>Following: 0</Typography>
            <Typography>Followers: 0</Typography>
          </Box>
        </Box>
      </Paper>
    );
  }
  return (
    <Box>
      <Avatar src={user.avatar}></Avatar>
      {user.username}
      <UserHandler handler={user.handle} />
    </Box>
  );
};
