import React, { useCallback } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { useDispatch } from "../../utils/store-type";

import styles from "../../pages/login.module.css";
import { logoutSend } from "../../services/actions/login";
export const ProfileHeader = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = useCallback(() => {
    dispatch(logoutSend());
    history.replace({ pathname: "/login" });
  }, [dispatch, history]);
  return (
    <>
      <nav className={styles.nav_wrapper}>
        <NavLink
          className={styles.profile_links}
          to={{ pathname: "/profile" }}
          activeClassName={styles.active}
        >
          Профиль
        </NavLink>
        <NavLink
          className={styles.profile_links}
          to={{ pathname: "/profile/orders" }}
          activeClassName={styles.active}
        >
          <span>История заказов</span>
        </NavLink>
        <NavLink
          onClick={logout}
          className={styles.profile_links}
          to={{ pathname: "/login" }}
          activeClassName={styles.active}
        >
          <span>Выход</span>
        </NavLink>
      </nav>
    </>
  );
};
