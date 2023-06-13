import React from "react";
import { useSelector } from "react-redux";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const AppRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  return <>{currentUser ? <PrivateRoute /> : <PublicRoute />}</>;
};

export default AppRoute;
