import React, { useRef } from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import httpRequest from "../../configs/api.config";
import ConfirmModal from "../ConfirmModal";
import { toast } from "react-toastify";

const GenreDelete = ({ genreDetail }) => {
  const confirmModalRef = useRef(null);
  const queryClient = useQueryClient();
  const { currentUser } = useSelector((state) => state.user);

  const genreDeleteMutation = useMutation({
    mutationFn: async () => {
      const { data } = await httpRequest.delete(`/genre/${genreDetail.id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      return data;
    },
  });

  const handleDeleteGenre = () => {
    genreDeleteMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["genres"] });
        toast.success(`Xóa thành công thể loại ${genreDetail.genreName}!`, {
          progress: undefined,
        });
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
        title="Xác nhận xóa thể loại"
        content={`Hành động này sẽ xóa vĩnh viễn thể loại ${genreDetail.genreName}. Bạn chắc chứ?`}
        handleAction={handleDeleteGenre}
      />
    </>
  );
};

export default GenreDelete;
