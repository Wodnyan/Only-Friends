import React from "react";
import { NavBar } from "../../components/nav/Navbar";
import { PostCard } from "../../components/PostCard";
import { usePostsQuery } from "../../generated/graphql";

export const HomePage: React.FC = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <NavBar />
      {data?.posts.map((post) => (
        <PostCard post={post} />
      ))}
    </>
  );
};
