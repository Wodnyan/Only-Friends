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
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState<string[] | []>([]);
  const [search, setSearch] = useState("");

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setSearchResults([
      "foobar",
      "foobar1",
      "foobar2",
      "foobar3",
      "foobar4",
      "foobar",
      "foobar1",
      "foobar2",
      "foobar3",
      "foobar4",
    ]);
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
          {(searchResults as string[]).map((result) => (
            <ListItem button>
              <ListItemText primary={result} />
            </ListItem>
          ))}
          <ListItem button>
            <ListItemText primary={`Go to ${search}`} />
          </ListItem>
        </List>
      )}
    </Box>
  );
};
