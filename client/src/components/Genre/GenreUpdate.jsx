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
import { toast } from "react-toastify";

const GenreUpdateForm = forwardRef(({ genre }, ref) => {
  const { currentUser } = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const INITIAL_GENRE = {
    genre_name: genre.genreName,
  };

  const GENRE_VALIDATION = Yup.object({
    genre_name: Yup.string().required("Vui lòng nhập thể loại"),
  });

  useImperativeHandle(ref, () => ({
    show: () => {
      setOpen(true);
    },
    close: () => {
      setOpen(false);
    },
  }));

  const genreUpdateMutation = useMutation({
    mutationFn: async (body) => {
      const { data } = await httpRequest.post(`/genre/${genre.id}`, body, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      return data;
    },
  });

  const handleUpdateGenre = (values) => {
    genreUpdateMutation.mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["genres"] });
        setOpen(false);
        toast.success(
          `Cập nhật thành công từ thể loại ${genre.genreName} thành ${values.genre_name}!`,
          { progress: undefined }
        );
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
        initialValues={INITIAL_GENRE}
        validationSchema={GENRE_VALIDATION}
        onSubmit={(values) => handleUpdateGenre(values)}
      >
        <Form>
          <DialogTitle sx={{ p: 2, fontSize: "20px", fontWeight: 700 }}>
            Cập nhật thể loại
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
                <Input label="Tên thể loại" name="genre_name" size="small" />
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

const GenreUpdate = ({ genreDetail }) => {
  const updateGenreForm = useRef(null);

  return (
    <>
      <Tooltip title="Chỉnh sửa" disableInteractive>
        <IconButton
          color="secondary"
          onClick={() => updateGenreForm.current.show()}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <GenreUpdateForm ref={updateGenreForm} genre={genreDetail} />
    </>
  );
};

export default GenreUpdate;
