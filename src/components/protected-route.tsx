import React, { useEffect } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { getUser } from "../services/actions/user";
import { useDispatch, useSelector } from "../utils/hooks";
import { TState, IProtectedRouteProps } from "../utils/types";

export function ProtectedRoute({
  auth = false,
  children,
  ...rest
}: IProtectedRouteProps) {
  //@ts-ignore
  const user = useSelector((state) => state.auth.user);
  const location = useLocation<TState>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (auth && user) {
    const { from } = location.state || { from: { pathname: "/" } };

    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }


  if (!auth && !user) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "login", state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
}
