import React, { useState, useCallback, useEffect } from "react";
import {
  Input,
  Button,
  EditIcon,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useHistory } from "react-router-dom";

import styles from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../services/actions/profile";
import { logoutSend } from "../services/actions/login";
import { TForm } from "../utils/types";

export function ProfilePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  //@ts-ignore
  const user = useSelector((state) => state.auth.user);

  const [form, setValue] = useState<TForm>({
    email: user.email,
    password: "********",
    name: user.name,
    isChanged: false,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, isChanged: true, [e.target.name]: e.target.value });
  };

  const edit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      //@ts-ignore
      dispatch(editProfile(form));
      setValue({ ...form, isChanged: false });
    },
    [form, dispatch]
  );

  const clear = useCallback(() => {
    setValue({
      email: user.email,
      password: "********",
      name: user.name,
    });
  }, [user]);

  const logout = useCallback(() => {
    //@ts-ignore
    dispatch(logoutSend()).then(() => {
      history.replace({ pathname: "/login" });
    });
  }, [dispatch, history]);

  return (
    <section className={styles.main_profile}>
      <div className={styles.container_profile}>
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
          >
            <span>История заказов</span>
          </NavLink>
          <NavLink
            onClick={logout}
            className={styles.profile_links}
            to={{ pathname: "/login" }}
          >
            <span>Выход</span>
          </NavLink>
        </nav>

        <div className={styles.inputs_wrapper}>
          <form onSubmit={edit} className={styles.inputs_wrapper}>
            <Input
              // className={styles.input}
              placeholder={"Имя"}
              name="name"
              value={form.name ? form.name : ""}
              icon={"EditIcon"}
              onChange={onChange}
            ></Input>
            <Input
              // className={styles.input}
              placeholder={"Email"}
              name="email"
              value={form.email ? form.email : ""}
              icon={"EditIcon"}
              onChange={onChange}
            ></Input>
            <PasswordInput
              // className={styles.input}
              placeholder={"Пароль"}
              name="password"
              value={form.password ? form.password : ""}
              icon={"EditIcon"}
              onChange={onChange}
              size={"default"}
            ></PasswordInput>
            {form.isChanged && (
              <div>
                <Button
                  onClick={clear}
                  type="secondary"
                  size="medium"
                  htmlType={"button"}
                >
                  ОЧИСТИТЬ
                </Button>
                <Button size="medium" htmlType={"button"}>
                  {" "}
                  СОХРАНИТЬ{" "}
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
      <div className={styles.profile_info}>
        <span className={styles.info}>
          В этом разделе вы можете изменить свои персональные данные{" "}
        </span>
      </div>
    </section>
  );
}
