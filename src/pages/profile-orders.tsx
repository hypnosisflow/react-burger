import React, { FC, useEffect } from "react";
import { ProfileHeader } from "../components/profile-header/profile-header";
import { useDispatch, useSelector } from "../utils/store-type";
import { connect, disconnect } from "../services/actions/wsProfileActions";

import { getCookie } from "../utils/utils";
import { OrderCard } from "../components/order-card/order-card";

import styles from "./login.module.css";


export const ProfileOrdersPage: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = getCookie("accessToken")?.replace("Bearer ", "");
    const wsUrl = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;
    dispatch(connect(wsUrl));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  const [...orders] = useSelector((state) => state.wsProfile.orders);

  if (!orders.length) {
    return <h1 className={styles.loader}> Загрузка...</h1>;
  }

  return (
    <section className={styles.main_profile}>
      {orders && (
        <>
          <div className={styles.container_profile}>
            <ProfileHeader />
            {/* LIST */}
            <div className={styles.orders_container}>
              <ul className={styles.list}>
                {orders.map((order: any) => (
                  <li key={order._id}>
                    {/* CARD */}
                    <OrderCard order={order} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.profile_info}>
            <span className={styles.info}>
              В этом разделе вы можете изменить свои персональные данные{" "}
            </span>
          </div>
        </>
      )}
    </section>
  );
};
