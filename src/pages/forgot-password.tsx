import React, { useState, useCallback, useEffect } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory } from "react-router-dom";

import styles from "./login.module.css";
import { forgotPassword } from "../services/actions/user";
import { useDispatch } from "../utils/store-type";
import { TForm } from "../utils/types";
import { useSelector } from "../utils/store-type";

export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const resetAllowed = useSelector((state) => state.auth.resetAllowed);

  const [form, setValue] = useState<TForm>({ email: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const request = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      dispatch(forgotPassword(form));
      setValue({ email: "" });
    },
    [form, dispatch, history]
  );

  if (resetAllowed) {
    history.replace({ pathname: "reset-password" });
  }

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <span>Восстановление пароля</span>
        <form onSubmit={request} className={styles.form}>
          <Input
            placeholder={"Укажите e-mail"}
            value={form.email ? form.email : ""}
            name="email"
            onChange={onChange}
          />
          <Button htmlType={"submit"}>Восстановить</Button>
        </form>
        <div className={styles.links_wrap}>
          <span>
            Вспомнили пароль? <Link to="/login"> Войти </Link>
          </span>
        </div>
      </div>
    </section>
  );
}
