import {
  Box,
  createStyles,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router";
import { useUsersQuery, User } from "../generated/graphql";

type UserType = Omit<User, "posts">;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchResultsContainer: {
      background: theme.palette.primary.dark,
      color: "#fff",
      position: "absolute",
      zIndex: 10000,
      width: "100%",
      maxHeight: "200px",
      overflow: "auto",
    },
  })
);

export const Searchbar: React.FC<{}> = () => {
  const history = useHistory();
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState<UserType[] | []>([]);
  const [search, setSearch] = useState("");
  const [{ data, fetching }, reexecute] = useUsersQuery({
    variables: {
      username: search,
      options: {
        limit: 5,
        order: "ASC",
      },
    },
  });

  async function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setSearchResults([]);
    if (e.target.value.length >= 2 && data !== undefined) {
      setSearchResults(data?.users);
    }
  }

  async function goToUser(userId: string) {
    history.push(`/users/${userId}`);
  }

  return (
    <Box position="relative">
      <TextField
        onChange={handleSearch}
        value={search}
        fullWidth
        label="Search"
        variant="filled"
      />
      {searchResults.length > 0 && (
        <List className={classes.searchResultsContainer}>
          {searchResults.map((result: UserType) => (
            <ListItem key={result.id} button>
              <ListItemText
                onClick={() => goToUser(result.id)}
                primary={result.username}
              />
            </ListItem>
          ))}
          <ListItem key="goTo" button>
            <ListItemText primary={`Go to ${search}`} />
          </ListItem>
        </List>
      )}
    </Box>
  );
};
