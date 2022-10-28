import React from "react";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

function AppHeader() {
  // const isConstructor = !!useRouteMatch({ path: '/', exact: true})

  const user = useSelector((state) => state.auth.user);

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <nav className={styles.navigation}>
          <NavLink
            to={{ pathname: "/" }}
            exact
            className={styles.button}
            activeClassName={styles.active}
          >
            <BurgerIcon />
            Конструктор
          </NavLink>
          <a href="#" className={styles.button}>
            <ListIcon />
            <span className={styles.inactive}>Лента заказов</span>
          </a>
        </nav>
        <Logo />
        <NavLink
          to={{ pathname: "/profile" }}
          className={styles.button}
          activeClassName={styles.active}
        >
          <ProfileIcon />
          {user ? user.name : "Личный кабинет"}
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
