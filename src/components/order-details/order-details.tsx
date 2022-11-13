import React from "react";
import styles from "./order-details.module.css";
//@ts-ignore
import done from "../../images/done.png";

const  OrderDetails = ({ orderNumber }: {orderNumber: number}) => {
  return (
    <div className={styles.wrap}>
      <p className="text text_type_digits-large mt-30">{orderNumber}</p>
      <span className={styles.title}>идентификатор заказа</span>
      <img src={done} className={styles.img} alt="order" />
      <span className={styles.prepare}>Ваш заказ начали готовить</span>
      <span className={styles.pending}>
        Дождитесь готовности на орибатльной станции
      </span>
    </div>
  );
}

export default OrderDetails;
