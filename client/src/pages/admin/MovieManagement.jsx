import { Box } from "@mui/material";
import React from "react";
import MovieListTable from "../../components/Movie/MovieListTable";
import MovieAdd from "../../components/Movie/MovieAdd";

const MovieManagement = () => {
  return (
    <Box p={4} display="flex" gap={5}>
      <MovieAdd />
      <MovieListTable />
    </Box>
  );
};

export default MovieManagement;
