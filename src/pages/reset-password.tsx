import React, { useState, useCallback } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { resetPassword } from "../services/actions/profile";

import styles from "./login.module.css";
import { useDispatch, useSelector } from "../utils/store-type";
import { TForm } from "../utils/types";

export function ResetPasswordPage() {
  const dispatch = useDispatch();
  const [form, setValue] = useState<TForm>({ password: "", token: "" });
  const resetAllowed = useSelector((state) => state.auth);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const reset = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      dispatch(resetPassword(form));
      setValue({ password: "", token: "" });
      console.log(form);
    },
    [form]
  );

  if (!resetAllowed) {
    return <Redirect to={{ pathname: "/forgot-password" }} />;
  }

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <span>Восстановление пароля</span>
        <form className={styles.form}>
          <Input
            placeholder={"Введите новый пароль"}
            value={form.password ? form.password : ""}
            name="password"
            onChange={onChange}
          />
          <Input
            placeholder={"Введите код из письма"}
            value={form.token ? form.token : ""}
            name="token"
            onChange={onChange}
          ></Input>
        </form>
        <Button onClick={reset} htmlType={"button"}>
          Сохранить
        </Button>
        <div className={styles.links_wrap}>
          <span>
            Вспомнили пароль? <Link to={"/login"}> Войти </Link>
          </span>
        </div>
      </div>
    </section>
  );
}
