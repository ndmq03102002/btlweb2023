import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import httpRequest from "../../configs/api.config";
import { Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import CommentAction from "./CommentAction";

const CommentList = ({ movieId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const { data: commentList } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const { data } = await httpRequest.get("/review", {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      return data;
    },
  });

  return (
    <>
      {Array.isArray(commentList?.data) &&
        commentList.data
          .filter((comment) => comment.movie.id === movieId)
          .map((renderComment, index) => (
            <div className="flex my-5" key={index}>
              <img
                src="https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg"
                className="w-7 h-7 rounded-full mr-3"
              />
              <div className="flex flex-col flex-1">
                <div className="p-2 bg-[#F2F3F5] rounded-xl">
                  <p className="text-[14px] font-semibold">
                    {renderComment.user.username}
                  </p>
                  <p className="text-[12px] text-gray-500">
                    {dayjs(renderComment.createdAt).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                  </p>
                  <p className="text-[14px] font-normal mt-1">
                    {renderComment.comment}
                  </p>
                </div>
                {renderComment.user.id === currentUser.id && (
                  <CommentAction commentDetail={renderComment} />
                )}
              </div>
            </div>
          ))}
    </>
  );
};

export default CommentList;
