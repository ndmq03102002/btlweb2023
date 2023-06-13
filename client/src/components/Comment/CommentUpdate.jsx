import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import httpRequest from "../../configs/api.config";
import Input from "../Input";
import { GreenButton } from "../Button";
import { toast } from "react-toastify";

const CommentUpdateForm = forwardRef(({ commentDetail }, ref) => {
  const { currentUser } = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const INITIAL_COMMENT = {
    comment: commentDetail.comment,
  };

  const COMMENT_VALIDATION = Yup.object({
    comment: Yup.string().required("Vui lòng điền bình luận"),
  });

  useImperativeHandle(ref, () => ({
    show: () => {
      setOpen(true);
    },
    close: () => {
      setOpen(false);
    },
  }));

  const commentUpdateMutation = useMutation({
    mutationFn: async (body) => {
      const { data } = await httpRequest.post(
        `/review/${commentDetail.id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      return data;
    },
  });

  const handleUpdateComment = (values) => {
    const body = {
      comment: values.comment,
      movie: {
        id: commentDetail.movie.id,
      },
      user: {
        id: currentUser.id,
      },
    };
    commentUpdateMutation.mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["comments"] });
        setOpen(false);
        toast.success("Cập nhật thành công bình luận!", {
          progress: undefined,
        });
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
        initialValues={INITIAL_COMMENT}
        validationSchema={COMMENT_VALIDATION}
        onSubmit={(values) => handleUpdateComment(values)}
      >
        <Form>
          <DialogTitle sx={{ p: 2, fontSize: "20px", fontWeight: 700 }}>
            Chỉnh sửa bình luận
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
                <Input label="Viết bình luận" name="comment" />
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

const CommentUpdate = ({ commentDetail }) => {
  const updateCommentForm = useRef(null);

  return (
    <>
      <p
        className="text-blue-700 text-[13px] font-normal hover:underline hover:cursor-pointer"
        onClick={() => updateCommentForm.current.show()}
      >
        Chỉnh sửa
      </p>
      <CommentUpdateForm
        ref={updateCommentForm}
        commentDetail={commentDetail}
      />
    </>
  );
};

export default CommentUpdate;
