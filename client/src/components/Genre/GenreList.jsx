import React from "react";
import {
  Box,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import httpRequest from "../../configs/api.config";
import GenreDelete from "./GenreDelete";
import GenreUpdate from "./GenreUpdate";

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

export default function GenreList() {
  const { currentUser } = useSelector((state) => state.user);

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
    <Box display="flex" justifyContent="space-around" pt={3}>
      <TableContainer
        component={Paper}
        className="w-[50%]"
        sx={{ maxHeight: 440 }}
      >
        <StyledTable stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên thể loại</TableCell>
              <TableCell align="left">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {genreList?.data.map((genre, index) => (
              <TableRow key={index}>
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="left">{genre.genreName}</TableCell>
                <TableCell align="right" sx={{ p: 0 }}>
                  <Stack direction="row">
                    <GenreDelete genreDetail={genre} />
                    <GenreUpdate genreDetail={genre} />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </Box>
  );
}
