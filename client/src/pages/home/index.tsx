import React from "react";
import { CreatePost } from "../../components/CreatePost";
import { NavBar } from "../../components/nav/Navbar";
import { PostCard } from "../../components/PostCard";
import { useMeQuery, usePostsQuery } from "../../generated/graphql";
import { HomepageLayout } from "../../components/HomepageLayout";
import Typography from "@material-ui/core/Typography";
import { UserInfo } from "../../components/UserInfo";

export const HomePage: React.FC = () => {
  const [{ data, fetching }] = usePostsQuery();
  const [{ data: userData }] = useMeQuery();

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
      <HomepageLayout
        userInfo={
          <UserInfo
            user={{
              handle: userData!.me!.username,
              username: userData!.me!.fullName,
              avatar: userData!.me!.avatar || undefined,
            }}
          />
        }
        posts={body}
        createPost={<CreatePost />}
      />
    </>
  );
};
