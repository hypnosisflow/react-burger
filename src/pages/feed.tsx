import React from "react";

import styles from "./feed.module.css";

export const FeedPage = () => {
  return (
    <>
      <section className={styles.main}>
        <div className={styles.feed}>
          <h1> TITLE </h1>

          {/* LIST */}
          <ul className={styles.list}>
            <li>
              {/* CARD */}
              <div className={styles.card}>
                <div className={styles.title}>
                  <span>NUMBER</span>
                  <span> DATE</span>
                </div>
                <h3> NAME </h3>
                <div className={styles.details}>
                  <span> items</span>
                  <span>total</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        {/* RIGHT SECTION  */}
        <div className={styles.total}>
          <div className={styles.statelists}>
            <ul className={styles.statelist}>
              <span>READY:</span>
              <li>12312312</li>
              <li>3123123</li>
              <li>3412431432</li>
              <li>4123412342</li>
            </ul>
            <ul className={styles.statelist}>
              SOON: 
              <li>31231231231</li>
              <li>8787878</li>
              <li>57854</li>
            </ul>
          </div>
          <div className={styles.alltime}>
            <span>Выполнено за все время:</span>
            <span className={styles.number}>NUMBER</span>
          </div>
          <div className={styles.today}>
            <span>Выполнено за сегодня:</span>
            <span className={styles.number}>NUMBER</span>
          </div>
        </div>
      </section>
    </>
  );
};
