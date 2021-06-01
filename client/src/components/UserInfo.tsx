import React from "react";

import Avatar from "@material-ui/core/Avatar/Avatar";
import { UserHandler } from "./UserHandler";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Skeleton } from "@material-ui/lab";

interface Props {
  user?: {
    username: string;
    handle: string;
    avatar: string;
  };
  full?: boolean;
  loading: boolean;
}

export const UserInfo: React.FC<Props> = ({ user, full, loading }) => {
  const mainInfo = loading ? (
    <>
      <Avatar>
        <Skeleton width={45} height={45} variant="circle" />
      </Avatar>
      <Typography>
        <Skeleton />
      </Typography>
      <UserHandler loading={true} handler={user?.handle} />
    </>
  ) : (
    <>
      <Avatar src={user?.avatar}>
        {!user?.avatar ? user!.username[0] : ""}
      </Avatar>
      <Typography>{user?.username}</Typography>
      <UserHandler loading={loading} handler={user?.handle} />
    </>
  );

  if (full) {
    return (
      <Paper>
        <Box p={3}>
          {mainInfo}
          <Box display="flex">
            {loading ? (
              <Box display="block" width="100%">
                <Typography>
                  <Skeleton />
                </Typography>
              </Box>
            ) : (
              <>
                <Typography>Following: 0</Typography>
                <Typography>Followers: 0</Typography>
              </>
            )}
          </Box>
        </Box>
      </Paper>
    );
  }
  return <Box>{mainInfo}</Box>;
};
