import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { HomepageLayout } from "../../layouts/HomepageLayout";
import { Navbar } from "../../components/nav/Navbar";
import { PostCard } from "../../components/PostCard";
import { Searchbar } from "../../components/Searchbar";
import { UserInfo } from "../../components/UserInfo";
import {
  AuthUserFragment,
  useMeQuery,
  usePostsQuery,
} from "../../generated/graphql";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: theme.breakpoints.width("lg"),
      margin: "0 auto",
    },
  })
);

export const HomePage: React.FC = () => {
  const classes = useStyles();
  const [{ data, fetching }] = usePostsQuery();
  const [{ data: userData, fetching: userDataFetching }] = useMeQuery();

  let body = null;

  if (!userData?.me && !userDataFetching) {
    return null;
  }

  if (!data && !fetching) {
    body = <Typography>It seems like you follow nobody</Typography>;
  } else if (fetching) {
    body = <Typography>Loading...</Typography>;
  } else {
    body = data!.posts.map((post) => <PostCard key={post.id} post={post} />);
  }

  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <HomepageLayout
          rightPanel={
            <RightPanel
              user={{
                user: userData?.me!,
                loading: userDataFetching,
              }}
            />
          }
          guest={!Boolean(userData?.me)}
        >
          {body}
        </HomepageLayout>
      </div>
    </>
  );
};

export const RightPanel: React.FC<{
  user: {
    user: AuthUserFragment;
    loading: boolean;
  };
}> = ({ user }) => {
  return (
    <Box marginLeft={2}>
      <Box marginTop={2} marginBottom={1}>
        <Searchbar />
      </Box>
      <UserInfo
        loading={user.loading}
        full
        user={{
          avatar: user.user.avatar,
          handle: user.user.username,
          username: user.user.fullName,
        }}
      />
    </Box>
  );
};
