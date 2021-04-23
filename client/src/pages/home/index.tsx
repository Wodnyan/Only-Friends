import React from "react";
import { CreatePost } from "../../components/CreatePost";
import { NavBar } from "../../components/nav/Navbar";
import { PostCard } from "../../components/PostCard";
import { usePostsQuery } from "../../generated/graphql";

export const HomePage: React.FC = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <NavBar />
      <CreatePost />
      <main>
        {data?.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </main>
    </>
  );
};
