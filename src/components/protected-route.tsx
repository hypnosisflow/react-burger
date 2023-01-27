import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { Redirect } from "react-router";
import { Route } from "react-router";
import { useSelector, useDispatch } from "../utils/store-type";
import { checkUserAuth } from "../services/actions/login";

export interface IProtectedRouteProps {
  onlyUnAuth?: Boolean;
  rest: {
    path: string;
    exact: boolean;
  };
}

export const ProtectedRoute = ({ onlyUnAuth = false, ...rest }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const authChecked = useSelector((state) => state.auth.authChecked);
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const user = useSelector((state) => state.auth.user);

  // if (!authChecked) {
  //   // request processing
  //   return null; // || preloader
  // }

  if (onlyUnAuth && !user) {
    return <Route {...rest} />;
  }

  if (onlyUnAuth && user) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  if (!user) {
    return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  }

  return <Route {...rest} />;
};
