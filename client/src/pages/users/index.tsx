import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useParams } from "react-router";
import { Navbar } from "../../components/nav/Navbar";
import { PostCard } from "../../components/PostCard";
import { UserHandler } from "../../components/UserHandler";
import { UserInfo } from "../../components/UserInfo";
import { usePostsQuery, useUserQuery } from "../../generated/graphql";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: theme.spacing(16),
      height: theme.spacing(16),
      fontSize: theme.typography.h2.fontSize,
      marginRight: "2rem",
    },
    container: {
      maxWidth: theme.breakpoints.width("lg") / 2,
      margin: "0 auto",
    },
    postsContainer: {
      // maxWidth: theme.breakpoints.width("lg") / 2,
      // margin: "0 auto",
    },
    user: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1rem",
      marginTop: "1rem",
      padding: "1rem",
    },
  })
);

const UserPage: React.FC<{}> = () => {
  const styles = useStyles();
  const params = useParams<{ userId: string }>();
  const [{ data: postsData }] = usePostsQuery({
    variables: {
      userId: params.userId,
    },
  });
  const [{ data: userData, fetching: userDataFetching }] = useUserQuery({
    variables: {
      id: params.userId,
    },
  });

  console.log(userData, params.userId, userDataFetching);

  const user = userData?.user
    ? {
        username: userData.user.fullName,
        handle: userData.user.username,
        avatar: userData.user.avatar,
      }
    : undefined;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <UserInfo loading={userDataFetching} paper user={user} />
        <UserInfo loading={userDataFetching} paper full user={user} />
        <Paper className={styles.user}>
          <Avatar className={styles.avatar} src={userData?.user?.avatar}>
            {userData?.user?.avatar ? "" : userData?.user?.username[0]}
          </Avatar>
          <div>
            <Typography variant="h5" component="h1">
              {userData?.user?.fullName}
            </Typography>
            <UserHandler handler={userData?.user?.username} />
            <Typography variant="body1" component="p">
              Joined {new Date(userData?.user?.createdAt).toLocaleDateString()}
            </Typography>
          </div>
        </Paper>
        <main className={styles.postsContainer}>
          {postsData?.posts.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))}
        </main>
      </div>
    </>
  );
};

export default UserPage;
