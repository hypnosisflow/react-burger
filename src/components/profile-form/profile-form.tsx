import React, { useState, useCallback, useEffect, FC } from "react";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../../pages/login.module.css";
import { useDispatch, useSelector } from "../../utils/store-type";
import { editProfile } from "../../services/actions/profile";
import { TForm } from "../../utils/types";

export const ProfileForm: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [form, setValue] = useState<TForm>({
    email: user ? user.email : "empty",
    password: "********",
    name: user ? user.name : "empty",
    isChanged: false,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, isChanged: true, [e.target.name]: e.target.value });
  };

  const edit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      dispatch(editProfile(form));
      setValue({ ...form, isChanged: false });
    },
    [form, dispatch]
  );

  const clear = useCallback(() => {
    setValue({
      email: user ? user.email : 'empty',
      password: "********",
      name: user ? user.name : 'empty',
    });
  }, [user]);

  return (
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
  );
};
