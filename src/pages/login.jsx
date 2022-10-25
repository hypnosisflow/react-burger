import React, { useState, useCallback } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { loginSend } from "../services/actions/login";

import styles from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";

export function LoginPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.accessToken);

  const [form, setValue] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let login = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(loginSend(form));
      setValue({ email: "", password: "" });
      console.log(form);
    },
    [form, dispatch]
  );

  if (user) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <h1>Вход</h1>
        <form className={styles.form}>
          <Input
            value={form.email}
            name="email"
            onChange={onChange}
            placeholder={"E-mail"}
          />
          <PasswordInput
            value={form.password}
            name="password"
            onChange={onChange}
          />
        </form>
        <Button onClick={login}>Войти</Button>
        <div className={styles.links_wrap}>
          <span>
            Вы новый пользователь?{" "}
            <Link to="/register"> Зарегистрироваться </Link>
          </span>
          <span>
            Забыли пароль?{" "}
            <Link to="/forgot-password"> Восстановить пароль </Link>
          </span>
        </div>
      </div>
    </section>
  );
}
