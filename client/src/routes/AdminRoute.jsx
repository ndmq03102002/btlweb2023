import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminHeader from "../layouts/AdminHeader";
import GenreManagement from "../pages/admin/GenreManagement";
import MovieManagement from "../pages/admin/MovieManagement";
import MovieList from "../pages/user/MovieList";
import MovieDetail from "../pages/user/MovieDetail";

const AdminRoute = () => {
  return (
    <>
      <AdminHeader />
      <Routes>
        <Route path="genre-management" element={<GenreManagement />} />
        <Route path="movie-management" element={<MovieManagement />} />
        <Route path="movie-list" element={<MovieList />} />
        <Route path="movie/:id" element={<MovieDetail />} />
        <Route path="*" element={<Navigate to="movie-management" />} />
      </Routes>
    </>
  );
};

export default AdminRoute;
