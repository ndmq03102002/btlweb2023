import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserHeader from "../layouts/UserHeader";
import MovieList from "../pages/user/MovieList";
import MovieDetail from "../pages/user/MovieDetail";

const UserRoute = () => {
  return (
    <>
      <UserHeader />
      <Routes>
        <Route path="movie-list" element={<MovieList />} />
        <Route path="movie/:id" element={<MovieDetail />} />
        <Route path="*" element={<Navigate to="movie-list" />} />
      </Routes>
    </>
  );
};

export default UserRoute;
