import React, { useState, useCallback } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";

import styles from "./login.module.css";
import { forgotPassword } from "../services/actions/login";
import { useDispatch } from "react-redux";

export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setValue] = useState({ email: "" });


  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const request = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(forgotPassword(form));
      setValue({ email: "" });
      history.replace({ pathname: '/reset-password'})
    },
    [form]
  );

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <span>Восстановление пароля</span>
        <form onSubmit={request} className={styles.form}>
          <Input
            placeholder={"Укажите e-mail"}
            value={form.email}
            name="email"
            onChange={onChange}
          />
          <Button>Восстановить</Button>
        </form>
        

        <div className={styles.links_wrap}>
          <span>Вспомнили пароль? <Link to="/login"> Войти </Link></span>
          
        </div>
      </div>
    </section>
  );
}
