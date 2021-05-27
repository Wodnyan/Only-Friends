import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { HomepageLayout } from "../../components/HomepageLayout";
import { NavBar } from "../../components/nav/Navbar";
import { PostCard } from "../../components/PostCard";
import { useMeQuery, usePostsQuery } from "../../generated/graphql";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: theme.breakpoints.width("lg"),
      margin: "0 auto",
    },
  }),
);

export const HomePage: React.FC = () => {
  const classes = useStyles();
  const [{ data, fetching }] = usePostsQuery();
  const [{ data: userData, fetching: userFetching }] = useMeQuery();

  let body = null;

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
        <HomepageLayout guest={!userFetching && !userData?.me}>
          {body}
        </HomepageLayout>
      </div>
    </>
  );
};
