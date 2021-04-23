import React from "react";

import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
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
  // const [] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClickMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const follow = () => console.log("follow");
  const hidePost = () => console.log("hide");
  const report = () => console.log("report");

  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">{post.author.username[0]}</Avatar>
          }
          action={
            <IconButton onClick={handleClickMore} aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          title={post.title}
          subheader={format(post.createdAt)}
        />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={follow}>Follow</MenuItem>
          <MenuItem onClick={hidePost}>Hide</MenuItem>
          <MenuItem onClick={report}>Report</MenuItem>
        </Menu>
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
