import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children, ...props }) => {
  <Route {...props}>{isLoggedIn ? children : <Redirect to="/signin" />}</Route>;
};

export default ProtectedRoute;
