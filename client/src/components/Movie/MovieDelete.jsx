import React, { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";

import httpRequest from "../../configs/api.config";
import ConfirmModal from "../ConfirmModal";
import { toast } from "react-toastify";

const MovieDelete = ({ movieDetail }) => {
  const confirmModalRef = useRef(null);
  const queryClient = useQueryClient();
  const { currentUser } = useSelector((state) => state.user);

  const movieDeleteMutation = useMutation({
    mutationFn: async () => {
      const { data } = await httpRequest.delete(`/movie/${movieDetail.id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      return data;
    },
  });

  const handleDeleteMovie = () => {
    movieDeleteMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["movies"] });
        toast.success("Xóa bộ phim thành công!", { progress: undefined });
      },
    });
  };

  return (
    <>
      <Tooltip title="Xóa" disableInteractive>
        <IconButton
          color="error"
          onClick={() => confirmModalRef.current.show()}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <ConfirmModal
        ref={confirmModalRef}
        title="Xác nhận xóa bộ phim"
        content={`Hành động này sẽ xóa vĩnh viễn bộ phim ${movieDetail.movieTitle}. Bạn chắc chứ?`}
        handleAction={handleDeleteMovie}
      />
    </>
  );
};

export default MovieDelete;
