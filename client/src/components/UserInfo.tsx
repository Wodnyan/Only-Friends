import React from "react";

import Avatar from "@material-ui/core/Avatar/Avatar";
import { UserHandler } from "./UserHandler";
import Box from "@material-ui/core/Box";

interface Props {
  user: {
    username?: string;
    handle?: string;
    avatar?: string;
  };
  loading?: boolean;
}

export const UserInfo: React.FC<Props> = ({ user, loading = false }) => {
  const body = loading ? (
    <h1>I'm loading</h1>
  ) : (
    <>
      <Avatar src={user?.avatar}></Avatar>
      {user?.username}
      <UserHandler handler={user?.handle} />
    </>
  );
  return <Box>{body}</Box>;
};
