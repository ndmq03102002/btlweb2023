import { Paper } from "@mui/material";
import React from "react";
import CommentAdd from "./CommentAdd";
import CommentList from "./CommentList";

const CommentBox = ({ movieId }) => {
  return (
    <Paper
      elevation={3}
      className="mt-2 w-full max-h-[320px] min-h-[320px] overflow-auto p-5 rounded-xl"
    >
      <CommentAdd movieId={movieId} />
      <CommentList movieId={movieId} />
    </Paper>
  );
};

export default CommentBox;
