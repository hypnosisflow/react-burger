import React from "react";
import styles from "./ingredients-details.module.css";
import { ingredientType } from "../../utils/types";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

IngredientsDetails.propTypes = {
  // item: ingredientType.isRequired,
};

function IngredientsDetails({}) {
  const { id } = useParams();
  // console.log(id);

  const menu = useSelector((state) => state.menu.menuSuccess);
  console.log(menu);

  const data = useSelector((state) => {
    return state.menu.menu.find((item) => item.item._id === id);
  });

  return (
    <section className={styles.section}>
      {menu && (
        <div className={styles.wrap}>
          <div className={styles.title}>
            <span className={styles.info}>Детали ингредиента</span>
          </div>
          <img src={data.item.image_large} alt="ingredient description" />
          <span className={styles.name}>{data.item.name}</span>
          <div className={styles.nutrients}>
            <div className={styles.details}>
              <span className={styles.nutrient}>Калории,ккал</span>
              <span className={styles.detail}>{data.item.calories}</span>
            </div>
            <div className={styles.details}>
              <span className={styles.nutrient}>Белки,г</span>
              <span className={styles.detail}>{data.item.proteins}</span>
            </div>
            <div className={styles.details}>
              <span className={styles.nutrient}>Жиры,г</span>
              <span className={styles.detail}>{data.item.fat}</span>
            </div>
            <div className={styles.details}>
              <span className={styles.nutrient}>Углеводы,г</span>
              <span className={styles.detail}>{data.item.carbohydrates}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default IngredientsDetails;
