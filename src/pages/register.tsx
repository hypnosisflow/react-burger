import React, { useState, useCallback } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Link } from "react-router-dom";
import { useDispatch } from "../utils/store-type";
import { registerSend } from "../services/actions/login";
import { TForm } from "../utils/types";
import styles from "./login.module.css";

export function RegisterPage() {
  const dispatch = useDispatch();
  const [form, setValue] = useState<TForm>({
    email: "",
    password: "",
    name: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const request = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      dispatch(registerSend(form));
      setValue({ email: "", password: "", name: "" });
      console.log(form);
    },
    [form, dispatch]
  );
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <span> Регистрация </span>
        <form onSubmit={request}>
          <div className={styles.form}>
            <Input
              name="name"
              value={form.name ? form.name : ""}
              // className={styles.input}
              onChange={onChange}
              placeholder={"Имя"}
            />
            <Input
              name="email"
              value={form.email ? form.email : ""}
              // className={styles.input}
              onChange={onChange}
              placeholder={"E-mail"}
            />
            <PasswordInput
              name="password"
              value={form.password ? form.password : ""}
              onChange={onChange}
            />
          </div>
          <Button htmlType={"submit"}>Зарегистрироваться</Button>
        </form>
      </div>
      <div className={styles.links_wrap}>
        <span>
          Уже зарегистрированы <Link to="/login"> Войти</Link>
        </span>
      </div>
    </section>
  );
}
