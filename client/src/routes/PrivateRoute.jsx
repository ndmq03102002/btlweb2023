import React from "react";
import { useSelector } from "react-redux";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return <>{currentUser.role === "admin" ? <AdminRoute /> : <UserRoute />}</>;
};

export default PrivateRoute;
