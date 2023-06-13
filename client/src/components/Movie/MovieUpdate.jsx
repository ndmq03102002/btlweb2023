import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import httpRequest from "../../configs/api.config";
import Input from "../Input";
import { GreenButton } from "../Button";
import GenreDropdown from "./GenreDropdown";
import { toast } from "react-toastify";

const MovieUpdateForm = forwardRef(({ movie }, ref) => {
  const { currentUser } = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const INITIAL_MOVIE_FORM = {
    title: movie.movieTitle,
    plot: movie.moviePlot,
    language: movie.movieLanguage,
    releaseYear: movie.movieReleaseYear,
    belongGenre: movie.movieGenre.id,
    linkToMovie: movie.movieLink,
    poster: movie.moviePoster,
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

  useImperativeHandle(ref, () => ({
    show: () => {
      setOpen(true);
    },
    close: () => {
      setOpen(false);
    },
  }));

  const movieUpdateMutation = useMutation({
    mutationFn: async (body) => {
      const { data } = await httpRequest.post(`/movie/${movie.id}`, body, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      return data;
    },
  });

  const handleUpdateMovie = (values) => {
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
    movieUpdateMutation.mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["movies"] });
        setOpen(false);
        toast.success("Cập nhật thành công bộ phim!", { progress: undefined });
      },
    });
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 2,
        },
      }}
    >
      <Formik
        initialValues={INITIAL_MOVIE_FORM}
        validationSchema={MOVIE_FORM_VALIDATION}
        onSubmit={(values) => handleUpdateMovie(values)}
      >
        <Form>
          <DialogTitle sx={{ p: 2, fontSize: "20px", fontWeight: 700 }}>
            Cập nhật phim
            <IconButton
              sx={{ position: "absolute", top: 8, right: 8 }}
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ p: 2 }}>
            <Grid container spacing={2}>
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
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2, justifyContent: "center" }}>
            <GreenButton
              type="submit"
              variant="contained"
              sx={{ width: "150px" }}
            >
              Cập nhật
            </GreenButton>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
});

const MovieUpdate = ({ movieDetail }) => {
  const updateMovieForm = useRef(null);

  return (
    <>
      <Tooltip title="Chỉnh sửa" disableInteractive>
        <IconButton
          color="secondary"
          onClick={() => updateMovieForm.current.show()}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <MovieUpdateForm ref={updateMovieForm} movie={movieDetail} />
    </>
  );
};

export default MovieUpdate;
