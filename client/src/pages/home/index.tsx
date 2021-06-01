import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { HomepageLayout } from "../../components/HomepageLayout";
import { NavBar } from "../../components/nav/Navbar";
import { PostCard } from "../../components/PostCard";
import { UserInfo } from "../../components/UserInfo";
import { useMeQuery, usePostsQuery } from "../../generated/graphql";

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

  console.log(userDataFetching);

  if (!userData?.me && !userDataFetching) {
    return null;
  }

  const userInfo = {
    avatar: userData?.me!.avatar!,
    handle: userData?.me!.username!,
    username: userData?.me!.fullName!,
  };

  if (!data && !fetching) {
    body = <Typography>It seems like you follow nobody</Typography>;
  } else if (fetching) {
    body = <Typography>Loading...</Typography>;
  } else {
    body = data!.posts.map((post) => <PostCard key={post.id} post={post} />);
  }

  return (
    <>
      <NavBar />
      <div className={classes.container}>
        <HomepageLayout
          rightPanel={
            <UserInfo loading={userDataFetching} full user={userInfo} />
          }
          guest={Boolean(!userData?.me)}
        >
          {body}
        </HomepageLayout>
      </div>
    </>
  );
};
