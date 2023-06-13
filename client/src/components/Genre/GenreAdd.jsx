import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Input from "../Input";
import { BlueButton } from "../Button";
import httpRequest from "../../configs/api.config";

const INITIAL_GENRE = {
  genre_name: "",
};

const GENRE_VALIDATION = Yup.object({
  genre_name: Yup.string().required("Vui lòng nhập thể loại"),
});

const GenreAdd = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useSelector((state) => state.user);

  const addGenreMutation = useMutation({
    mutationFn: async (body) => {
      const { data } = await httpRequest.post("/genre", body, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      return data;
    },
  });

  const handleAddGenre = async (values, resetForm) => {
    addGenreMutation.mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["genres"] });
        toast.success(`Thêm thành công thể loại ${values.genre_name}!`, {
          progress: undefined,
        });
        resetForm();
      },
    });
  };

  return (
    <>
      <Formik
        initialValues={INITIAL_GENRE}
        validationSchema={GENRE_VALIDATION}
        onSubmit={(values, { resetForm }) => handleAddGenre(values, resetForm)}
        validateOnBlur={false}
      >
        <Form>
          <Box width="100%" display="flex" gap={2} alignItems="center" pt={3}>
            <Input label="Tên thể loại" name="genre_name" size="small" />
            <BlueButton type="submit">Thêm</BlueButton>
          </Box>
        </Form>
      </Formik>
    </>
  );
};

export default GenreAdd;
