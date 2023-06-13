import React from "react";
import { Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/movie/${movie?.id}`)}>
      <Paper
        elevation={3}
        sx={{ minHeight: 450 }}
        className="rounded-xl overflow-hidden"
      >
        <img
          src={movie?.moviePoster}
          alt={`Poster của bộ phim ${movie?.movieTitle}`}
          width="100%"
          height="300px"
        />
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 700,
            textAlign: "center",
            marginTop: 1,
          }}
        >
          {movie?.movieTitle}
        </Typography>
      </Paper>
    </div>
  );
};

export default MovieCard;
