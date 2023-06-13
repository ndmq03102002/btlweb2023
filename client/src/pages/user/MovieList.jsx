import React, { useState } from "react";
import {
  Box,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import httpRequest from "../../configs/api.config";
import MovieCard from "../../components/Movie/MovieCard";

const UserMovieList = () => {
  const [genreSelected, setGenreSelected] = useState(0);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const { data: movieList } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const { data } = await httpRequest.get("/movie", {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      return data;
    },
  });

  const { data: genreList } = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const { data } = await httpRequest.get("/genre", {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      return data;
    },
  });

  return (
    <Box p={4}>
      <TextField
        size="small"
        select
        label="Thể loại"
        defaultValue={0}
        className="mb-10 w-1/2"
        onChange={(event) => setGenreSelected(event.target.value)}
      >
        <MenuItem value={0}>Tất cả</MenuItem>
        {genreList?.data.map((genre, index) => (
          <MenuItem key={index} value={genre.id}>
            {genre?.genreName}
          </MenuItem>
        ))}
      </TextField>
      <Grid container spacing={3}>
        {Array.isArray(movieList?.data) &&
          (genreSelected === 0
            ? movieList.data
            : movieList.data.filter(
                (movie) => movie.movieGenre.id === genreSelected
              )
          ).map((movie, index) => (
            <Grid
              item
              xs={2.4}
              key={index}
              className="hover:scale-105 hover:cursor-pointer duration-300"
            >
              <MovieCard movie={movie} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default UserMovieList;
