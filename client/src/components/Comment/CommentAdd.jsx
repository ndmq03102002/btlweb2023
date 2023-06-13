import { IconButton, Stack } from "@mui/material";
import React from "react";
import Input from "../Input";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpRequest from "../../configs/api.config";
import { toast } from "react-toastify";

const INITIAL_COMMENT = {
  comment: "",
};

const COMMENT_VALIDATION = Yup.object({
  comment: Yup.string().required("Vui lòng điền bình luận"),
});

const CommentAdd = ({ movieId }) => {
  const queryClient = useQueryClient();
  const { currentUser } = useSelector((state) => state.user);

  const addCommentMutation = useMutation({
    mutationFn: async (body) => {
      const { data } = await httpRequest.post("/review", body, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      return data;
    },
  });

  const handleAddComment = (values, resetForm) => {
    const body = {
      comment: values.comment,
      movie: {
        id: movieId,
      },
      user: {
        id: currentUser.id,
      },
    };
    addCommentMutation.mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["comments"] });
        toast.success("Thêm thành công bình luận!", { progress: undefined });
        resetForm();
      },
    });
  };

  return (
    <Formik
      initialValues={INITIAL_COMMENT}
      validationSchema={COMMENT_VALIDATION}
      onSubmit={(values, { resetForm }) => handleAddComment(values, resetForm)}
      validateOnBlur={false}
    >
      <Form>
        {currentUser.role === "user" && (
          <Stack direction="row" spacing={1.5}>
            <Input label="Nhập bình luận" size="small" name="comment" />
            <IconButton type="submit">
              <SendIcon />
            </IconButton>
          </Stack>
        )}
      </Form>
    </Formik>
  );
};

export default CommentAdd;
