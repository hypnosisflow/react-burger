import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";
import { getUser } from "../services/actions/login";
import { useDispatch } from 'react-redux';
import { TState } from '../utils/types';

export function ProtectedRoute({ auth = false, children, ...rest }: any) {
  //@ts-ignore
  const  user  = useSelector((state) => state.auth.user);
  const location = useLocation<TState>();
  const dispatch = useDispatch();

    useEffect(() => {
      //@ts-ignore
        dispatch(getUser())
    }, [])

    if (auth && user) {
      const { from } = location.state || { from: {pathname: '/'}}

      return (
        <Route {...rest}>
          <Redirect to={from} />
        </Route>
      )
    }

    if (!auth && !user) {
      return (
        <Route {...rest}>
          <Redirect to={{ pathname: 'login', state: {from: location }}} />
        </Route>
      )
    }

    return (
      <Route {...rest}>
        {children}
      </Route>
    )
}

