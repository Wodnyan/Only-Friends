import React, { FormEvent, useState, ChangeEvent } from "react";
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { calculatePercentage } from "../utils/calculatePercentage";
import Typography from "@material-ui/core/Typography";

interface Inputs {
  title: string;
  description: string;
}

const DESCRIPTION_MAX_LENGTH = 255;

export const CreatePost: React.FC = () => {
  const [, createPost] = useCreatePostMutation();
  const [{ data }] = useMeQuery();
  const [inputs, setInputs] = useState<Inputs>({
    description: "",
    title: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await createPost(inputs);
    console.log(response.data);
  };

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box my={2} width="100%" display="flex">
      <Box>
        <Avatar>{data?.me?.username}</Avatar>
      </Box>
      <Box width="100%">
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              onChange={handleChange}
              fullWidth
              label="Title"
              variant="outlined"
              name="title"
              value={inputs.title}
            />
          </Box>
          <Box>
            <TextField
              label="Description"
              multiline
              rows={6}
              variant="outlined"
              fullWidth
              onChange={handleChange}
              name="description"
              value={inputs.description}
            />
          </Box>
          <Box display="flex" alignItems="center" mt={2}>
            <Box position="relative" display="inline-flex">
              <CircularProgress
                variant="determinate"
                value={Math.min(
                  calculatePercentage(
                    inputs.description.length,
                    DESCRIPTION_MAX_LENGTH
                  ),
                  100
                )}
                color={
                  inputs.description.length < DESCRIPTION_MAX_LENGTH
                    ? "primary"
                    : "secondary"
                }
              />
              <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="caption"
                  component="div"
                  color="textSecondary"
                >
                  {DESCRIPTION_MAX_LENGTH - inputs.description.length}
                </Typography>
              </Box>
            </Box>
            <Button type="submit" variant="contained">
              Post
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
