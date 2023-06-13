import { Box, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import httpRequest from "../../configs/api.config";
import { GreenButton } from "../../components/Button";
import CommentBox from "../../components/Comment/CommentBox";
import MovieCard from "../../components/Movie/MovieCard";

const MovieDetail = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();

  const { data: movieInfo } = useQuery({
    queryKey: ["movies", id],
    queryFn: async () => {
      const { data } = await httpRequest.get(`/movie/${id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      return data;
    },
  });

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

  return (
    <Box p={4}>
      <Typography textAlign="center" fontSize={35} fontWeight={700}>
        {movieInfo?.data.movieTitle}
      </Typography>
      <Typography>{movieInfo?.data?.moviePlot}</Typography>
      <Box display="flex" gap={2} mt={1.5}>
        <img
          src={movieInfo?.data?.moviePoster}
          alt="Poster"
          width={350}
          height={530}
          className="rounded-xl"
        />
        <div className="flex-1">
          <Typography>{`Bộ phim truyền hình ${movieInfo?.data?.movieTitle} được sản xuất năm ${movieInfo?.data?.movieReleaseYear} thuộc thể loại ${movieInfo?.data?.movieGenre?.genreName}`}</Typography>
          <Typography>
            {`Xem full thuyết minh và vietsub bộ phim ${movieInfo?.data?.movieTitle} tại đây:`}
          </Typography>
          <GreenButton className="mt-2">
            <a href={movieInfo?.data?.movieLink} target="_blank">
              Xem phim
            </a>
          </GreenButton>
          <Typography fontWeight={700} fontSize={20} mt={2}>
            Bình luận:
          </Typography>
          <CommentBox movieId={Number(id)} />
        </div>
      </Box>
      <Typography fontWeight={700} fontSize={25} mt={2.5}>
        Các bộ phim khác cùng thể loại
      </Typography>
      <Grid container spacing={3} mt={0.5}>
        {Array.isArray(movieList?.data) &&
          movieList.data
            .filter(
              (movie) =>
                movie.movieGenre.id === movieInfo?.data.movieGenre?.id &&
                movie.id !== movieInfo?.data?.id
            )
            .map((movie, index) => (
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

export default MovieDetail;
