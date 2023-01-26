import React, { useState, useCallback, useContext } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { loginSend } from "../services/actions/login";

import styles from "./login.module.css";
import { useDispatch, useSelector } from "../utils/store-type";
import { TForm } from "../utils/types";
import { UserContext } from "../components/user-context";


export const LoginPage = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const user = useSelector((state) => state.auth.user)

  const [form, setValue] = useState<TForm>({ email: "", password: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const login = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      dispatch(loginSend(form));
      setValue({ email: "", password: "" });
      // setUser({user})
    },
    [form, dispatch]
  );

  // if (loggedIn) {
  //   return <Redirect to={{ pathname: "/" }} />;
  // }

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <h1>Вход</h1>
        <form onSubmit={login}>
          <div className={styles.form}>
            <Input
              value={form.email ? form.email : ""}
              name="email"
              onChange={onChange}
              placeholder={"E-mail"}
            />
            <PasswordInput
              value={form.password ? form.password : ""}
              name="password"
              onChange={onChange}
            />
          </div>
          <Button htmlType={"submit"}>Войти</Button>
        </form>
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
};
