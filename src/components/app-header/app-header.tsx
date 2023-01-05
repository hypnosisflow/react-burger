import React from "react";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function AppHeader() {
  // @ts-ignore
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
            <BurgerIcon type={"primary"} />
            Конструктор
          </NavLink>
          <NavLink to={{ pathname: "/feed" }} className={styles.button}>
            <ListIcon type={"primary"} />
            <span className={styles.inactive}>Лента заказов</span>
          </NavLink>
        </nav>
        <Logo />
        <NavLink
          to={{ pathname: "/profile" }}
          className={styles.button}
          activeClassName={styles.active}
        >
          <ProfileIcon type={"primary"} />
          {user ? user.name : "Личный кабинет"}
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
