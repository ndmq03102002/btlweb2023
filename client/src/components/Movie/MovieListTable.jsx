import {
  Box,
  Paper,
  TableContainer,
  Typography,
  styled,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";

import httpRequest from "../../configs/api.config";
import MovieDelete from "./MovieDelete";
import MovieUpdate from "./MovieUpdate";

const StyledTable = styled(Table)(({ theme }) => ({
  "& .MuiTableHead-root": {
    "& .MuiTableRow-root": {
      "& .MuiTableCell-root": {
        backgroundColor: "#757575",
        color: "white",
      },
    },
  },
  "& .MuiTableBody-root": {
    "& .MuiTableRow-root": {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
      "&:last-child td, &:last-child th": {
        border: 0,
      },
    },
  },
}));

const MovieListTable = () => {
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

  return (
    <Box flexGrow={1}>
      <Typography variant="h4" fontWeight={700}>
        Quản lý danh sách các bộ phim
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 500, mt: 2.5 }}>
        <StyledTable stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Cốt truyện</TableCell>
              <TableCell>Ngôn ngữ</TableCell>
              <TableCell>Năm sản xuất</TableCell>
              <TableCell>Thể loại</TableCell>
              <TableCell>Link phim</TableCell>
              <TableCell align="left">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movieList?.data.map((movie, index) => (
              <TableRow key={index}>
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="left">{movie.movieTitle}</TableCell>
                <TableCell
                  align="left"
                  className="min-w-[200px] max-w-[200px] truncate"
                >
                  {movie.moviePlot}
                </TableCell>
                <TableCell align="left">{movie.movieLanguage}</TableCell>
                <TableCell align="left">{movie.movieReleaseYear}</TableCell>
                <TableCell align="left">{movie.movieGenre.genreName}</TableCell>
                <TableCell align="left">
                  <a
                    href={movie.movieLink}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    Link tại đây
                  </a>
                </TableCell>
                <TableCell align="right" sx={{ p: 0 }}>
                  <Stack direction="row">
                    <MovieDelete movieDetail={movie} />
                    <MovieUpdate movieDetail={movie} />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </Box>
  );
};

export default MovieListTable;
