import React, { FC, useEffect } from "react";
import { useLocation } from "react-router";
import { Redirect } from "react-router";
import { Route } from "react-router";

import { getCookie } from "../utils/utils";
import { TState } from "../utils/types";

export interface IProtectedRouteProps {
  onlyForAuth?: boolean;
  path: string;
  exact: boolean;
  children?: React.ReactNode;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({
  onlyForAuth,
  children,
  ...rest
}) => {
  const isAuthorized = getCookie("accessToken");
  const location = useLocation<TState>();

  if (!onlyForAuth && isAuthorized) {
    const { from } = location.state || { from: { pathname: "/" } };
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (onlyForAuth && !isAuthorized) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
};
