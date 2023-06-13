import React from "react";
import CommentUpdate from "./CommentUpdate";
import CommentDelete from "./CommentDelete";

const CommentAction = ({ commentDetail }) => {
  return (
    <div className="flex gap-2 mt-1">
      <CommentUpdate commentDetail={commentDetail} />
      <CommentDelete commentId={commentDetail.id} />
    </div>
  );
};

export default CommentAction;
