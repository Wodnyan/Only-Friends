import React from "react";

import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Share, Favorite, MoreVert } from "@material-ui/icons";

import { Post, User } from "../generated/graphql";
import { format } from "timeago.js";

interface Props {
  post: Pick<
    Post,
    "id" | "title" | "description" | "image" | "createdAt" | "updatedAt"
  > & {
    author: User;
  };
}

export const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">{post.author.username[0]}</Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          title={post.title}
          subheader={format(post.createdAt)}
        />
        <CardMedia
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Favorite />
          </IconButton>
          <IconButton aria-label="share">
            <Share />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};
