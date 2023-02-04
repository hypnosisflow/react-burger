import React from "react";

import { ProfileForm } from "../components/profile-form/profile-form";
import { ProfileHeader } from "../components/profile-header/profile-header";

import styles from "./login.module.css";

export function ProfilePage() {
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
