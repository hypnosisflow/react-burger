import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./burger-ingredients.module.css";
import IngredientsGroup from "../ingredients-group/ingredients-group";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { dataType } from "../../utils/types";


BurgerIngredients.propTypes = {
  // data: dataType.isRequired,
  // openModal: PropTypes.func.isRequired,
};

function BurgerIngredients({ data, openModal }) {
  const [current, setCurrent] = useState("one");

  const menu = data;

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0,
  });
  const [mainsRef, inViewMains] = useInView({
    threshold: 0,
  });
  const [saucesRef, inViewSauces] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrent("buns");
    } else if (inViewSauces) {
      setCurrent("sauces");
    } else if (inViewMains) {
      setCurrent("mains");
    }
  }, [inViewBuns, inViewMains, inViewSauces]);

  return (
    <section className={styles.ingredients}>
      <h3 className={styles.title}>Соберие бургер</h3>
      <div className={styles.tabs}>
        <Tab value="buns" active={current === "buns"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="mains" active={current === "mains"} onClick={setCurrent}>
          Начинка
        </Tab>
        <Tab value="sauces" active={current === "sauces"} onClick={setCurrent}>
          Соусы
        </Tab>
      </div>
      <div className={styles.list}>
        <h3 className={styles.group}>Булки</h3>
        <IngredientsGroup
          data={menu}
          group={"bun"}
          open={openModal}
          ref={bunsRef}
        />

        <h3 className={styles.group}>Начинка</h3>
        <IngredientsGroup
          data={menu}
          group={"main"}
          open={openModal}
          ref={mainsRef}
        />

        <h3 className={styles.group}>Соусы</h3>
        <IngredientsGroup
          data={menu}
          group={"sauce"}
          open={openModal}
          ref={saucesRef}
        />
      </div>
    </section>
  );
}

export default BurgerIngredients;
