import React from "react";
import { Box, Typography } from "@mui/material";

import GenreAdd from "../../components/Genre/GenreAdd";
import GenreList from "../../components/Genre/GenreList";

const GenreManagement = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight={700}>
        Quản lý thể loại phim
      </Typography>
      <GenreAdd />
      <GenreList />
    </Box>
  );
};

export default GenreManagement;
