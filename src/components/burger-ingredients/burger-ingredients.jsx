import React, { useState, useEffect } from "react";
import styles from "./burger-ingredients.module.css";
import IngredientsGroup from "../ingredients-group/ingredients-group";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { dataType } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../services/actions/fetch";
import { menuSelector } from "../../services/selectors/selectors";

BurgerIngredients.propTypes = {
  // data: dataType.isRequired,y
  openModal: PropTypes.func.isRequired,
};

function BurgerIngredients({ data, openModal }) {
  const [current, setCurrent] = useState("one");

  const dispatch = useDispatch();
  const { menu } = useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <section className={styles.ingredients}>
      <h3 className={styles.title}>Соберие бургер</h3>
      <div className={styles.tabs}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Начинка
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Соусы
        </Tab>
      </div>
      <div className={styles.list}>
        <h3 className={styles.group}>Булки</h3>
        <IngredientsGroup data={menu} group={"bun"} open={openModal} />

        <h3 className={styles.group}>Начинка</h3>
        <IngredientsGroup data={menu} group={"main"} open={openModal} />

        <h3 className={styles.group}>Соусы</h3>
        <IngredientsGroup data={menu} group={"sauce"} open={openModal} />
      </div>
    </section>
  );
}

export default BurgerIngredients;
