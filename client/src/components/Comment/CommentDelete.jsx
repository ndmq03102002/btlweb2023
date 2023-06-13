import React, { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import httpRequest from "../../configs/api.config";
import { useSelector } from "react-redux";
import ConfirmModal from "../ConfirmModal";
import { toast } from "react-toastify";

const CommentDelete = ({ commentId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const confirmModalRef = useRef(null);

  const deleteCommentMutation = useMutation({
    mutationFn: async () => {
      const { data } = await httpRequest.delete(`/review/${commentId}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      return data;
    },
  });

  const handleDeleteComment = () => {
    deleteCommentMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["comments"] });
        toast.success("Xóa bình luận thành công!", { progress: undefined });
      },
    });
  };

  return (
    <>
      <p
        className="text-red-500 text-[13px] font-normal hover:underline hover:cursor-pointer"
        onClick={() => confirmModalRef.current.show()}
      >
        Xóa
      </p>
      <ConfirmModal
        ref={confirmModalRef}
        title="Xác nhận xóa bình luận"
        content="Bạn có chắc muốn xóa bình luận?"
        handleAction={handleDeleteComment}
      />
    </>
  );
};

export default CommentDelete;
