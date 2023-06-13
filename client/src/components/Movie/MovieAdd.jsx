import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Input from "../Input";
import GenreDropdown from "./GenreDropdown";
import { BlueButton } from "../Button";
import httpRequest from "../../configs/api.config";

const INITIAL_MOVIE_FORM = {
  title: "",
  plot: "",
  language: "",
  releaseYear: 0,
  belongGenre: "",
  linkToMovie: "",
  poster: "",
};

const MOVIE_FORM_VALIDATION = Yup.object({
  title: Yup.string().required("Vui lòng điền tiêu đề phim"),
  plot: Yup.string().required("Vui lòng nhập cốt truyện phim"),
  language: Yup.string().required("Vui lòng nhập ngôn ngữ"),
  releaseYear: Yup.number().test(
    "bigger-than-zero",
    "Vui lòng điền năm sản xuất hợp lệ",
    (value) => value > 0
  ),
  belongGenre: Yup.string().required("Vui lòng chọn thể loại phim"),
  linkToMovie: Yup.string().required("Vui lòng điền đường dẫn đến bộ phim"),
  poster: Yup.string().required("Vui lòng điền poster"),
});

const MovieAdd = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useSelector((state) => state.user);

  const addMovieMutation = useMutation({
    mutationFn: async (body) => {
      const { data } = await httpRequest.post("/movie", body, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      return data;
    },
  });

  const handleAddMovie = (values, resetForm) => {
    const body = {
      movie_title: values.title,
      movie_plot: values.plot,
      movie_language: values.language,
      movie_release_year: values.releaseYear,
      movie_genre: {
        id: values.belongGenre,
      },
      movie_link: values.linkToMovie,
      movie_poster: values.poster,
    };
    addMovieMutation.mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["movies"] });
        toast.success("Thêm mới bộ phim thành công!", {
          progress: undefined,
        });
        resetForm();
      },
    });
  };

  return (
    <>
      <Box width="30%">
        <Typography variant="h4" fontWeight={700}>
          Thêm bộ phim
        </Typography>
        <Formik
          initialValues={INITIAL_MOVIE_FORM}
          validationSchema={MOVIE_FORM_VALIDATION}
          onSubmit={(values, { resetForm }) =>
            handleAddMovie(values, resetForm)
          }
          validateOnBlur={false}
        >
          <Form>
            <Box>
              <Grid container spacing={2} marginTop={0.5}>
                <Grid item xs={12}>
                  <Input label="Tiêu đề phim" name="title" size="small" />
                </Grid>
                <Grid item xs={12}>
                  <Input label="Cốt truyện" name="plot" size="small" />
                </Grid>
                <Grid item xs={12}>
                  <Input label="Ngôn ngữ" name="language" size="small" />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    label="Năm sản xuất"
                    name="releaseYear"
                    size="small"
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <GenreDropdown />
                </Grid>
                <Grid item xs={12}>
                  <Input label="Link phim" name="linkToMovie" size="small" />
                </Grid>
                <Grid item xs={12}>
                  <Input label="Poster" name="poster" size="small" />
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="space-around">
                    <BlueButton type="submit" className="w-48">
                      Thêm
                    </BlueButton>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Form>
        </Formik>
      </Box>
    </>
  );
};

export default MovieAdd;
