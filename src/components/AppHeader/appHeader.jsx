import React from "react";
import styles from './appHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
    return (
        <header className={styles.header}>
          <div className={styles.content}>
          <nav className={styles.navigation}>
            <a href="#" className={styles.button}>
              <BurgerIcon />
                <span className={styles.active}>
                  Конструктор
                </span>
            </a>
            <a href="#" className={styles.button}>
              <ListIcon />
              <span className={styles.inactive}>
                  Лента заказов
              </span>
              </a>
          </nav>
            <Logo />
            <a href="#" className={styles.button}>
            <ProfileIcon />
            <span className={styles.inactive}>
                  Личный кабинет
            </span>
            </a>
          </div>
        </header>
    )
}

export default AppHeader; 