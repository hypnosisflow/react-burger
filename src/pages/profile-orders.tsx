import React, { FC, useEffect } from "react";
import { ProfileHeader } from "../components/profile-header/profile-header";
import { useDispatch, useSelector } from "../utils/hooks";
import { connect } from "../services/actions/wsActions";

import styles from "./login.module.css";
import { getCookie } from "../utils/utils";
import { ORDER_ADD_DETAILS } from "../services/constants/order";
import { OrderCard } from "../components/order-card/order-card";

export const ProfileOrdersPage: FC = () => {
  const dispatch = useDispatch();

  const { ...data } = useSelector((state) => state.userOrders.data);
  const orders: [] = { ...data.orders };

  const accessToken = getCookie("accessToken")?.replace("Bearer ", "");

  const wsUrl = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;

  useEffect(() => {
    dispatch(connect(wsUrl));
  }, [dispatch, wsUrl]);

  return (
    <section className={styles.main_profile}>
      <div className={styles.container_profile}>
        <ProfileHeader />
        {/* <ProfileForm /> */}
        {/* LIST */}
        <div className={styles.orders_container}>
          {data.orders && (
            <ul className={styles.list}>
              {data.orders.map((order: any) => (
                <li
                  key={order._id}
                  onClick={() =>
                    dispatch({ type: ORDER_ADD_DETAILS, payload: order.number })
                  }
                >
                  {/* CARD */}
                  <OrderCard {...order} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className={styles.profile_info}>
        <span className={styles.info}>
          В этом разделе вы можете изменить свои персональные данные{" "}
        </span>
      </div>
    </section>
  );
};
