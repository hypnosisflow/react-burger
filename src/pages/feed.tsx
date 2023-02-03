import React, { useEffect } from "react";
import { OrderCard } from "../components/order-card/order-card";
import { connect, disconnect } from "../services/actions/wsActions";
import { useDispatch, useSelector } from "../utils/store-type";
import { WS_BASE_URL } from "../utils/api";
import styles from "./feed.module.css";

export const FeedPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connect(`${WS_BASE_URL}/all`));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  const { orders, total, totalToday } = useSelector((state) => state.ws);
 
  const readyOrders = () => {
    const done = orders.filter((item) => item.status === "done");
    const undone = orders.filter((item) => item.status === "undone");
    return { done, undone };
  };

  const sortedOrders = readyOrders();

  if (!orders.length) {
    return <h1 className={styles.loader}> Загрузка ...</h1>;
  }

  const stylesTotals = `${styles.number} text text_type_digits-large`;
  const stylesStatsHeaders = `${styles.stats} text text_type_digits-default`;

  return (
    <>
      <section className={styles.main}>
        <div className={styles.feed}>
          <h1> ЛЕНТА ЗАКАЗОВ </h1>
          {/* LIST */}
          <ul className={styles.list}>
            {orders.map((order, index: number) => (
              <li key={order._id}>
                {/* CARD */}
                <OrderCard order={order} />
              </li>
            ))}
          </ul>
        </div>
        {/* RIGHT SECTION  */}
        <div className={styles.total}>
          <div className={styles.statelists}>
            <div>
              <span className="text text_type_main-medium">Готовы:</span>
              <ul className={styles.statelist}>
                {sortedOrders.done.map((item, index: number) => (
                  <li key={index} className={stylesStatsHeaders}>
                    {item.number}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text text_type_main-medium">В работе:</span>
              <ul className={styles.statelist}>
                <li className="text text_type_digits-default">57854</li>
              </ul>
            </div>
          </div>
          <div className={styles.alltime}>
            <span className="text text_type_main-medium">
              Выполнено за все время:
            </span>
            <span className={stylesTotals}>{total}</span>
          </div>
          <div className={styles.today}>
            <span className="text text_type_main-medium">
              Выполнено за сегодня:
            </span>
            <span className={stylesTotals}>{totalToday}</span>
          </div>
        </div>
      </section>
    </>
  );
};
