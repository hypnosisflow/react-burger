import React, { useState, useCallback, useEffect } from "react";
import {
  Input,
  Button,
  EditIcon,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavLink, Route, Switch, useHistory } from "react-router-dom";

import styles from "./login.module.css";
import { useDispatch, useSelector } from "../utils/store-type";
import { editProfile } from "../services/actions/profile";
import { logoutSend } from "../services/actions/login";
import { TForm } from "../utils/types";
import { OrderCard } from "../components/order-card/order-card";
import { ProfileForm } from "../components/profile-form/profile-form";
import { ProfileHeader } from "../components/profile-header/profile-header";

export function ProfilePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  //@ts-ignore
  const user = useSelector((state) => state.user.user);

  return (
    <section className={styles.main_profile}>
      <div className={styles.container_profile}>
        <ProfileHeader />
        <ProfileForm />
      </div>
      <div className={styles.profile_info}>
        <span className={styles.info}>
          В этом разделе вы можете изменить свои персональные данные{" "}
        </span>
      </div>
    </section>
  );
}
