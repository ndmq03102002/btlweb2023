import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { MenuItem, TextField } from "@mui/material";
import { useField } from "formik";

import httpRequest from "../../configs/api.config";

const GenreDropdown = () => {
  const [field, meta] = useField("belongGenre");
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

  const configTextField = {
    ...field,
    label: "Thể loại",
    size: "small",
    select: true,
    fullWidth: true,
    error: meta && meta.touched && meta.error,
    helperText: meta && meta.touched && meta.error ? meta.error : null,
  };

  return (
    <TextField
      sx={{
        "& .MuiFormHelperText-root": {
          marginLeft: "3px",
        },
      }}
      {...configTextField}
    >
      {genreList?.data.map((genre, index) => (
        <MenuItem key={index} value={genre.id}>
          {genre?.genreName}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default GenreDropdown;
