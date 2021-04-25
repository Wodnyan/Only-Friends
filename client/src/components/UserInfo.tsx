import React from "react";

import Avatar from "@material-ui/core/Avatar/Avatar";
import { UserHandler } from "./UserHandler";
import Box from "@material-ui/core/Box";

interface Props {
  user: {
    username: string;
    handle: string;
    avatar?: string;
  };
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <Box>
      <Avatar src={user.avatar}></Avatar>
      {user.username}
      <UserHandler handler={user.handle} />
    </Box>
  );
};
